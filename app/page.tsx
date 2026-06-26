import { Suspense } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { FAQSection } from '@/components/home/FAQSection'
import { HomeProductSection } from '@/components/home/HomeProductSection'
import { ProductGridSkeleton } from '@/components/home/ProductGrid'

export const revalidate = 60

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<ProductGridSkeleton />}>
        <HomeProductSection />
      </Suspense>
      <FAQSection />
    </>
  )
}
