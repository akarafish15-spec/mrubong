import { useState } from "react";
import PageHero from "../components/site/PageHero";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";
import { SITE } from "../lib/site";

const faqs = [
  {
    q: "What ages do you accept?",
    a: "We accept students from age 6 through adulthood — beginners and advanced players alike.",
  },
  {
    q: "Do I need to own an instrument before enrolling?",
    a: "No. We can guide you on appropriate instrument selection and rental options after assessment.",
  },
  {
    q: "How often are lessons?",
    a: "Programmes include weekly one-to-one lessons plus group theory and ensemble sessions.",
  },
  {
    q: "Do you offer scholarships?",
    a: "A limited number of merit-based scholarships are reviewed annually. Contact us for current openings.",
  },
];

export default function Contact() {
  const [openIdx, setOpenIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const name = fd.get("name");
    const email = fd.get("email");
    const phone = fd.get("phone");
    const instrument = fd.get("instrument");
    const message = fd.get("message");
    const text = `*New Enquiry from UBY'S Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone || "—"}%0A*Instrument:* ${instrument}%0A*Message:* ${message}`;
    window.open(`https://wa.me/${SITE.whatsappNumber}?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Begin the Conversation"
        subtitle="Tell us about you — we'll help you find your place at UBY'S."
      />

      <section className="py-24">
        <div className="container-prose grid lg:grid-cols-5 gap-12">
          {/* Form */}
          <div
            className="lg:col-span-3 border border-[var(--color-border)] rounded-lg p-8 md:p-12"
            style={{
              background: "var(--color-card)",
              boxShadow: "var(--shadow-elegant)",
            }}
          >
            <h2
              className="font-display text-3xl"
              style={{ color: "var(--color-primary-heading)" }}
            >
              Enrolment & Enquiries
            </h2>
            <p
              className="mt-2 text-sm"
              style={{ color: "var(--color-muted-foreground)" }}
            >
              We respond within one business day.
            </p>
            {submitted ? (
              <div className="mt-10 text-center py-12">
                <div
                  className="h-16 w-16 mx-auto rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--color-gold)",
                    color: "var(--color-on-secondary)",
                  }}
                >
                  <Send className="h-7 w-7" />
                </div>
                <h3
                  className="font-display text-2xl mt-5"
                  style={{ color: "var(--color-primary-heading)" }}
                >
                  Thank you.
                </h3>
                <p
                  className="mt-2"
                  style={{ color: "var(--color-muted-foreground)" }}
                >
                  We've received your message and will be in touch shortly.
                </p>
              </div>
            ) : (
              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Phone" name="phone" type="tel" />
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: "var(--color-primary-heading)" }}
                    >
                      Instrument Interest
                    </label>
                    <select
                      required
                      name="instrument"
                      className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                      style={{
                        background: "var(--color-background)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-foreground)",
                      }}
                    >
                      <option value="">Select instrument…</option>
                      <option>Violin</option>
                      <option>Viola</option>
                      <option>Cello</option>
                      <option>Not sure — recommend for me</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-2"
                    style={{ color: "var(--color-primary-heading)" }}
                  >
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about the student and their goals…"
                    className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] resize-none"
                    style={{
                      background: "var(--color-background)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-foreground)",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-hero btn-hero-hover w-full sm:w-auto"
                >
                  Send Message <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-2 space-y-6">
            <div
              className="text-ivory rounded-lg p-8"
              style={{ background: "var(--color-navy-deep)" }}
            >
              <h3 className="font-display text-2xl">Reach us</h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex gap-3">
                  <Mail className="h-5 w-5 text-[var(--color-gold)] flex-shrink-0" />
                  <span>{SITE.email}</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="h-5 w-5 text-[var(--color-gold)] flex-shrink-0" />
                  <span>{SITE.phone}</span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="h-5 w-5 text-[var(--color-gold)] flex-shrink-0" />
                  <span>{SITE.address}</span>
                </li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden border border-[var(--color-border)] aspect-video">
              <iframe
                title="Map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.30%2C6.45%2C3.45%2C6.55&layer=mapnik"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </aside>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-24"
        style={{ background: "var(--color-surface-container-low)" }}
      >
        <div className="container-prose max-w-3xl">
          <div className="text-center">
            <div className="eyebrow">Questions</div>
            <h2
              className="font-display text-3xl md:text-4xl mt-3"
              style={{ color: "var(--color-primary-heading)" }}
            >
              Frequently Asked
            </h2>
          </div>
          <div className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <div
                key={f.q}
                className="border border-[var(--color-border)] rounded-lg overflow-hidden"
                style={{ background: "var(--color-card)" }}
              >
                <button
                  onClick={() => setOpenIdx(openIdx === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left font-medium"
                  style={{ color: "var(--color-primary-heading)" }}
                >
                  <span>{f.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${openIdx === i ? "rotate-180" : ""}`}
                  />
                </button>
                {openIdx === i && (
                  <div
                    className="px-5 pb-5 animate-fade-in"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text", required }) {
  return (
    <div>
      <label
        className="block text-sm font-medium mb-2"
        style={{ color: "var(--color-primary-heading)" }}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
        style={{
          background: "var(--color-background)",
          border: "1px solid var(--color-border)",
          color: "var(--color-foreground)",
        }}
      />
    </div>
  );
}
