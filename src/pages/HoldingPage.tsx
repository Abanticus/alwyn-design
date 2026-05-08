import { useEffect } from "react"

import { HoldingLogo } from "@/components/HoldingLogo"
import { TacticalPitchBackground } from "@/components/TacticalPitchBackground"
import { useTheme } from "@/components/theme-provider"

function HoldingPage() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme("dark")
    return () => setTheme("system")
  }, [setTheme])

  return (
    <div
      className="relative flex h-screen w-screen overflow-hidden bg-background"
      style={{ background: "oklch(0.141 0.005 285.823)" }}
    >
      <TacticalPitchBackground />
      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-6">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(72vw,26rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.18_0.045_265_/_0.48)_0%,oklch(0.15_0.035_270_/_0.3)_38%,oklch(0.14_0.02_275_/_0)_76%)] blur-2xl" />
        <HoldingLogo className="h-24 w-auto text-primary-foreground drop-shadow-[0_16px_34px_rgba(0,0,0,0.62)] sm:h-28" />
        <p className="select-none text-3xl font-medium tracking-tight text-primary-foreground drop-shadow-[0_10px_20px_rgba(0,0,0,0.68)] sm:text-4xl">
          Coming soon…
        </p>
      </div>
    </div>
  )
}

export default HoldingPage
