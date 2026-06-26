# Digital Deals Hub — Phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the public storefront for Digital Deals Hub — a premium digital products catalog where users browse, search, filter, and access Google Drive product links.

**Architecture:** Next.js 14 App Router with Server Components for initial data fetch from Supabase; client-side filtering and search run on the already-fetched product list. Pages use ISR (60s revalidation) for performance. No auth in Phase 1 — all pages are public.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Shadcn/UI, Lucide React, Supabase (PostgreSQL + Storage), next-themes, Vercel

## Global Constraints

- Node.js ≥ 20, Next.js 14.2+, TypeScript strict mode on
- All copy must match spec verbatim (hero headline, disclaimer text, CTA labels)
- Dark mode via `next-themes` with `class` strategy; never flash on load
- All external links (Google Drive) open with `target="_blank" rel="noopener noreferrer"`
- Colors: Primary `#0F172A`, Secondary `#2563EB`, Accent `#7C3AED`, Success `#22C55E`, BG `#F8FAFC`, Dark BG `#020617`
- Fonts: Manrope (headings), Inter (body) — both from Google Fonts via `next/font`
- No `any` types in TypeScript
- Every product detail page must show the disclaimer box

---

### Task 1: Project Scaffolding + Configuration

**Files:**
- Create: `package.json` (via CLI)
- Create: `tailwind.config.ts`
- Create: `app/globals.css`
- Create: `.env.local` (from template)
- Create: `.env.example`
- Create: `.gitignore`

**Interfaces:**
- Produces: runnable dev server at `localhost:3000`; Tailwind tokens available globally

- [ ] **Step 1: Bootstrap Next.js project**

Run in `C:\Users\cdr7286\Documents\DIGITAL PRODUCTS`:

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --no-git
```

When prompted: yes to all defaults.

- [ ] **Step 2: Install dependencies**

```bash
npm install framer-motion @supabase/supabase-js next-themes lucide-react clsx tailwind-merge
npm install -D @types/node
```

- [ ] **Step 3: Install Shadcn/UI**

```bash
npx shadcn@latest init
```

When prompted: Default style → Default, Base color → Slate, CSS variables → Yes.

Then add needed components:

```bash
npx shadcn@latest add button badge card accordion separator skeleton
```

- [ ] **Step 4: Configure Tailwind with design tokens**

Replace `tailwind.config.ts` with:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#2563EB',
        accent: '#7C3AED',
        success: '#22C55E',
        'bg-light': '#F8FAFC',
        'card-bg': '#FFFFFF',
        'bg-dark': '#020617',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        card: '20px',
        btn: '12px',
        badge: '8px',
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(15,23,42,0.06), 0 1px 2px 0 rgba(15,23,42,0.04)',
        'card-hover': '0 12px 32px 0 rgba(15,23,42,0.12), 0 2px 8px 0 rgba(15,23,42,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 5: Set up globals.css**

Replace `app/globals.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600;700;800&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: #F8FAFC;
    --foreground: #0F172A;
    --card: #FFFFFF;
    --border: #E2E8F0;
    --muted: #64748B;
  }
  .dark {
    --background: #020617;
    --foreground: #F8FAFC;
    --card: #0F172A;
    --border: #1E293B;
    --muted: #94A3B8;
  }
  body {
    background-color: var(--background);
    color: var(--foreground);
    font-family: 'Inter', sans-serif;
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Manrope', sans-serif;
  }
}

