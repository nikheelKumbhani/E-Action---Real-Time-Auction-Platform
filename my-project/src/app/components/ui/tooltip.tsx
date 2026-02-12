"use client"

import * as React from "react"
import { cn } from "@/app/lib/utils"

const TooltipProvider = ({ children }: { children: React.ReactNode }) => children

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const TooltipTrigger = React.forwardRef<HTMLDivElement, TooltipTriggerProps>(
  ({ className, asChild, children, ...props }, ref) => {
    if (asChild) {
      const child = React.Children.only(children) as React.ReactElement<{ className?: string }>
      return React.cloneElement(child, {
        ref,
        ...props,
        className: cn(className, child.props.className),
      } as React.HTMLAttributes<HTMLElement>)
    }
    return (
      <div
        ref={ref}
        className={cn("inline-block", className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TooltipTrigger.displayName = "TooltipTrigger"

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: 'start' | 'center' | 'end' | 'right';
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, align = 'center', ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "z-50 hidden group-hover:block absolute rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md",
        {
          'left-0': align === 'start',
          'left-1/2 -translate-x-1/2': align === 'center',
          'right-0': align === 'end' || align === 'right'
        },
        className
      )}
      {...props}
    />
  )
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
