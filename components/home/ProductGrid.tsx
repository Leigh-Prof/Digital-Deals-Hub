'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product, SortOption } from '@/lib/types'
import { Skeleton } from '@/components/ui/skeleton'

const PAGE_SIZE = 20

interface ProductGridProps {
  products: Product[]
  title: string
  showSort?: boolean
  sortOption?: SortOption
  onSortChange?: (s: SortOption) => void
}

export function ProductGrid({ products, title, showSort, sortOption, onSortChange }: ProductGridProps) {
  const [page, setPage] = useState(1)
  const visible = products.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < products.length

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-heading font-700 text-primary dark:text-white">{title}</h2>
        {showSort && onSortChange && (
          <select
            value={sortOption}
            onChange={e => onSortChange(e.target.value as SortOption)}
            className="text-sm border border-slate-200 dark:border-slate-700 rounded-btn px-3 py-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-secondary/40"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A–Z</option>
            <option value="most-viewed">Most Viewed</option>
          </select>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-2">Try a different search or category</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="px-8 py-3 rounded-btn font-semibold text-secondary border border-secondary hover:gradient-brand hover:text-white transition-all duration-200"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Skeleton className="h-8 w-48 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-card overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
