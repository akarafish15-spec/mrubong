import { Link } from "react-router-dom";
import PageHero from "../components/site/PageHero";
import {
  ClipboardList,
  BookOpen,
  Music,
  ListChecks,
  GraduationCap,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: ClipboardList,
    title: "Registration",
    text: "Students complete enrollment, pay the registration fee, and receive guidance on class options and instrument readiness.",
  },
  {
    icon: BookOpen,
    title: "Grade 1: Foundation Music Theory",
    text: "A one to three month foundation in notation, rhythm, timing, ear training, and music reading skills.",
  },
  {
    icon: Music,
    title: "Grade 2: Instrument Foundation",
    text: "From the second month, students learn instrument selection, maintenance, letter names, finger placement, scales, posture, and basic performance technique.",
  },
  {
    icon: ListChecks,
    title: "Grade 3: Advanced Techniques",
    text: "Students progress into vibrato, tremolo, slurs, position playing, advanced bowing, and intermediate to advanced repertoire.",
  },
  {
    icon: GraduationCap,
    title: "Assessment Stages",
    text: "Certification requires academy theory examination, ten structured recital assessments, and a final theory and practical performance examination.",
  },
  {
    icon: Trophy,
    title: "Certification",
    text: "Successful candidates receive a professional training certificate with a four-character online verification code.",
  },
];

export default function Journey() {
  return (
    <>
      <PageHero
        eyebrow="Student Journey"
        title="From First Note to Professional Training"
        subtitle="A clear, progressive pathway moves students from theory foundations through recital assessment and final certification."
      />
      <section className="py-24">
        <div className="container-prose">
          <div className="relative">
            <div
              aria-hidden
              className="absolute left-9 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, var(--color-gold), var(--color-burgundy), var(--color-on-secondary))",
              }}
            />
            <ol className="space-y-12">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const left = index % 2 === 0;
                return (
                  <li
                    key={step.title}
                    className={`relative grid md:grid-cols-2 gap-8 items-center ${
                      left ? "" : "md:[direction:rtl]"
                    }`}
                    style={{
                      animation: `fade-up 0.6s ease-out ${index * 0.1}s both`,
                    }}
                  >
                    <div className="md:[direction:ltr] pl-24 md:pl-0 md:px-12">
                      <div className="eyebrow">
                        Step {String(index + 1).padStart(2, "0")}
                      </div>
                      <h3
                        className="font-display text-3xl md:text-4xl mt-2"
                        style={{ color: "var(--color-primary-heading)" }}
                      >
                        {step.title}
                      </h3>
                      <p
                        className="mt-3"
                        style={{ color: "var(--color-muted-foreground)" }}
                      >
                        {step.text}
                      </p>
                    </div>
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 md:relative md:flex md:justify-center">
                      <div
                        className="h-18 w-18 md:h-20 md:w-20 rounded-full text-[var(--color-gold)] flex items-center justify-center ring-4 relative z-10"
                        style={{
                          background: "var(--color-navy-deep)",
                          boxShadow: "var(--shadow-elegant)",
                          ringColor: "var(--color-background)",
                        }}
                      >
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
            <Link to="/contact" className="btn-hero btn-hero-hover">
              Begin Your Journey
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
