import { Link } from "react-router-dom";
import PageHero from "../components/site/PageHero";
import SectionHeading from "../components/site/SectionHeading";
import { ArrowRight, Eye, History, Music2, Users } from "lucide-react";
import lessonImg from "../assets/student-lesson.jpg";

const history = [
  "UBY's String Academy traces its origin to February 2022 at Joseph Ayo Babalola University, Ikeji-Arakeji, Osun State, Nigeria. The Academy began when its Director, Isaac Ubong Iniobong, enrolled in his Master's degree programme at the university.",
  "During this period, he regularly played the violin during Sunday chapel services. His performances attracted considerable interest within the university community, and several students and staff members approached him to request violin lessons.",
  "Among the pioneering teenage members of the Academy were Oreoluwa Olutimehin, Tabitha Ogundimu, and Feranmi Ajala. Early university student members included Ore Babalola, Divine Adeola, Mercy Akafo, Afolabi Hope, Bolanle Adeleke, and Gbemisola Tabitha, among others.",
  "Notable contributors and motivators who supported the growth and development of the Academy include John Babalola, Agurisa Francis, and David Felagha. Through their encouragement and contributions, the Academy continued to expand and strengthen its impact.",
];

const pillars = [
  {
    icon: Eye,
    title: "Vision",
    text: "To become Nigeria's foremost string conservatory, raising highly skilled musicians through quality music education, performance, discipline, and excellence.",
  },
  {
    icon: History,
    title: "Origin",
    text: "The Academy grew from violin performances at Joseph Ayo Babalola University in 2022.",
  },
  {
    icon: Music2,
    title: "Focus",
    text: "UBY's trains students in theory, performance, musicianship, discipline, and professional string technique.",
  },
  {
    icon: Users,
    title: "Community",
    text: "The Academy has grown through students, staff, contributors, and motivators committed to musical excellence.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About the Academy"
        title="UBY's String Academy"
        subtitle="A growing centre of excellence producing competent musicians and fostering a culture of musical discipline and creativity."
      />

      <section className="py-24">
        <div className="container-prose grid md:grid-cols-2 gap-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="p-8 border border-[var(--color-border)] rounded-lg"
                style={{
                  background: "var(--color-card)",
                  animation: `fade-up 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-10 w-10 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--color-surface-container)",
                      color: "var(--color-burgundy)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3
                    className="font-display text-2xl"
                    style={{ color: "var(--color-primary-heading)" }}
                  >
                    {pillar.title}
                  </h3>
                </div>
                <p
                  className="mt-4 leading-relaxed"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {pillar.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section
        className="py-24"
        style={{ background: "var(--color-surface-container-low)" }}
      >
        <div className="container-prose grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative">
            <img
              src={lessonImg}
              alt="String academy student lesson"
              loading="lazy"
              width={1280}
              height={960}
              className="rounded-lg"
              style={{ boxShadow: "var(--shadow-elegant)" }}
            />
            <div
              className="absolute -bottom-6 -right-6 hidden md:block p-6 rounded-lg font-display text-xl max-w-[220px]"
              style={{
                background: "var(--color-gold)",
                color: "var(--color-on-secondary)",
                boxShadow: "var(--shadow-gold)",
              }}
            >
              "Where discipline meets artistry."
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="History"
              title="From Chapel Performances to Academy Training."
              center={false}
            />
            <div className="mt-7 space-y-4">
              {history.map((paragraph) => (
                <p
                  key={paragraph}
                  className="leading-relaxed"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <Link to="/academic-structure" className="btn-hero btn-hero-hover mt-8">
              View Academic Structure <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
