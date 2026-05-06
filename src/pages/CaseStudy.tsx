import { ArrowRight } from "lucide-react"
import { Link, useParams } from "react-router-dom"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getCaseStudyBySlug, getNextCaseStudy } from "../data/caseStudies"

function CaseStudy() {
  const { slug } = useParams<{ slug: string }>()
  const caseStudy = getCaseStudyBySlug(slug)
  const nextCaseStudy = getNextCaseStudy(slug)

  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="max-w-3xl space-y-6 pt-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
              {caseStudy?.title ?? "Case Study Not Found"}
            </h1>
            {caseStudy ? (
              <>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  {caseStudy.summary}
                </p>
                <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                  {caseStudy.type}
                </Badge>
              </>
            ) : null}
          </div>
        </header>

        {caseStudy ? (
          <>
            <section className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="flex aspect-[16/9] items-end bg-linear-to-br from-muted/80 via-muted/50 to-background p-6 sm:p-8">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Featured mockup placeholder
                  </p>
                  <p className="max-w-md text-sm leading-6 text-muted-foreground">
                    Add a hero product image, screen design or key visual here.
                  </p>
                </div>
              </div>
            </section>

            <section className="grid gap-4 rounded-2xl border border-border bg-card p-6 sm:grid-cols-3">
              <div>
                <p className="text-sm text-muted-foreground">Client</p>
                <p className="mt-1 font-medium">{caseStudy.client}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Year</p>
                <p className="mt-1 font-medium">{caseStudy.year}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Role</p>
                <p className="mt-1 font-medium">{caseStudy.role}</p>
              </div>
            </section>

            <section className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                {caseStudy.summary}
              </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
              <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-6">
                <div className="flex aspect-[16/10] items-end rounded-xl bg-background/50 p-5">
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Screen placeholder
                    </p>
                    <p className="text-sm leading-6 text-muted-foreground">
                      Use this space for a core interface view or workflow screen.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-5">
                  <div className="flex aspect-[4/3] items-end rounded-xl bg-background/50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Detail placeholder
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-border bg-muted/40 p-5">
                  <div className="flex aspect-[4/3] items-end rounded-xl bg-background/50 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Detail placeholder
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="grid gap-6 sm:grid-cols-2">
              <article className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Challenge</h2>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {caseStudy.challenge}
                </p>
              </article>

              <article className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold">Outcome</h2>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {caseStudy.outcome}
                </p>
              </article>
            </section>

            <section className="rounded-2xl border border-dashed border-border bg-muted/40 p-6">
              <div className="flex aspect-[16/8] items-end rounded-xl bg-background/50 p-5">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Additional gallery placeholder
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Add more screens, process shots or outcome visuals here.
                  </p>
                </div>
              </div>
            </section>

            {nextCaseStudy ? (
              <section className="rounded-2xl border border-border bg-card p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-medium tracking-tight">
                      {nextCaseStudy.title}
                    </h2>
                    <p className="max-w-2xl text-base leading-7 text-muted-foreground">
                      {nextCaseStudy.summary}
                    </p>
                    <Badge className="bg-primary text-primary-foreground hover:bg-primary">
                      {nextCaseStudy.type}
                    </Badge>
                  </div>

                  <Button asChild>
                    <Link to={`/case-study/${nextCaseStudy.slug}`}>
                      Next project
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
              </section>
            ) : null}
          </>
        ) : (
          <section className="rounded-2xl border border-border bg-card p-6">
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
              Case Study Not Found
            </h1>
            <p className="leading-7 text-muted-foreground">
              No case study matches this slug yet. Add it to the shared
              <code> caseStudies </code>
              data file and it will appear automatically.
            </p>
          </section>
        )}
      </div>
    </main>
  )
}

export default CaseStudy
