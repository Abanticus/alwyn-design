import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { TacticalPitchBackground } from "@/components/TacticalPitchBackground"
import { caseStudies } from "../data/caseStudies"

function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header>
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 lg:grid-cols-[3fr_2fr] lg:py-20">
          <div className="space-y-5">
            <h1 className="text-5xl font-medium leading-tight tracking-tight sm:text-6xl">
              Designing <span className="text-primary">digital products</span>{" "}
              that simplify complex workflows in{" "}
              <span className="text-primary">elite football</span>
            </h1>
            <p className="text-base leading-7 text-muted-foreground sm:text-lg">
              I&apos;m Alwyn, a Product Designer with 15+ years of design
              experience, currently leading UX and UI for internal football
              operations tools at Aston Villa. I combine strong visual craft
              with research, prototyping and systems thinking to create
              intuitive digital experiences.
            </p>
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

      <div className="mx-auto max-w-5xl space-y-14 px-6 py-16">
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
                <Badge className="mt-4 bg-primary text-primary-foreground hover:bg-primary">
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
