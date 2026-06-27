import { useState } from "react";
import PageHero from "../components/site/PageHero";
import SectionHeading from "../components/site/SectionHeading";
import { Banknote, CalendarDays, GraduationCap, Send } from "lucide-react";
import { SITE } from "../lib/site";

const fees = [
  {
    icon: Banknote,
    label: "Registration",
    value: "N10,000",
  },
  {
    icon: Banknote,
    label: "Physical Programme",
    value: "N5,000 per semester",
  },
  {
    icon: CalendarDays,
    label: "Online Programme",
    value: "6 Months",
  },
  {
    icon: GraduationCap,
    label: "Online Tuition",
    value: "N100,000",
  },
];

export default function Enroll() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const text = `*New Enrollment Enquiry from UBY'S Website*%0A%0A*Name:* ${fd.get("name")}%0A*Email:* ${fd.get("email")}%0A*Phone:* ${fd.get("phone") || "-"}%0A*Programme:* ${fd.get("programme")}%0A*Message:* ${fd.get("message")}`;
    window.open(`https://wa.me/${SITE.whatsappNumber}?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <>
      <PageHero
        eyebrow="Enroll Now"
        title="Registration and Fees"
        subtitle="Review the current registration and programme fees, then send an enrollment enquiry to the Academy."
      />

      <section className="py-24">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Programme Pricing"
            title="Fees from the Academy Guide."
            subtitle="The online programme fee is separate from the registration fee. Contact the Director or Coordinator for payment details."
          />
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {fees.map((fee) => {
              const Icon = fee.icon;
              return (
                <div
                  key={fee.label}
                  className="rounded-lg border border-[var(--color-border)] p-7"
                  style={{ background: "var(--color-card)" }}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: "var(--color-burgundy)" }}
                  />
                  <div
                    className="mt-5 text-xs uppercase tracking-[0.15em]"
                    style={{ color: "var(--color-muted-foreground)" }}
                  >
                    {fee.label}
                  </div>
                  <div
                    className="mt-2 font-display text-2xl"
                    style={{ color: "var(--color-primary-heading)" }}
                  >
                    {fee.value}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="py-24"
        style={{ background: "var(--color-surface-container-low)" }}
      >
        <div className="container-prose grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <SectionHeading
              eyebrow="Enrollment"
              title="Send Your Details."
              subtitle="The Academy will respond with payment and enrollment procedures."
              center={false}
            />
            <div
              className="mt-8 rounded-lg border border-[var(--color-border)] p-7 text-sm leading-relaxed"
              style={{
                background: "var(--color-card)",
                color: "var(--color-muted-foreground)",
              }}
            >
              <p>Director: {SITE.phone}</p>
              <p className="mt-2">Coordinator: {SITE.coordinatorPhone}</p>
              <p className="mt-2">Email: {SITE.email}</p>
            </div>
          </div>

          <div
            className="lg:col-span-3 rounded-lg border border-[var(--color-border)] p-8 md:p-12"
            style={{
              background: "var(--color-card)",
              boxShadow: "var(--shadow-elegant)",
            }}
          >
            {submitted ? (
              <div className="text-center py-12">
                <div
                  className="h-16 w-16 mx-auto rounded-full flex items-center justify-center"
                  style={{
                    background: "var(--color-gold)",
                    color: "var(--color-on-secondary)",
                  }}
                >
                  <Send className="h-7 w-7" />
                </div>
                <h2
                  className="font-display text-2xl mt-5"
                  style={{ color: "var(--color-primary-heading)" }}
                >
                  Enquiry sent.
                </h2>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
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
                      Programme
                    </label>
                    <select
                      required
                      name="programme"
                      className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)]"
                      style={{
                        background: "var(--color-background)",
                        border: "1px solid var(--color-border)",
                        color: "var(--color-foreground)",
                      }}
                    >
                      <option value="">Select programme...</option>
                      <option>Physical Programme</option>
                      <option>Online Programme</option>
                      <option>Foundation Music Theory</option>
                      <option>Instrument Foundation</option>
                      <option>Advanced Techniques</option>
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
                    name="message"
                    rows={5}
                    placeholder="Tell us about the student and preferred programme..."
                    className="w-full px-4 py-3 rounded-md focus:outline-none focus:border-[var(--color-gold)] focus:ring-1 focus:ring-[var(--color-gold)] resize-none"
                    style={{
                      background: "var(--color-background)",
                      border: "1px solid var(--color-border)",
                      color: "var(--color-foreground)",
                    }}
                  />
                </div>
                <button type="submit" className="btn-hero btn-hero-hover">
                  Send Enrollment Enquiry <Send className="h-4 w-4" />
                </button>
              </form>
            )}
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
