import PageHero from "../components/site/PageHero";
import { Image } from "lucide-react";

export default function Gallery() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A Life in Music"
        subtitle="Glimpses of practice, performance and the community we share."
      />
      <section className="py-32">
        <div className="container-prose text-center">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-full mb-6 animate-spin" style={{ background: "var(--color-card)", border: "3px solid var(--color-border)", borderTopColor: "var(--color-gold)" }} />
          <h2 className="font-display text-2xl md:text-3xl" style={{ color: "var(--color-primary-heading)" }}>
            No Images Yet
          </h2>
          <p className="mt-3 text-lg" style={{ color: "var(--color-muted-foreground)" }}>
            Gallery photos coming soon — check back for moments from our studio and stage.
          </p>
          <div className="mt-6 inline-flex items-center gap-2" style={{ color: "var(--color-muted-foreground)" }}>
            <Image className="h-5 w-5 text-[var(--color-gold)]" />
            <span className="text-sm">Stay tuned</span>
          </div>
        </div>
      </section>
    </>
  );
}
