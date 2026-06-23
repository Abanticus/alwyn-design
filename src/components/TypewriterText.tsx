import { useEffect, useRef, useState } from "react"

type TypewriterTextProps = {
  texts: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  loop?: boolean
  className?: string
}

type Phase = "typing" | "pausing" | "deleting" | "waiting"

function TypewriterText({
  texts,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
  loop = true,
  className,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("")
  const [phase, setPhase] = useState<Phase>("typing")
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = texts[index]

    const schedule = (fn: () => void, delay: number) => {
      timeoutRef.current = setTimeout(fn, delay)
    }

    if (phase === "typing") {
      if (displayed.length < current.length) {
        schedule(() => setDisplayed(current.slice(0, displayed.length + 1)), typingSpeed)
      } else {
        schedule(() => setPhase("pausing"), pauseDuration)
      }
    } else if (phase === "pausing") {
      schedule(() => setPhase("deleting"), 0)
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        schedule(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed)
      } else {
        const next = (index + 1) % texts.length
        if (!loop && next === 0) return
        schedule(() => {
          setIndex(next)
          setPhase("typing")
        }, 200)
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [displayed, phase, index, texts, typingSpeed, deletingSpeed, pauseDuration, loop])

  return (
    <span className={className}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}

export default TypewriterText
