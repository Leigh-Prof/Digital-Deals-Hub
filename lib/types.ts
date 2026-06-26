export interface Product {
  id: string
  slug: string
  title: string
  description: string
  short_description: string
  thumbnail_url: string
  google_drive_url: string
  category: string
  tags: string[]
  file_type: string
  featured: boolean
  hidden: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  created_at: string
}

export type SortOption = 'newest' | 'oldest' | 'az' | 'most-viewed'
