# michael-bos.com — Design System Reference

> Full source: [`../michael-bos-design-system/`](../michael-bos-design-system/)
> Production tokens: [`../../src/styles/tokens.css`](../../src/styles/tokens.css)

Three visual pillars: **Desert & Red Rock** (warm sandstone palette, solid surfaces) · **Engineering / CI/CD** (JetBrains Mono, terminal components, status colors) · **U.S. Navy heritage** (deep navy + brass, used exclusively in the bio's USN section).

---

## Fonts

| Role | Family | Weights | Source |
|---|---|---|---|
| Display & body | **IBM Plex Sans** | 400 / 500 / 600 / 700 | Google Fonts |
| Mono | **JetBrains Mono** | 400 / 500 / 700 | Google Fonts |

```css
--font-display / --font-body: 'IBM Plex Sans', ui-sans-serif, system-ui, ...
--font-mono:                  'JetBrains Mono', ui-monospace, ...
--font-sans:                  alias → --font-body
```

---

## Color palette

### Surfaces & text
| Token | Value | Use |
|---|---|---|
| `--bg-bone` | `#F2EAD9` | Page background — sun-bleached sandstone |
| `--bg-sand` | `#E5D3B3` | Cards, secondary surfaces |
| `--bg-sand-deep` | `#D4BC92` | Hovered cards, inset areas |
| `--canyon-ink` | `#1F140C` | Primary text |
| `--canyon-shadow` | `#3D2418` | Secondary text, deep accents |
| `--canyon-fade` | `#6E5945` | Muted / captions / labels |

### Brand
| Token | Value | Use |
|---|---|---|
| `--rust` | `#B84A26` | **Primary brand.** Links, CTAs, eyebrows, active indicators |
| `--rust-deep` | `#8C3418` | Hover / pressed rust |
| `--rust-soft` | `#E8B89F` | Tinted backgrounds, selection |
| `--ochre` | `#D4892C` | Warm accent, quote marks, sun-warmed details |
| `--sage` | `#7A8B6E` | Muted secondary |
| `--sky` | `#6B92B5` | Cool accent, info state, focus ring |

### Military (USN section only)
| Token | Value |
|---|---|
| `--navy` | `#0C1B33` |
| `--brass` | `#B8924A` |
| `--brass-bright` | `#E0B870` |
| `--bone-on-navy` | `#E8E0CC` |

### Status / CI
| Token | Value |
|---|---|
| `--status-pass` / `--status-pass-bg` | `#3F8A4F` / `#DDEBD6` |
| `--status-build` / `--status-build-bg` | `#C8881A` / `#F3E4C4` |
| `--status-fail` / `--status-fail-bg` | `#B23A2A` / `#F1D4CB` |

### Utility
```css
--hairline:        rgba(31, 20, 12, 0.12)   /* default dividers */
--hairline-strong: rgba(31, 20, 12, 0.22)   /* stronger rules */
--focus-ring:      var(--sky)
```

---

## Type scale

```css
/* Named (use these in new code) */
--fs-xs:   12px   --fs-sm:  14px   --fs-base: 16px   --fs-md:  18px
--fs-lg:   22px   --fs-xl:  28px   --fs-2xl:  36px   --fs-3xl: 52px

/* Pixel-named (backward compat) */
--fs-11 through --fs-56 at 16px root
```

**Line-height:** `--lh-tight: 1.05` · `--lh-snug: 1.2` · `--lh-normal: 1.5` · `--lh-relaxed: 1.65`  
**Tracking:** `--tr-tight: -0.02em` · `--tr-wide: 0.04em` · `--tr-caps: 0.08em`

---

## Spacing

4px base unit. Named scale: `--s-1` (4px) → `--s-10` (128px).  
Backward-compat pixel-named: `--sp-1` through `--sp-24`.

---

## Radius & shadow

```css
--r-sm: 4px   --r-md: 8px   --r-lg: 12px   --r-pill: 999px

--shadow-1: 0 1px 2px rgba(31,20,12,0.06), 0 2px 8px rgba(31,20,12,0.04)   /* cards at rest */
--shadow-2: 0 4px 12px rgba(31,20,12,0.08), 0 12px 32px rgba(31,20,12,0.06) /* elevated / hover */
```

**No glow effects. No colored shadows.**

---

## Motion

```css
--ease-out:  cubic-bezier(0.2, 0.7, 0.1, 1)   /* fast out, slow in */
--dur-fast:  180ms   /* micro interactions */
--dur-base:  260ms   /* layout shifts */
```

No bounces, no spring overshoot. All transitions go to 0ms behind `prefers-reduced-motion`.

---

## Cards

- Background: `--bg-sand`, no border, `--shadow-1`, radius `--r-md` or `--r-lg`
- Hover: shadow goes 1→2, background goes to `--bg-sand-deep`
- **No colored left-border accents** (that trope is banned per spec)

---

## Navigation

Sticky, translucent on scroll:
```css
background: rgba(242, 234, 217, 0.85);
backdrop-filter: blur(10px);
border-bottom: 1px solid var(--hairline);
```

Brand mark: dark `#1F140C` square (rx 6) · rust pipeline line · ochre dot.

---

## Hero

Full-bleed photo (`/michael-bos-action.jpg`) with canyon-ink protection gradient:
```css
linear-gradient(180deg, transparent 0%, rgba(15,9,5,0.96) 100%)
```
Fades to `--bg-bone` at the very bottom for seamless section transition. Text overlaid at bottom of frame with `text-shadow`.

---

## Rules

- **No emoji.** Use Lucide SVG icons (`assets/icons/`) or monospace glyphs (`✓ → ▌ ×`).
- **Navy colors only in USN section.** `--navy` and `--brass` are honor-framed, not decorative.
- **No gradients except the hero protection overlay.**
- **No glassmorphism on cards.** Blur is for navigation chrome only.
- **Voice:** first-person, plainspoken, specific. Numbers and outcomes over adjectives.

---

## Backward-compatibility aliases

`tokens.css` maps all old token names (`--moss-*`, `--clay-*`, `--ink-*`, `--card-bg`, etc.) to the new palette so existing page styles work without rewriting. See the alias section at the bottom of `src/styles/tokens.css`.

---

## Files

| Path | Contents |
|---|---|
| `src/styles/tokens.css` | Single source of truth — all tokens + base element styles |
| `src/styles/shared.css` | Global component styles (nav, pills, footer) |
| `src/layouts/InnerLayout.astro` | Page shell — sticky nav, footer |
| `docs/michael-bos-design-system/` | Full design system source (CSS, icons, marks, UI kit) |
| `docs/michael-bos-design-system/project/colors_and_type.css` | Original design system tokens |
| `docs/michael-bos-design-system/project/ui_kits/portfolio/styles.css` | UI kit component styles |
