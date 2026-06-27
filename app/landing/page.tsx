'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  Check, Star, ChevronDown, ArrowUp, MessageCircle, Zap,
  Download, TrendingUp, Users, ShieldCheck, Smartphone,
  BookOpen, Layers, Palette, Brain, BarChart2,
  Video, PenTool, Briefcase, GraduationCap, Moon, Sun
} from 'lucide-react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

// ─── constants ───────────────────────────────────────────────────────────────

const RAKET_URL = 'https://www.raket.ph/johnraleighrosalita/products/sulit-bundle-50-premium-digital-products-instant-download-resell-rights-included?src=share'
const TIMER_KEY = 'ddh_landing_timer_start'
const TIMER_DURATION = 15 * 60

// ─── hooks ───────────────────────────────────────────────────────────────────

function useCountdown() {
  const [seconds, setSeconds] = useState<number>(TIMER_DURATION)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    let start = Number(localStorage.getItem(TIMER_KEY))
    if (!start) {
      start = Date.now()
      localStorage.setItem(TIMER_KEY, String(start))
    }
    function tick() {
      const elapsed = Math.floor((Date.now() - start) / 1000)
      const remaining = TIMER_DURATION - elapsed
      if (remaining <= 0) { setSeconds(0); setExpired(true) }
      else setSeconds(remaining)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return {
    m: String(Math.floor(seconds / 60)).padStart(2, '0'),
    s: String(seconds % 60).padStart(2, '0'),
    expired,
  }
}

// ─── data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { icon: Brain,         label: 'AI Prompt Bundle',      desc: 'Hundreds of proven prompts for ChatGPT, Midjourney & more', value: '₱499', gradient: 'from-cyan-500 to-blue-600' },
  { icon: Palette,       label: 'Canva Templates',        desc: 'Social posts, presentations, logos & brand kits',           value: '₱399', gradient: 'from-purple-500 to-indigo-600' },
  { icon: BarChart2,     label: 'Marketing Resources',    desc: 'Strategies, checklists, and campaign frameworks',           value: '₱599', gradient: 'from-violet-600 to-purple-700' },
  { icon: TrendingUp,    label: 'Facebook Ads Vault',     desc: 'Ad copy, creatives & audience targeting guides',            value: '₱699', gradient: 'from-blue-600 to-indigo-700' },
  { icon: Briefcase,     label: 'Business Templates',     desc: 'Contracts, proposals, invoices & SOPs',                     value: '₱499', gradient: 'from-orange-500 to-amber-600' },
  { icon: Video,         label: 'Video Editing Assets',   desc: 'Transitions, presets, overlays & LUTs',                     value: '₱399', gradient: 'from-red-500 to-rose-600' },
  { icon: BookOpen,      label: 'Ebooks & Guides',        desc: 'In-depth reads on business, money & productivity',          value: '₱499', gradient: 'from-emerald-500 to-green-600' },
  { icon: PenTool,       label: 'Copywriting Resources',  desc: 'Swipe files, scripts & headline formulas',                  value: '₱499', gradient: 'from-pink-500 to-fuchsia-600' },
  { icon: Layers,        label: 'Social Media Kits',      desc: 'Content calendars, captions & growth guides',               value: '₱399', gradient: 'from-amber-500 to-yellow-600' },
  { icon: GraduationCap, label: 'Learning Materials',     desc: 'Back-to-school packs, notes & study kits',                  value: '₱499', gradient: 'from-teal-500 to-emerald-600' },
]

const PROBLEMS = [
  'Buying templates one by one at full price',
  'Wasting money on poor-quality products',
  'Spending hours searching across the internet',
  'Downloading outdated, unusable files',
  'Not knowing where or how to start',
  'Feeling overwhelmed and losing momentum',
]

const SOLUTIONS = [
  { icon: Download,    text: 'Instant download — no waiting, no shipping' },
  { icon: Layers,      text: 'Everything is organized by category' },
  { icon: Users,       text: 'Beginner friendly — no experience needed' },
  { icon: ShieldCheck, text: 'Carefully curated — only the best materials' },
  { icon: Smartphone,  text: 'Works on phone, tablet, or laptop' },
  { icon: TrendingUp,  text: 'Ever-growing — new products added regularly, yours for life' },
]

