import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "../lib/site";
import logo from "../assets/logo.jpeg";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border/60">
      <div className="container-prose flex items-center justify-between py-4">
        <Link
          to="/"
          className="flex items-center gap-2 group"
          onClick={() => setOpen(false)}
        >
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full overflow-hidden bg-[var(--gold)]"
            style={{ boxShadow: "var(--shadow-elegant)" }}
          >
            <img
              src={logo}
              alt="UBY'S String Academy"
              className="h-full w-full object-cover"
            />
          </span>
          <span className="font-display text-lg leading-tight">
            <span className="block font-semibold tracking-wide text-primary">
              UBY&apos;S
            </span>
            <span className="block text-[0.65rem] uppercase tracking-[0.25em] text-burgundy">
              String Academy
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                `text-foreground/70 hover:text-primary transition-colors relative ${
                  isActive ? "text-primary after:scale-x-100" : ""
                } after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-px after:bg-[var(--gold)] after:scale-x-0 after:transition-transform`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <a
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="btn-hero btn-hero-hover text-sm"
          >
            Enroll Now
          </a>
        </div>

        <button
          onClick={() => setOpen((s) => !s)}
          className="lg:hidden p-2 text-primary"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container-prose flex flex-col py-4 gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2.5 text-foreground/80 hover:text-primary ${isActive ? "text-primary font-medium" : ""}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-hero btn-hero-hover mt-3 text-sm"
            >
              Enroll Now
            </Link>
            <span className="sr-only">{SITE.name}</span>
          </nav>
        </div>
      )}
    </header>
  );
}
