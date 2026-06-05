# Michael Bos Design System

Personal brand & design system for **michael-bos.com** — the portfolio site of Michael Bos, Software Engineering Manager based in Las Vegas, NV.

---

## About the brand

Michael is an engineering manager with a strong focus on **building teams and optimizing processes** — automation, delivery, and CI/CD are his differentiators. He's an Executive MBA (UNLV), a U.S. Navy veteran, and an avid rock climber who lives in the Mojave next door to Red Rock Canyon. The site speaks to three audiences:

1. **Hiring managers / peers** — who want to evaluate engineering leadership chops.
2. **Engineers he might lead** — who want to know what working with him is like.
3. **Friends & climbing partners** — who want the human story.

The design system blends three pillars:

| Pillar | What it brings |
|---|---|
| **Desert & Red Rock** | Warm sandstone palette, canyon textures, horizon layouts, sun-bleached neutrals. The hero motif is the sandstone-and-sage of Red Rock Canyon Conservation Area outside Las Vegas. |
| **Engineering / CI/CD** | Monospace typography, terminal-inspired status badges, pipeline diagrams, build-status colors (green/amber/red), git-graph layouts. |
| **U.S. Navy heritage** | A reserved, structured, single-color secondary surface — deep Navy blue with brass — used **only** in the bio's military section. Treated as a "honor frame," not a constant decoration. |

## Provided sources

| Source | Type | Notes |
|---|---|---|
| `uploads/michael-bos-action.jpg` | Photo | Michael climbing a roof on red sandstone, helmet on, sage scrub below. **The single most important brand asset** — it dictates the palette. Copied to `assets/michael-climbing.jpg`. |
| `michael-bos.com` | Live site | Not accessible from this environment; recreations are inferred from the brief, not from real source. **FLAG:** any production rollout should reconcile against the live design. |
| LinkedIn / RocketReach | Bio context | Las Vegas, NV · Engineering Manager at Guidepoint · prior Switch · UNLV Executive MBA · USN veteran. |

> No codebase, Figma, or existing CSS was provided. Everything below is a **fresh system** built on top of the brief and the climbing photo. If a real site already exists, treat this as a proposed direction and reconcile.

---

## Content fundamentals

**Voice:** First-person, plainspoken, technical when it earns it. Reads like a senior IC talking to peers — not a marketing site, not a recruiter blast. Confident but not boastful. Specific over abstract.

**Casing:** Sentence case everywhere. Headings, buttons, nav. Title Case only for proper nouns (project names, ship names, route names).

**Pronouns:** "I" for Michael himself ("I built…", "I led…"). "You" only in CTAs and questions ("Want to talk about delivery?"). Never "we" — this is a personal site.

**Emoji:** No. The brand uses **monospace status glyphs** (`✓`, `→`, `▌`) and small SVG icons instead. A single climbing emoji or military emoji would cheapen the tone.

**Hyperbole:** Avoid. Replace "passionate", "blazing fast", "rockstar", "ninja" with concrete claims. Numbers and outcomes do the lifting.

**Examples:**

> ✅ "I lead a team of seven shipping a Python/TypeScript trading platform. We deploy ~12 times a day."
> ❌ "I'm a passionate engineering leader driving innovation at scale."

> ✅ "Climbing teaches me how to fail safely. So does CI."
> ❌ "I'm an avid outdoors enthusiast who loves crushing it on the rocks!"

> ✅ "USN, 2008–2014. Deployed twice. The Navy is where I learned what a process is for."
> ❌ "Proud Navy veteran 🇺🇸⚓ Served my country with honor!"

**Section openers** use a short declarative sentence followed by a colon, then the goods. Example: "Three things I optimize for: cycle time, blast radius, team morale."

**Code samples** appear inline when relevant (e.g. a YAML snippet next to a CI/CD story). They're rendered, not described.

---

## Visual foundations

### Palette philosophy
Pulled directly from the climbing photo: warm sandstone red, sun-bleached bone, sage scrub, canyon shadow. Cool tones (sky, navy) are rationed for accents and the military section only — they keep the warmth from going monotonous.