@layer utilities {
  .gradient-brand {
    background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
  }
  .text-gradient {
    background: linear-gradient(135deg, #2563EB 0%, #7C3AED 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
```

- [ ] **Step 6: Create environment files**

Create `.env.example`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Create `.env.local` (fill in real values from Supabase dashboard after Task 2):
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

- [ ] **Step 7: Init git and commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project with Tailwind and Shadcn/UI"
```

- [ ] **Step 8: Verify dev server starts**

```bash
npm run dev
```

Expected: `localhost:3000` loads Next.js default page without errors.

---

### Task 2: Supabase Schema, Types, and Seed Data

**Files:**
- Create: `supabase/schema.sql`
- Create: `supabase/seed.sql`
- Create: `lib/types.ts`
- Create: `lib/supabase.ts`
- Create: `lib/queries.ts`

**Interfaces:**
- Produces: `Product`, `Category` TypeScript types; `getProducts()`, `getProduct(slug)`, `getCategories()`, `getFeaturedProducts()`, `getProductsByCategory(slug)`, `incrementViews(id)` functions; `supabase` client instance

- [ ] **Step 1: Create Supabase project**

Go to https://supabase.com, create a new project. Copy the Project URL and anon key into `.env.local`.

- [ ] **Step 2: Write schema SQL**

Create `supabase/schema.sql`:

```sql
-- Categories
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  icon text not null default 'folder',
  color text not null default '#2563EB',
  created_at timestamptz default now()
);

-- Products
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null default '',
  short_description text not null default '',
  thumbnail_url text not null default '',
  google_drive_url text not null,
  category text not null references categories(slug),
  tags text[] not null default '{}',
  file_type text not null default 'PDF',
  featured boolean not null default false,
  hidden boolean not null default false,
  views integer not null default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Auto-update updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on products
  for each row execute function update_updated_at();

-- Enable RLS (read-only public access)
alter table categories enable row level security;
alter table products enable row level security;

create policy "Public read categories" on categories for select using (true);
create policy "Public read products" on products for select using (hidden = false);
create policy "Public update views" on products for update using (true) with check (true);
```

- [ ] **Step 3: Run schema in Supabase**

Go to Supabase → SQL Editor → paste contents of `supabase/schema.sql` → Run.

Expected: tables `categories` and `products` appear in Table Editor.

- [ ] **Step 4: Write seed SQL**

Create `supabase/seed.sql`:

```sql
-- Seed categories
insert into categories (name, slug, icon, color) values
  ('Business', 'business', 'briefcase', '#2563EB'),
  ('Marketing', 'marketing', 'megaphone', '#7C3AED'),
  ('AI & Automation', 'ai', 'bot', '#06B6D4'),
  ('Canva Templates', 'canva', 'layout-template', '#F59E0B'),
  ('Ebooks', 'ebooks', 'book-open', '#22C55E'),
  ('Productivity', 'productivity', 'zap', '#EF4444'),
  ('Finance', 'finance', 'trending-up', '#10B981'),
  ('Social Media', 'social-media', 'share-2', '#EC4899'),
  ('Design', 'design', 'pen-tool', '#8B5CF6'),
  ('Freelancing', 'freelancing', 'laptop', '#F97316')
on conflict (slug) do nothing;

-- Seed products (15 representative items)
insert into products (slug, title, description, short_description, google_drive_url, category, tags, file_type, featured, thumbnail_url) values
(
  'ultimate-business-plan-template',
  'Ultimate Business Plan Template',
  'A comprehensive, professionally designed business plan template covering executive summary, market analysis, financial projections, and operational strategy. Fully editable with step-by-step guidance for each section. Perfect for startups and established businesses seeking funding or clarity.',
  'Professionally designed business plan template with financial projections and market analysis.',
  'https://drive.google.com/drive/folders/example1',
  'business',
  ARRAY['PDF', 'Template', 'Editable'],
  'PDF',
  true,
  'https://placehold.co/800x450/2563EB/FFFFFF?text=Business+Plan'
),
(
  'facebook-ads-masterclass-guide',
  'Facebook Ads Masterclass Guide',
  'A complete guide to running profitable Facebook ad campaigns. Covers audience targeting, creative best practices, budget optimization, retargeting strategies, and campaign scaling. Includes real campaign examples and swipe files.',
  'Complete guide to running profitable Facebook ads with swipe files and real examples.',
  'https://drive.google.com/drive/folders/example2',
  'marketing',
  ARRAY['PDF', 'Guide', 'Swipe File'],
  'PDF',
  true,
  'https://placehold.co/800x450/7C3AED/FFFFFF?text=FB+Ads+Guide'
),
(
  'chatgpt-prompt-engineering-toolkit',
  'ChatGPT Prompt Engineering Toolkit',
  'Over 500 battle-tested ChatGPT prompts organized by use case: content creation, sales, marketing, coding, research, and business strategy. Includes a prompt framework guide for crafting your own high-performance prompts.',
  '500+ ChatGPT prompts for content, sales, coding, and business — plus a framework guide.',
  'https://drive.google.com/drive/folders/example3',
  'ai',
  ARRAY['PDF', 'Prompt', 'Toolkit'],
  'PDF',
  true,
  'https://placehold.co/800x450/06B6D4/FFFFFF?text=AI+Prompts'
),
(
  'instagram-content-calendar-canva',
  'Instagram Content Calendar — Canva Template',
  'A stunning 30-day Instagram content calendar built in Canva. Includes post templates, story designs, reel covers, and caption frameworks for consistent and beautiful content. Fully customizable colors, fonts, and branding.',
  '30-day Canva content calendar with post templates, stories, reels, and captions.',
  'https://drive.google.com/drive/folders/example4',
  'canva',
  ARRAY['Canva', 'Template', 'Editable'],
  'Canva',
  true,
  'https://placehold.co/800x450/F59E0B/FFFFFF?text=Canva+Calendar'
),
(
  'freelancers-complete-starter-kit',
  'Freelancer''s Complete Starter Kit',
  'Everything a new or growing freelancer needs: client contract templates, invoice templates, proposal templates, rate calculator spreadsheet, client onboarding checklist, and a 90-day freelance roadmap.',
  'Client contracts, invoices, proposals, and a 90-day roadmap for freelancers.',
  'https://drive.google.com/drive/folders/example5',
  'freelancing',
  ARRAY['ZIP', 'Template', 'Spreadsheet', 'Guide'],
  'ZIP',
  true,
  'https://placehold.co/800x450/F97316/FFFFFF?text=Freelancer+Kit'
),
(
  'digital-marketing-ebook-2024',
  'Digital Marketing Mastery Ebook 2024',
  'A 120-page comprehensive ebook covering SEO, social media marketing, email marketing, paid advertising, content strategy, and analytics. Written for entrepreneurs, marketers, and business owners who want to grow their online presence.',
  '120-page ebook on SEO, social media, email marketing, and paid ads.',
  'https://drive.google.com/drive/folders/example6',
  'ebooks',
  ARRAY['PDF', 'Ebook', 'Guide'],
  'PDF',
  false,
  'https://placehold.co/800x450/22C55E/FFFFFF?text=Marketing+Ebook'
),
(
  'personal-finance-tracker-excel',
  'Personal Finance Tracker — Excel',
  'A powerful Excel spreadsheet for tracking income, expenses, savings goals, investments, and net worth. Includes automated charts, monthly summaries, and a budget planner. Works with Excel and Google Sheets.',
  'Track income, expenses, savings, and net worth with automated charts.',
  'https://drive.google.com/drive/folders/example7',
  'finance',
  ARRAY['Spreadsheet', 'Excel', 'Editable'],
  'XLSX',
  false,
  'https://placehold.co/800x450/10B981/FFFFFF?text=Finance+Tracker'
),
(
  'social-media-growth-playbook',
  'Social Media Growth Playbook',
  'A step-by-step playbook for growing from 0 to 10,000 followers on Instagram, TikTok, and Facebook. Covers content strategy, posting schedules, engagement tactics, hashtag research, and monetization strategies.',
  'Grow from 0 to 10K followers on Instagram, TikTok, and Facebook.',
  'https://drive.google.com/drive/folders/example8',
  'social-media',
  ARRAY['PDF', 'Guide', 'Playbook'],
  'PDF',
  false,
  'https://placehold.co/800x450/EC4899/FFFFFF?text=Social+Playbook'
),
(
  'notion-life-os-template',
  'Notion Life OS Template',
  'A complete life operating system built in Notion. Includes dashboards for goals, habits, projects, finances, health, and weekly reviews. Designed to help you manage every area of your life from one organized workspace.',
  'Complete Notion dashboard for goals, habits, projects, finances, and weekly reviews.',
  'https://drive.google.com/drive/folders/example9',
  'productivity',
  ARRAY['Notion', 'Template', 'Editable'],
  'Notion',
  false,
  'https://placehold.co/800x450/EF4444/FFFFFF?text=Notion+OS'
),
(
  'canva-brand-kit-template',
  'Canva Brand Kit Template',
  'Build a cohesive brand identity in Canva. Includes logo variations, color palette guide, typography guide, business card, letterhead, social media profile and cover templates, and a brand style guide document.',
  'Complete Canva brand kit: logos, colors, fonts, social media, and business card templates.',
  'https://drive.google.com/drive/folders/example10',
  'canva',
  ARRAY['Canva', 'Template', 'Branding'],
  'Canva',
  false,
  'https://placehold.co/800x450/8B5CF6/FFFFFF?text=Brand+Kit'
),
(
  'seo-audit-checklist',
  'SEO Audit Checklist & Guide',
  'A 100-point SEO audit checklist covering technical SEO, on-page optimization, content quality, backlink analysis, and Core Web Vitals. Includes a Google Sheets tracker and a step-by-step guide for fixing each issue.',
  '100-point SEO audit checklist with Google Sheets tracker and fix guide.',
  'https://drive.google.com/drive/folders/example11',
  'marketing',
  ARRAY['PDF', 'Spreadsheet', 'Checklist'],
  'ZIP',
  false,
  'https://placehold.co/800x450/7C3AED/FFFFFF?text=SEO+Audit'
),
(
  'startup-pitch-deck-template',
  'Startup Pitch Deck Template',
  'A sleek, investor-ready pitch deck template with 20 professionally designed slides. Covers problem, solution, market size, traction, team, financials, and ask. Available in PowerPoint and Google Slides formats.',
  '20-slide investor pitch deck template in PowerPoint and Google Slides.',
  'https://drive.google.com/drive/folders/example12',
  'business',
  ARRAY['Template', 'Editable', 'ZIP'],
  'ZIP',
  false,
  'https://placehold.co/800x450/2563EB/FFFFFF?text=Pitch+Deck'
),
(
  'ai-tools-directory-2024',
  'AI Tools Directory 2024',
  'A curated directory of 200+ AI tools organized by category: writing, image generation, video, audio, coding, marketing, and productivity. Each tool includes a description, pricing tier, and use case recommendation.',
  'Curated list of 200+ AI tools with descriptions, pricing, and use cases.',
  'https://drive.google.com/drive/folders/example13',
  'ai',
  ARRAY['PDF', 'Guide', 'Directory'],
  'PDF',
  false,
  'https://placehold.co/800x450/06B6D4/FFFFFF?text=AI+Directory'
),
(
  'copywriting-swipe-file',
  'Copywriting Swipe File — 100 Headlines',
  'A collection of 100 high-converting headlines, 50 email subject lines, 30 CTA templates, and 20 sales page frameworks. All organized and ready to adapt for your own products, ads, and content.',
  '100 headlines, 50 email subjects, 30 CTAs, and 20 sales page frameworks.',
  'https://drive.google.com/drive/folders/example14',
  'marketing',
  ARRAY['PDF', 'Swipe File', 'Templates'],
  'PDF',
  false,
  'https://placehold.co/800x450/7C3AED/FFFFFF?text=Swipe+File'
),
(
  'graphic-design-resources-bundle',
  'Graphic Design Resources Bundle',
  'A massive bundle including 500+ Canva elements, 50 color palettes, 30 font pairings guide, mockup templates, icon packs, and a design principles quick reference. Perfect for designers and non-designers alike.',
  '500+ Canva elements, 50 color palettes, mockups, icons, and a design guide.',
  'https://drive.google.com/drive/folders/example15',
  'design',
  ARRAY['ZIP', 'Bundle', 'Canva', 'Template'],
  'ZIP',
  false,
  'https://placehold.co/800x450/8B5CF6/FFFFFF?text=Design+Bundle'
);
```

- [ ] **Step 5: Run seed SQL in Supabase**

Go to Supabase → SQL Editor → paste `supabase/seed.sql` → Run.

Expected: 10 rows in `categories`, 15 rows in `products`.

- [ ] **Step 6: Write TypeScript types**

Create `lib/types.ts`:

```typescript
export interface Product {
  id: string
  slug: string
  title: string
  description: string
  short_description: string
  thumbnail_url: string
  google_drive_url: string
  category: string
  tags: string[]
  file_type: string
  featured: boolean
  hidden: boolean
  views: number
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  created_at: string
}

export type SortOption = 'newest' | 'oldest' | 'az' | 'most-viewed'
```

- [ ] **Step 7: Write Supabase client**

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)
```

- [ ] **Step 8: Write query functions**

Create `lib/queries.ts`:

```typescript
import { supabase } from './supabase'
import type { Category, Product } from './types'

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('hidden', false)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('featured', true)
    .eq('hidden', false)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getProduct(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('hidden', false)
    .single()
  if (error) return null
  return data
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', categorySlug)
    .eq('hidden', false)
    .order('created_at', { ascending: false })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getRelatedProducts(category: string, excludeSlug: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .neq('slug', excludeSlug)
    .eq('hidden', false)
    .limit(4)
  if (error) return []
  return data ?? []
}

export async function incrementViews(id: string): Promise<void> {
  await supabase.rpc('increment_views', { product_id: id })
}
```

- [ ] **Step 9: Add increment_views RPC to Supabase**

Go to Supabase → SQL Editor → run:

```sql
create or replace function increment_views(product_id uuid)
returns void as $$
  update products set views = views + 1 where id = product_id;
$$ language sql;
```

- [ ] **Step 10: Write tests for query utility functions**

Create `lib/__tests__/queries.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock supabase client
vi.mock('../supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    eq: vi.fn().mockReturnThis(),
    neq: vi.fn().mockReturnThis(),
    single: vi.fn().mockReturnThis(),
    order: vi.fn().mockReturnThis(),
    limit: vi.fn().mockReturnThis(),
  },
}))

