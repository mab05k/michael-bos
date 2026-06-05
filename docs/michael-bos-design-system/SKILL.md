---
name: michael-bos-design
description: Use this skill to generate well-branded interfaces and assets for michael-bos.com — Michael Bos's personal portfolio (engineering manager, Las Vegas, NV) — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Themes blend desert/Red Rock sandstone, CI/CD engineering, and reserved U.S. Navy heritage.
user-invocable: true
---

Read the `README.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

## Quick orientation

- **Tokens:** `colors_and_type.css` is the single source of truth. Import it first in any new file.
- **Hero image:** `assets/michael-climbing.jpg` — Michael on red Red-Rock sandstone. Use full-bleed with a canyon-ink protection gradient.
- **Icons:** `assets/icons/` — curated Lucide. Use these for UI. `assets/marks/` — custom climbing/Navy/pipeline marks.
- **Components:** `ui_kits/portfolio/` — React components (JSX). Copy components rather than re-inventing them.
- **The Navy block is sacred:** deep navy + brass colors only appear in the bio's USN section. Don't sprinkle them.
- **No emoji.** Use Lucide + mono status glyphs (`✓ → ▌ ×`).
- **Voice:** first-person, plainspoken, specific over abstract. See README "Content fundamentals".
