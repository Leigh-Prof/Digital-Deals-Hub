'use client'

import { clsx } from 'clsx'
import type { Category } from '@/lib/types'
import * as Icons from 'lucide-react'
import { LucideProps } from 'lucide-react'

interface CategoryPillsProps {
  categories: Category[]
  active: string
  onSelect: (slug: string) => void
}

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = (Icons as Record<string, React.ComponentType<LucideProps>>)[
    name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
  ]
  return Icon ? <Icon {...props} /> : null
}

export function CategoryPills({ categories, active, onSelect }: CategoryPillsProps) {
  const all = [{ name: 'All', slug: 'all', icon: 'layout-grid', color: '#2563EB' }, ...categories]

  return (
    <div id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
        {all.map(cat => (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={clsx(
              'snap-start shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
              active === cat.slug
                ? 'gradient-brand text-white border-transparent shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-secondary hover:text-secondary'
            )}
          >
            <DynamicIcon name={cat.icon} size={15} />
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}