import { supabase } from '../supabase'

describe('getProduct', () => {
  it('returns null when product not found', async () => {
    const mock = supabase.from('products') as any
    mock.single.mockResolvedValueOnce({ data: null, error: { message: 'Not found' } })
    const { getProduct } = await import('../queries')
    const result = await getProduct('nonexistent-slug')
    expect(result).toBeNull()
  })
})
```

Install vitest:

```bash
npm install -D vitest @vitejs/plugin-react
```

Add to `package.json` scripts:
```json
"test": "vitest run",
"test:watch": "vitest"
```

Run: `npm test`

Expected: 1 test passes.

- [ ] **Step 11: Commit**

```bash
git add .
git commit -m "feat: add Supabase schema, seed data, types, and query functions"
```

---

### Task 3: Theme System (Dark/Light Mode)

**Files:**
- Create: `components/providers/ThemeProvider.tsx`
- Modify: `app/layout.tsx`
- Create: `components/ui/ThemeToggle.tsx`

**Interfaces:**
- Consumes: `next-themes` package
- Produces: `<ThemeProvider>` wrapper; `<ThemeToggle>` button component; `dark` class applied to `<html>` on dark mode

- [ ] **Step 1: Create ThemeProvider wrapper**

Create `components/providers/ThemeProvider.tsx`:

```typescript
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

