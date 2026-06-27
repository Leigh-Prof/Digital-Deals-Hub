import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getCategories, getProductsByCategory } from '@/lib/queries'
import { ProductCard } from '@/components/product/ProductCard'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getCategories()
  const cat = categories.find(c => c.slug === params.slug)
  if (!cat) return { title: 'Not Found' }
  return {
    title: `${cat.name} — Digital Deals Hub`,
    description: `Browse all ${cat.name} digital products and resources.`,
  }
}

export const revalidate = 60

export default async function CategoryPage({ params }: Props) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(params.slug),
  ])

  const category = categories.find(c => c.slug === params.slug)
  if (!category) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-primary dark:text-white font-medium">{category.name}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-heading font-800 text-primary dark:text-white">
          {category.name}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          {products.length} resource{products.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium">No products in this category yet</p>
          <Link href="/" className="text-secondary text-sm mt-4 inline-block hover:underline">
            Browse all products →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
