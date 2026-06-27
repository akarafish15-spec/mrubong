import { useState, useRef, useCallback, useEffect } from "react";
import html2canvas from "html2canvas";
import {
  Image,
  FileJson,
  QrCode,
  RefreshCw,
  Check,
  AlertTriangle,
} from "lucide-react";
import CertificateTemplate from "../components/CertificateTemplate";
import {
  hashToCode,
  makeVerifyUrl,
  drawQR,
  normalizeCertificateCode,
} from "../lib/cert-utils";

const PROGRAMMES = [
  "Foundation Music Theory",
  "Instrument Foundation - Violin",
  "Instrument Foundation - Viola",
  "Instrument Foundation - Cello",
  "Advanced Techniques - Violin",
  "Advanced Techniques - Viola",
  "Advanced Techniques - Cello",
  "Professional Training - Violin",
  "Professional Training - Viola",
  "Professional Training - Cello",
];

const LEVELS = ["Distinction", "Merit", "Pass"];

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
      setStatus("Generating...");
      setEntry(null);
      setError("");

      const code = await hashToCode(name.trim(), programme, date);
      setEntry({ code, name: name.trim(), programme, date, level });
      setStatus("ready");
    },
    [name, programme, date, level],
  );

  useEffect(() => {
    if (!entry || status !== "ready" || !qrRef.current) return;

    drawQR(qrRef.current, makeVerifyUrl(entry.code), { width: 300 }).catch(
      (err) => {
        console.error("QR draw failed:", err);
        setError("QR failed: " + err.message);
      },
    );
  }, [entry, status]);

  const prepareJSON = useCallback(() => {
    if (!entry) return;
    setBusy(true);
    setError("");

    fetch("/certificates.json")
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => [])
      .then((existing) => {
        const registry = existing.filter(
          (item) =>
            normalizeCertificateCode(item.code) !==
            normalizeCertificateCode(entry.code),
        );
        registry.push(entry);
        const blob = new Blob([JSON.stringify(registry, null, 2)], {
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

  return (
    <div
      className="min-h-screen py-16"
      style={{ background: "var(--color-background)" }}
    >
      <div className="container-prose max-w-6xl">
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
            Generate a certificate with a four-character verification code and
            QR link.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10">
          <form
            onSubmit={generate}
            className="space-y-5 p-8 rounded-lg border border-[var(--color-border)]"
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

            <div className="grid sm:grid-cols-2 gap-4">
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
              className="btn-hero btn-hero-hover w-full justify-center"
            >
              <RefreshCw className="h-4 w-4" /> Generate Certificate
            </button>
          </form>

          <div>
            {entry && status === "ready" ? (
              <div className="space-y-4">
                <CertificateTemplate
                  ref={previewRef}
                  entry={entry}
                  qrRef={qrRef}
                  preview
                />

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

                <div className="flex flex-col sm:flex-row gap-3">
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
                className="h-full flex items-center justify-center rounded-lg border border-dashed border-[var(--color-border)] p-12 text-center min-h-[400px]"
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
