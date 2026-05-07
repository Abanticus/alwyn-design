const playerNodes = [
  { cx: 240, cy: 380, delay: "0s" },
  { cx: 380, cy: 190, delay: "0.4s" },
  { cx: 420, cy: 560, delay: "0.8s" },
  { cx: 570, cy: 300, delay: "1.2s" },
  { cx: 600, cy: 470, delay: "1.6s" },
  { cx: 760, cy: 220, delay: "2s" },
  { cx: 820, cy: 400, delay: "2.4s" },
  { cx: 940, cy: 330, delay: "2.8s" },
]

const eventTicks = [
  { cx: 320, cy: 465, delay: "0.2s" },
  { cx: 500, cy: 220, delay: "1.4s" },
  { cx: 690, cy: 535, delay: "2.6s" },
  { cx: 865, cy: 275, delay: "3.8s" },
  { cx: 1015, cy: 420, delay: "5s" },
]

export function TacticalPitchBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(140deg,oklch(0.141_0.005_285.823)_0%,oklch(0.18_0.032_265)_48%,oklch(0.105_0.006_286)_100%)]" />
      <svg
        viewBox="0 0 1200 760"
        className="absolute left-1/2 top-1/2 h-auto w-[max(1300px,170vh)] -translate-x-1/2 -translate-y-1/2 rotate-[-7deg] opacity-90 sm:w-[min(178vw,1680px)] lg:w-[min(132vw,1760px)] xl:w-[min(122vw,1960px)]"
        role="presentation"
      >
        <defs>
          <pattern
            id="pitch-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M40 0H0V40"
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          </pattern>
          <filter id="data-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker
            id="arrow-head"
            markerHeight="8"
            markerWidth="8"
            orient="auto"
            refX="6"
            refY="4"
            viewBox="0 0 8 8"
          >
            <path d="M0 0L8 4L0 8Z" fill="var(--primary)" opacity="0.62" />
          </marker>
        </defs>

        <g className="text-primary-foreground/60">
          <rect
            x="80"
            y="70"
            width="1040"
            height="620"
            fill="url(#pitch-grid)"
            opacity="0.32"
          />
        </g>

        <g
          fill="none"
          stroke="oklch(0.97 0.014 254.604 / 0.15)"
          strokeWidth="2"
        >
          <rect x="80" y="70" width="1040" height="620" rx="6" />
          <path d="M600 70V690" />
          <circle cx="600" cy="380" r="92" />
          <circle cx="600" cy="380" r="4" fill="currentColor" opacity="0.35" />

          <path d="M80 230H238V530H80" />
          <path d="M80 300H142V460H80" />
          <circle cx="198" cy="380" r="4" fill="currentColor" opacity="0.3" />
          <path d="M238 286a118 118 0 0 1 0 188" />

          <path d="M1120 230H962V530H1120" />
          <path d="M1120 300H1058V460H1120" />
          <circle cx="1002" cy="380" r="4" fill="currentColor" opacity="0.3" />
          <path d="M962 286a118 118 0 0 0 0 188" />

          <path d="M80 170H1120" strokeDasharray="6 18" opacity="0.45" />
          <path d="M80 590H1120" strokeDasharray="6 18" opacity="0.45" />
          <path d="M340 70V690" strokeDasharray="8 18" opacity="0.4" />
          <path d="M860 70V690" strokeDasharray="8 18" opacity="0.4" />
        </g>

        <g
          fill="none"
          filter="url(#data-glow)"
          markerEnd="url(#arrow-head)"
          stroke="var(--primary)"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
        >
          <path
            className="tactical-flow"
            d="M240 380C310 300 330 230 380 190"
            pathLength="1"
          />
          <path
            className="tactical-flow tactical-flow-delay-1"
            d="M380 190C505 168 650 170 760 220"
            pathLength="1"
          />
          <path
            className="tactical-flow tactical-flow-delay-2"
            d="M420 560C520 490 640 465 820 400"
            pathLength="1"
          />
          <path
            className="tactical-flow tactical-flow-delay-3"
            d="M570 300C660 345 720 375 820 400"
            pathLength="1"
          />
          <path
            className="tactical-flow tactical-flow-delay-4"
            d="M820 400C875 365 900 345 940 330"
            pathLength="1"
          />
        </g>

        <g
          fill="none"
          stroke="oklch(0.809 0.105 251.813 / 0.44)"
          strokeLinecap="round"
          strokeWidth="2"
        >
          <path
            className="tactical-trail"
            d="M500 220C545 255 570 280 570 300"
            pathLength="1"
          />
          <path
            className="tactical-trail tactical-flow-delay-2"
            d="M690 535C640 510 610 490 600 470"
            pathLength="1"
          />
          <path
            className="tactical-trail tactical-flow-delay-3"
            d="M865 275C900 290 925 310 940 330"
            pathLength="1"
          />
        </g>

        <g filter="url(#data-glow)">
          {playerNodes.map(({ cx, cy, delay }) => (
            <g
              key={`${cx}-${cy}`}
              className="tactical-node"
              style={{ animationDelay: delay }}
            >
              <circle
                cx={cx}
                cy={cy}
                r="16"
                fill="var(--primary)"
                opacity="0.13"
              />
              <circle cx={cx} cy={cy} r="5" fill="oklch(0.97 0.014 254.604)" />
              <circle
                cx={cx}
                cy={cy}
                r="8"
                fill="none"
                stroke="var(--primary)"
                strokeWidth="2"
              />
            </g>
          ))}
        </g>

        <g fill="oklch(0.809 0.105 251.813)">
          {eventTicks.map(({ cx, cy, delay }) => (
            <circle
              key={`${cx}-${cy}`}
              className="tactical-event"
              cx={cx}
              cy={cy}
              r="3"
              style={{ animationDelay: delay }}
            />
          ))}
        </g>
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_36%,oklch(0.141_0.005_285.823_/_0.58)_76%,oklch(0.141_0.005_285.823)_100%)]" />
      <div className="absolute inset-0 bg-background/18" />
    </div>
  )
}
