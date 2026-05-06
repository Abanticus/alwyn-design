import { useRef } from "react"

import { useShaderCanvas } from "@/hooks/useShaderCanvas"

export function ShaderCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)
  useShaderCanvas(ref)
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  )
}
