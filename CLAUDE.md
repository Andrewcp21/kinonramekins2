# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured.

## Architecture

Single-page Next.js 15 (App Router) landing page for an Indonesian online baking class business. No API routes or database — all course data is static JSON.

**Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion

### Key Files

- `src/app/page.tsx` — Main landing page, composes all sections
- `src/app/layout.tsx` — Root layout: font declarations, metadata, Facebook Pixel
- `src/data/courses.json` — Single source of truth for all course catalog data (name, price in IDR, category, description, images, WhatsApp link)
- `src/types.ts` — `Course` TypeScript interface
- `src/lib/fpixel.ts` — Facebook Pixel helper (two pixel IDs: `2330472814091420` and `1377894847161754`)

### Page Sections (top to bottom)

`Hero` → `CourseGrid` (+ `CategoryFilter` + `ProductModal`) → `ClassIncludesSection` → `FavoritesVideoSection` → `ReviewsSection` → Footer

Below-fold sections are **dynamically imported** (`next/dynamic`) for performance.

### State & Routing

`CourseGrid` is the main stateful component (client-side). It manages:
- Active category filter
- Selected course for modal

URL query params enable deep linking:
- `?class=<id>` — opens a specific course modal on load
- `?category=<name>` — pre-selects a category filter

### Course Data Shape

Courses in `courses.json` have categories: `Cookies`, `Breads`, `Pastries`, `Bars & Brownies`, `Others`.

Each course has: `id`, `name`, `price` (number, IDR), `category`, `description`, `components[]`, `facilities[]`, `images[]` (filenames under `public/images/products/`), optional `badge`.

### Styling Conventions

- Tailwind CSS v4 via PostCSS — no `tailwind.config.js`, configured via CSS custom properties in `globals.css`
- Custom CSS variables: `--accent-gold: #D4AF37`, `--font-poppins`, `--font-playfair`, `--font-fredoka`
- Use `clsx` + `tailwind-merge` (via `cn()` helper if present) for conditional classes
- Fonts: **Fredoka** for headlines, **Playfair Display** for elegant/serif headings, **Poppins** for body
- Path alias: `@/*` maps to `src/*`

### React Compiler

`reactCompiler: true` is set in `next.config.ts`. Avoid manual `useMemo`/`useCallback` unless profiling shows a need — the compiler handles most memoization.
