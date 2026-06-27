import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { BottomNav } from './BottomNav'
import { getCategories } from '@/lib/queries'

export async function AppShell({ children }: { children: React.ReactNode }) {
  const categories = await getCategories()
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-16 md:pb-0">
      {/* Announcement banner */}
      <div className="sticky top-0 z-[60] w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 py-2 px-4 text-center text-sm font-semibold text-white tracking-wide shadow-md">
        🎉 More courses &amp; digital products coming soon — stay tuned!
      </div>
      <Navbar />
      <main>{children}</main>
      <Footer categories={categories} />
      <BottomNav />
    </div>
  )
}
