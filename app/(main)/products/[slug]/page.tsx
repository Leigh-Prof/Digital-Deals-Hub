import { notFound } from 'next/navigation'
import { getProduct, getRelatedProducts } from '@/lib/queries'
import { ProductDetail } from '@/components/product/ProductDetail'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.slug)
  if (!product) return { title: 'Not Found' }
  return {
    title: `${product.title} — Digital Deals Hub`,
    description: product.short_description,
    openGraph: {
      title: product.title,
      description: product.short_description,
      images: [{ url: product.thumbnail_url }],
    },
  }
}

export const revalidate = 60

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.slug)
  if (!product) notFound()

  const related = await getRelatedProducts(product.category, product.slug)

  return <ProductDetail product={product} related={related} />
}
