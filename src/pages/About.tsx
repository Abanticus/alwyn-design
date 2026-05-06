function About() {
  return (
    <main className="min-h-screen bg-background px-6 py-20 text-foreground">
      <div className="mx-auto max-w-5xl space-y-14">
        <section className="grid gap-10 pt-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.9fr)] lg:items-start">
          <div className="space-y-6">
            <header className="max-w-3xl space-y-5">
              <div className="space-y-3">
                <h1 className="text-5xl font-medium tracking-tight sm:text-6xl">
                  Alwyn Leedham
                </h1>
                <p className="text-xl leading-8 text-primary sm:text-2xl">
                  Product Designer
                </p>
              </div>
            </header>

            <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p>
                I&apos;ve always been drawn to design that helps people make
                sense of complexity, whether that&apos;s digital products,
                operational tools, or communication that needs to work clearly.
              </p>
              <p>
                Over the past 15 years, my work has evolved from visual and
                digital design into product design, shaped by projects across
                public transport, sport and internal systems. That progression
                has given me a strong understanding of how design needs to
                function in real environments: clear, practical and built
                around the people using it.
              </p>
              <p>
                I enjoy working closely with users, engineers and stakeholders
                to shape products that feel intuitive, scalable and grounded in
                real workflows. Much of my current work involves translating
                specialist requirements into interfaces that support better
                decisions and smoother day-to-day use.
              </p>
            </div>
          </div>

          <div>
            <section className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex aspect-[4/5] items-end bg-linear-to-br from-muted/80 via-muted/40 to-background p-6">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Portrait Placeholder
                  </p>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Add a photo here when you&apos;re ready.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  )
}

export default About
