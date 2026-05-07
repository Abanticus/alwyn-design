import { useEffect, useState } from "react"

const motionKeyTimes = "0;0.18;0.38;0.62;0.82;1"
const motionKeySplines = [
  "0.42 0 0.58 1",
  "0.4 0 0.2 1",
  "0.45 0 0.55 1",
  "0.2 0 0.2 1",
  "0.42 0 0.58 1",
].join(";")

const trackingPlayers = [
  {
    id: "home-keeper",
    x: [190, 205, 214, 202, 186, 190],
    y: [380, 356, 392, 416, 398, 380],
    duration: "18s",
    delay: "-4s",
    radius: 1.45,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "home-left-back",
    x: [320, 360, 405, 380, 335, 320],
    y: [160, 138, 172, 228, 210, 160],
    duration: "24s",
    delay: "-16s",
    radius: 1.35,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "home-left-centre-back",
    x: [330, 360, 395, 368, 340, 330],
    y: [280, 245, 272, 325, 318, 280],
    duration: "22s",
    delay: "-11s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "home-right-centre-back",
    x: [350, 388, 420, 390, 346, 350],
    y: [485, 525, 498, 438, 452, 485],
    duration: "20s",
    delay: "-6s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "home-right-back",
    x: [320, 370, 412, 388, 335, 320],
    y: [600, 630, 588, 528, 548, 600],
    duration: "23s",
    delay: "-14s",
    radius: 1.35,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "home-six",
    x: [500, 548, 600, 570, 520, 500],
    y: [380, 338, 370, 426, 445, 380],
    duration: "16s",
    delay: "-2s",
    radius: 1.75,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "home-left-eight",
    x: [610, 665, 715, 690, 635, 610],
    y: [265, 220, 250, 320, 335, 265],
    duration: "19s",
    delay: "-13s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "home-right-eight",
    x: [625, 700, 755, 725, 660, 625],
    y: [510, 535, 492, 430, 452, 510],
    duration: "21s",
    delay: "-8s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "home-left-wing",
    x: [820, 875, 960, 1030, 950, 820],
    y: [180, 155, 205, 275, 300, 180],
    duration: "24s",
    delay: "-17s",
    radius: 1.55,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "home-nine",
    x: [855, 905, 980, 1035, 975, 855],
    y: [382, 330, 362, 410, 452, 382],
    duration: "18s",
    delay: "-5s",
    radius: 1.85,
    stroke: "var(--primary)",
  },
  {
    id: "home-right-wing",
    x: [805, 858, 940, 1015, 930, 805],
    y: [575, 610, 560, 485, 455, 575],
    duration: "23s",
    delay: "-14s",
    radius: 1.55,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-keeper",
    x: [1010, 996, 988, 1002, 1018, 1010],
    y: [380, 404, 368, 344, 362, 380],
    duration: "19s",
    delay: "-9s",
    radius: 1.45,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-left-back",
    x: [880, 830, 790, 812, 865, 880],
    y: [600, 632, 590, 530, 548, 600],
    duration: "25s",
    delay: "-18s",
    radius: 1.35,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-left-centre-back",
    x: [865, 824, 785, 814, 858, 865],
    y: [485, 528, 498, 438, 452, 485],
    duration: "20s",
    delay: "-5s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "away-right-centre-back",
    x: [850, 812, 780, 810, 854, 850],
    y: [280, 245, 272, 325, 318, 280],
    duration: "22s",
    delay: "-12s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "away-right-back",
    x: [880, 836, 795, 820, 866, 880],
    y: [160, 138, 174, 228, 208, 160],
    duration: "24s",
    delay: "-15s",
    radius: 1.35,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-six",
    x: [700, 652, 600, 630, 680, 700],
    y: [380, 422, 390, 334, 315, 380],
    duration: "17s",
    delay: "-1s",
    radius: 1.75,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-left-eight",
    x: [590, 535, 485, 510, 565, 590],
    y: [510, 540, 492, 430, 452, 510],
    duration: "20s",
    delay: "-7s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "away-right-eight",
    x: [575, 500, 445, 475, 540, 575],
    y: [265, 225, 268, 330, 308, 265],
    duration: "21s",
    delay: "-13s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "away-left-wing",
    x: [395, 342, 260, 185, 270, 395],
    y: [575, 610, 558, 488, 454, 575],
    duration: "23s",
    delay: "-17s",
    radius: 1.55,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-nine",
    x: [345, 295, 220, 165, 225, 345],
    y: [382, 430, 398, 350, 308, 382],
    duration: "18s",
    delay: "-6s",
    radius: 1.85,
    stroke: "var(--primary)",
  },
  {
    id: "away-right-wing",
    x: [380, 324, 242, 170, 252, 380],
    y: [180, 150, 205, 276, 300, 180],
    duration: "24s",
    delay: "-20s",
    radius: 1.55,
    stroke: "oklch(0.809 0.105 251.813)",
  },
]

const homeConnections = [
  [0, 2],
  [0, 3],
  [1, 2],
  [2, 5],
  [3, 5],
  [3, 4],
  [5, 6],
  [5, 7],
  [6, 8],
  [6, 9],
  [7, 9],
  [7, 10],
  [8, 9],
  [9, 10],
]

