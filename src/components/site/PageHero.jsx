export default function PageHero({ eyebrow, title, subtitle, children }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--color-page-hero-bg)",
        color: "var(--color-page-hero-text)",
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_top,rgba(246,190,57,0.3),transparent_60%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] bg-[linear-gradient(45deg,transparent_48%,white_49%,white_51%,transparent_52%)] bg-[length:24px_24px]"
      />
      <div className="container-prose relative py-24 md:py-32 text-center">
        {eyebrow && (
          <div className="eyebrow text-[var(--gold)] animate-fade-up">{eyebrow}</div>
        )}
        <h1
          className="font-display text-4xl md:text-6xl mt-4 text-balance animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-5 max-w-2xl mx-auto leading-relaxed animate-fade-up"
            style={{ animationDelay: "0.2s", opacity: 0.75 }}
          >
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-8 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