const TESTIMONIALS = [
  { name: 'John Reyes',       role: 'Freelancer, Cebu',          stars: 5, text: 'Sobrang organized ng lahat ng files! I saved so much time because I did not have to search everywhere. Worth it talaga ang ₱699.' },
  { name: 'Danica Santos',    role: 'Online Seller, Manila',     stars: 5, text: 'I was skeptical at first but the Canva templates alone are already worth more than the price. Recommend ko to sa lahat!' },
  { name: 'Matthew Cruz',     role: 'Student, Davao',            stars: 5, text: 'Perfect for beginners like me. Everything is labeled and easy to find. Ang daming laman — grabe.' },
  { name: 'Stella Villanueva',role: 'VA, Quezon City',           stars: 5, text: 'I use the AI prompts and business templates daily now. My clients are impressed with the quality of my work. Salamat!' },
  { name: 'Charice Mendoza',  role: 'Content Creator, Batangas', stars: 5, text: 'The social media kits saved me hours of content planning every week. This is the best investment I made this year.' },
]

const FAQS = [
  { q: 'How do I receive access after payment?',    a: 'After clicking the button, you will be taken to our secure checkout on Raket.ph. Once payment is completed, your download link is sent to you instantly and automatically — no waiting, no manual steps.' },
  { q: 'Is this a one-time payment for lifetime access?', a: 'Yes! You pay ₱699 once and receive lifetime access to all included materials — plus any new products we add in the future. No subscriptions, no hidden fees, ever.' },
  { q: 'Will new products be added to my library?', a: 'Absolutely. We regularly add new digital products to the collection. Once you purchase, every new addition is automatically yours — your library keeps growing at no extra cost.' },
  { q: 'How fast is delivery?',                     a: 'Delivery is instant and automatic through Raket.ph. As soon as your payment is confirmed, your download link is sent to your email right away.' },
  { q: 'Can beginners use these products?',         a: 'Yes! All materials are organized and labeled clearly by category. No technical skill or experience is needed to start using them.' },
  { q: 'Is it safe to pay through Raket.ph?',       a: 'Yes. Raket.ph is a trusted and established platform for digital products in the Philippines. Your payment is processed securely and your access is delivered automatically.' },
  { q: 'Can I access it on my phone or tablet?',    a: 'Yes. All files are digital and accessible on any device — phone, tablet, or laptop — with internet access.' },
]

// ─── sub-components ──────────────────────────────────────────────────────────

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-widest uppercase mb-4 border border-blue-100 dark:border-blue-800">
      {children}
    </span>
  )
}

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

