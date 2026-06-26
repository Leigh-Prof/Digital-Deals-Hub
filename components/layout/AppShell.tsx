import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { BottomNav } from './BottomNav'
import { getCategories } from '@/lib/queries'

export async function AppShell({ children }: { children: React.ReactNode }) {
  const categories = await getCategories()
  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark pb-16 md:pb-0">
      <Navbar />
      <main>{children}</main>
      <Footer categories={categories} />
      <BottomNav />
    </div>
  )
}
