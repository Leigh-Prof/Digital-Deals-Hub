'use client'

import { useState, useMemo } from 'react'
import type { Product, SortOption } from '@/lib/types'

export function filterProducts(
  products: Product[],
  query: string,
  activeCategory: string,
  sortOption: SortOption
): Product[] {
  const q = query.toLowerCase().trim()

  let filtered = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.short_description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })

  switch (sortOption) {
    case 'oldest':
      filtered = [...filtered].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      break
    case 'az':
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'most-viewed':
      filtered = [...filtered].sort((a, b) => b.views - a.views)
      break
    case 'newest':
    default:
      filtered = [...filtered].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  return filtered
}

export function useProductFilter(products: Product[]) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortOption, setSortOption] = useState<SortOption>('newest')

  const filtered = useMemo(
    () => filterProducts(products, query, activeCategory, sortOption),
    [products, query, activeCategory, sortOption]
  )

  return { query, setQuery, activeCategory, setActiveCategory, sortOption, setSortOption, filtered }
}
