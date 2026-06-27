import PageHero from "../components/site/PageHero";
import SectionHeading from "../components/site/SectionHeading";
import { BookOpen, ClipboardList, Music2 } from "lucide-react";

const grades = [
  {
    title: "Grade 1: Foundation Music Theory",
    duration: "Duration: 1-3 Months",
    points: [
      "Fundamentals of music theory",
      "Musical notation",
      "Rhythm and timing",
      "Basic ear training",
      "Music reading skills",
    ],
  },
  {
    title: "Grade 2: Instrument Foundation",
    duration: "Duration: From the 2nd month until the end of the programme",
    points: [
      "Selection of a musical instrument",
      "Parts and maintenance of the instrument",
      "Letter names and finger placements",
      "Scale exercises",
      "Basic performance techniques",
      "Proper posture and instrument handling",
    ],
  },
  {
    title: "Grade 3: Advanced Techniques",
    duration: "Duration: Approximately 6 months until programme completion",
    points: [
      "Vibrato",
      "Tremolo",
      "Slurs",
      "Position playing",
      "Advanced bowing techniques",
      "Intermediate and advanced repertoire for Violin, Viola, and Cello",
    ],
  },
];

const examinations = [
  {
    title: "Stage One: Music Theory Examination",
    points: [
      "Students complete the Academy's music theory programme.",
      "Students complete affiliated courses from OpenLearn UK and Cursa.",
      "Candidates sit for a theory examination conducted by the Academy.",
    ],
  },
  {
    title: "Stage Two: Recital Assessment",
    points: [
      "Students participate in 10 structured recital sessions.",
      "Students perform two pieces per recital.",
      "Repertoire may be drawn from hymns, Johann Sebastian Bach, George Frideric Handel, Wolfgang Amadeus Mozart, Ludwig van Beethoven, and other approved composers.",
      "All performances are recorded, assessed, and scored as part of the student's overall evaluation.",
    ],
  },
  {
    title: "Stage Three: Final Examination",
    points: [
      "The final examination combines theory assessment and practical performance assessment.",
      "Successful candidates receive certification from the Academy.",
    ],
  },
];

const weeklyActivities = [
  "Saturday Classes: 9:00 a.m. - 12:00 p.m.",
  "Thursday Training Sessions: 6:00 p.m. - 7:30 p.m.",
  "Sunday Online Content: livestream and recorded performances.",
  "Sunday content includes hymns, spiritual songs, quartet performances, quintet performances, and special musical presentations on social media platforms.",
];

const specialEvents = [
  "Workshops",
  "Holiday music camps",
  "Professional training sessions",
  "Masterclasses",
  "University Convocation Ceremonies",
  "Choir Concerts",
  "Carol Services",
  "Sunday Worship Services",
  "Other major institutional events",
];

export default function AcademicStructure() {
  return (
    <>
      <PageHero
        eyebrow="Academic Structure"
        title="Grades, Exams, and Academy Activities"
        subtitle="The Academy guides students from beginner foundations to advanced training through structured grades, recitals, examinations, and weekly performance activities."
      />

      <section className="py-24">
        <div className="container-prose">
          <SectionHeading
            eyebrow="Grade Levels"
            title="Three Progressive Stages."
            subtitle="Each grade builds technical, theoretical, and performance readiness."
          />
          <div className="mt-14 grid lg:grid-cols-3 gap-6">
            {grades.map((grade) => (
              <Panel key={grade.title} icon={BookOpen} title={grade.title}>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--color-gold)" }}
                >
                  {grade.duration}
                </p>
                <List items={grade.points} />
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-24"
        style={{ background: "var(--color-surface-container-low)" }}
      >
        <div className="container-prose">
          <SectionHeading
            eyebrow="Examination Structure"
            title="Three Assessment Stages."
            subtitle="Candidates are evaluated through academy theory, structured recitals, and a final theory/practical examination."
          />
          <div className="mt-14 grid lg:grid-cols-3 gap-6">
            {examinations.map((stage) => (
              <Panel key={stage.title} icon={ClipboardList} title={stage.title}>
                <List items={stage.points} />
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-prose grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeading
              eyebrow="Weekly Schedule"
              title="Academy Activities."
              center={false}
            />
            <List items={weeklyActivities} spacious />
          </div>

          <div>
            <SectionHeading
              eyebrow="Special Events"
              title="Performance and Training Events."
              center={false}
            />
            <List items={specialEvents} spacious />
          </div>
        </div>
      </section>
    </>
  );
}

function Panel({ icon: Icon, title, children }) {
  return (
    <article
      className="rounded-lg border border-[var(--color-border)] p-7 h-full"
      style={{ background: "var(--color-card)" }}
    >
      <div
        className="h-11 w-11 rounded-full flex items-center justify-center"
        style={{
          background: "var(--color-surface-container)",
          color: "var(--color-burgundy)",
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3
        className="font-display text-2xl mt-5"
        style={{ color: "var(--color-primary-heading)" }}
      >
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </article>
  );
}

function List({ items, spacious = false }) {
  return (
    <ul
      className={`${spacious ? "mt-8 space-y-4" : "mt-5 space-y-2"} text-sm leading-relaxed`}
      style={{ color: "var(--color-muted-foreground)" }}
    >
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Music2
            className="h-4 w-4 shrink-0 mt-0.5"
            style={{ color: "var(--color-burgundy)" }}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
