# Digital Deals Hub — Phase 1 Design Spec

**Date:** 2026-06-26
**Scope:** Public storefront (what users see when they arrive from social media)
**Phase:** 1 of 3 (Phase 2 = Admin Panel, Phase 3 = SEO/Performance/Import)

---

## Goal

Build a premium digital products catalog website called **Digital Deals Hub**. Users arrive from social media, browse hundreds of digital products, and click a Google Drive button to access the actual files. The site acts as a premium catalog — no file hosting, no checkout, no user accounts in Phase 1.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| UI Components | Shadcn/UI + Lucide Icons |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage (thumbnails) |
| Deployment | Vercel |
| Fonts | Inter (body), Manrope (headings) |

---

## Architecture

Next.js App Router with Server Components for data fetching. Pages use ISR (Incremental Static Regeneration) with a 60-second revalidation so the site is fast and always shows fresh products without a full rebuild.

**Data flow:**
```
Supabase DB → Next.js Server Components → ISR pages → User browser
```

No authentication in Phase 1. The site is fully public. All product management happens directly in the Supabase dashboard until Phase 2 (admin panel).

Google Drive links open in a new tab — no proxying, no file hosting on our infrastructure.

---

## Routes

| Route | Purpose |
|---|---|
| `/` | Home — hero, search, category filters, featured + all products, FAQ, footer |
| `/products/[slug]` | Product detail page |
| `/category/[slug]` | Products filtered by category |

---

## Database Schema (Supabase / PostgreSQL)

### `products` table

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `slug` | text | Unique, URL-safe identifier |
| `title` | text | Product name |
| `description` | text | Full description |
| `short_description` | text | 1–2 sentence summary for cards |
| `thumbnail_url` | text | Supabase Storage URL |
| `google_drive_url` | text | Opens in new tab |
| `category` | text | FK to categories.slug |
| `tags` | text[] | e.g. ["PDF", "Template", "Canva"] |
| `file_type` | text | e.g. "PDF", "ZIP", "MP4" |
| `featured` | boolean | Shown in Featured section |
| `hidden` | boolean | Soft-delete / draft |
| `views` | integer | Incremented on product page visit |
| `created_at` | timestamptz | Auto |
| `updated_at` | timestamptz | Auto |

### `categories` table

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | Primary key |
| `name` | text | Display name e.g. "Business" |
| `slug` | text | URL-safe e.g. "business" |
| `icon` | text | Lucide icon name |
| `color` | text | Hex or Tailwind class |
| `created_at` | timestamptz | Auto |

---

## Design System

### Colors

| Token | Value | Usage |
|---|---|---|
| Primary | `#0F172A` | Text, headings |
| Secondary | `#2563EB` | Buttons, links, accents |
| Accent | `#7C3AED` | Gradient, badges |
| Success | `#22C55E` | Checkmarks, success states |
| Background | `#F8FAFC` | Light mode page background |
| Card | `#FFFFFF` | Card backgrounds |
| Dark BG | `#020617` | Dark mode page background |

### Typography

- **Headings:** Manrope, 700–800 weight
- **Body:** Inter, 400–500 weight
- Scale: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64px

### Visual Style

- Border radius: 16–24px on cards, 12px on buttons, 8px on badges
- Shadows: soft multi-layer (`shadow-sm` to `shadow-lg`), no harsh drop shadows
- Glassmorphism: subtle only — `backdrop-blur-sm` with `bg-white/70` on navbar
- Gradients: `#2563EB` → `#7C3AED` (matching logo cyan/purple palette)
- Spacing: Apple-inspired — generous whitespace, 80–120px section padding

### Animations (Framer Motion)

- Hero blob: slow organic movement, 8s loop
- Card hover: `scale(1.02)` + shadow elevation, 200ms ease
- Page transitions: fade + slide-up, 300ms
- Skeleton loaders: pulse shimmer while content loads
- Category pill scroll: smooth horizontal snap

---

## Pages & Sections

### Home Page (`/`)

1. **Navbar**
   - Logo (Digital Deals Hub SVG/PNG)
   - Search icon (opens full-width search overlay on mobile)
   - Dark/Light mode toggle
   - "Browse All" CTA button

