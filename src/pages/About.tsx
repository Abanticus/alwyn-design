function About() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl space-y-14 px-6 py-16 lg:py-20">
        <section className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:items-start">
          <div className="space-y-6">
            <header className="space-y-5">
              <div className="space-y-3">
                <h1 className="text-5xl font-medium tracking-tight sm:text-6xl">
                  Alwyn Leedham
                </h1>
                <p className="text-xl leading-8 text-primary sm:text-2xl">
                  Product Designer, Football
                </p>
              </div>
            </header>

            <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p>
                Good design in football is a lot like a well-drilled formation
                — structure that&apos;s clear enough to execute under pressure,
                flexible enough to adapt when the game shifts, and built around
                the people doing the work.
              </p>
              <p>
                Over 15 years my practice has moved from visual and digital
                design into product design, with the last several years spent
                working in football. I&apos;ve designed tools used by analysts,
                coaches and performance staff — interfaces where the right
                information at the right moment can change a decision, and
                where complexity has to be made legible without being
                oversimplified.
              </p>
              <p>
                My style of play is collaborative and direct. I work closely
                with users, engineers and stakeholders to understand real
                workflows before shaping solutions — pressure-testing ideas
                early, refining through feedback, and building things that
                hold up in the environments people actually work in.
              </p>
            </div>
          </div>

          <div className="aspect-[4/5] rounded-2xl bg-muted" />
        </section>
      </div>
    </main>
  )
}

export default About
