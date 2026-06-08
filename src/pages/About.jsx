import PageHero from "../components/site/PageHero";
import SectionHeading from "../components/site/SectionHeading";
import { Eye, Target, Heart, Compass, Award, Users, GraduationCap, Globe2 } from "lucide-react";

const lessonImg = "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80";

export default function About() {
  const pillars = [
    { icon: Eye, title: "Vision", text: "To become Africa's foremost string conservatory, raising musicians who shape global concert stages and classrooms." },
    { icon: Target, title: "Mission", text: "To develop technically proficient, disciplined and globally competitive string musicians through quality education, mentorship and performance excellence." },
    { icon: Heart, title: "Core Values", text: "Excellence • Discipline • Integrity • Mentorship • Artistry • Community" },
    { icon: Compass, title: "Our History", text: "Founded with a commitment to conservatory-grade education, UBY'S has grown into a recognised home for serious string study." },
  ];
  const why = [
    { icon: Award, title: "Conservatory Standard", text: "Curriculum aligned with international examination boards." },
    { icon: Users, title: "Mentor-Led", text: "Personal guidance from accomplished string practitioners." },
    { icon: GraduationCap, title: "Pathway to Mastery", text: "From foundation to professional artist development." },
    { icon: Globe2, title: "International Exposure", text: "Partnerships and certifications recognised worldwide." },
  ];
  return (
    <>
      <PageHero eyebrow="About the Academy" title="A Home for Serious String Study" subtitle="UBY'S String Academy is a professional music institution committed to excellence, mentorship and artistic growth." />

      <section className="py-24">
        <div className="container-prose grid md:grid-cols-2 gap-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="p-8 border border-[var(--color-border)] rounded-lg" style={{ background: "var(--color-card)", animation: `fade-up 0.6s ease-out ${i * 0.1}s both` }}>
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full flex items-center justify-center" style={{ background: "var(--color-surface-container)", color: "var(--color-burgundy)" }}><Icon className="h-5 w-5" /></span>
                  <h3 className="font-display text-2xl" style={{ color: "var(--color-primary-heading)" }}>{p.title}</h3>
                </div>
                <p className="mt-4 leading-relaxed" style={{ color: "var(--color-muted-foreground)" }}>{p.text}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-24" style={{ background: "var(--color-surface-container-low)" }}>
        <div className="container-prose grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={lessonImg} alt="Student lesson" loading="lazy" width={1280} height={960} className="rounded-lg" style={{ boxShadow: "var(--shadow-elegant)" }} />
            <div className="absolute -bottom-6 -right-6 hidden md:block p-6 rounded-lg font-display text-xl max-w-[200px]" style={{ background: "var(--color-gold)", color: "var(--color-on-secondary)", boxShadow: "var(--shadow-gold)" }}>
              "Where discipline meets artistry."
            </div>
          </div>
          <div>
            <SectionHeading eyebrow="Why Choose UBY'S" title="Built for Musicians Who Mean It." center={false} />
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {why.map((w) => {
                const Icon = w.icon;
                return (
                  <div key={w.title} className="flex gap-3">
                    <Icon className="h-5 w-5 flex-shrink-0 mt-1" style={{ color: "var(--color-burgundy)" }} />
                    <div>
                      <h4 className="font-semibold" style={{ color: "var(--color-primary-heading)" }}>{w.title}</h4>
                      <p className="text-sm mt-1" style={{ color: "var(--color-muted-foreground)" }}>{w.text}</p>
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