function CTAButton({ size = 'md', children }: { size?: 'md' | 'lg'; children: React.ReactNode }) {
  const base = 'inline-flex items-center justify-center gap-2 rounded-2xl font-bold text-white shadow-lg transition-all duration-200 active:scale-95 hover:opacity-90 hover:shadow-xl'
  const sizes = { md: 'px-7 py-3.5 text-base', lg: 'px-10 py-5 text-xl' }
  return (
    <motion.a
      href={RAKET_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${sizes[size]}`}
      style={{ background: 'linear-gradient(135deg,#2563EB 0%,#7C3AED 100%)' }}
    >
      {children}
    </motion.a>
  )
}

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9" />
  const isDark = resolvedTheme === 'dark'
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/15 border border-white/20 text-white hover:bg-white/25 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </motion.button>
  )
}

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800/50">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
      >
        <span>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={18} className="text-slate-400 dark:text-slate-500 flex-shrink-0" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── page ────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const { m, s, expired } = useCountdown()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden transition-colors duration-300">

      {/* ── Sticky mobile CTA ────────────────────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-700 px-4 py-3 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-none">Lifetime Access</p>
          <p className="text-lg font-bold text-slate-900 dark:text-white">₱699 <span className="line-through text-slate-400 text-sm font-normal">₱4,980</span></p>
        </div>
        <CTAButton size="md">🚀 Get Access Now</CTAButton>
      </div>

      {/* ── Back to top ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 md:bottom-8 right-4 z-50 w-11 h-11 rounded-full shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <ArrowUp size={18} className="text-slate-600 dark:text-slate-300" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Messenger float ──────────────────────────────────────────────── */}
      <a
        href="https://www.facebook.com/digitaldealshub"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-16 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Message us on Facebook"
      >
        <MessageCircle size={22} className="text-white" />
      </a>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO  (always dark — this is the brand hero)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col" style={{ background: 'linear-gradient(160deg,#0f172a 0%,#1e3a8a 50%,#1e1b4b 100%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle,#ffffff 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
          <Image src="/logo.jpg" alt="Digital Deals Hub" width={120} height={40} className="h-10 w-auto rounded-lg" />
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a href={RAKET_URL} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 transition-colors">
              Get Access — ₱699
            </a>
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 py-16 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6"
          >
            <Zap size={14} /> Limited Introductory Price — Grab It Before It Changes
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Stop Spending Thousands<br className="hidden sm:block" /> on Digital Products.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg sm:text-xl text-blue-100/80 max-w-2xl mb-10 leading-relaxed"
          >
            Get <span className="text-white font-semibold">Instant Lifetime Access</span> to our Complete Curated Digital Products Library — worth ₱4,980 — for just <span className="text-yellow-400 font-bold">₱699</span>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <CTAButton size="lg">🚀 Get Instant Access Now</CTAButton>
            <motion.a
              href="#whats-inside" whileHover={{ scale: 1.03 }}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-lg font-semibold text-white border border-white/25 bg-white/10 backdrop-blur hover:bg-white/20 transition-colors"
            >
              📂 Preview What&apos;s Inside
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {[
              { icon: '✔', text: 'Lifetime Access' },
              { icon: '⚡', text: 'Instant Delivery' },
              { icon: '🎯', text: 'Beginner Friendly' },
              { icon: '📦', text: '50+ Products & Growing' },
            ].map(b => (
              <span key={b.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/90 text-sm font-medium backdrop-blur">
                {b.icon} {b.text}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Price badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.7 }}
          className="relative z-10 mx-auto mb-10 flex flex-wrap items-center justify-center gap-6 px-8 py-5 rounded-3xl bg-white/10 backdrop-blur border border-white/15 shadow-xl"
        >
          <div className="text-center">
            <p className="text-white/60 text-xs uppercase tracking-wider">Total Value</p>
            <p className="text-white text-2xl font-bold line-through opacity-50">₱4,980</p>
          </div>
          <div className="w-px h-10 bg-white/20 hidden sm:block" />
          <div className="text-center">
            <p className="text-white/60 text-xs uppercase tracking-wider">Today Only</p>
            <p className="text-yellow-400 text-4xl font-extrabold">₱699</p>
          </div>
          <div className="w-px h-10 bg-white/20 hidden sm:block" />
          <div className="text-center">
            <p className="text-white/60 text-xs uppercase tracking-wider">You Save</p>
            <p className="text-green-400 text-2xl font-bold">₱4,281</p>
          </div>
        </motion.div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="relative z-10 flex justify-center pb-8">
          <ChevronDown size={28} className="text-white/40" />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — THE STORY
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <SectionLabel>Our Story</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-6" style={{ fontFamily: 'Manrope, sans-serif' }}>
              We Did the Hard Work<br />So You Don&apos;t Have To
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-left space-y-4 text-lg">
              <p>For years, we spent countless hours searching for the best digital products. We attended expensive trainings. Bought countless templates. Purchased premium resources — one by one, at full price.</p>
              <p>We spent <strong className="text-slate-800 dark:text-slate-200">thousands of pesos</strong> on trial and error. Some products were amazing. Some were a complete waste of money. Over time, we learned to tell the difference.</p>
              <p>We carefully collected only the most useful, highest-quality materials and organized them into one clean, easy-to-access library.</p>
              <p>Now, instead of making you go through the same expensive journey, <strong className="text-slate-800 dark:text-slate-200">we&apos;ve already done the hard work for you.</strong></p>
              <p>Digital Deals Hub is your shortcut — everything you need in one place, ready to use today.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — THE PROBLEM
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <SectionLabel>Sound Familiar?</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Are You Tired of This?
            </h2>
          </FadeUp>
          <div className="grid sm:grid-cols-2 gap-4">
            {PROBLEMS.map((p, i) => (
              <FadeUp key={p} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-5 rounded-2xl border border-red-100 dark:border-red-900/40 bg-red-50 dark:bg-red-950/30">
                  <span className="text-red-500 text-xl flex-shrink-0 mt-0.5">❌</span>
                  <p className="text-slate-700 dark:text-slate-300 font-medium">{p}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={0.5} className="mt-12 text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              There is a better way. ✨
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — THE SOLUTION  (always dark — brand section)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5" style={{ background: 'linear-gradient(160deg,#0f172a 0%,#1e3a8a 100%)' }}>
        <div className="max-w-4xl mx-auto text-center">
          <FadeUp>
            <SectionLabel>The Solution</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Introducing Digital Deals Hub
            </h2>
            <p className="text-blue-200 text-lg mb-14 max-w-2xl mx-auto">
              Everything has already been collected, organized, and categorized. One payment. Instant access. Lifetime value.
            </p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SOLUTIONS.map(({ icon: Icon, text }, i) => (
              <FadeUp key={text} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/10 border border-white/10 backdrop-blur text-left">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-blue-300" />
                  </div>
                  <p className="text-white font-medium leading-snug mt-1">{text}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 5 — EVERYTHING YOU'LL GET
      ══════════════════════════════════════════════════════════════════ */}
      <section id="whats-inside" className="py-24 px-5 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-16">
            <SectionLabel>What&apos;s Inside</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Everything You&apos;ll Get
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 max-w-xl mx-auto">
              10 powerful categories. 50+ premium products — and we keep adding more. All organized and ready to use.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-16">
            {CATEGORIES.map(({ icon: Icon, label, desc, value, gradient }, i) => (
              <FadeUp key={label} delay={i * 0.06}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
                  className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm"
                >
                  <div className={`h-24 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
                    <Icon size={36} className="text-white/90" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{label}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-3">{desc}</p>
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold">
                      Worth {value}
                    </span>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>

          {/* Value comparison */}
          <FadeUp>
            <div className="rounded-3xl p-8 sm:p-12 text-center" style={{ background: 'linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%)' }}>
              <p className="text-blue-300 text-sm font-semibold uppercase tracking-widest mb-6">Total Value Breakdown</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 mb-8">
                <div>
                  <p className="text-slate-400 text-sm">Individual Price</p>
                  <p className="text-white text-4xl font-bold line-through opacity-50">₱4,980</p>
                </div>
                <div className="text-5xl text-white/40">→</div>
                <div>
                  <p className="text-slate-400 text-sm">Today&apos;s Price</p>
                  <p className="text-yellow-400 text-6xl font-extrabold">₱699</p>
                </div>
              </div>
              <motion.div
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-green-500 text-white font-bold text-xl shadow-lg"
              >
                🔥 YOU SAVE ₱4,281 TODAY
              </motion.div>
              <p className="text-blue-200/60 text-xs mt-4">*Estimated individual market values for comparison purposes.</p>
              <p className="text-green-300 text-sm font-medium mt-3">✨ New products added regularly — all yours at no extra cost.</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 6 — TWO WAYS TO EARN
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-5xl mx-auto">
          <FadeUp className="text-center mb-16">
            <SectionLabel>Double the Value</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              You&apos;re Not Just Buying...<br />
              <span className="text-gradient">You&apos;re Buying an Opportunity.</span>
            </h2>
          </FadeUp>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <FadeUp delay={0.1}>
              <div className="rounded-3xl p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm h-full">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-5">
                  <Briefcase size={24} className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Option 1 — Use It For Your Business
                </h3>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                  {['Improve your content quality instantly', 'Save hours of design and research time', 'Level up your marketing with proven templates', 'Grow your brand faster with professional resources'].map(t => (
                    <li key={t} className="flex items-start gap-3">
                      <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="rounded-3xl p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm h-full">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center mb-5">
                  <TrendingUp size={24} className="text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: 'Manrope, sans-serif' }}>
                  Option 2 — Build Your Own Digital Business
                </h3>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                  {['Learn from the included business guide', 'Create your own digital products inspired by these', 'Upload to Gumroad, Shopee, or your own store', 'Market and sell to your own audience'].map(t => (
                    <li key={t} className="flex items-start gap-3">
                      <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>

          {/* Flow diagram */}
          <FadeUp delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              {['Download', 'Learn', 'Create', 'Market', 'Earn'].map((step, i, arr) => (
                <div key={step} className="flex items-center gap-2 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-sm shadow-md" style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>
                      {i + 1}
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mt-2">{step}</span>
                  </div>
                  {i < arr.length - 1 && <span className="text-slate-300 dark:text-slate-600 text-2xl mb-4">→</span>}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 7 — INCOME POSSIBILITY
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-4">
            <SectionLabel>Income Illustration</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              What Could Be Possible?
            </h2>
          </FadeUp>
          <FadeUp delay={0.05} className="text-center mb-12">
            <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl px-5 py-3 inline-block max-w-2xl">
              ⚠️ <strong>Disclaimer:</strong> The examples below are illustrative only. Actual results depend entirely on your effort, marketing skills, pricing, audience, and other factors. These are NOT guaranteed earnings.
            </p>
          </FadeUp>

          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {[
              { label: '1 Sale / Day',          calc: '₱699 × 1',    result: '₱699/day',          note: 'Possible with a small audience' },
              { label: '3 Sales / Day',          calc: '₱699 × 3',    result: '₱2,097/day',        note: 'With consistent posting' },
              { label: '3 Sales/Day × 30 Days',  calc: '₱2,097 × 30', result: '~₱62,910/month*',   note: 'Before fees & expenses' },
            ].map(({ label, calc, result, note }, i) => (
              <FadeUp key={label} delay={i * 0.1}>
                <div className="rounded-2xl p-6 border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-center">
                  <p className="text-xs text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">{label}</p>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{calc}</p>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>{result}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{note}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4} className="rounded-2xl p-6 bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 text-center">
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed max-w-2xl mx-auto">
              Many people are looking for ways to increase their income through online businesses. This library gives you high-quality resources to learn from and build with — but your results will depend on your skills, consistency, and execution. Success is possible, but it requires real work.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 8 — URGENCY / COUNTDOWN  (always dark)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5" style={{ background: 'linear-gradient(160deg,#1e1b4b 0%,#312e81 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <SectionLabel>Limited Time</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Introductory Pricing — Act Fast
            </h2>
            <p className="text-indigo-200 mb-10">This price was set to give early supporters an incredible deal. Availability and pricing are subject to change at any time.</p>
          </FadeUp>

          {!expired ? (
            <FadeUp delay={0.15}>
              <div className="flex items-center justify-center gap-4 mb-10">
                {[{ v: m, label: 'Minutes' }, { v: s, label: 'Seconds' }].map(({ v, label }) => (
                  <div key={label} className="text-center">
                    <div className="w-24 h-24 rounded-3xl bg-white/10 border border-white/15 backdrop-blur flex items-center justify-center">
                      <span className="text-5xl font-extrabold text-white tabular-nums">{v}</span>
                    </div>
                    <span className="text-indigo-300 text-xs uppercase tracking-widest mt-2 block">{label}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          ) : (
            <FadeUp delay={0.1}>
              <div className="rounded-2xl bg-white/10 border border-white/15 px-8 py-5 mb-10">
                <p className="text-white font-semibold">Introductory pricing may end soon. Availability and pricing are subject to change.</p>
              </div>
            </FadeUp>
          )}

          <FadeUp delay={0.3}>
            <CTAButton size="lg">🚀 Get Instant Access for ₱699</CTAButton>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 9 — TESTIMONIALS
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="text-center mb-4">
            <SectionLabel>What People Say</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Customer Reviews
            </h2>
          </FadeUp>
          <FadeUp delay={0.05} className="text-center mb-12">
            <p className="text-xs text-slate-400 dark:text-slate-500 italic">*Sample/demo testimonials for illustration purposes.</p>
          </FadeUp>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ name, role, stars, text }, i) => (
              <FadeUp key={name} delay={i * 0.07}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.12)' }}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm h-full flex flex-col"
                >
                  <StarRow count={stars} />
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mt-3 mb-5 flex-1">&ldquo;{text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{name}</p>
                      <p className="text-slate-400 dark:text-slate-500 text-xs">{role}</p>
                    </div>
                  </div>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 10 — FAQ
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-24 px-5 bg-white dark:bg-slate-950">
        <div className="max-w-3xl mx-auto">
          <FadeUp className="text-center mb-12">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Frequently Asked Questions
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="space-y-3">
            {FAQS.map(faq => (
              <AccordionItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 11 — HOW TO GET ACCESS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="payment" className="py-24 px-5 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <FadeUp className="text-center mb-16">
            <SectionLabel>How to Order</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Manrope, sans-serif' }}>
              3 Simple Steps to Get Access
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3">Fully automated. Instant. Secure via Raket.ph.</p>
          </FadeUp>

          <div className="grid md:grid-cols-3 gap-6 mb-14">
            {[
              { step: '1', title: 'Click the Button',         desc: 'Tap any "Get Access" button on this page. You will be taken directly to the secure checkout on Raket.ph.', icon: '👆' },
              { step: '2', title: 'Complete Payment',          desc: 'Pay securely through Raket.ph using GCash, credit/debit card, or other available methods. Fast and safe.', icon: '💳' },
              { step: '3', title: 'Instant Access Delivered',  desc: 'Your download link is sent to your email automatically the moment your payment is confirmed. No waiting!', icon: '🎉' },
            ].map(({ step, title, desc, icon }) => (
              <FadeUp key={step} delay={Number(step) * 0.1}>
                <div className="bg-white dark:bg-slate-800 rounded-3xl p-7 border border-slate-100 dark:border-slate-700 shadow-sm text-center h-full">
                  <div className="text-4xl mb-4">{icon}</div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-3" style={{ background: 'linear-gradient(135deg,#2563EB,#7C3AED)' }}>
                    {step}
                  </div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>

          {/* Raket.ph trust badge */}
          <FadeUp delay={0.4}>
            <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0" style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}>
                <ShieldCheck size={32} className="text-white" />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white text-lg mb-1">Secured & Processed by Raket.ph</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  Raket.ph is one of the Philippines&apos; most trusted platforms for digital products. Your payment is processed securely, and your access is delivered instantly and automatically — no need to message anyone or wait for a reply.
                </p>
              </div>
              <a
                href={RAKET_URL} target="_blank" rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm shadow-md hover:opacity-90 transition-opacity"
                style={{ background: 'linear-gradient(135deg,#f97316,#ea580c)' }}
              >
                Buy on Raket.ph →
              </a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 12 — FINAL CTA  (always dark)
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 px-5" style={{ background: 'linear-gradient(160deg,#0f172a 0%,#1e3a8a 60%,#312e81 100%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <FadeUp>
            <Image src="/logo.jpg" alt="Digital Deals Hub" width={80} height={80} className="mx-auto mb-8 rounded-2xl shadow-xl" />
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-5 leading-tight" style={{ fontFamily: 'Manrope, sans-serif' }}>
              Your Shortcut Starts Today.
            </h2>
            <p className="text-blue-200 text-lg mb-6 max-w-xl mx-auto">
              50+ premium digital products in one organized library — and we keep adding more. Pay once. Get everything, forever.
            </p>
            <p className="text-yellow-400 text-6xl font-extrabold mb-10" style={{ fontFamily: 'Manrope, sans-serif' }}>₱699</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <CTAButton size="lg">🚀 Unlock My Lifetime Access</CTAButton>
            <p className="text-blue-300/60 text-sm mt-5">One-time payment. Instant delivery. Lifetime access.</p>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="py-8 px-5 bg-slate-950 text-center">
        <Image src="/logo.jpg" alt="Digital Deals Hub" width={60} height={60} className="mx-auto mb-3 rounded-xl opacity-80" />
        <p className="text-slate-500 text-sm">© {new Date().getFullYear()} Digital Deals Hub. All rights reserved.</p>
        <p className="text-slate-600 text-xs mt-2 max-w-md mx-auto">
          Results mentioned are illustrative examples only and are not guaranteed. Actual income depends on individual effort, marketing, and market conditions.
        </p>
      </footer>

      <div className="h-20 md:h-0" />
    </div>
  )
}