const awayConnections = homeConnections.map(([from, to]) => [from + 11, to + 11])

const trackingConnections = [
  ...homeConnections,
  ...awayConnections,
  [5, 16],
  [6, 17],
  [7, 16],
  [9, 20],
]

function values(points: number[]) {
  return points.join(";")
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") return false
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onChange = () => setPrefersReducedMotion(mediaQuery.matches)

    onChange()
    mediaQuery.addEventListener("change", onChange)
    return () => mediaQuery.removeEventListener("change", onChange)
  }, [])

  return prefersReducedMotion
}

function Motion({
  attributeName,
  delay,
  duration,
  points,
}: {
  attributeName: "cx" | "cy" | "x1" | "y1" | "x2" | "y2"
  delay: string
  duration: string
  points: number[]
}) {
  return (
    <animate
      attributeName={attributeName}
      begin={delay}
      calcMode="spline"
      dur={duration}
      keySplines={motionKeySplines}
      keyTimes={motionKeyTimes}
      repeatCount="indefinite"
      values={values(points)}
    />
  )
}

export function TacticalPitchBackground() {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,oklch(0.141_0.005_285.823)_0%,oklch(0.18_0.032_265)_48%,oklch(0.105_0.006_286)_100%)]" />
      <svg
        viewBox="0 0 1200 760"
        className="absolute left-1/2 top-1/2 h-auto w-[max(1300px,170vh)] -translate-x-1/2 -translate-y-1/2 rotate-[-7deg] opacity-90 sm:w-[min(178vw,1680px)] lg:w-[min(132vw,1760px)] xl:w-[min(122vw,1960px)]"
        role="presentation"
      >
        <defs>
          <filter id="data-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g
          fill="none"
          stroke="oklch(0.809 0.105 251.813 / 0.2)"
          strokeWidth="2"
        >
          <rect x="80" y="70" width="1040" height="620" rx="6" />
          <path d="M600 70V690" />
          <circle cx="600" cy="380" r="92" />
          <circle
            cx="600"
            cy="380"
            r="4"
            fill="oklch(0.809 0.105 251.813)"
            opacity="0.26"
          />

          <path d="M80 230H238V530H80" />
          <path d="M80 300H142V460H80" />
          <circle
            cx="198"
            cy="380"
            r="4"
            fill="oklch(0.809 0.105 251.813)"
            opacity="0.24"
          />
          <path d="M238 286a118 118 0 0 1 0 188" />

          <path d="M1120 230H962V530H1120" />
          <path d="M1120 300H1058V460H1120" />
          <circle
            cx="1002"
            cy="380"
            r="4"
            fill="oklch(0.809 0.105 251.813)"
            opacity="0.24"
          />
          <path d="M962 286a118 118 0 0 0 0 188" />

        </g>

        <g filter="url(#data-glow)">
          {trackingConnections.map(([fromIndex, toIndex]) => {
            const from = trackingPlayers[fromIndex]!
            const to = trackingPlayers[toIndex]!

            return (
              <line
                key={`${from.id}-${to.id}`}
                className="tracking-connection"
                x1={from.x[0]}
                y1={from.y[0]}
                x2={to.x[0]}
                y2={to.y[0]}
              >
                {!prefersReducedMotion && (
                  <>
                    <Motion
                      attributeName="x1"
                      delay={from.delay}
                      duration={from.duration}
                      points={from.x}
                    />
                    <Motion
                      attributeName="y1"
                      delay={from.delay}
                      duration={from.duration}
                      points={from.y}
                    />
                    <Motion
                      attributeName="x2"
                      delay={to.delay}
                      duration={to.duration}
                      points={to.x}
                    />
                    <Motion
                      attributeName="y2"
                      delay={to.delay}
                      duration={to.duration}
                      points={to.y}
                    />
                  </>
                )}
              </line>
            )
          })}

          {trackingPlayers.map((player) => (
            <g key={player.id}>
              <circle
                className="tracking-dot-halo"
                cx={player.x[0]}
                cy={player.y[0]}
                r={player.radius + 3.25}
                fill={player.stroke}
              >
                {!prefersReducedMotion && (
                  <>
                    <Motion
                      attributeName="cx"
                      delay={player.delay}
                      duration={player.duration}
                      points={player.x}
                    />
                    <Motion
                      attributeName="cy"
                      delay={player.delay}
                      duration={player.duration}
                      points={player.y}
                    />
                  </>
                )}
              </circle>
              <circle
                className="tracking-dot-core"
                cx={player.x[0]}
                cy={player.y[0]}
                r={player.radius}
                fill={player.stroke}
              >
                {!prefersReducedMotion && (
                  <>
                    <Motion
                      attributeName="cx"
                      delay={player.delay}
                      duration={player.duration}
                      points={player.x}
                    />
                    <Motion
                      attributeName="cy"
                      delay={player.delay}
                      duration={player.duration}
                      points={player.y}
                    />
                  </>
                )}
              </circle>
            </g>
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_36%,oklch(0.141_0.005_285.823_/_0.58)_76%,oklch(0.141_0.005_285.823)_100%)]" />
      <div className="absolute inset-0 bg-background/18" />
    </div>
  )
}
