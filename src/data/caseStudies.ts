export type CaseStudy = {
  slug: string
  title: string
  type: string
  cardSummary: string
  summary: string
  client: string
  year: string
  role: string
  challenge: string
  outcome: string
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "villa-data",
    title: "Villa Data",
    type: "Case Study",
    cardSummary: "A single source of truth for football operations.",
    summary:
      "Designing an internal tool that brings together multiple data sources into a single, reliable system for club-wide decision-making.",
    client: "Aston Villa",
    year: "2026",
    role: "Lead Product Design",
    challenge:
      "Create a data product that helps teams interpret complex performance information quickly and confidently.",
    outcome:
      "Delivered a more usable data experience with clearer hierarchy, improved workflows, and better decision support.",
  },
  {
    slug: "villa-scouting",
    title: "Villa Scouting",
    type: "Case Study",
    cardSummary: "Digital workflows for football scouting and reporting.",
    summary:
      "An internal tool that helps scouts review matches, capture insights and deliver structured recommendations to senior decision-makers.",
    client: "Aston Villa",
    year: "2025",
    role: "Lead Product Design",
    challenge:
      "Design a scouting workflow that balances depth of insight with speed, consistency, and ease of review.",
    outcome:
      "Created a more structured scouting experience that improved navigation, comparison, and team-wide usability.",
  },
]

export function getCaseStudyBySlug(slug?: string) {
  return caseStudies.find((study) => study.slug === slug)
}

export function getNextCaseStudy(slug?: string) {
  if (!slug) {
    return undefined
  }

  const currentIndex = caseStudies.findIndex((study) => study.slug === slug)
  if (currentIndex === -1) {
    return undefined
  }

  return caseStudies[(currentIndex + 1) % caseStudies.length]
}
