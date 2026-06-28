"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import {
  FolderKanban,
  LayoutDashboard,
  Menu,
  X,
  LogOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  {
    href: "/admin/dashboard/our-works",
    label: "Our Works",
    icon: FolderKanban,
  },
]

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#f6f3ea]">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen ? 0 : -280 }}
        className="fixed left-0 top-0 z-50 h-full w-64 border-r border-[rgba(22,33,28,0.1)] bg-white shadow-sm transition-transform lg:static lg:translate-x-0"
      >
        <div className="flex h-16 items-center justify-between border-b border-[rgba(22,33,28,0.1)] px-5">
          <Link href="/admin/dashboard/our-works" className="text-sm font-bold tracking-tight text-[#16211c]">
            RACTYSH Admin
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-[#617067] hover:text-[#16211c]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="space-y-1 p-4">
          {sidebarLinks.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + "/")
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                    : "text-[#617067] hover:bg-[rgba(22,33,28,0.04)] hover:text-[#16211c]"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-[rgba(22,33,28,0.1)] p-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#617067] transition-colors hover:bg-[rgba(22,33,28,0.04)] hover:text-[#16211c]"
          >
            <LogOut className="h-4 w-4" />
            Back to Site
          </Link>
        </div>
      </motion.aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[rgba(22,33,28,0.1)] bg-white/80 px-5 backdrop-blur-md">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#617067] hover:text-[#16211c]"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2 text-sm text-[#617067]">
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </div>
        </header>
        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