- [ ] **Step 2: Create ThemeToggle component**

Create `components/ui/ThemeToggle.tsx`:

```typescript
'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="w-9 h-9" />

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-btn hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun size={20} className="text-slate-300" />
      ) : (
        <Moon size={20} className="text-slate-600" />
      )}
    </button>
  )
}
```

- [ ] **Step 3: Update root layout**

Replace `app/layout.tsx`:

```typescript
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

export const metadata: Metadata = {
  title: 'Digital Deals Hub — Your Ultimate Digital Products Library',
  description: 'Access premium digital resources carefully curated to help creators, freelancers, entrepreneurs, marketers, students, and professionals work smarter and grow faster.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify dark mode works**

```bash
npm run dev
```

Open `localhost:3000`. Open browser console and run:
```javascript
document.documentElement.classList.add('dark')
```
Expected: page background changes to `#020617`.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add dark/light mode with next-themes"
```

---

### Task 4: Navbar + Footer + Mobile Bottom Nav

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/BottomNav.tsx`
- Create: `components/layout/AppShell.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `<ThemeToggle>`, `Category[]` (passed as prop to Footer)
- Produces: `<AppShell>` wrapper used in all pages; `<Navbar>`, `<Footer>`, `<BottomNav>` components

- [ ] **Step 1: Create Navbar**

Create `components/layout/Navbar.tsx`:

```typescript
'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Search, Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { useState } from 'react'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-bg-dark/80 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <img
              src="/logo.png"
              alt="Digital Deals Hub"
              className="h-9 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#products" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary transition-colors">
              Products
            </Link>
            <Link href="/#categories" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-secondary transition-colors">
              Categories
            </Link>
            <ThemeToggle />
            <Link
              href="/#products"
              className="px-4 py-2 rounded-btn text-sm font-semibold text-white gradient-brand hover:opacity-90 transition-opacity"
            >
              Browse All
            </Link>
          </nav>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-btn hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-slate-200 dark:border-slate-800 py-4 flex flex-col gap-3">
            <Link href="/#products" className="text-sm font-medium px-2 py-1" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link href="/#categories" className="text-sm font-medium px-2 py-1" onClick={() => setMenuOpen(false)}>Categories</Link>
            <Link
              href="/#products"
              className="mt-2 px-4 py-2 rounded-btn text-sm font-semibold text-white gradient-brand text-center"
              onClick={() => setMenuOpen(false)}
            >
              Browse All
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Copy logo to public folder**

Copy the Digital Deals Hub logo PNG to `public/logo.png`.

- [ ] **Step 3: Create Footer**

Create `components/layout/Footer.tsx`:

```typescript
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
            <img src="/logo.png" alt="Digital Deals Hub" className="h-10 w-auto mb-4 brightness-0 invert" />
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
```

- [ ] **Step 4: Create BottomNav (mobile)**

