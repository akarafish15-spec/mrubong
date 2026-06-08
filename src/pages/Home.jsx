import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import SectionHeading from "../components/site/SectionHeading";
import { SITE } from "../lib/site";

import herobg from "../assets/herobg.jpg";
import violinImg from "../assets/violin-detail.jpg";
import celloImg from "../assets/cello.jpg";
import lessonImg from "../assets/student-lesson.jpg";

const values = [
  {
    title: "Discipline",
    text: "We cultivate consistent, focused practice that defines lifelong artistry.",
  },
  {
    title: "Excellence",
    text: "We pursue uncompromising technical and musical standards.",
  },
  {
    title: "Mentorship",
    text: "Every student is shaped by personal guidance from accomplished tutors.",
  },
  {
    title: "Global Vision",
    text: "We prepare musicians to compete and contribute on the world stage.",
  },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <img
          src={herobg}
          alt="String orchestra in rehearsal"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1280}
        />
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div aria-hidden className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_bottom_right,rgba(246,190,57,0.6),transparent_55%)]" />

        <div className="container-prose relative z-10 py-20 grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-8 text-ivory"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-gold)]/40 bg-ivory/5 backdrop-blur-sm text-[var(--color-gold)] text-xs uppercase tracking-[0.25em]">
              <Sparkles className="h-3.5 w-3.5" /> A Premier Conservatory of
              Strings
            </div>
            <h1 className="font-display text-5xl md:text-7xl lg:text-[5.25rem] leading-[1.02] mt-6 text-balance">
              Raising{" "}
              <em className="text-[var(--color-gold)] not-italic font-medium">
                Globally
              </em>
              <br />
              Competitive{" "}
              <span className="italic font-light">String Musicians</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg text-ivory/80 leading-relaxed">
              Professional training in Violin, Viola and Cello through
              world-class instruction, mentorship and performance excellence.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={SITE.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="btn-hero btn-hero-hover"
              >
                Enroll Now <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/contact"
                className="btn-outline-light hover:bg-white/10"
              >
                Book Assessment
              </Link>
            </div>

            <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg">
              {[
                { v: "3", l: "Instruments" },
                { v: "7+", l: "Courses" },
                { v: "100%", l: "Mentor-led" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl md:text-4xl text-[var(--color-gold)]">
                    {s.v}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-ivory/60 mt-1">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/50 text-xs uppercase tracking-[0.3em] animate-float-slow">
          scroll
        </div>
      </section>

      {/* INSTRUMENTS */}
      <section
        className="py-24"
        style={{ background: "var(--color-background)" }}
      >
        <div className="container-prose">
          <SectionHeading
            eyebrow="Our Instruments"
            title="Three Voices. One Tradition."
            subtitle="Each student is matched with the instrument that resonates with their potential."
          />
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Violin",
                img: violinImg,
                text: "The voice of clarity and brilliance — the foundation of orchestral mastery.",
              },
              {
                name: "Viola",
                img: lessonImg,
                text: "Rich, warm and central — the soul of the string ensemble.",
              },
              {
                name: "Cello",
                img: celloImg,
                text: "Depth and resonance — the singing baritone of the strings.",
              },
            ].map((i, idx) => (
              <motion.div
                key={i.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative overflow-hidden rounded-lg border border-[var(--color-border)] shadow-[var(--shadow-elegant)]"
                style={{ background: "var(--color-card)" }}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={i.img}
                    alt={i.name}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-[#0a1628]/30 to-transparent" />
                <div
                  className="absolute bottom-0 left-0 right-0 p-7"
                  style={{ color: "#faf8f5" }}
                >
                  <div
                    className="eyebrow"
                    style={{ color: "var(--color-gold)" }}
                  >
                    String Family
                  </div>
                  <h3 className="font-display text-3xl mt-2">{i.name}</h3>
                  <p className="mt-2 text-sm text-ivory/75">{i.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section
        className="py-24 text-ivory relative overflow-hidden"
        style={{ background: "var(--color-navy-deep)" }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(45deg,transparent_48%,var(--color-gold)_49%,var(--color-gold)_51%,transparent_52%)] bg-[length:40px_40px]"
        />
        <div className="container-prose relative">
          <div className="text-center max-w-2xl mx-auto">
            <div className="eyebrow" style={{ color: "var(--color-gold)" }}>
              Our Pillars
            </div>
            <h2 className="font-display text-3xl md:text-5xl mt-3">
              The Conservatory Standard
            </h2>
            <div className="divider-ornament mt-6">♪</div>
          </div>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-ivory/10 bg-ivory/[0.03] rounded-lg p-7 hover:border-[var(--color-gold)]/40 transition-colors"
              >
                <div className="font-display text-2xl text-[var(--color-gold)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl mt-3">{v.title}</h3>
                <p className="mt-2 text-sm text-ivory/70 leading-relaxed">
                  {v.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24"
        style={{ background: "var(--color-background)" }}
      >
        <div className="container-prose">
          <div
            className="relative overflow-hidden rounded-2xl text-ivory p-12 md:p-20"
            style={{
              background: "var(--color-navy-deep)",
              boxShadow: "var(--shadow-elegant)",
            }}
          >
            <div
              aria-hidden
              className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-gold)]/20 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
              style={{ background: "var(--color-burgundy)" }}
            />
            <div className="relative max-w-2xl">
              <div className="eyebrow" style={{ color: "var(--color-gold)" }}>
                Begin Your Journey
              </div>
              <h2 className="font-display text-4xl md:text-5xl mt-4 text-balance">
                Your seat at the conservatory awaits.
              </h2>
              <p className="mt-5 text-ivory/75 text-lg">
                Book a free assessment and discover the instrument, programme
                and mentor that will shape your musical future.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" className="btn-hero btn-hero-hover">
                  Book Assessment <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/journey"
                  className="btn-outline-light hover:bg-white/10"
                >
                  View Our Journey
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
