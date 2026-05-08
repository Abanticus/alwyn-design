import { useEffect, useState } from "react"

const formationDuration = "34s"
const formationDelay = "-4s"
const homeTeamColor = "oklch(0.424 0.199 265.638)"
const awayTeamColor = "oklch(0.809 0.105 251.813)"
const motionKeyTimeValues = [0, 0.18, 0.38, 0.62, 0.82, 1]
const motionKeyTimes = motionKeyTimeValues.join(";")
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
    x: [160, 168, 176, 170, 158, 160],
    y: [380, 360, 382, 402, 394, 380],
    duration: "24s",
    delay: "-4s",
    radius: 1.45,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "home-left-back",
    x: [330, 385, 445, 410, 350, 330],
    y: [155, 128, 148, 205, 212, 155],
    duration: "26s",
    delay: "-16s",
    radius: 1.35,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "home-left-centre-back",
    x: [315, 350, 390, 370, 332, 315],
    y: [305, 282, 302, 338, 344, 305],
    duration: "25s",
    delay: "-11s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "home-right-centre-back",
    x: [315, 350, 392, 370, 330, 315],
    y: [455, 478, 456, 420, 416, 455],
    duration: "24s",
    delay: "-6s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "home-right-back",
    x: [330, 390, 455, 420, 352, 330],
    y: [605, 632, 610, 552, 548, 605],
    duration: "27s",
    delay: "-14s",
    radius: 1.35,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "home-left-pivot",
    x: [485, 532, 575, 548, 500, 485],
    y: [322, 288, 318, 368, 370, 322],
    duration: "21s",
    delay: "-2s",
    radius: 1.75,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "home-right-pivot",
    x: [500, 552, 602, 572, 512, 500],
    y: [438, 470, 442, 390, 392, 438],
    duration: "22s",
    delay: "-13s",
    radius: 1.75,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "home-left-wing",
    x: [695, 748, 818, 792, 724, 695],
    y: [168, 142, 178, 236, 248, 168],
    duration: "24s",
    delay: "-8s",
    radius: 1.55,
    stroke: "var(--primary)",
  },
  {
    id: "home-ten",
    x: [675, 735, 792, 760, 698, 675],
    y: [380, 338, 374, 430, 424, 380],
    duration: "19s",
    delay: "-5s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "home-right-wing",
    x: [695, 750, 820, 790, 725, 695],
    y: [592, 620, 580, 520, 512, 592],
    duration: "24s",
    delay: "-12s",
    radius: 1.55,
    stroke: "var(--primary)",
  },
  {
    id: "home-nine",
    x: [880, 925, 982, 952, 895, 880],
    y: [380, 334, 366, 420, 440, 380],
    duration: "18s",
    delay: "-17s",
    radius: 1.85,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-keeper",
    x: [1040, 1032, 1024, 1030, 1042, 1040],
    y: [380, 400, 378, 358, 366, 380],
    duration: "25s",
    delay: "-9s",
    radius: 1.45,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-left-back",
    x: [870, 810, 745, 780, 848, 870],
    y: [605, 632, 610, 552, 548, 605],
    duration: "27s",
    delay: "-18s",
    radius: 1.35,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-left-centre-back",
    x: [885, 850, 808, 830, 870, 885],
    y: [455, 478, 456, 420, 416, 455],
    duration: "24s",
    delay: "-5s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "away-right-centre-back",
    x: [885, 850, 810, 830, 868, 885],
    y: [305, 282, 302, 338, 344, 305],
    duration: "25s",
    delay: "-12s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "away-right-back",
    x: [870, 815, 755, 790, 850, 870],
    y: [155, 128, 148, 205, 212, 155],
    duration: "26s",
    delay: "-15s",
    radius: 1.35,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-left-pivot",
    x: [700, 648, 598, 628, 688, 700],
    y: [438, 470, 442, 390, 392, 438],
    duration: "22s",
    delay: "-1s",
    radius: 1.75,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-right-pivot",
    x: [715, 668, 625, 652, 700, 715],
    y: [322, 288, 318, 368, 370, 322],
    duration: "21s",
    delay: "-7s",
    radius: 1.75,
    stroke: "oklch(0.809 0.105 251.813)",
  },
  {
    id: "away-left-wing",
    x: [505, 450, 380, 410, 475, 505],
    y: [592, 620, 580, 520, 512, 592],
    duration: "24s",
    delay: "-17s",
    radius: 1.55,
    stroke: "var(--primary)",
  },
  {
    id: "away-ten",
    x: [525, 465, 408, 440, 502, 525],
    y: [380, 422, 386, 330, 336, 380],
    duration: "19s",
    delay: "-13s",
    radius: 1.65,
    stroke: "var(--primary)",
  },
  {
    id: "away-right-wing",
    x: [505, 452, 382, 408, 476, 505],
    y: [168, 142, 178, 236, 248, 168],
    duration: "24s",
    delay: "-20s",
    radius: 1.55,
    stroke: "var(--primary)",
  },
  {
    id: "away-nine",
    x: [320, 275, 218, 248, 305, 320],
    y: [380, 426, 394, 340, 320, 380],
    duration: "18s",
    delay: "-6s",
    radius: 1.85,
    stroke: "oklch(0.809 0.105 251.813)",
  },
]

