# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal biography/resume/portfolio static site for michael-bos.com, built with Astro 6. Currently in early development — no content exists yet.

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
    tokens.css       # Design tokens (colors, type, spacing, shadows)
    shared.css       # Global site utilities, nav, footer, pill/eyebrow components
  layouts/
    InnerLayout.astro  # Shared shell for /biography and /resume (sitenav + footer)
  pages/
    index.astro      # Homepage — custom nav, hero, quick facts, quote, forward cards
    biography.astro  # Route map + 4 chapter cards
    resume.astro     # Service-record format — identity card, experience tours, skills
```

**Design system**: Moss (olive-green primary), Clay (terracotta accent), Ink (warm charcoal). Geist Sans for prose, Geist Mono for labels/dates/coords. Loaded from Google Fonts CDN (`tokens.css`); download `.woff2` to `/public/fonts/` for production.

**CSS approach**: `shared.css` imports `tokens.css` and defines global utilities (`.pill`, `.sitenav`, `.eyebrow`, `.site-footer`, etc.). Each page adds its own styles in `<style is:global>` blocks — this is intentional since each page is a separate static HTML document. The home page overrides `body { background-image: none }` to remove the dot-grid from `shared.css`.

**Portrait placeholder**: The home page has a silhouette SVG placeholder. Replace it with `<img>` once a photo is available.

**Routing**: `/` → index.astro, `/biography` → biography.astro, `/resume` → resume.astro.

Adding integrations (`pnpm astro add tailwind`, `pnpm astro add mdx`, etc.) auto-updates `astro.config.mjs` and `package.json`.
