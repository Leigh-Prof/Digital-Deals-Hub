'use client'

import { ExternalLink, CheckCircle2, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { DisclaimerBox } from './DisclaimerBox'
import { ProductCard } from './ProductCard'
import type { Product } from '@/lib/types'
import { incrementViews } from '@/lib/queries'
import { motion } from 'framer-motion'

interface ProductDetailProps {
  product: Product
  related: Product[]
}

export function ProductDetail({ product, related }: ProductDetailProps) {
  useEffect(() => {
    incrementViews(product.id)
  }, [product.id])

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.title, url: window.location.href })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-secondary transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Library
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left: main content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-card overflow-hidden shadow-card-hover"
          >
            <img
              src={product.thumbnail_url || 'https://placehold.co/800x450/2563EB/FFFFFF?text=Digital+Product'}
              alt={product.title}
              className="w-full aspect-video object-cover"
            />
          </motion.div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full gradient-brand text-white text-xs font-semibold">
              {product.category.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
            </span>
            {product.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <div>
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-heading font-800 text-primary dark:text-white leading-tight">
                {product.title}
              </h1>
              <button onClick={handleShare} className="shrink-0 p-2 rounded-btn hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors" aria-label="Share">
                <Share2 size={18} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-lg font-heading font-700 text-primary dark:text-white mb-3">Description</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{product.description}</p>
          </div>

          {/* File info */}
          <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-400 border-t border-b border-slate-100 dark:border-slate-800 py-4">
            <span><strong className="text-primary dark:text-white">Format:</strong> {product.file_type}</span>
            <span><strong className="text-primary dark:text-white">Updated:</strong> {new Date(product.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span><strong className="text-primary dark:text-white">Views:</strong> {product.views.toLocaleString()}</span>
          </div>

          {/* Disclaimer */}
          <DisclaimerBox />
        </div>

        {/* Right: download sidebar */}
        <div className="space-y-6">
          <div className="sticky top-24 bg-white dark:bg-slate-900 rounded-card shadow-card border border-slate-100 dark:border-slate-800 p-6 space-y-5">
            <h3 className="font-heading font-700 text-primary dark:text-white text-lg">Get This Resource</h3>

            <a
              href={product.google_drive_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 rounded-btn font-semibold text-white gradient-brand hover:opacity-90 transition-opacity shadow-lg"
            >
              <ExternalLink size={18} />
              Open Google Drive
            </a>

            <ul className="space-y-2">
              {['Instant Access', 'Safe Google Drive Link', 'Curated Collection'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <CheckCircle2 size={16} className="text-success shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-heading font-700 text-primary dark:text-white mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {related.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  )
}
