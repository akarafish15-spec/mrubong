import { Link } from "react-router-dom";
import PageHero from "../components/site/PageHero";
import { ClipboardList, Search, Music, Award, GraduationCap, Trophy } from "lucide-react";

const steps = [
  { icon: ClipboardList, title: "Enrollment", text: "Submit your registration form and join the academy community." },
  { icon: Search, title: "Assessment", text: "A personalised assessment determines your starting programme." },
  { icon: Music, title: "Training", text: "Structured one-to-one and ensemble training with mentor oversight." },
  { icon: Award, title: "Performance Evaluation", text: "Termly performance reviews tracking technical and artistic growth." },
  { icon: GraduationCap, title: "Certification", text: "Earn programme and international certifications upon completion." },
  { icon: Trophy, title: "Graduation", text: "Recital and graduation as you transition to advanced study or career." },
];

export default function Journey() {
  return (
    <>
      <PageHero eyebrow="Student Journey" title="From First Note to Graduation Stage" subtitle="A clear, mentor-guided pathway designed to build lifelong musicians." />
      <section className="py-24">
        <div className="container-prose">
          <div className="relative">
            <div aria-hidden className="absolute left-9 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2" style={{ background: "linear-gradient(to bottom, var(--color-gold), var(--color-burgundy), var(--color-on-secondary))" }} />
            <ol className="space-y-12">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const left = i % 2 === 0;
                return (
                  <li key={s.title} className={`relative grid md:grid-cols-2 gap-8 items-center ${left ? "" : "md:[direction:rtl]"}`} style={{ animation: `fade-up 0.6s ease-out ${i * 0.1}s both` }}>
                    <div className="md:[direction:ltr] pl-24 md:pl-0 md:px-12">
                      <div className="eyebrow">Step {String(i + 1).padStart(2, "0")}</div>
                      <h3 className="font-display text-3xl md:text-4xl mt-2" style={{ color: "var(--color-primary-heading)" }}>{s.title}</h3>
                      <p className="mt-3" style={{ color: "var(--color-muted-foreground)" }}>{s.text}</p>
                    </div>
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 md:relative md:flex md:justify-center">
                      <div className="h-18 w-18 md:h-20 md:w-20 rounded-full text-[var(--color-gold)] flex items-center justify-center ring-4 relative z-10" style={{ background: "var(--color-navy-deep)", boxShadow: "var(--shadow-elegant)", ringColor: "var(--color-background)" }}>
                        <Icon className="h-7 w-7" />
                      </div>
                    </div>
                    <div className="hidden md:block md:[direction:ltr]" />
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="text-center mt-20">
            <Link to="/contact" className="btn-hero btn-hero-hover">Begin Your Journey</Link>
          </div>
        </div>
      </section>
    </>
  );
}
