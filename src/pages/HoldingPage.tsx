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
      className="dark relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#13141c" }}
    >
      <div className="absolute inset-0">
        <TacticalPitchBackground
          showBackground={false}
          variant="light"
          svgClassName="absolute left-1/2 top-1/2 h-auto -translate-x-1/2 -translate-y-1/2 will-change-transform rotate-90 w-[126vw] md:rotate-0 md:w-[80%]"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <HoldingLogo className="h-24 w-auto text-primary-foreground sm:h-28" />
        <p className="text-3xl font-medium tracking-tight text-primary-foreground sm:text-4xl">
          Coming soon…
        </p>
      </div>
    </div>
  )
}

export default HoldingPage
