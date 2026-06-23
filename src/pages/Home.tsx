import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import TypewriterText from "@/components/TypewriterText"
import LogoLoop from "@/components/LogoLoop"
import { TacticalPitchBackground } from "@/components/TacticalPitchBackground"
import { caseStudies } from "../data/caseStudies"

const skills = [
  "UX Design",
  "Figma",
  "Prototyping",
  "User Research",
  "Data Visualisation",
  "Design Systems",
  "Interaction Design",
  "Product Strategy",
  "Wireframing",
  "Usability Testing",
].map((s) => ({
  node: <span className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-foreground">{s}</span>,
  title: s,
}))

function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[3fr_2fr] lg:py-20">
          <div className="min-w-0 space-y-6 lg:-mt-12">
            <h1 className="text-4xl font-medium leading-snug tracking-tight sm:text-5xl">
              I'm Alwyn, a Product Designer<br />at Aston Villa building tools for<br />
              <span className="mt-3 inline-block"><TypewriterText
                texts={["Data", "Performance", "Management", "Coaching", "Administration", "Scouting", "Research"]}
                className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-4xl font-medium sm:text-5xl align-middle leading-none"
                typingSpeed={80}
                deletingSpeed={40}
                pauseDuration={2000}
              /></span>
            </h1>
            <p className="max-w-lg text-base leading-7 text-muted-foreground">
              I work in the Football Research &amp; Strategy team, designing internal products that help the club make informed decisions about football operations.
            </p>
            <div className="relative mt-10 overflow-hidden">
              <LogoLoop logos={skills} speed={50} gap={32} logoHeight={14} pauseOnHover />
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
            </div>
          </div>

          <div className="relative hidden aspect-[760/1200] w-full overflow-hidden lg:block">
            <TacticalPitchBackground
              showBackground={false}
              variant="light"
              svgClassName="absolute left-1/2 top-1/2 w-[157.9%] h-auto -translate-x-1/2 -translate-y-1/2 rotate-90 opacity-100 will-change-transform"
            />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-14 px-6 py-16">
        <section className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {caseStudies.map((study) => (
              <Link
                key={study.slug}
                to={`/case-study/${study.slug}`}
                className="rounded-xl border border-border bg-card p-4 transition hover:border-primary hover:shadow-sm"
              >
                <div className="flex aspect-[16/10] items-end rounded-lg border border-dashed border-border bg-muted/60 p-4">
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Project image placeholder
                  </span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold">{study.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {study.cardSummary}
                </p>
                <Badge className="mt-4 bg-primary font-mono text-primary-foreground hover:bg-primary">
                  {study.type}
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

export default Home
