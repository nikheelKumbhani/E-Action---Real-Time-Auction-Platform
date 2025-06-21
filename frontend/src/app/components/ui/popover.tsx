"use client"

import * as React from "react"
import { cn } from "@/app/lib/utils"

const Popover = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

type PopoverTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
}

const PopoverTrigger = React.forwardRef<HTMLButtonElement, PopoverTriggerProps>(
  ({ children, asChild, ...props }, ref) => {
    if (asChild) {
      return (
        <span {...props}>
          {React.isValidElement(children) &&
            React.cloneElement(children, { ref } as any)}
        </span>
      )
    }
    return (
      <button ref={ref} {...props}>
        {children}
      </button>
    )
  }
)
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "center" | "end" }
>(({ className, align = "center", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md",
      align === "start" && "origin-top-left",
      align === "center" && "origin-top",
      align === "end" && "origin-top-right",
      className
    )}
    {...props}
  />
))
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
