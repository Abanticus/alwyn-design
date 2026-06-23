import type React from "react"
import PlayerDataTable from "@/components/demos/PlayerDataTable"

export type CaseStudySection = {
  title: string
  body: string
}

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
  sections?: CaseStudySection[]
  demo?: React.ComponentType
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "villa-data",
    title: "Data Linking",
    type: "Case Study",
    cardSummary: "A single source of truth for football intelligence at Aston Villa.",
    summary:
      "Villa Hub is Aston Villa's internal football intelligence platform, built for the strategy and research team to manage and connect data from multiple providers including Transfermarkt and Stats Perform, across players, teams, competitions, associations, fixtures, and more.",
    client: "Aston Villa",
    year: "2026",
    role: "Lead Product Design",
    challenge:
      "Each data provider maintains its own player records with distinct IDs and naming conventions. Without a canonical identifier, the same player exists as separate unlinked rows — one per source — with no way to connect or compare them.",
    outcome:
      "Delivered a more usable data experience with clearer hierarchy, improved workflows, and better decision support.",
    sections: [
      {
        title: "The Challenge",
        body: "The club ingests player data from up to ten external providers simultaneously. Each source maintains its own records with distinct IDs and naming conventions — without a canonical AV identifier, the same player exists as separate unlinked rows with no way to connect or compare them. Some players already have an AV ID but no external links yet; others exist only in a provider's dataset and haven't been registered at all. The linking UI needed to make these different states legible at a glance and give data engineers a clear path to resolve them.",
      },
      {
        title: "The Flow",
        body: "Selecting records from any data table opens a drag-and-drop modal where source datasets are assigned to a target entity. A second step provides field-level merge control — a side-by-side Keep/Delete view lets data engineers choose which values carry forward before applying changes.",
      },
      {
        title: "Key Decisions",
        body: "Provider IDs are colour-coded for quick orientation. The two-step flow separates what belongs together from what data wins, keeping each decision focused. Conflict indicators surface data quality issues in context.",
      },
    ],
    demo: PlayerDataTable,
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
