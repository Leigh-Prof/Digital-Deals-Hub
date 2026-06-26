import { render, screen } from '@testing-library/react'
import { ProductCard } from '../ProductCard'
import type { Product } from '@/lib/types'

const mockProduct: Product = {
  id: '1',
  slug: 'test-product',
  title: 'Test Product',
  description: 'Full description',
  short_description: 'Short desc',
  thumbnail_url: 'https://example.com/img.jpg',
  google_drive_url: 'https://drive.google.com/test',
  category: 'business',
  tags: ['PDF', 'Template'],
  file_type: 'PDF',
  featured: false,
  hidden: false,
  views: 42,
  created_at: '2026-06-26T00:00:00Z',
  updated_at: '2026-06-26T00:00:00Z',
}

describe('ProductCard', () => {
  it('renders title and short description', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Short desc')).toBeInTheDocument()
  })

  it('renders file type badge', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('PDF')).toBeInTheDocument()
  })

  it('links to product detail page', () => {
    render(<ProductCard product={mockProduct} />)
    const link = screen.getByRole('link', { name: /view/i })
    expect(link).toHaveAttribute('href', '/products/test-product')
  })
})
