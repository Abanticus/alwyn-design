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
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl space-y-10 px-6 py-16 lg:py-20">
        <header className="max-w-3xl space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">
              {caseStudy?.title ?? "Case Study Not Found"}
            </h1>
            {caseStudy ? (
              <>
                <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                  {caseStudy.summary}
                </p>
                <Badge className="bg-primary font-mono text-primary-foreground hover:bg-primary">
                  {caseStudy.type}
                </Badge>
              </>
            ) : null}
          </div>
        </header>

        {caseStudy ? (
          <>
            {caseStudy.sections?.[0] && (
              <section className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-medium tracking-tight">{caseStudy.sections[0].title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{caseStudy.sections[0].body}</p>
              </section>
            )}

            {caseStudy.demo && <caseStudy.demo />}

            {caseStudy.sections ? (
              <div className="space-y-6">
                {caseStudy.sections.slice(1).map((section) => (
                  <section key={section.title} className="rounded-2xl border border-border bg-card p-6">
                    <h2 className="text-xl font-medium tracking-tight">{section.title}</h2>
                    <p className="mt-3 leading-7 text-muted-foreground">{section.body}</p>
                  </section>
                ))}
              </div>
            ) : (
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
            )}

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
                    <Badge className="bg-primary font-mono text-primary-foreground hover:bg-primary">
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
