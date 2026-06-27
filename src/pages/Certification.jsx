import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Award,
  ShieldCheck,
  FileCheck,
  Search,
  CheckCircle,
  XCircle,
  QrCode,
} from "lucide-react";
import PageHero from "../components/site/PageHero";
import CertificateTemplate from "../components/CertificateTemplate";
import {
  drawQR,
  makeVerifyUrl,
  normalizeCertificateCode,
} from "../lib/cert-utils";

const sampleCertificate = {
  code: "A3F8",
  name: "Student Name",
  programme: "Professional Training",
  date: "2026-06-27",
  level: "Distinction",
};

export default function Certification() {
  const [searchParams] = useSearchParams();
  const codeParam = searchParams.get("v");
  const [code, setCode] = useState(codeParam || "");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registry, setRegistry] = useState([]);
  const sampleQrRef = useRef(null);

  useEffect(() => {
    fetch("/certificates.json")
      .then((r) => r.json())
      .then(setRegistry)
      .catch(() => setRegistry([]));
  }, []);

  useEffect(() => {
    if (!sampleQrRef.current) return;
    drawQR(sampleQrRef.current, makeVerifyUrl(sampleCertificate.code), {
      width: 220,
    }).catch(() => {});
  }, []);

  const lookup = useCallback(
    (value) => {
      const normalized = normalizeCertificateCode(value);
      if (!normalized) return;

      setLoading(true);
      const found = registry.find(
        (entry) => normalizeCertificateCode(entry.code) === normalized,
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
        title="Professionally Trained. Verifiably Certified."
        subtitle="Every UBY'S graduate receives a professional training certificate with a four-character verification code."
      />

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
              Enter the four-character verification code printed on the
              certificate, or scan its QR code.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3 max-w-lg mx-auto">
            <input
              type="text"
              value={code}
              onChange={(e) =>
                setCode(normalizeCertificateCode(e.target.value))
              }
              placeholder="e.g. A3F8"
              className="flex-1 px-5 py-4 rounded-lg font-mono text-lg uppercase tracking-wider placeholder:font-sans placeholder:tracking-normal placeholder:text-sm focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
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

          {result && (
            <div
              className="mt-10 rounded-lg border p-8 md:p-10 animate-fade-up"
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
                    This is an authentic UBY'S String Academy certificate.
                  </p>
                  <div className="mt-8 grid sm:grid-cols-2 gap-4 text-left">
                    {[
                      { label: "Student Name", value: result.name },
                      { label: "Programme", value: result.programme },
                      { label: "Date Issued", value: result.date },
                      { label: "Level", value: result.level },
                    ].map((field) => (
                      <div
                        key={field.label}
                        className="p-4 rounded-lg"
                        style={{ background: "var(--color-surface-container)" }}
                      >
                        <div
                          className="text-xs uppercase tracking-[0.15em]"
                          style={{ color: "var(--color-muted-foreground)" }}
                        >
                          {field.label}
                        </div>
                        <div
                          className="font-semibold mt-1"
                          style={{ color: "var(--color-primary-heading)" }}
                        >
                          {field.value}
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
                      {normalizeCertificateCode(result.code)}
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

      <section
        className="py-16"
        style={{ background: "var(--color-surface-container-low)" }}
      >
        <div className="container-prose grid lg:grid-cols-2 gap-16 items-center">
          <CertificateTemplate
            entry={sampleCertificate}
            qrRef={sampleQrRef}
            preview
          />

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
              UBY'S String Academy certifies that each graduating student has
              met its standards in technique, musicianship, theory, recital
              performance, and professional development.
            </p>
            <div className="mt-8 space-y-4">
              {[
                {
                  icon: ShieldCheck,
                  title: "Four-Character Verification",
                  text: "Each certificate carries a short code and QR link for online authentication.",
                },
                {
                  icon: Award,
                  title: "Global Training Requirement",
                  text: "Graduates complete introductory music theory studies through OpenLearn and Cursa.",
                },
                {
                  icon: FileCheck,
                  title: "Recital-Based Assessment",
                  text: "Certification reflects theory work, structured recitals, and final practical assessment.",
                },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-4">
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
                        {item.title}
                      </h3>
                      <p
                        className="text-sm"
                        style={{ color: "var(--color-muted-foreground)" }}
                      >
                        {item.text}
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
