export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}) {
  return (
    <div className={center ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2 className="font-display text-3xl md:text-5xl mt-3 text-balance text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground leading-relaxed">{subtitle}</p>
      )}
      {center && <div className="divider-ornament mt-6">♪</div>}
    </div>
  );
}
