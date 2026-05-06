import { Link } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { caseStudies } from "../data/caseStudies"

function Home() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-5xl space-y-14">
        <header className="max-w-3xl space-y-5 pt-6">
          <h1 className="text-5xl font-medium tracking-tight sm:text-6xl">
            Designing <span className="text-primary">digital products</span>{" "}
            that simplify complex workflows in{" "}
            <span className="text-primary">elite football</span>
          </h1>
          <p className="max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
            I&apos;m Alwyn, a Product Designer with 15+ years of design
            experience, currently leading UX and UI for internal football
            operations tools at Aston Villa. I combine strong visual craft with
            research, prototyping and systems thinking to create intuitive
            digital experiences.
          </p>
        </header>

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
