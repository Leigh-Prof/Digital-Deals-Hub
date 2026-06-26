'use client'

import { SearchBar } from './SearchBar'
import { CategoryPills } from './CategoryPills'
import { ProductGrid } from './ProductGrid'
import { useProductFilter } from '@/hooks/useProductFilter'
import type { Category, Product } from '@/lib/types'

interface HomeProductClientProps {
  products: Product[]
  featured: Product[]
  categories: Category[]
}

export function HomeProductClient({ products, featured, categories }: HomeProductClientProps) {
  const { query, setQuery, activeCategory, setActiveCategory, sortOption, setSortOption, filtered } =
    useProductFilter(products)

  const isFiltering = !!query || activeCategory !== 'all'
  const featuredFiltered = featured.filter(p =>
    !query && activeCategory === 'all' ? true : filtered.some(f => f.id === p.id)
  )

  return (
    <>
      <SearchBar value={query} onChange={setQuery} resultCount={filtered.length} />
      <CategoryPills categories={categories} active={activeCategory} onSelect={setActiveCategory} />

      {!isFiltering && featuredFiltered.length > 0 && (
        <div id="products">
          <ProductGrid products={featuredFiltered} title="Featured Picks" />
        </div>
      )}

      <div id={isFiltering ? 'products' : 'all-products'}>
        <ProductGrid
          products={filtered}
          title={isFiltering ? `Results (${filtered.length})` : 'Browse Everything'}
          showSort
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </div>
    </>
  )
}