Create `components/layout/BottomNav.tsx`:

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Grid3x3 } from 'lucide-react'
import { clsx } from 'clsx'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/#search', label: 'Search', icon: Search },
  { href: '/#categories', label: 'Categories', icon: Grid3x3 },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-bg-dark border-t border-slate-200 dark:border-slate-800 flex">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex-1 flex flex-col items-center justify-center py-3 gap-1 text-xs font-medium transition-colors',
              active
                ? 'text-secondary'
                : 'text-slate-400 dark:text-slate-500'
            )}
          >
            <Icon size={20} />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
```

- [ ] **Step 5: Create AppShell**

Create `components/layout/AppShell.tsx`:

```typescript
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
```

- [ ] **Step 6: Wrap layout with AppShell**

Modify `app/layout.tsx` — add AppShell inside ThemeProvider:

```typescript
import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AppShell } from '@/components/layout/AppShell'

export const metadata: Metadata = {
  title: 'Digital Deals Hub — Your Ultimate Digital Products Library',
  description: 'Access premium digital resources carefully curated to help creators, freelancers, entrepreneurs, marketers, students, and professionals work smarter and grow faster.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

- [ ] **Step 7: Verify layout renders**

```bash
npm run dev
```

Expected: Navbar appears at top, Footer at bottom, BottomNav visible on mobile (< 768px viewport). No console errors.

- [ ] **Step 8: Commit**

```bash
git add .
git commit -m "feat: add Navbar, Footer, BottomNav, and AppShell layout"
```

---

### Task 5: ProductCard Component

**Files:**
- Create: `components/product/ProductCard.tsx`

**Interfaces:**
- Consumes: `Product` type from `lib/types.ts`
- Produces: `<ProductCard product={Product} />` component used in all grids

- [ ] **Step 1: Write component test**

Create `components/product/__tests__/ProductCard.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react'
import { ProductCard } from '../ProductCard'
import type { Product } from '@/lib/types'

const mockProduct: Product = {
  id: '1',
  slug: 'test-product',
  title: 'Test Product',
  description: 'Full description',
  short_description: 'Short desc',
  thumbnail_url: 'https://example.com/img.jpg',
  google_drive_url: 'https://drive.google.com/test',
  category: 'business',
  tags: ['PDF', 'Template'],
  file_type: 'PDF',
  featured: false,
  hidden: false,
  views: 42,
  created_at: '2026-06-26T00:00:00Z',
  updated_at: '2026-06-26T00:00:00Z',
}

describe('ProductCard', () => {
  it('renders title and short description', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Short desc')).toBeInTheDocument()
  })

  it('renders file type badge', () => {
    render(<ProductCard product={mockProduct} />)
    expect(screen.getByText('PDF')).toBeInTheDocument()
  })

  it('links to product detail page', () => {
    render(<ProductCard product={mockProduct} />)
    const link = screen.getByRole('link', { name: /view/i })
    expect(link).toHaveAttribute('href', '/products/test-product')
  })
})
```

Install React Testing Library:

```bash
npm install -D @testing-library/react @testing-library/jest-dom jsdom
```

Add to `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
})
```

Create `vitest.setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

Run: `npm test` — Expected: FAIL (ProductCard not created yet).

- [ ] **Step 2: Create ProductCard**

Create `components/product/ProductCard.tsx`:

```typescript
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 12px 32px 0 rgba(15,23,42,0.12)' }}
      transition={{ duration: 0.2 }}
      className="group bg-card-bg dark:bg-slate-900 rounded-card shadow-card border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img
          src={product.thumbnail_url || 'https://placehold.co/800x450/2563EB/FFFFFF?text=Digital+Product'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {/* Category badge */}
        <span className="absolute top-3 left-3 px-2 py-1 rounded-badge text-xs font-semibold text-white gradient-brand">
          {product.category.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())}
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
```

- [ ] **Step 3: Run tests**

```bash
npm test
```

Expected: 3 tests pass.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add ProductCard component with hover animation"
```

---

### Task 6: Search Hook + CategoryPills + SearchBar

**Files:**
- Create: `hooks/useProductFilter.ts`
- Create: `components/home/SearchBar.tsx`
- Create: `components/home/CategoryPills.tsx`

**Interfaces:**
- Consumes: `Product[]`, `Category[]`
- Produces: `useProductFilter(products, categories)` → `{ query, setQuery, activeCategory, setActiveCategory, sortOption, setSortOption, filtered: Product[] }`; `<SearchBar>` and `<CategoryPills>` components

- [ ] **Step 1: Write filter hook test**

Create `hooks/__tests__/useProductFilter.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { filterProducts } from '../useProductFilter'
import type { Product } from '@/lib/types'

const products: Product[] = [
  {
    id: '1', slug: 'biz-plan', title: 'Business Plan Template',
    description: 'A business plan', short_description: 'Business plan',
    thumbnail_url: '', google_drive_url: '', category: 'business',
    tags: ['PDF'], file_type: 'PDF', featured: false, hidden: false,
    views: 10, created_at: '2026-01-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z',
  },
  {
    id: '2', slug: 'fb-ads', title: 'Facebook Ads Guide',
    description: 'Facebook advertising guide', short_description: 'FB ads',
    thumbnail_url: '', google_drive_url: '', category: 'marketing',
    tags: ['PDF', 'Guide'], file_type: 'PDF', featured: false, hidden: false,
    views: 50, created_at: '2026-02-01T00:00:00Z', updated_at: '2026-02-01T00:00:00Z',
  },
]

describe('filterProducts', () => {
  it('returns all products when no query or category', () => {
    expect(filterProducts(products, '', 'all', 'newest')).toHaveLength(2)
  })

  it('filters by title query (case-insensitive)', () => {
    const result = filterProducts(products, 'facebook', 'all', 'newest')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('fb-ads')
  })

  it('filters by category', () => {
    const result = filterProducts(products, '', 'business', 'newest')
    expect(result).toHaveLength(1)
    expect(result[0].slug).toBe('biz-plan')
  })

  it('sorts by most-viewed descending', () => {
    const result = filterProducts(products, '', 'all', 'most-viewed')
    expect(result[0].slug).toBe('fb-ads')
  })

  it('sorts A-Z by title', () => {
    const result = filterProducts(products, '', 'all', 'az')
    expect(result[0].title).toBe('Business Plan Template')
  })
})
```

Run: `npm test` — Expected: FAIL.

- [ ] **Step 2: Create filter hook**

Create `hooks/useProductFilter.ts`:

```typescript
'use client'

import { useState, useMemo } from 'react'
import type { Product, SortOption } from '@/lib/types'

export function filterProducts(
  products: Product[],
  query: string,
  activeCategory: string,
  sortOption: SortOption
): Product[] {
  const q = query.toLowerCase().trim()

  let filtered = products.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory
    const matchesQuery =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.short_description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q)
    return matchesCategory && matchesQuery
  })

  switch (sortOption) {
    case 'oldest':
      filtered = [...filtered].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      break
    case 'az':
      filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      break
    case 'most-viewed':
      filtered = [...filtered].sort((a, b) => b.views - a.views)
      break
    case 'newest':
    default:
      filtered = [...filtered].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  return filtered
}

export function useProductFilter(products: Product[]) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [sortOption, setSortOption] = useState<SortOption>('newest')

  const filtered = useMemo(
    () => filterProducts(products, query, activeCategory, sortOption),
    [products, query, activeCategory, sortOption]
  )

  return { query, setQuery, activeCategory, setActiveCategory, sortOption, setSortOption, filtered }
}
```

Run: `npm test` — Expected: 5 tests pass.

- [ ] **Step 3: Create SearchBar**

Create `components/home/SearchBar.tsx`:

```typescript
'use client'

import { Search, X } from 'lucide-react'

interface SearchBarProps {
  value: string
  onChange: (v: string) => void
  resultCount: number
}

export function SearchBar({ value, onChange, resultCount }: SearchBarProps) {
  return (
    <div id="search" className="sticky top-16 z-40 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-sm py-4 border-b border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="Search products, categories, tags..."
            className="w-full pl-11 pr-10 py-3 rounded-card bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm text-primary dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-secondary/40 transition"
          />
          {value && (
            <button
              onClick={() => onChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              aria-label="Clear search"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {value && (
          <p className="text-center text-xs text-slate-400 mt-2">
            {resultCount} result{resultCount !== 1 ? 's' : ''} for "{value}"
          </p>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Create CategoryPills**

Create `components/home/CategoryPills.tsx`:

```typescript
'use client'

import { clsx } from 'clsx'
import type { Category } from '@/lib/types'
import * as Icons from 'lucide-react'
import { LucideProps } from 'lucide-react'

interface CategoryPillsProps {
  categories: Category[]
  active: string
  onSelect: (slug: string) => void
}

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const Icon = (Icons as Record<string, React.ComponentType<LucideProps>>)[
    name.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('')
  ]
  return Icon ? <Icon {...props} /> : null
}

