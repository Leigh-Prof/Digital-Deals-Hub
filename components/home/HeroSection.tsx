'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-28 px-4">
      {/* Animated blobs */}
      <motion.div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #2563EB, #7C3AED)' }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #7C3AED, #06B6D4)' }}
        animate={{ x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 dark:bg-secondary/20 text-secondary text-sm font-medium mb-6"
        >
          <Sparkles size={14} />
          Premium Digital Resources
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-heading font-800 text-primary dark:text-white leading-tight mb-6"
        >
          Your Ultimate{' '}
          <span className="text-gradient">Digital Products</span>{' '}
          Library
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Access premium digital resources carefully curated to help creators, freelancers, entrepreneurs, marketers, students, and professionals work smarter and grow faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/#products"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-btn font-semibold text-white gradient-brand hover:opacity-90 transition-opacity shadow-lg"
          >
            Browse Products <ArrowRight size={18} />
          </Link>
          <Link
            href="/#products"
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-btn font-semibold text-primary dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-secondary transition-colors"
          >
            Latest Collection
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
