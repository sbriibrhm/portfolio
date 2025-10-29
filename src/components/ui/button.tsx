"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative overflow-hidden cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-lg transition-all active:scale-95",
        gradient: "bg-gradient-to-r from-violet-600 to-blue-500 text-white transition-all shadow-[0_0_60px_rgba(124,58,237,0.2),0_0_120px_rgba(139,92,246,0.2),0_0_180px_rgba(109,40,217,0.2)] hover:scale-[1.01] hover:-translate-y-0.5 active:scale-[0.99]",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 hover:scale-105 hover:shadow-lg transition-all active:scale-95",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 hover:scale-105 hover:shadow-lg transition-all active:scale-95",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:scale-105 hover:shadow-lg transition-all active:scale-95",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 hover:scale-105 transition-all active:scale-95",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  const [ripples, setRipples] = React.useState<Array<{ x: number; y: number; id: number }>>([])

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (props.onClick) {
      ;(props.onClick as any)(e)
    }

    // Create ripple effect
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const newRipple = {
      x,
      y,
      id: Date.now(),
    }

    setRipples((prev) => [...prev, newRipple])

    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 600)
  }

  if (asChild) {
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), props.className)}
      >
        {props.children}
      </Comp>
    )
  }

  return (
    <span className="relative inline-block">
      <Comp
        data-slot="button"
        className={cn("group", buttonVariants({ variant, size, className }))}
        onClick={handleClick}
        {...props}
      >
        {/* Gradient shimmer effect for gradient variant */}
        {variant === 'gradient' && (
          <>
            {/* Shimmer sweep effect */}
            <span 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] transition-all duration-700"
              style={{
                transform: 'translateX(-200%)',
              }}
            />
            
            {/* Border dance effect */}
            <span 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
              style={{
                backgroundPosition: '200% center',
                backgroundSize: '200% 100%',
                animation: 'border-dance 4s linear infinite',
              }}
            />
          </>
        )}
        
        {/* Ripple effects */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full bg-white/30 pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
              width: "100px",
              height: "100px",
              animation: "ripple 0.6s ease-out",
            }}
          />
        ))}
        
        {/* Content */}
        <span className="relative z-10">{props.children}</span>
      </Comp>
    </span>
  )
}

export { Button, buttonVariants }

