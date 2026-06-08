import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import PageHero from "../components/site/PageHero";
import {
  Award,
  ShieldCheck,
  FileCheck,
  Search,
  CheckCircle,
  XCircle,
  QrCode,
} from "lucide-react";

export default function Certification() {
  const [searchParams] = useSearchParams();
  const codeParam = searchParams.get("v");
  const [code, setCode] = useState(codeParam || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registry, setRegistry] = useState([]);

  useEffect(() => {
    fetch("/certificates.json")
      .then((r) => r.json())
      .then(setRegistry)
      .catch(() => setRegistry([]));
  }, []);

  const lookup = useCallback(
    (c) => {
      if (!c.trim()) return;
      setLoading(true);
      const found = registry.find(
        (e) => e.code.toUpperCase() === c.trim().toUpperCase(),
      );
      setTimeout(() => {
        setResult(
          found ? { status: "verified", ...found } : { status: "not-found" },
        );
        setLoading(false);
      }, 400);
    },
    [registry],
  );

  useEffect(() => {
    if (codeParam && registry.length > 0) lookup(codeParam);
  }, [codeParam, registry, lookup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    lookup(code);
  };

  return (
    <>
      <PageHero
        eyebrow="Certification"
        title="Professionally Trained. Internationally Recognised."
        subtitle="Every UBY'S graduate receives a verifiable certification reflecting their technical, theoretical and performance achievements."
      />

      {/* Verification Section */}
      <section className="py-16">
        <div className="container-prose max-w-3xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs uppercase tracking-[0.2em] mb-4">
              <QrCode className="h-3.5 w-3.5" /> Certificate Verification
            </div>
            <h2
              className="font-display text-3xl md:text-4xl"
              style={{ color: "var(--color-primary-heading)" }}
            >
              Verify a Certificate
            </h2>
            <p
              className="mt-3"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              Enter the verification code found on the certificate or scan the
              QR code.
            </p>
          </div>

          {/* Lookup Form */}
          <form onSubmit={handleSubmit} className="flex gap-3 max-w-lg mx-auto">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. UBY-A3F8-B2C1"
              className="flex-1 px-5 py-4 rounded-lg font-mono text-lg tracking-wider placeholder:font-sans placeholder:tracking-normal placeholder:text-sm focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
              style={{
                background: "var(--color-background)",
                border: "1px solid var(--color-border)",
                color: "var(--color-foreground)",
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-hero btn-hero-hover px-6"
            >
              {loading ? (
                "..."
              ) : (
                <>
                  <Search className="h-4 w-4" /> Verify
                </>
              )}
            </button>
          </form>

          {/* Result */}
          {result && (
            <div
              className="mt-10 rounded-2xl border p-8 md:p-10 animate-fade-up"
              style={{
                background: "var(--color-card)",
                borderColor:
                  result.status === "verified"
                    ? "var(--color-gold)"
                    : "var(--color-border)",
                boxShadow:
                  result.status === "verified"
                    ? "var(--shadow-gold)"
                    : "var(--shadow-elegant)",
              }}
            >
              {result.status === "verified" ? (
                <div className="text-center">
                  <div className="h-16 w-16 mx-auto rounded-full flex items-center justify-center bg-[var(--color-gold)]/10">
                    <CheckCircle className="h-9 w-9 text-[var(--color-gold)]" />
                  </div>
                  <h3
                    className="font-display text-2xl mt-4"
                    style={{ color: "var(--color-primary-heading)" }}
                  >
                    Certificate Verified
                  </h3>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    This is an authentic UBY&apos;S String Academy certificate.
                  </p>
                  <div className="mt-8 grid sm:grid-cols-2 gap-4 text-left">
                    {[
                      { label: "Student Name", value: result.name },
                      { label: "Programme", value: result.programme },
                      { label: "Date Issued", value: result.date },
                      { label: "Level", value: result.level },
                    ].map((f) => (
                      <div
                        key={f.label}
                        className="p-4 rounded-lg"
                        style={{ background: "var(--color-surface-container)" }}
                      >
                        <div
                          className="text-xs uppercase tracking-[0.15em]"
                          style={{ color: "var(--color-muted-foreground)" }}
                        >
                          {f.label}
                        </div>
                        <div
                          className="font-semibold mt-1"
                          style={{ color: "var(--color-primary-heading)" }}
                        >
                          {f.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-gold)]/30"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    <ShieldCheck className="h-4 w-4 text-[var(--color-gold)]" />
                    <span className="text-sm font-mono text-[var(--color-gold)]">
                      {result.code}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div
                    className="h-16 w-16 mx-auto rounded-full flex items-center justify-center"
                    style={{ background: "var(--color-surface-container)" }}
                  >
                    <XCircle
                      className="h-9 w-9"
                      style={{ color: "var(--color-burgundy)" }}
                    />
                  </div>
                  <h3
                    className="font-display text-2xl mt-4"
                    style={{ color: "var(--color-primary-heading)" }}
                  >
                    Not Found
                  </h3>
                  <p
                    className="mt-1"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    No certificate matches this code. Check the code and try
                    again, or contact the academy.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Certificate Preview */}
      <section
        className="py-16"
        style={{ background: "var(--color-surface-container-low)" }}
      >
        <div className="container-prose grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div
              className="aspect-[4/3] rounded-lg border-4 border-[var(--color-gold)] p-10 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-ivory), var(--color-surface-container))",
                boxShadow: "var(--shadow-elegant)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-4 border border-[var(--color-gold)]/40 rounded"
              />
              <div className="relative text-center h-full flex flex-col">
                <div
                  className="eyebrow"
                  style={{ color: "var(--color-burgundy)" }}
                >
                  Certificate of Completion
                </div>
                <div
                  className="font-display text-2xl md:text-3xl mt-3"
                  style={{ color: "var(--color-on-secondary)" }}
                >
                  UBY&apos;S String Academy
                </div>
                <div className="divider-ornament mt-2">♪</div>
                <p
                  className="mt-6 text-xs uppercase tracking-[0.2em]"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  This is to certify
                </p>
                <p
                  className="mt-2 font-display text-3xl italic"
                  style={{ color: "var(--color-burgundy)" }}
                >
                  Student Name
                </p>
                <p
                  className="mt-4 text-sm"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  has successfully completed the requirements of the
                </p>
                <p
                  className="mt-1 font-display text-xl"
                  style={{ color: "var(--color-on-secondary)" }}
                >
                  Advanced Violin Programme
                </p>
                <div className="flex-1" />
                <div
                  className="flex justify-between items-end text-xs mt-6"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  <div>
                    <div className="border-t border-foreground/30 pt-2 px-6">
                      Director
                    </div>
                  </div>
                  <div className="text-center">
                    <QrCode className="h-8 w-8 mx-auto text-[var(--color-on-secondary)]" />
                    <div className="font-mono text-[0.55rem] mt-1">
                      UBY-XXXX-XXXX
                    </div>
                  </div>
                  <div>
                    <div className="border-t border-foreground/30 pt-2 px-6">
                      Date
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2
              className="font-display text-3xl md:text-4xl"
              style={{ color: "var(--color-primary-heading)" }}
            >
              Professional Training Statement
            </h2>
            <p
              className="mt-5 leading-relaxed"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              UBY&apos;S String Academy certifies that each graduating student
              has met our conservatory-level standards in technique,
              musicianship, theory and performance. Our certification reflects
              not only completion but readiness — for further study,
              professional performance or pedagogy.
            </p>
            <div className="mt-8 space-y-4">
              {[
                {
                  icon: ShieldCheck,
                  t: "Verified Achievement",
                  d: "Each certificate has a unique code and QR link for instant online verification.",
                },
                {
                  icon: Award,
                  t: "International Pathways",
                  d: "Aligned with international examination and certification bodies.",
                },
                {
                  icon: FileCheck,
                  t: "Professional Recognition",
                  d: "Recognised by partner institutions and performance organisations.",
                },
              ].map((x) => {
                const Icon = x.icon;
                return (
                  <div key={x.t} className="flex gap-4">
                    <span
                      className="h-10 w-10 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: "var(--color-surface-container)",
                        color: "var(--color-burgundy)",
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3
                        className="font-semibold"
                        style={{ color: "var(--color-primary-heading)" }}
                      >
                        {x.t}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-muted-foreground)" }}
                      >
                        {x.d}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
