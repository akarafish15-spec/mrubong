import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Globe } from "lucide-react";
import { SITE, NAV } from "../lib/site";
import logo from "../assets/logo.jpeg";

export default function Footer() {
  return (
    <footer className="mt-24" style={{ background: "var(--color-footer-bg)", color: "var(--color-footer-text)" }}>
      <div className="container-prose py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden bg-[var(--gold)]">
              <img src={logo} alt="UBY'S String Academy" className="h-full w-full object-cover" />
            </span>
            <div className="font-display">
              <div className="text-lg font-semibold">UBY&apos;S</div>
              <div className="text-[0.6rem] uppercase tracking-[0.25em] text-[var(--gold)]">String Academy</div>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--color-footer-text-muted)" }}>
            A professional music institution shaping the next generation of disciplined, world-class string musicians.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-[var(--gold)] mb-4">Explore</h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--color-footer-text-muted)" }}>
            {NAV.slice(0, 6).map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-[var(--gold)] transition-colors">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-[var(--gold)] mb-4">More</h4>
          <ul className="space-y-2 text-sm" style={{ color: "var(--color-footer-text-muted)" }}>
            {NAV.slice(6).map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-[var(--gold)] transition-colors">{n.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-[0.2em] text-[var(--gold)] mb-4">Contact</h4>
          <ul className="space-y-3 text-sm" style={{ color: "var(--color-footer-text-muted)" }}>
            <li className="flex items-start gap-2"><Mail className="h-4 w-4 mt-0.5 text-[var(--gold)] shrink-0" /> {SITE.email}</li>
            <li className="flex items-start gap-2"><Phone className="h-4 w-4 mt-0.5 text-[var(--gold)] shrink-0" /> {SITE.phone}</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-[var(--gold)] shrink-0" /> {SITE.address}</li>
          </ul>
          <div className="flex gap-3 mt-5">
            {Object.entries(SITE.social).map(([name, href]) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-[var(--gold)] hover:text-[var(--color-on-secondary)] hover:border-[var(--gold)] transition-all"
                style={{ borderColor: "var(--color-footer-social-border)" }}
              >
                <Globe className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid var(--color-footer-divider)" }}>
        <div className="container-prose py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs" style={{ color: "var(--color-footer-text-subtle)" }}>
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p className="font-display italic text-[var(--gold)]/80">&quot;Discipline. Excellence. Artistry.&quot;</p>
        </div>
      </div>
    </footer>
  );
}
