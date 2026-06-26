import { getProducts, getFeaturedProducts, getCategories } from '@/lib/queries'
import { HomeProductClient } from './HomeProductClient'

export async function HomeProductSection() {
  const [products, featured, categories] = await Promise.all([
    getProducts(),
    getFeaturedProducts(),
    getCategories(),
  ])
  return <HomeProductClient products={products} featured={featured} categories={categories} />
}