const homeConnections = [
  [0, 2],
  [0, 3],
  [1, 2],
  [1, 7],
  [2, 5],
  [5, 6],
  [5, 8],
  [8, 7],
  [8, 10],
  [8, 9],
  [3, 4],
  [6, 8],
  [6, 4],
  [9, 10],
]

const awayConnections = homeConnections.map(([from, to]) => [from + 11, to + 11])

const trackingConnections = [
  ...homeConnections,
  ...awayConnections,
]

const homeBallReceivers = [
  { playerIndex: 0, frameIndex: 0 },
  { playerIndex: 3, frameIndex: 1 },
  { playerIndex: 6, frameIndex: 2 },
  { playerIndex: 8, frameIndex: 3 },
  { playerIndex: 9, frameIndex: 4 },
]

const awayBallReceivers = [
  { playerIndex: 11, frameIndex: 0 },
  { playerIndex: 13, frameIndex: 1 },
  { playerIndex: 16, frameIndex: 2 },
  { playerIndex: 19, frameIndex: 3 },
  { playerIndex: 18, frameIndex: 4 },
]

const ballReceivers = [
  ...homeBallReceivers,
  ...awayBallReceivers,
  { playerIndex: 0, frameIndex: 5 },
]

const ballKeyTimeValues = [
  ...motionKeyTimeValues.slice(0, -1).map((keyTime) => keyTime / 2),
  ...motionKeyTimeValues.slice(0, -1).map((keyTime) => 0.5 + keyTime / 2),
  1,
]

const ballPath = {
  x: ballReceivers.map(
    ({ playerIndex, frameIndex }) => trackingPlayers[playerIndex]!.x[frameIndex]!,
  ),
  y: ballReceivers.map(
    ({ playerIndex, frameIndex }) => trackingPlayers[playerIndex]!.y[frameIndex]!,
  ),
  duration: "68s",
  delay: formationDelay,
  keyTimes: ballKeyTimeValues.join(";"),
  keySplines: Array.from(
    { length: ballKeyTimeValues.length - 1 },
    () => "0.25 0 0.2 1",
  ).join(";"),
}

function values(points: number[]) {
  return points.join(";")
}

function transformValues(xPoints: number[], yPoints: number[]) {
  return xPoints.map((x, index) => `${x} ${yPoints[index]}`).join(";")
}

function playerColor(index: number) {
  return index < 11 ? homeTeamColor : awayTeamColor
}

function connectionColor(fromIndex: number, toIndex: number) {
  if (fromIndex < 11 && toIndex < 11) return homeTeamColor
  if (fromIndex >= 11 && toIndex >= 11) return awayTeamColor
  return awayTeamColor
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
      begin={formationDelay}
      calcMode="spline"
      dur={formationDuration}
      keySplines={motionKeySplines}
      keyTimes={motionKeyTimes}
      repeatCount="indefinite"
      values={values(points)}
    />
  )
}

function BallMotion() {
  return (
    <animateTransform
      attributeName="transform"
      begin={ballPath.delay}
      calcMode="spline"
      dur={ballPath.duration}
      keySplines={ballPath.keySplines}
      keyTimes={ballPath.keyTimes}
      repeatCount="indefinite"
      type="translate"
      values={transformValues(ballPath.x, ballPath.y)}
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
        className="absolute left-1/2 top-1/2 h-[max(800px,118vw)] w-auto -translate-x-1/2 -translate-y-1/2 rotate-[76deg] opacity-90 will-change-transform sm:h-[max(880px,112vw)] lg:h-auto lg:w-[min(118vw,1800px)] lg:rotate-[-7deg] 2xl:w-[min(108vw,2200px)]"
        role="presentation"
      >
        <g
          fill="none"
          stroke="oklch(0.809 0.105 251.813 / 0.2)"
          strokeWidth="2"
        >
          <rect x="80" y="70" width="1040" height="620" />
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

        <g className="tracking-glow-group">
          {trackingConnections.map(([fromIndex, toIndex]) => {
            const from = trackingPlayers[fromIndex]!
            const to = trackingPlayers[toIndex]!

            return (
              <line
                key={`${from.id}-${to.id}`}
                className="tracking-connection"
                style={{ stroke: connectionColor(fromIndex, toIndex) }}
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

          <g transform={`translate(${ballPath.x[0]} ${ballPath.y[0]})`}>
            {!prefersReducedMotion && (
              <BallMotion />
            )}
            <circle
              className="tracking-ball-halo"
              cx="0"
              cy="0"
              r="8"
              fill="oklch(0.97 0.014 254.604)"
            />
            <circle
              className="tracking-ball-core"
              cx="0"
              cy="0"
              r="2.2"
              fill="oklch(0.97 0.014 254.604)"
            />
          </g>

          {trackingPlayers.map((player, index) => (
            <g key={player.id}>
              <circle
                className="tracking-dot-halo"
                cx={player.x[0]}
                cy={player.y[0]}
                r={player.radius + 3.6}
                fill={playerColor(index)}
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
                r={player.radius + 0.85}
                fill={playerColor(index)}
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
