# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal biography/resume/portfolio static site for michael-bos.com, built with Astro 6. Deployed to GitHub Pages via `.github/workflows/deploy.yml` (push to `main`, plus a daily cron rebuild so build-time data stays fresh).

## Commands

```sh
pnpm dev          # Dev server at localhost:4321 (hot reload)
pnpm build        # Production build to ./dist/
pnpm preview      # Preview the production build locally
pnpm astro check  # Type-check .astro files
pnpm astro add    # Add official integrations (e.g. tailwind, mdx, react)
```

Package manager: **pnpm** (not npm or yarn).

## Astro Fundamentals

**Routing** — file-based. Every `.astro` or `.md` file under `src/pages/` becomes a route matching its filename. `src/pages/index.astro` → `/`.

**Component syntax** — `.astro` files have two zones separated by `---`:
```astro
---
// Component Script (runs at build time, server-side only)
const greeting = "Hello";
---
<!-- Component Template (HTML + JSX-like expressions) -->
<p>{greeting}</p>
```
No runtime JS by default — everything is rendered to static HTML at build time unless you opt in with `client:*` directives.

**Islands / partial hydration** — UI framework components (React, Vue, Svelte, etc.) can be embedded in `.astro` files. They ship zero JS unless given a hydration directive:
- `client:load` — hydrate immediately on page load
- `client:idle` — hydrate when browser is idle
- `client:visible` — hydrate when the element enters the viewport

**Layouts** — reusable page shells typically live in `src/layouts/`. Pages opt into a layout by wrapping content in the layout component or using frontmatter (for Markdown).

**Content Collections** — for structured content (blog posts, projects, etc.), define a collection schema in `src/content/config.ts` and place files in `src/content/<collection>/`. Query with `getCollection()`. This is the preferred pattern for any content that needs frontmatter/metadata.

**Static assets** — files in `public/` are served as-is at the root path. Images that need Astro's optimization pipeline go in `src/assets/` and are imported directly.

**TypeScript** — strict mode enabled (`astro/tsconfigs/strict`). `.astro` types are auto-generated in `.astro/types.d.ts`.

## Current Structure

```
src/
  styles/
    tokens.css       # Design tokens (desert/Red Rock palette, type, spacing, shadows)
    shared.css       # Imports fonts + tokens; global utilities, nav, footer, pills
  components/
    SiteHeader.astro    # Shared top nav
    PhotoCarousel.astro # Reusable photo carousel (used twice on /biography)
    FloridaChip.astro   # Florida-map chip icon (used twice on /biography)
  layouts/
    InnerLayout.astro  # Shared shell for inner pages (sitenav + footer)
  pages/
    index.astro      # Homepage — hero with photo + CTAs
    biography.astro  # Chapter-based life story; themed stages, timeline rail,
                     # Mountain Project ticks fetched at build time (10s timeout)
    resume.astro     # Service-record format — identity card, experience tours, skills
    portfolio.astro  # Projects — Daybook (active), Forex Algo Trader (archived)
```

**Design system**: Desert/Red Rock palette — Rust (`--rust`) primary, Ochre accent, Canyon ink on bone/sand surfaces; a navy+brass set for the USN section. Fonts: Inter Variable (display/body) and JetBrains Mono Variable (labels/dates/coords), self-hosted via `@fontsource-variable/*` packages imported at the top of `shared.css`. Old Moss/Clay/Ink token names still resolve through backward-compat aliases in `tokens.css`.

**CSS approach**: `shared.css` imports `tokens.css` and defines global utilities (`.pill`, `.sitenav`, `.eyebrow`, `.site-footer`, etc.). Each page adds its own styles in `<style is:global>` blocks — this is intentional since each page is a separate static HTML document.

**Copy voice**: All site prose is first-person Michael. Plain, chronological, complete declarative sentences; facts carry the weight. No sentence fragments for effect, no staccato parallelism, no aphorisms ("X is the point"-style lines). Reference: his UNLV letter of intent. When adding or editing copy, match that register.

**Routing**: `/` → index.astro, `/biography` → biography.astro, `/resume` → resume.astro, `/portfolio` → portfolio.astro.

**Biography page structure**: `/biography` is a JS-driven chapter stage (one chapter visible at a time, timeline rail at the bottom). Chapter 1 renders visible by default so the page works without JS; the inline script manages visibility from there. The Mountain Project tick fetch is wrapped in try/catch with a timeout — the build must never fail because the RSS feed is down.

Adding integrations (`pnpm astro add tailwind`, `pnpm astro add mdx`, etc.) auto-updates `astro.config.mjs` and `package.json`.