export function CategoryPills({ categories, active, onSelect }: CategoryPillsProps) {
  const all = [{ name: 'All', slug: 'all', icon: 'layout-grid', color: '#2563EB' }, ...categories]

  return (
    <div id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none snap-x">
        {all.map(cat => (
          <button
            key={cat.slug}
            onClick={() => onSelect(cat.slug)}
            className={clsx(
              'snap-start shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
              active === cat.slug
                ? 'gradient-brand text-white border-transparent shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-secondary hover:text-secondary'
            )}
          >
            <DynamicIcon name={cat.icon} size={15} />
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 5: Run all tests**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add search/filter hook, SearchBar, and CategoryPills"
```

---

### Task 7: ProductGrid + FAQ + Home Page Assembly

**Files:**
- Create: `components/home/ProductGrid.tsx`
- Create: `components/home/FAQSection.tsx`
- Create: `components/home/HeroSection.tsx`
- Create: `app/page.tsx`

**Interfaces:**
- Consumes: `useProductFilter`, `ProductCard`, `SearchBar`, `CategoryPills`, `Product[]`, `Category[]`
- Produces: complete home page at `/`

- [ ] **Step 1: Create HeroSection**

Create `components/home/HeroSection.tsx`:

```typescript
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
```

- [ ] **Step 2: Create ProductGrid**

Create `components/home/ProductGrid.tsx`:

```typescript
'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/product/ProductCard'
import type { Product, SortOption } from '@/lib/types'
import { Skeleton } from '@/components/ui/skeleton'

const PAGE_SIZE = 20

interface ProductGridProps {
  products: Product[]
  title: string
  showSort?: boolean
  sortOption?: SortOption
  onSortChange?: (s: SortOption) => void
}

export function ProductGrid({ products, title, showSort, sortOption, onSortChange }: ProductGridProps) {
  const [page, setPage] = useState(1)
  const visible = products.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < products.length

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-heading font-700 text-primary dark:text-white">{title}</h2>
        {showSort && onSortChange && (
          <select
            value={sortOption}
            onChange={e => onSortChange(e.target.value as SortOption)}
            className="text-sm border border-slate-200 dark:border-slate-700 rounded-btn px-3 py-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-secondary/40"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A–Z</option>
            <option value="most-viewed">Most Viewed</option>
          </select>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-sm mt-2">Try a different search or category</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visible.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
          {hasMore && (
            <div className="text-center mt-10">
              <button
                onClick={() => setPage(prev => prev + 1)}
                className="px-8 py-3 rounded-btn font-semibold text-secondary border border-secondary hover:gradient-brand hover:text-white transition-all duration-200"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export function ProductGridSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Skeleton className="h-8 w-48 mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-card overflow-hidden">
            <Skeleton className="aspect-video w-full" />
            <div className="p-5 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Create FAQSection**

Create `components/home/FAQSection.tsx`:

```typescript
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    q: 'What is Digital Deals Hub?',
    a: 'Digital Deals Hub is a premium digital products library where you can browse, search, and access hundreds of curated digital resources — including templates, guides, ebooks, toolkits, and more — completely free.',
  },
  {
    q: 'How do I download a product?',
    a: 'Click on any product card to open its detail page, then click the "Open Google Drive" button. You\'ll be redirected to a Google Drive folder where you can preview and download the files instantly.',
  },
  {
    q: 'What file formats are available?',
    a: 'Products come in various formats including PDF, ZIP, XLSX, Canva templates, Notion templates, and more. Each product page clearly shows the file type before you download.',
  },
  {
    q: 'What if a link is broken or unavailable?',
    a: 'Occasionally, links may become unavailable. If you encounter an issue, please contact us and we will do our best to replace the file or provide an updated version as soon as possible.',
  },
  {
    q: 'Are these products free?',
    a: 'Yes! All products in the Digital Deals Hub library are freely accessible. Simply browse, click, and download from Google Drive.',
  },
  {
    q: 'How often are new products added?',
    a: 'We regularly add new digital products to the library. Check the "Latest Collection" section on the homepage to see the most recently added resources.',
  },
]

export function FAQSection() {
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-700 text-primary dark:text-white mb-3">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 dark:text-slate-400">Everything you need to know about Digital Deals Hub.</p>
      </div>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="bg-white dark:bg-slate-900 rounded-card border border-slate-100 dark:border-slate-800 px-6"
          >
            <AccordionTrigger className="font-heading font-600 text-left text-primary dark:text-white hover:no-underline">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
```

- [ ] **Step 4: Create Home page**

Create `app/page.tsx`:

```typescript
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
```

Create `components/home/HomeProductSection.tsx`:

```typescript
import { getProducts, getFeaturedProducts, getCategories } from '@/lib/queries'
import { HomeProductClient } from './HomeProductClient'

export async function HomeProductSection() {
  const [products, featured, categories] = await Promise.all([
    getProducts(),
    getFeaturedProducts(),
    getCategories(),
  ])
  return <HomeProductClient products={products} featured={featured} categories={categories} />
}
```

Create `components/home/HomeProductClient.tsx`:

```typescript
'use client'

import { SearchBar } from './SearchBar'
import { CategoryPills } from './CategoryPills'
import { ProductGrid } from './ProductGrid'
import { useProductFilter } from '@/hooks/useProductFilter'
import type { Category, Product } from '@/lib/types'

interface HomeProductClientProps {
  products: Product[]
  featured: Product[]
  categories: Category[]
}

export function HomeProductClient({ products, featured, categories }: HomeProductClientProps) {
  const { query, setQuery, activeCategory, setActiveCategory, sortOption, setSortOption, filtered } =
    useProductFilter(products)

  const isFiltering = !!query || activeCategory !== 'all'
  const featuredFiltered = featured.filter(p =>
    !query && activeCategory === 'all' ? true : filtered.some(f => f.id === p.id)
  )

  return (
    <>
      <SearchBar value={query} onChange={setQuery} resultCount={filtered.length} />
      <CategoryPills categories={categories} active={activeCategory} onSelect={setActiveCategory} />

      {!isFiltering && featuredFiltered.length > 0 && (
        <div id="products">
          <ProductGrid products={featuredFiltered} title="Featured Picks" />
        </div>
      )}

      <div id={isFiltering ? 'products' : 'all-products'}>
        <ProductGrid
          products={filtered}
          title={isFiltering ? `Results (${filtered.length})` : 'Browse Everything'}
          showSort
          sortOption={sortOption}
          onSortChange={setSortOption}
        />
      </div>
    </>
  )
}
```

- [ ] **Step 5: Verify home page**

```bash
npm run dev
```

Open `localhost:3000`. Expected:
- Hero section with animated blobs
- Sticky search bar appears on scroll
- Category pills scroll horizontally
- Featured Products grid (4 columns on desktop)
- All Products grid with sort dropdown
- FAQ accordion expands/collapses
- Footer with category links

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: add Hero, ProductGrid, FAQ, and complete home page"
```

---

### Task 8: Product Detail Page

**Files:**
- Create: `components/product/DisclaimerBox.tsx`
- Create: `components/product/ProductDetail.tsx`
- Create: `app/products/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getProduct(slug)`, `getRelatedProducts(category, slug)`, `incrementViews(id)`; `ProductCard`
- Produces: product detail page at `/products/[slug]`

- [ ] **Step 1: Create DisclaimerBox**

Create `components/product/DisclaimerBox.tsx`:

```typescript
import { Info } from 'lucide-react'

export function DisclaimerBox() {
  return (
    <div className="flex gap-4 p-5 rounded-card bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
      <Info className="text-blue-500 shrink-0 mt-0.5" size={20} />
      <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
        The files provided are carefully curated digital resources collected from various publicly available sources and educational references. While we strive to ensure every file is accessible and functional, there may be rare occasions where certain links or files become unavailable over time. If you encounter any issues accessing a file, we sincerely appreciate your understanding. Please contact us and we will do our best to replace the unavailable file or provide an updated version whenever possible. Our goal is to continuously improve this library and deliver even more valuable digital resources for our community. Thank you for your support.
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Create ProductDetail component**

Create `components/product/ProductDetail.tsx`:

```typescript
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
```

- [ ] **Step 3: Create product detail page route**

Create `app/products/[slug]/page.tsx`:

```typescript
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
```

- [ ] **Step 4: Verify product detail page**

```bash
npm run dev
```

Navigate to `localhost:3000/products/ultimate-business-plan-template`.

Expected:
- Product image, title, tags display
- Description renders
- File info row shows format, date, views
- Disclaimer box shows in blue
- "Open Google Drive" button is visible and links correctly
- Related products grid appears
- Back button returns to home

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add product detail page with disclaimer, drive button, and related products"
```

---

### Task 9: Category Page

**Files:**
- Create: `app/category/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getCategories()`, `getProductsByCategory(slug)`, `ProductCard`
- Produces: filtered product listing at `/category/[slug]`

- [ ] **Step 1: Create category page**

Create `app/category/[slug]/page.tsx`:

```typescript
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { getCategories, getProductsByCategory } from '@/lib/queries'
import { ProductCard } from '@/components/product/ProductCard'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categories = await getCategories()
  const cat = categories.find(c => c.slug === params.slug)
  if (!cat) return { title: 'Not Found' }
  return {
    title: `${cat.name} — Digital Deals Hub`,
    description: `Browse all ${cat.name} digital products and resources.`,
  }
}

export const revalidate = 60

export default async function CategoryPage({ params }: Props) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProductsByCategory(params.slug),
  ])

  const category = categories.find(c => c.slug === params.slug)
  if (!category) notFound()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
        <ChevronRight size={14} />
        <span className="text-primary dark:text-white font-medium">{category.name}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-heading font-800 text-primary dark:text-white">
          {category.name}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          {products.length} resource{products.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-medium">No products in this category yet</p>
          <Link href="/" className="text-secondary text-sm mt-4 inline-block hover:underline">
            Browse all products →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify category page**

```bash
npm run dev
```

Navigate to `localhost:3000/category/business`.

Expected:
- Breadcrumb: Home → Business
- Heading "Business" with product count
- Product cards grid renders
- Navigate to `/category/nonexistent` → 404 page

- [ ] **Step 3: Run all tests**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add category page with breadcrumb and filtered grid"
```

---

### Task 10: Deployment to Vercel

**Files:**
- Create: `vercel.json`
- Modify: `.env.example`

**Interfaces:**
- Produces: live site on Vercel with environment variables configured

- [ ] **Step 1: Create vercel.json**

Create `vercel.json`:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

- [ ] **Step 2: Build locally to check for errors**

```bash
npm run build
```

Expected: build completes with no TypeScript errors. Note any warnings and fix them before proceeding.

- [ ] **Step 3: Deploy to Vercel**

```bash
npx vercel --prod
```

When prompted:
- Link to existing project? → No, create new
- Project name → `digital-deals-hub`
- Override settings? → No

- [ ] **Step 4: Set environment variables in Vercel**

Go to Vercel dashboard → Project → Settings → Environment Variables. Add:
- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

Then redeploy:

```bash
npx vercel --prod
```

- [ ] **Step 5: Verify live deployment**

Open the Vercel URL. Check:
- [ ] Home page loads in < 3s on mobile (test with Chrome DevTools Network throttle → Fast 3G)
- [ ] Search filters correctly
- [ ] Category pills work
- [ ] Product detail page opens and shows disclaimer
- [ ] "Open Google Drive" button links correctly
- [ ] Dark mode toggle persists on page reload
- [ ] Category page at `/category/business` loads correctly
- [ ] Site renders correctly on iPhone viewport (375px)

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: add Vercel deployment config and complete Phase 1"
```

---

## Self-Review Checklist

**Spec coverage:**
- [x] Hero section — Task 7
- [x] Sticky search bar with instant filter — Tasks 6, 7
- [x] Category filter pills — Task 6
- [x] Featured products grid — Task 7
- [x] All products grid with sort — Task 7
- [x] Product card (thumbnail, badge, title, desc, file type, view button) — Task 5
- [x] Product detail page (all sections) — Task 8
- [x] Disclaimer box on every product detail page — Task 8
- [x] Google Drive button opens in new tab — Task 8
- [x] ✔ Instant Access / ✔ Safe Link / ✔ Curated Collection — Task 8
- [x] Related products — Task 8
- [x] Category page with breadcrumb — Task 9
- [x] Dark/light mode — Task 3
- [x] Navbar with logo, theme toggle, Browse All — Task 4
- [x] Footer with category links — Task 4
- [x] Bottom nav (mobile) — Task 4
- [x] FAQ accordion — Task 7
- [x] Framer Motion animations (hero blobs, card hover, page fade) — Tasks 5, 7, 8
- [x] Skeleton loaders — Task 7
- [x] ISR (60s revalidate) — Tasks 7, 8, 9
- [x] Supabase schema + seed data — Task 2
- [x] TypeScript strict — enforced via tsconfig in Task 1
- [x] Vercel deployment — Task 10

**Placeholder scan:** None found — all code blocks are complete.

**Type consistency:** `Product` and `Category` defined in `lib/types.ts` Task 2, used consistently in all subsequent tasks. `SortOption` used in Tasks 6 and 7 match the same union type. `filterProducts` exported from `hooks/useProductFilter.ts` and tested in Task 6.
