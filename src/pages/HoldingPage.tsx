import { useEffect } from "react"

import { HoldingLogo } from "@/components/HoldingLogo"
import { useTheme } from "@/components/theme-provider"

function HoldingPage() {
  const { setTheme } = useTheme()

  useEffect(() => {
    setTheme("dark")
    return () => setTheme("system")
  }, [setTheme])

  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center gap-6"
      style={{ background: "oklch(0.141 0.005 285.823)" }}
    >
      <HoldingLogo className="h-24 w-auto sm:h-28 text-primary-foreground" />
      <p className="text-3xl font-medium tracking-tight select-none text-primary-foreground sm:text-4xl">
        Coming soon…
      </p>
    </div>
  )
}

export default HoldingPage
