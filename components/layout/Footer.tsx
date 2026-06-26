import Link from 'next/link'
import type { Category } from '@/lib/types'

interface FooterProps {
  categories: Category[]
}

export function Footer({ categories }: FooterProps) {
  const half = Math.ceil(categories.length / 2)
  const col1 = categories.slice(0, half)
  const col2 = categories.slice(half)

  return (
    <footer className="bg-primary text-white mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src="/logo.jpg" alt="Digital Deals Hub" className="h-10 w-auto mb-4 brightness-0 invert" />
            <p className="text-slate-400 text-sm leading-relaxed">
              Your ultimate digital products library. Premium resources for creators, freelancers, and entrepreneurs.
            </p>
          </div>

          {/* Categories col 1 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2">
              {col1.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories col 2 */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">&nbsp;</h4>
            <ul className="space-y-2">
              {col2.map(cat => (
                <li key={cat.slug}>
                  <Link href={`/category/${cat.slug}`} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Disclaimer</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Files are curated digital resources from publicly available sources. Links may occasionally become unavailable. Contact us if you encounter any issues.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} Digital Deals Hub. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
