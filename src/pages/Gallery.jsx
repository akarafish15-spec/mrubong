import PageHero from "../components/site/PageHero";

import g01 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.14 (1).jpeg";
import g02 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.14.jpeg";
import g03 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.15.jpeg";
import g04 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.17.jpeg";
import g05 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.18.jpeg";
import g06 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.19.jpeg";
import g07 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.20.jpeg";
import g08 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.21 (1).jpeg";
import g09 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.21.jpeg";
import g10 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.22 (1).jpeg";
import g11 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.22.jpeg";
import g12 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.23 (1).jpeg";
import g13 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.23 (2).jpeg";
import g14 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.23.jpeg";
import g15 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.24.jpeg";
import g16 from "../assets/gallery/WhatsApp Image 2026-06-12 at 15.18.25.jpeg";

const photos = [
  { src: g01, alt: "Students playing violins at Sunday Service" },
  { src: g02, alt: "Violinists performing at Choir Concert 2026 in blue uniforms" },
  { src: g03, alt: "Three students holding violins after a Sunday Service performance" },
  { src: g04, alt: "Young student focused on violin during Sunday Service" },
  { src: g05, alt: "Student in graduation cap performing violin at a church service" },
  { src: g06, alt: "Student practising violin during Sunday Service" },
  { src: g07, alt: "Full orchestra ensemble at Choir Concert 2026" },
  { src: g08, alt: "Academy members in red robes with instruments backstage" },
  { src: g09, alt: "Black and white shot of students practising violin" },
  { src: g10, alt: "Violinist performing with electric violin at an outdoor event" },
  { src: g11, alt: "Two students in blue uniforms playing violin at Choir Concert" },
  { src: g12, alt: "Black and white close-up of student playing violin" },
  { src: g13, alt: "Two students rehearsing violin side by side" },
  { src: g14, alt: "Close-up of hands on violin bows during rehearsal" },
  { src: g15, alt: "Close-up of cello being played at Choir Concert 2026" },
  { src: g16, alt: "Female student in purple beret playing violin at Sunday Service" },
];

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A Life in Music"
        subtitle="Glimpses of practice, performance and the community we share."
      />

      <section className="py-16 pb-24">
        <div className="container-prose">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {photos.map((photo, i) => (
              <div
                key={i}
                className="break-inside-avoid overflow-hidden rounded-xl border border-[var(--color-border)] group relative"
                style={{
                  background: "var(--color-card)",
                  boxShadow: "var(--shadow-elegant)",
                  animation: `fade-up 0.5s ease-out ${i * 0.05}s both`,
                }}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
