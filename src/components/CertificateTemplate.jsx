import { forwardRef } from "react";
import logo from "../assets/logo.jpeg";

function formatDate(date) {
  if (!date) return "Date";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  return parsed.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CertificateTemplate = forwardRef(function CertificateTemplate(
  { entry, qrRef, preview = false },
  ref,
) {
  const name = entry?.name || "";
  const code = entry?.code || "0000";
  const date = formatDate(entry?.date);

  return (
    <div
      ref={ref}
      className={`certificate-template relative w-full overflow-hidden bg-white text-[#172536] ${
        preview ? "rounded-lg border border-[var(--color-border)]" : ""
      }`}
      style={{
        aspectRatio: "1080 / 746",
        boxShadow: preview ? "var(--shadow-elegant)" : "none",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-radial-gradient(ellipse at 50% 50%, transparent 0 9px, rgba(10,22,40,0.28) 10px 11px, transparent 12px 22px)",
          backgroundSize: "28px 100%",
          backgroundPosition: "0 0",
        }}
      />
      <div aria-hidden className="absolute right-0 top-0 h-full w-[5%] bg-[#173048]" />

      <div className="absolute left-1/2 top-[13%] -translate-x-1/2 flex items-center gap-[1.1%]">
        <img
          src={logo}
          alt=""
          className="h-[clamp(26px,4vw,42px)] w-[clamp(26px,4vw,42px)] rounded-full object-cover"
        />
        <div className="leading-none">
          <div className="font-semibold text-[22px] tracking-normal">UBY'S</div>
          <div className="text-[8px] uppercase tracking-normal">String Academy</div>
        </div>
      </div>

      <div className="absolute right-[4.7%] top-[6%] h-[105px] w-[86px]">
        <div className="absolute left-[18px] top-[58px] h-[64px] w-[17px] -rotate-[17deg] bg-[#173048]" />
        <div className="absolute right-[13px] top-[58px] h-[64px] w-[17px] rotate-[17deg] bg-[#173048]" />
        <div className="absolute inset-x-0 top-0 mx-auto h-[74px] w-[74px] rounded-full border-[5px] border-[#c79b2e] bg-[#173048] shadow-sm">
          <div className="absolute inset-[6px] rounded-full border border-[#e4c25b]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-[#eac45b]">
            <span className="text-[8px] font-bold leading-none">BEST</span>
            <span className="text-[13px] font-bold leading-none">AWARD</span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-[6%] top-[25%] text-center">
        <h2
          className="text-[clamp(1.55rem,5vw,3.7rem)] leading-none tracking-normal"
          style={{ fontFamily: "'Old English Text MT', 'UnifrakturCook', Georgia, serif" }}
        >
          Certificate of Professional Training
        </h2>
      </div>

      <div className="absolute inset-x-[11.5%] top-[46.5%] text-center">
        <p className="text-[clamp(0.65rem,2.1vw,1.55rem)] font-semibold tracking-normal">
          This is to certify that
        </p>
        <div className="mt-[7%] border-b-2 border-[#1f2933]">
          <p className="min-h-[1.8em] px-3 text-[clamp(1rem,3vw,2.25rem)] font-semibold leading-tight tracking-normal">
            {name}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-[13.5%] top-[60.5%] text-center font-sans text-[clamp(0.48rem,1.45vw,1.08rem)] font-semibold leading-snug tracking-normal text-black">
        <p>
          has completed all graduation requirements at UBY's String Academy,
          demonstrating resilience, technical proficiency, musicianship, and
          competence in
        </p>
        <p className="mt-[2.7%]">
          The recipient has also fulfilled global training requirements through
          internationally recognized introductory music theory studies with
          OpenLearn, The Open University UK, and supplementary certification via
          Cursa International.
        </p>
      </div>

      <div className="absolute bottom-[4.8%] left-[13.5%] w-[18%] text-center font-sans text-black">
        <div className="mx-auto mb-1 font-serif text-[clamp(0.7rem,2vw,1.35rem)] italic leading-none">
          Isaac Ubong
        </div>
        <div className="border-t border-black pt-1 text-[clamp(0.55rem,1.35vw,1.05rem)] font-bold leading-tight tracking-normal">
          Ubong Isaac
          <br />
          Director
        </div>
      </div>

      <div className="absolute bottom-[4.2%] left-1/2 flex -translate-x-1/2 flex-col items-center text-center font-sans">
        <canvas ref={qrRef} className="h-[42px] w-[42px]" />
        <div className="mt-0.5 text-[clamp(0.42rem,1vw,0.72rem)] font-bold uppercase tracking-normal text-[#172536]">
          Verification code: {code}
        </div>
        <div className="text-[clamp(0.42rem,0.95vw,0.68rem)] font-bold italic tracking-normal text-[#172536]">
          visit our website to authenticate this certificate
        </div>
      </div>

      <div className="absolute bottom-[6.2%] right-[16%] w-[16%] text-center font-sans text-black">
        <div className="border-t border-black pt-1 text-[clamp(0.55rem,1.35vw,1.05rem)] font-bold tracking-normal">
          {date}
        </div>
      </div>
    </div>
  );
});

export default CertificateTemplate;
