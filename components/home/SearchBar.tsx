'use client'

import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  resultCount: number
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div id="search" className="sticky top-16 z-40 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-sm py-4 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Search products, categories, tags..."
            className="w-full pl-11 pr-10 py-3 rounded-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-primary dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition"
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {value && (
          <p className="text-center text-xs text-slate-400 mt-2">
            {resultCount} result{resultCount !== 1 ? 's' : ''} for &quot;{value}&quot;
          </p>
        )}
      </div>
    </div>
  )
}
