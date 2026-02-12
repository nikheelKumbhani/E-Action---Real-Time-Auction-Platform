"use client"

import * as React from "react"
import { DateRange } from "react-day-picker"
import { cn } from "@/app/lib/utils"

interface CalendarProps {
  mode?: "single" | "range"
  selected?: Date | DateRange | undefined
  onSelect?: (date: Date | DateRange | undefined) => void
  className?: string
  initialFocus?: boolean
  numberOfMonths?: number
  defaultMonth?: Date
}

function Calendar({ mode = "single", selected, onSelect, className, ...props }: CalendarProps) {
  if (mode === "range") {
    return (
      <div className={className}>
        <input
          type="date"
          value={(selected as DateRange)?.from?.toISOString().split("T")[0] || ""}
          onChange={(e) => {
            const from = e.target.value ? new Date(e.target.value) : undefined;
            onSelect?.({ from, to: (selected as DateRange)?.to });
          }}
          className={cn(
            "w-full rounded-md border bg-background px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-ring"
          )}
        />
        <input
          type="date"
          value={(selected as DateRange)?.to?.toISOString().split("T")[0] || ""}
          onChange={(e) => {
            const to = e.target.value ? new Date(e.target.value) : undefined;
            onSelect?.({ from: (selected as DateRange)?.from, to });
          }}
          className={cn(
            "w-full mt-2 rounded-md border bg-background px-3 py-2 text-sm",
            "focus:outline-none focus:ring-2 focus:ring-ring"
          )}
        />
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value ? new Date(e.target.value) : undefined
    onSelect?.(date)
  }

  const dateValue = (selected as Date)?.toISOString().split("T")[0] || ""

  return (
    <div className={className}>
      <input
        type="date"
        value={dateValue}
        onChange={handleChange}
        className={cn(
          "w-full rounded-md border bg-background px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-ring"
        )}
      />
    </div>
  )
}

export { Calendar }
