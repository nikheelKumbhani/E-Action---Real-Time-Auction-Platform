"use client"

import { ShoppingBag } from "lucide-react"
import { CustomNavLink } from "@/app/components/common/Design"
import { cn } from "@/app/lib/utils"
import { usePathname } from "next/navigation"

export function DashboardHeader() {
  const pathname = usePathname()
  
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <CustomNavLink
          href="/dashboard"
          isActive={pathname === "/dashboard"}
          className="flex items-center gap-2 font-semibold"
        >
          <ShoppingBag className="h-6 w-6" />
          <span>Auction Hub</span>
        </CustomNavLink>
      </div>
    </header>
  )
}
