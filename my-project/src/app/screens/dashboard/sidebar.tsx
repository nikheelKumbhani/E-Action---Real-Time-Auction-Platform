"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { NavLink } from "react-router-dom"
import { Gavel, Home, Package, PlusCircle, ShoppingBag, Tag, Trophy, UserIcon, Users, Wallet } from "lucide-react"
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
  section: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

export function Sidebar({ userType, collapsed = false }: SidebarProps) {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    // Overview Section
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
      userTypes: ["admin", "seller", "buyer"],
      section: "Overview"
    },

    // Product Management Section
    {
      title: "My Products",
      href: "/dashboard/my-products",
      icon: Package,
      userTypes: ["admin", "seller"],
      section: "Products"
    },
    {
      title: "Create Product",
      href: "/dashboard/create-product",
      icon: PlusCircle,
      userTypes: ["admin", "seller"],
      section: "Products"
    },
    {
      title: "All Products",
      href: "/admin/dashboard/products",
      icon: ShoppingBag,
      userTypes: ["admin"],
      section: "Products"
    },

    // User Management Section
    {
      title: "All Users",
      href: "/dashboard/users",
      icon: Users,
      userTypes: ["admin"],
      section: "Management"
    },
    {
      title: "Categories",
      href: "/dashboard/categories",
      icon: Tag,
      userTypes: ["admin"],
      section: "Management"
    },

    // Marketplace Section
    {
      title: "Winning Bids",
      href: "/dashboard/winning-bids",
      icon: Trophy,
      userTypes: ["admin", "seller", "buyer"],
      section: "Marketplace"
    },

    // Account Section
    {
      title: "Wallet",
      href: "/dashboard/wallet",
      icon: Wallet,
      userTypes: ["admin", "seller", "buyer"],
      section: "Account"
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: UserIcon,
      userTypes: ["admin", "seller", "buyer"],
      section: "Account"
    },
  ]

  const filteredNavItems = navItems.filter((item) => item.userTypes.includes(userType || ""))

  // Group items by section
  const sections: NavSection[] = []
  const sectionMap = new Map<string, NavItem[]>()

  filteredNavItems.forEach(item => {
    if (!sectionMap.has(item.section)) {
      sectionMap.set(item.section, [])
    }
    sectionMap.get(item.section)!.push(item)
  })

  sectionMap.forEach((items, title) => {
    sections.push({ title, items })
  })

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo/Branding */}
      <div className={cn(
        "flex items-center gap-3 p-6 border-b border-gray-200",
        collapsed && "justify-center p-4"
      )}>
        <Gavel className="h-8 w-8 text-emerald-600 flex-shrink-0" />
        {!collapsed && (
          <span className="text-xl font-bold text-gray-900">Auction Hub</span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                      collapsed && "justify-center",
                      isActive
                        ? "bg-emerald-50 text-emerald-700 border-l-4 border-emerald-600 pl-2"
                        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                    )}
                  >
                    <Icon className={cn(
                      "h-5 w-5 flex-shrink-0",
                      isActive ? "text-emerald-600" : "text-gray-600"
                    )} />
                    {!collapsed && (
                      <span className="font-medium text-sm">{item.title}</span>
                    )}
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  )
}