| Token | Hex | Use |
|---|---|---|
| `--bg-bone` | `#F2EAD9` | Default page background. The warm bone of sun-bleached sandstone. |
| `--bg-sand` | `#E5D3B3` | Secondary surface — cards, footers, sidebar fills. |
| `--canyon-ink` | `#1F140C` | Primary text. Near-black with a brown undertone. |
| `--canyon-shadow` | `#3D2418` | Secondary text, deep accents. |
| `--rust` | `#B84A26` | **Primary brand color.** Links, primary CTAs, the climbing-photo red. |
| `--rust-deep` | `#8C3418` | Hover / pressed rust. |
| `--ochre` | `#D4892C` | Sun-warmed accent, build-warning state. |
| `--sage` | `#7A8B6E` | Muted secondary — supporting text on dark, illustrative chrome. |
| `--sky` | `#6B92B5` | Cool accent, info state, link visited. |
| `--navy` | `#0C1B33` | **Military section only.** Background of bio's USN block. |
| `--brass` | `#B8924A` | Pairs with navy. Service ribbons, dividers in military block. |
| `--pipeline-green` | `#3F8A4F` | CI build passing, success states. |
| `--build-amber` | `#C8881A` | CI building, warning. |
| `--build-red` | `#B23A2A` | CI failing, destructive. |

### Typography
A two-family stack — keeping things tight and unified:

- **Display & Body:** **IBM Plex Sans** — humanist warmth, clearly technical. Works from 11px caption all the way up to 76px display. Weights 500/600/700 carry the headings; 400 carries body.
- **Mono:** **JetBrains Mono** — for code, CI/CD output, route names, latitude/longitude, navy serial numbers.

Both are free on Google Fonts; the system loads them via `<link>` and falls back to `ui-sans-serif`/`ui-monospace`. No font files are bundled.

> **FLAG to user:** I don't have an existing site to mirror, so I picked these. If your real site already uses different families, replace the variables in `colors_and_type.css` and re-export.

### Spacing & layout
- **Rhythm:** 4px base unit. `--s-1` through `--s-8` map to 4, 8, 12, 16, 24, 32, 48, 64.
- **Container:** 1100px max, 24px gutter. Reading column 65ch.
- **Rule:** content prefers a 12-column grid; cards prefer asymmetric spans (7/5, 8/4) to keep things from feeling like a marketing tile-wall.

### Backgrounds
- **Default surface** is solid `--bg-bone`. No textures on plain content blocks.
- **Hero & section breaks** can use **the climbing photo full-bleed** with a 60% canyon-ink protection overlay and a bottom 30% gradient fade to `--bg-bone`. Used **sparingly** — at most one full-bleed per page.
- **Subtle paper texture** (4% opacity, fine-grain noise SVG) is allowed on `--bg-sand` cards to evoke sandstone. Not on `--bg-bone`.
- **Gradients are discouraged** — except the one hero protection gradient. No bluish-purple gradients, no glassy CTAs.

### Borders & corners
- **Radius:** `--r-sm: 4px`, `--r-md: 8px`, `--r-lg: 12px`. Cards use `--r-md`. Pills use 999px. No bigger.
- **Borders:** 1px `rgba(31,20,12,0.12)` for default dividers. Cards prefer **no border + soft shadow** to a border. Inputs get a 1.5px border to feel substantial.

### Shadows
A two-tier system — soft and crisp.
- `--shadow-1`: `0 1px 2px rgba(31,20,12,0.06), 0 2px 8px rgba(31,20,12,0.04)` — cards at rest.
- `--shadow-2`: `0 4px 12px rgba(31,20,12,0.08), 0 12px 32px rgba(31,20,12,0.06)` — elevated (modals, popovers, hovered cards).
- **No glow effects.** No colored shadows.

### Hover & press states
- **Links / buttons hover:** color shifts to `--rust-deep`; underline goes from 1px to 2px; **no opacity changes**.
- **Press:** translateY(1px) and shadow drops one tier. No scale transforms (it reads cheap).
- **Cards hover:** shadow goes 1→2, no movement.
- **Focus ring:** 2px `--sky` offset 2px, square (matches button shape).