2. **Hero Section**
   - Headline: *"Your Ultimate Digital Products Library"*
   - Subheadline: *"Access premium digital resources carefully curated to help creators, freelancers, entrepreneurs, marketers, students, and professionals work smarter and grow faster."*
   - Primary CTA: "Browse Products" (scrolls to grid)
   - Secondary CTA: "Latest Collection" (scrolls to newest)
   - Background: animated gradient blobs (cyan + purple, matching logo), floating card illustrations

3. **Sticky Search Bar**
   - Appears sticky below navbar on scroll
   - Instant client-side filter — no page reload
   - Searches across: title, short_description, tags, category
   - Shows result count as user types

4. **Category Filter Pills**
   - Horizontal scrollable row
   - "All" selected by default
   - Each pill shows icon + category name
   - Active pill: filled blue/purple gradient

5. **Featured Products**
   - Section heading: "Featured Picks"
   - 4-col desktop / 2-col tablet / 1-col mobile grid
   - Only products where `featured = true`

6. **All Products Grid**
   - Section heading: "Browse Everything"
   - Sort controls: Newest / Oldest / A–Z / Most Viewed
   - Same card layout as Featured
   - Paginated: 20 per page, "Load More" button (no full page reload)

7. **FAQ Section**
   - Accordion, 6 questions covering: what the site is, how to download, file formats, issues with links, what categories exist, how often it updates

8. **Footer**
   - Logo + tagline
   - Category links (2 columns)
   - Disclaimer note (condensed)
   - Copyright

### Product Card Component

| Element | Detail |
|---|---|
| Thumbnail | Full-width, 16:9 ratio, lazy loaded |
| Category badge | Top-left overlay, colored by category |
| Title | 2-line clamp, Manrope 600 |
| Short description | 2-line clamp, Inter 400 |
| File type tag | Bottom-left, e.g. "PDF" |
| View button | Bottom-right, secondary color |
| Hover | scale(1.02) + shadow elevation |

### Product Detail Page (`/products/[slug]`)

Layout (top to bottom):
1. Back button
2. Large preview image (hero, full-width)
3. Category + tags row
4. Title (h1, Manrope 700)
5. Description (full)
6. "What's Included" list
7. "Who Is It For" list
8. "Benefits" list
9. File info row: format, size, last updated
10. **Disclaimer box** — blue-tinted background, rounded, info icon
11. **Download section:**
    - Large "Open Google Drive" button (full-width on mobile)
    - ✔ Instant Access · ✔ Safe Google Drive Link · ✔ Curated Collection
12. Related Products (3–4 cards, same category)
13. Share button (copy link)

#### Disclaimer Text (verbatim, inside styled box)

> The files provided are carefully curated digital resources collected from various publicly available sources and educational references. While we strive to ensure every file is accessible and functional, there may be rare occasions where certain links or files become unavailable over time. If you encounter any issues accessing a file, we sincerely appreciate your understanding. Please contact us and we will do our best to replace the unavailable file or provide an updated version whenever possible. Our goal is to continuously improve this library and deliver even more valuable digital resources for our community. Thank you for your support.

### Category Page (`/category/[slug]`)

- Same grid layout as home
- Breadcrumb: Home → Category Name
- Category heading + description
- Filter/sort controls

---

## Mobile Experience

- Bottom navigation bar: Home / Search / Categories / (Phase 2: Favorites)
- Sticky search bar collapses to icon on mobile, expands to overlay on tap
- Cards stack to 1 column
- All buttons minimum 48px tall (touch-friendly)
- Smooth scroll throughout

---

## Seed Data (Phase 1)

Manually seed 10–20 representative products across 5–6 categories from the Google Doc to demonstrate the UI. Full content import is a Phase 2 admin panel feature.

Categories to seed: Business, Marketing, AI, Canva Templates, Ebooks, Productivity.

---

## Out of Scope (Phase 1)

- Admin panel (Phase 2)
- Full Google Doc import (Phase 2)
- User accounts, wishlist, favorites (Phase 3+)
- Ratings, comments (Phase 3+)
- Newsletter (Phase 3+)
- Advanced SEO (meta, sitemap, schema) — basic meta tags only in Phase 1

---

## Success Criteria

- Home page loads in < 2s on mobile (Vercel + ISR)
- Search filters results in < 100ms (client-side)
- Google Drive link opens correctly in new tab on all devices
- Dark mode toggles correctly and persists via localStorage
- All cards display properly at 1 / 2 / 4 column breakpoints
- Disclaimer appears on every product detail page
