import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";
import {
  Image,
  FileJson,
  QrCode,
  RefreshCw,
  Check,
  AlertTriangle,
} from "lucide-react";
import { hashToCode, makeVerifyUrl, drawQR } from "../lib/cert-utils";
import certStamp from "../assets/cert.jpeg";

const PROGRAMMES = [
  "Foundation Violin",
  "Foundation Viola",
  "Foundation Cello",
  "Intermediate Violin",
  "Intermediate Viola",
  "Intermediate Cello",
  "Advanced Violin",
  "Advanced Viola",
  "Advanced Cello",
  "Music Theory Development",
  "Performance Development",
];
const LEVELS = ["Distinction", "Merit", "Pass"];

function extractInstrument(programme) {
  if (/violin/i.test(programme)) return "Violin";
  if (/viola/i.test(programme)) return "Viola";
  if (/cello/i.test(programme)) return "Cello";
  return programme;
}

export default function AdminGenerate() {
  const [name, setName] = useState("");
  const [programme, setProgramme] = useState(PROGRAMMES[0]);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [level, setLevel] = useState("Distinction");
  const [entry, setEntry] = useState(null);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const previewRef = useRef(null);
  const qrRef = useRef(null);

  const generate = useCallback(
    async (e) => {
      e.preventDefault();
      setStatus("Generating…");
      setEntry(null);
      setError("");

      const code = await hashToCode(name.trim(), programme, date);
      const newEntry = { code, name: name.trim(), programme, date, level };
      setEntry(newEntry);

      setTimeout(() => {
        if (qrRef.current) {
          try {
            drawQR(qrRef.current, makeVerifyUrl(code), { width: 300 });
          } catch (err) {
            console.error("QR draw failed:", err);
          }
        }
        setStatus("ready");
      }, 200);
    },
    [name, programme, date, level],
  );

  const prepareJSON = useCallback(() => {
    if (!entry) return;
    setBusy(true);
    setError("");
    fetch("/certificates.json")
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => [])
      .then((existing) => {
        existing.push(entry);
        const blob = new Blob([JSON.stringify(existing, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "certificates.json";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        setBusy(false);
      })
      .catch((err) => {
        setError("JSON failed: " + err.message);
        setBusy(false);
      });
  }, [entry]);

  const preparePNG = useCallback(async () => {
    if (!previewRef.current || !entry) return;
    setBusy(true);
    setError("");
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
      });
      canvas.toBlob((blob) => {
        if (!blob) {
          setError("Could not render PNG");
          setBusy(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `certificate-${entry.code}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 2000);
        setBusy(false);
      }, "image/png");
    } catch (err) {
      setError("PNG failed: " + err.message);
      setBusy(false);
    }
  }, [entry]);

  const instrument = extractInstrument(programme);

  return (
    <div
      className="min-h-screen py-16"
      style={{ background: "var(--color-background)" }}
    >
      <div className="container-prose max-w-5xl">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs uppercase tracking-[0.2em] mb-4">
            <QrCode className="h-3.5 w-3.5" /> Admin Panel
          </div>
          <h1
            className="font-display text-3xl md:text-4xl"
            style={{ color: "var(--color-primary-heading)" }}
          >
            Certificate Generator
          </h1>
          <p
            className="mt-2"
            style={{ color: "var(--color-muted-foreground)" }}
          >
            Fill in the student details below to generate a verifiable
            certificate with QR code.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <form
            onSubmit={generate}
            className="space-y-5 p-8 rounded-2xl border border-[var(--color-border)]"
            style={{
              background: "var(--color-card)",
              boxShadow: "var(--shadow-elegant)",
            }}
          >
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-primary-heading)" }}
              >
                Student Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Chiamaka Eze"
                className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                style={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-foreground)",
                }}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "var(--color-primary-heading)" }}
              >
                Programme
              </label>
              <select
                value={programme}
                onChange={(e) => setProgramme(e.target.value)}
                className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                style={{
                  background: "var(--color-background)",
                  border: "1px solid var(--color-border)",
                  color: "var(--color-foreground)",
                }}
              >
                {PROGRAMMES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-primary-heading)" }}
                >
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                  style={{
                    background: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-foreground)",
                  }}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--color-primary-heading)" }}
                >
                  Level
                </label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                  style={{
                    background: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    color: "var(--color-foreground)",
                  }}
                >
                  {LEVELS.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={!name.trim()}
              className="btn-hero btn-hero-hover w-full"
            >
              <RefreshCw className="h-4 w-4" /> Generate Certificate
            </button>
          </form>

          {/* Preview */}
          <div>
            {entry && status === "ready" ? (
              <div className="space-y-4">
                {/* Certificate Preview — Landscape */}
                <div
                  ref={previewRef}
                  className="relative w-full rounded-lg overflow-hidden border-4 border-[var(--color-gold)]"
                  style={{
                    background: "#ffffff",
                    boxShadow: "var(--shadow-gold)",
                    aspectRatio: "297 / 210",
                  }}
                >
                  <div className="absolute inset-3 border rounded" style={{ borderColor: "rgba(246,190,57,0.2)" }} />
                  <div
                    className="relative h-full flex flex-col p-6 md:p-8"
                    style={{ color: "#1a1c1a" }}
                  >
                    {/* Header */}
                    <div className="text-center shrink-0">
                      <div
                        className="text-[0.6rem] md:text-[0.7rem] uppercase tracking-[0.3em] font-semibold"
                        style={{ color: "#8b1a2b" }}
                      >
                        Certificate of Completion
                      </div>
                      <div
                        className="text-xl md:text-3xl mt-1 tracking-wide"
                        style={{ color: "#402d00" }}
                      >
                        UBY&apos;S String Academy
                      </div>
                      <div
                        className="text-xs mt-1"
                        style={{ color: "#f6be39" }}
                      >
                        A Premier Conservatory of Strings
                      </div>
                    </div>

                    {/* Body */}
                    <div
                      className="flex-1 flex flex-col justify-center text-center px-2 md:px-8 text-[0.5rem] md:text-[0.58rem] leading-relaxed"
                      style={{ color: "#4b5563" }}
                    >
                      <p className="mt-2">This is to certify that</p>
                      <p
                        className="text-lg md:text-2xl italic my-1"
                        style={{ color: "#8b1a2b" }}
                      >
                        {entry.name}
                      </p>
                      <p className="mt-2">
                        has fulfilled the requirements for graduation from
                        UBY&apos;S String Academy, having demonstrated
                        resilience, technical development, musicianship, and
                        competence in the study and performance of the
                      </p>
                      <p
                        className="text-sm md:text-lg my-1"
                        style={{ color: "#402d00" }}
                      >
                        {instrument}
                      </p>
                      <p className="mt-1">
                        In addition, the recipient has successfully completed
                        internationally recognised introductory studies in music
                        theory through{" "}
                        <strong>OpenLearn, The Open University</strong> (Milton
                        Keynes, United Kingdom), and supplementary short-course
                        certification in music theory through{" "}
                        <strong>Cursa International Learning Platform</strong>,
                        in fulfilment of the Academy&apos;s global professional
                        training requirements.
                      </p>
                      <p className="mt-2">
                        Awarded in recognition of artistic growth, discipline,
                        musical competence, and professional development.
                      </p>
                    </div>

                    {/* Footer: Director (left) — Stamp (center) — Date (right) */}
                    <div className="shrink-0 flex items-end mt-3">
                      {/* Director Left */}
                      <div className="flex-1 text-center">
                        <div
                          className="mx-auto w-24 md:w-28 border-t pt-1 text-[0.5rem] md:text-[0.55rem]"
                          style={{ borderColor: "#9ca3af", color: "#9ca3af" }}
                        >
                          Director
                        </div>
                      </div>

                      {/* Stamp Center */}
                      <div className="flex-shrink-0 px-2 md:px-4 text-center">
                        <img
                          src={certStamp}
                          alt="Official Stamp"
                          className="h-14 w-14 md:h-18 md:w-18 object-contain opacity-80 mx-auto"
                          crossOrigin="anonymous"
                        />
                        <div className="text-[0.38rem] md:text-[0.42rem] mt-0.5" style={{ color: "#9ca3af" }}>Official Stamp</div>
                      </div>

                      {/* Date Right */}
                      <div className="flex-1 text-center">
                        <div
                          className="mx-auto w-24 md:w-28 border-t pt-1 text-[0.5rem] md:text-[0.55rem]"
                          style={{ borderColor: "#9ca3af", color: "#9ca3af" }}
                        >
                          {new Date(entry.date).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    {/* QR Code row */}
                    <div className="shrink-0 flex justify-center mt-2">
                      <div className="text-center">
                        <canvas ref={qrRef} className="h-10 w-10 md:h-12 md:w-12 mx-auto" />
                        <div className="text-[0.38rem] md:text-[0.42rem] tracking-wider mt-0.5" style={{ color: "#402d00" }}>{entry.code}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div
                    className="flex items-center gap-2 p-3 rounded-lg text-sm"
                    style={{
                      background: "var(--color-surface-container)",
                      color: "var(--color-burgundy)",
                    }}
                  >
                    <AlertTriangle className="h-4 w-4" /> {error}
                  </div>
                )}

                {/* Download Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={prepareJSON}
                    disabled={busy}
                    className="flex-1 btn-hero btn-hero-hover flex items-center justify-center gap-2 text-sm"
                  >
                    {busy ? (
                      "Preparing..."
                    ) : (
                      <>
                        <FileJson className="h-4 w-4" /> Download JSON
                      </>
                    )}
                  </button>
                  <button
                    onClick={preparePNG}
                    disabled={busy}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-lg font-medium text-sm transition-all hover:-translate-y-0.5"
                    style={{
                      background: "var(--color-card)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-primary-heading)",
                    }}
                  >
                    {busy ? (
                      "Rendering..."
                    ) : (
                      <>
                        <Image className="h-4 w-4" /> Download PNG
                      </>
                    )}
                  </button>
                </div>

                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  <Check className="h-4 w-4 text-[var(--color-gold)]" />
                  <span>
                    Verification code:{" "}
                    <span className="font-mono text-[var(--color-gold)]">
                      {entry.code}
                    </span>
                  </span>
                </div>
              </div>
            ) : (
              <div
                className="h-full flex items-center justify-center rounded-2xl border border-dashed border-[var(--color-border)] p-12 text-center min-h-[400px]"
                style={{ background: "var(--color-card)" }}
              >
                <div>
                  <div
                    className="h-16 w-16 mx-auto rounded-full flex items-center justify-center"
                    style={{ background: "var(--color-surface-container)" }}
                  >
                    <QrCode
                      className="h-8 w-8"
                      style={{ color: "var(--color-muted-foreground)" }}
                    />
                  </div>
                  <p
                    className="mt-4"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    {status || "Fill the form and click Generate"}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