### Animation
- **Default easing:** `cubic-bezier(0.2, 0.7, 0.1, 1)` — fast out, slow in. Climbers know: pull hard, release soft.
- **Default duration:** 180ms for micro, 260ms for layout shifts. No 600ms+ animations.
- **No bounces, no spring overshoot, no parallax.** One exception: the hero photo can do a very slow (20s) 1.04× Ken Burns crawl if the user wants motion.
- **Reduced-motion:** all transitions go to 0ms behind `prefers-reduced-motion`.

### Transparency & blur
- **Use:** the hero protection overlay (60% canyon-ink), and the sticky nav on scroll (`backdrop-filter: blur(8px)` over `rgba(242,234,217,0.85)`).
- **Don't use:** glassmorphism on cards. The system reads warm and solid; blur is for chrome only.

### Imagery
- **Color temperature:** warm. Desert photography preferred — sandstone, sage, evening light. Avoid cool / overcast unless specifically a Navy frame.
- **Treatment:** no filters by default. The climbing photo is the brand; we don't grade over it.
- **Grain:** none on photos. Reserved for `--bg-sand` cards only.
- **Aspect ratios:** 3:2 for landscape, 4:5 for portrait. The climbing photo is 9:16 — used full-height in hero, cropped for cards.

### Cards
- Background `--bg-sand`, no border, `--shadow-1`, radius `--r-md`, 24px padding.
- Header inside card is `--font-display` 18/24, body is `--font-body` 15/22.
- **No colored left-border accent.** That trope is banned.

### Iconography
Stroke-line, 1.5px stroke, 24×24. See `ICONOGRAPHY` section below.

### Layout rules (fixed elements)
- **Top nav** is sticky and translucent on scroll (see Transparency).
- **No fixed footer**, no fixed CTA bars, no chat bubbles.
- **Sidebars** are reserved for table-of-contents on long-form posts; not used on the marketing landing.

---

## Iconography

The brand uses **Lucide** as its primary icon set — 24×24, 1.5px stroke, currentColor. Lucide is loaded from CDN (`unpkg.com/lucide@latest`) and the project keeps a curated subset of SVGs in `assets/icons/` for offline / Figma use. Lucide's stroke weight and rounding match the engineering-but-warm vibe (vs. Heroicons' lighter feel or Feather's thinner stroke).

**Used as icons:**
- **Lucide SVGs** — for UI: nav, buttons, status, social links.
- **Monospace status glyphs** in `JetBrains Mono` — `✓ passing`, `→ shipped`, `▌ running`, `× failed`. These live inside terminal/CI blocks.
- **Custom climbing & service marks** — a small set of hand-built SVGs in `assets/marks/` for things Lucide doesn't cover: carabiner, anchor (rappel anchor, distinct from the Navy anchor), USN rating badge silhouette, summit triangle.

**Not used:**
- **No emoji.** Anywhere.
- **No unicode dingbats** outside of mono-typeset CI output.
- **No icon fonts** (Font Awesome, etc.) — they bloat and don't tree-shake.
- **No filled-style icons** — the system is line-only for consistency.

**FLAG to user:** I substituted Lucide because no icon set was provided. If your real site uses Phosphor, Tabler, or a custom set, swap the CDN link and re-curate `assets/icons/`.

---

## Index

| File | What it is |
|---|---|
| `README.md` | This file. |
| `SKILL.md` | Agent-Skill manifest. Drop this folder into Claude Code and the skill becomes invocable. |
| `colors_and_type.css` | The full token sheet — colors, type, spacing, shadow, radius, semantic styles. **Import this first** when building anything. |
| `assets/michael-climbing.jpg` | Hero photo. |
| `assets/icons/` | Curated Lucide SVGs. |
| `assets/marks/` | Custom brand marks (carabiner, summit, etc.). |
| `fonts/` | (empty — fonts load from Google Fonts CDN; placeholder for self-hosting later) |
| `preview/` | Design-system tab cards. Not for production use. |
| `ui_kits/portfolio/` | The personal portfolio UI kit: components + interactive index. Open `ui_kits/portfolio/index.html` to click through Home → Writing → Bio → Contact. |

---

## Caveats

- **No live-site access** — recreations are inferred from the brief.
- **Fonts via CDN, not bundled** — replace with TTFs if you self-host.
- **Lucide substitution** for the icon set — see ICONOGRAPHY.
- **No real bio copy** — placeholder text matches the tone guide but isn't Michael's actual story.
