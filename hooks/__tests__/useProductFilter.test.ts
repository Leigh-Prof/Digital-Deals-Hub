import { describe, it, expect } from 'vitest'
import { filterProducts } from '../useProductFilter'
import type { Product } from '@/lib/types'

const products: Product[] = [
  {
    id: '1', slug: 'biz-plan', title: 'Business Plan Template',
    description: 'A business plan', short_description: 'Business plan',
    thumbnail_url: '', google_drive_url: '', category: 'business',
    tags: ['PDF'], file_type: 'PDF', featured: false, hidden: false,
    views: 10, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: '2', slug: 'fb-ads', title: 'Facebook Ads Guide',
    description: 'Facebook advertising guide', short_description: 'FB ads',
    thumbnail_url: '', google_drive_url: '', category: 'marketing',
    tags: ['PDF', 'Guide'], file_type: 'PDF', featured: false, hidden: false,
    views: 50, created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z',
  },
]

describe('filterProducts', () => {
  it('returns all products when no query or category', () => {
    expect(filterProducts(products, '', 'all', 'newest')).toHaveLength(2)
  })

  it('filters by title query (case-insensitive)', () => {
    const result = filterProducts(products, 'facebook', 'all', 'newest')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('fb-ads')
  })

  it('filters by category', () => {
    const result = filterProducts(products, '', 'business', 'newest')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('biz-plan')
  })

  it('sorts by most-viewed descending', () => {
    const result = filterProducts(products, '', 'all', 'most-viewed')
    expect(result[0].slug).toBe('fb-ads')
  })

  it('sorts A-Z by title', () => {
    const result = filterProducts(products, '', 'all', 'az')
    expect(result[0].title).toBe('Business Plan Template')
  })
})
