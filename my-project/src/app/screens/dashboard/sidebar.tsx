"use client"

import type React from "react"
import { usePathname } from "next/navigation"

import { Heart, Home, Package, PlusCircle, ShoppingBag, Tag, Trophy, UserIcon, Users, Wallet } from "lucide-react"
import { CustomNavLink } from "@/app/components/common/Design"

import { Button } from "@/app/components/ui/button"
import { cn } from "@/app/lib/utils"

interface SidebarProps {
  userType: string | null
  collapsed?: boolean
}

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
  userTypes: string[]
}

export function Sidebar({ userType, collapsed = false }: SidebarProps) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      userTypes: ["admin", "seller", "buyer"],
    },
    {
      title: "My Products",
      href: "/dashboard/my-products",
      icon: Package,
      userTypes: ["admin", "seller"],
    },
    {
      title: "Create Product",
      href: "/dashboard/create-product",
      icon: PlusCircle,
      userTypes: ["admin", "seller"],
    },
    {
      title: "All Users",
      href: "/dashboard/users",
      icon: Users,
      userTypes: ["admin"],
    },
    {
      title: "All Products",
      href: "/admin/dashboard/products",
      icon: ShoppingBag,
      userTypes: ["admin"],
    },
    {
      title: "Categories",
      href: "/dashboard/categories",
      icon: Tag,
      userTypes: ["admin"],
    },
    {
      title: "Winning Bids",
      href: "/dashboard/winning-bids",
      icon: Trophy,
      userTypes: ["admin", "seller", "buyer"],
    },
    {
      title: "Wallet",
      href: "/dashboard/wallet",
      icon: Wallet,
      userTypes: ["admin", "seller", "buyer"],
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: UserIcon,
      userTypes: ["admin", "seller", "buyer"],
    },
  ]

  const filteredNavItems = navItems.filter((item) => item.userTypes.includes(userType || ""))

  return (
    <div className="flex h-full flex-col gap-2 p-4">
      <nav className="grid gap-1 px-2">
        {filteredNavItems.map((item) => (
          <CustomNavLink
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
            className={cn("flex items-center p-2", collapsed ? "h-12 w-12 justify-center" : "w-full")}
          >
            <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
            {!collapsed && <span>{item.title}</span>}
          </CustomNavLink>
        ))}
      </nav>
    </div>
  )
}
