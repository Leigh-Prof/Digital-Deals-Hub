'use client'

import Link from 'next/link'
import { Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useState } from 'react'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-bg-dark/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo.jpg"
              alt="Digital Deals Hub"
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#products" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary transition-colors">
              Products
            </Link>
            <Link href="/#categories" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary transition-colors">
              Categories
            </Link>
            <ThemeToggle />
            <Link
              href="/#products"
              className="px-4 py-2 rounded-btn text-sm font-semibold text-white gradient-brand hover:opacity-90 transition-opacity"
            >
              Browse All
            </Link>
          </nav>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-btn hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-4 flex flex-col gap-3">
            <Link href="/#products" className="text-sm font-medium px-2 py-1" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link href="/#categories" className="text-sm font-medium px-2 py-1" onClick={() => setMenuOpen(false)}>Categories</Link>
            <Link
              href="/#products"
              className="mt-2 px-4 py-2 rounded-btn text-sm font-semibold text-white gradient-brand text-center"
              onClick={() => setMenuOpen(false)}
            >
              Browse All
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
