type HoldingLogoProps = { className?: string }

export function HoldingLogo({ className }: HoldingLogoProps) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className}>
      <path
        d="M0,200L84.96,0h36.31L36.31,200H0Z"
        fill="currentColor"
      />
      <polygon
        points="200 127.21 188.73 107.53 157.57 126.97 157.57 88.05 135.42 88.05 135.42 126.97 104.27 107.53 92.99 127.21 126.89 144.06 92.99 160.84 104.27 180.52 135.42 161.14 135.42 200 157.57 200 157.57 161.14 188.73 180.52 200 160.84 166.11 144.06 200 127.21"
        fill="var(--primary)"
        className="[transform-box:fill-box] [transform-origin:center] animate-spin-asterisk"
      />
    </svg>
  )
}
