import PageHero from "../components/site/PageHero";
import { Mail, Phone } from "lucide-react";
import directorImg from "../assets/director.jpeg";
import coordinatorImg from "../assets/oyin.jpg";
import toluImg from "../assets/tolu.jpg";
import tofunmiImg from "../assets/tofunmi.jpg";
import euniceImg from "../assets/eunice.jpg";
import bethelImg from "../assets/bethel.jpg";

const team = [
  {
    role: "Director",
    name: "Mr. Ubong Isaac",
    bio: "Visionary director and lead pedagogue guiding the academy's curriculum, ethos and artistic standards. With over a decade of experience, he shapes every student's musical journey.",
    featured: true,
    img: directorImg,
  },
  {
    role: "Coordinator",
    name: "Miss Ogunjobi Oyindamola",
    bio: "Oversees day-to-day operations and ensures every programme runs seamlessly.",
    featured: true,
    img: coordinatorImg,
  },
  {
    role: "Assistant Coordinator",
    name: "Miss Oluwafemi Eunice",
    bio: "Supports programme coordination and student engagement across all levels.",
    featured: true,
    img: euniceImg,
  },
  {
    role: "General Secretary / Administrator / Librarian",
    name: "Miss Asokeji Bethel",
    bio: "Manages academy records, library resources and administrative excellence.",
    featured: true,
    img: bethelImg,
  },
  {
    role: "Financial Secretary",
    name: "Miss Arowosegbe Jesutofunmi",
    bio: "Handles academy finances with precision and transparency.",
    featured: true,
    img: tofunmiImg,
  },
  {
    role: "Media Head",
    name: "Miss Babalola Tolulope",
    bio: "Captures and shares the academy's story through compelling visual media.",
    featured: true,
    img: toluImg,
  },
];

export default function Team() {
  const director = team[0];
  const members = team.slice(1);

  return (
    <>
      <PageHero
        eyebrow="Our Team"
        title="The People Behind the Music"
        subtitle="A dedicated team of educators, administrators and creatives committed to your musical journey."
      />

      {/* Director Featured */}
      <section className="pt-24 pb-12">
        <div className="container-prose">
          <article
            className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] grid lg:grid-cols-5"
            style={{
              background: "var(--color-card)",
              boxShadow: "var(--shadow-elegant)",
              animation: "fade-up 0.6s ease-out both",
            }}
          >
            <div className="lg:col-span-2 relative overflow-hidden aspect-[3/4] lg:aspect-auto">
              <img
                src={director.img}
                alt={director.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] via-transparent to-transparent lg:bg-gradient-to-r" />
            </div>
            <div className="lg:col-span-3 p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-xs uppercase tracking-[0.2em] mb-4">
                {director.role}
              </div>
              <h2
                className="font-display text-3xl md:text-4xl lg:text-5xl"
                style={{ color: "var(--color-primary-heading)" }}
              >
                {director.name}
              </h2>
              <p
                className="mt-4 text-lg leading-relaxed"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                {director.bio}
              </p>
              <div className="mt-6 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-gold)] transition-colors cursor-pointer">
                  <Mail className="h-4 w-4 text-[var(--color-gold)]" />
                </div>
                <div className="h-10 w-10 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-gold)] transition-colors cursor-pointer">
                  <Phone className="h-4 w-4 text-[var(--color-gold)]" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12 pb-24">
        <div className="container-prose">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((m, i) => (
              <article
                key={m.name}
                className="group relative rounded-2xl border border-[var(--color-border)] overflow-hidden hover:border-[var(--color-gold)]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  background: "var(--color-card)",
                  boxShadow: "var(--shadow-elegant)",
                  animation: `fade-up 0.5s ease-out ${(i + 1) * 0.07}s both`,
                }}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={m.img}
                    alt={m.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-card)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 left-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-[0.6rem] uppercase tracking-[0.2em] font-semibold backdrop-blur-md"
                      style={{
                        background: "var(--color-card)/80",
                        color: "var(--color-burgundy)",
                      }}
                    >
                      {m.role}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3
                    className="font-display text-xl mt-1"
                    style={{ color: "var(--color-primary-heading)" }}
                  >
                    {m.name}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed flex-1"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    {m.bio}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[var(--color-border)] flex gap-3">
                    <div className="h-8 w-8 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-all cursor-pointer">
                      <Mail className="h-3.5 w-3.5 text-[var(--color-gold)]" />
                    </div>
                    <div className="h-8 w-8 rounded-full border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-gold)] hover:bg-[var(--color-gold)]/10 transition-all cursor-pointer">
                      <Phone className="h-3.5 w-3.5 text-[var(--color-gold)]" />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
