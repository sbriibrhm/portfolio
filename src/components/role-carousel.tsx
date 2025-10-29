"use client"

import * as React from "react"

const roles = ["Product Designer", "UX Designer", "Prompt Engineer", "AI Trainer"]

export function RoleCarousel() {
  const [currentRoleIndex, setCurrentRoleIndex] = React.useState(0)
  const [isPaused, setIsPaused] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsPaused(true)
      return
    }

    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
      }
    }, 3000) // Change role every 3 seconds

    return () => clearInterval(interval)
  }, [isPaused])

  const handleMouseEnter = () => setIsPaused(true)
  const handleMouseLeave = () => setIsPaused(false)

  return (
    <div
      ref={containerRef}
      className="inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      tabIndex={0}
    >
      <span 
        className="inline-block min-w-[12ch] sm:min-w-[16ch] md:min-w-[20ch] text-primary relative transition-all duration-500"
        key={currentRoleIndex}
      >
        {roles[currentRoleIndex]}
      </span>
    </div>
  )
}

