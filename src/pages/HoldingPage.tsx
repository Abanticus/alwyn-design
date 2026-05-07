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
        <HoldingLogo className="h-24 w-auto text-primary-foreground drop-shadow-[0_14px_40px_rgba(0,0,0,0.45)] sm:h-28" />
        <p className="select-none text-3xl font-medium tracking-tight text-primary-foreground drop-shadow-[0_10px_24px_rgba(0,0,0,0.5)] sm:text-4xl">
          Coming soon…
        </p>
      </div>
    </div>
  )
}

export default HoldingPage
