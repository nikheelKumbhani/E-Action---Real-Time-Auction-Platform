"use client"

import { useState } from "react"
import { Bell, LogOut, Menu, MessageSquare, Settings, User } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logOut } from "@/app/redux/features/authSlice"
import { useUserProfile } from "@/app/hooks/useUserProfile"
import { ShoppingBag } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar"
import { Button } from "@/app/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/app/components/ui/sheet"
import { cn } from "@/app/lib/utils"
import { Sidebar } from "@/app/screens/dashboard/sidebar"

export const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { role, isLoggedIn } = useUserProfile();

  const handleLogout = async () => {
    await dispatch(logOut())
    navigate("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-none">
            <Sidebar userType={role} />
          </SheetContent>
        </Sheet>

        <div className="flex h-16 items-center px-4">
            <ShoppingBag className="h-6 w-6" />
            <span className="mr-4">Auction Hub</span>
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="hidden sm:flex"
            >
              Home
            </Button>
        </div>

        <div className="flex items-center gap-2 md:ml-auto md:gap-4">

  

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.photo || "/placeholder-user.jpg"} alt={user?.name || "User"} />
                  <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user?.name || "My Account"}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className={cn(
          "hidden border-r bg-background md:block transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-16"
        )}>
          <Sidebar userType={role} collapsed={!isSidebarOpen} />
        </aside>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
