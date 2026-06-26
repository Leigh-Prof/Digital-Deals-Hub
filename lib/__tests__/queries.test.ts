import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock supabase client
vi.mock('../supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
  },
}))

import { supabase } from '../supabase'

describe('getProduct', () => {
  it('returns null when product not found', async () => {
    const mock = supabase.from('products') as any
    mock.single.mockResolvedValueOnce({ data: null, error: { message: 'Not found' } })
    const { getProduct } = await import('../queries')
    const result = await getProduct('nonexistent-slug')
    expect(result).toBeNull()
  })
})
