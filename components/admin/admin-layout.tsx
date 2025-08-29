"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Store, UtensilsCrossed, Dumbbell, Newspaper, Settings, LogOut } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/admin", icon: Home },
  { name: "Boutiques", href: "/admin/boutiques", icon: Store },
  { name: "Restaurants", href: "/admin/restaurants", icon: UtensilsCrossed },
  { name: "Fitness", href: "/admin/fitness", icon: Dumbbell },
  { name: "Actualités", href: "/admin/news", icon: Newspaper },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
]

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" className="md:hidden fixed top-4 left-4 z-50">
            <Menu className="h-6 w-6 text-black" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-white border-r border-black">
          <div className="flex flex-col h-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-black">PRIMA CENTER</h2>
              <p className="text-sm text-gray-600">Administration</p>
            </div>
            <nav className="flex-1 px-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-colors ${
                      pathname === item.href
                        ? "bg-yellow-100 text-black border border-yellow-500"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="mr-3 h-5 w-5 text-black" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4">
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Déconnexion
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-black">
          <div className="p-6">
            <h2 className="text-xl font-bold text-black">PRIMA CENTER</h2>
            <p className="text-sm text-gray-600">Administration</p>
          </div>
          <nav className="flex-1 px-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-colors ${
                    pathname === item.href
                      ? "bg-yellow-100 text-black border border-yellow-500"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5 text-black" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="p-4">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64">
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
