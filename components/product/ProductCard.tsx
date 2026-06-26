'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

const categoryColors: Record<string, string> = {
  marketing: 'from-violet-600 to-purple-700',
  ai: 'from-cyan-500 to-blue-600',
  design: 'from-purple-500 to-indigo-600',
  ebooks: 'from-emerald-500 to-green-600',
  freelancing: 'from-orange-500 to-amber-600',
  productivity: 'from-red-500 to-rose-600',
  'social-media': 'from-pink-500 to-fuchsia-600',
  'back-to-school': 'from-amber-500 to-yellow-600',
  kids: 'from-teal-500 to-emerald-600',
  learning: 'from-blue-600 to-indigo-700',
}

export function ProductCard({ product }: ProductCardProps) {
  const gradient = categoryColors[product.category] ?? 'from-slate-600 to-slate-700'
  const categoryLabel = product.category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 12px 32px 0 rgba(15,23,42,0.12)' }}
      transition={{ duration: 0.2 }}
      className="group bg-card-bg dark:bg-slate-900 rounded-card shadow-card border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden">
        {product.thumbnail_url ? (
          <img
            src={product.thumbnail_url}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-end p-4 group-hover:scale-105 transition-transform duration-300`}>
            <span className="text-white font-bold text-lg leading-tight line-clamp-2 drop-shadow">
              {product.title}
            </span>
          </div>
        )}
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2 py-1 rounded-badge text-xs font-semibold text-white gradient-brand">
          {categoryLabel}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-heading font-700 text-base text-primary dark:text-white line-clamp-2 leading-snug">
          {product.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 flex-1">
          {product.short_description}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between mt-2">
          <span className="px-2 py-1 rounded-badge bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">
            {product.file_type}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="flex items-center gap-1 text-sm font-semibold text-secondary hover:text-accent transition-colors"
          >
            View <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
