'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Grid3x3 } from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/#search', label: 'Search', icon: Search },
  { href: '/#categories', label: 'Categories', icon: Grid3x3 },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-bg-dark border-t border-slate-200 dark:border-slate-800 flex">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex-1 flex flex-col items-center justify-center py-3 gap-1 text-xs font-medium transition-colors',
              active
                ? 'text-secondary'
                : 'text-slate-400 dark:text-slate-500'
            )}
          >
            <Icon size={20} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
