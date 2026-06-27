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

      {/* Coming soon banner */}
      <div className="mx-auto max-w-6xl px-4 pb-8">
        <div className="rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 py-8 px-6 text-center shadow-lg">
          <p className="text-2xl font-bold text-white mb-1">🚀 More Courses & Products Coming Soon!</p>
          <p className="text-white/80 text-sm">We are constantly adding new digital products. Stay tuned and check back often!</p>
        </div>
      </div>

      <FAQSection />
    </>
  )
}
