# Portfolio UI Kit

Click-through recreation of **michael-bos.com** built from the design system tokens. Live at `index.html` — it lets you navigate between four screens (Home, Writing, Bio, Contact) and demonstrates every reusable component.

## Components

| File | Exports |
|---|---|
| `Nav.jsx` | `Nav` — sticky top nav with blur-on-scroll |
| `Hero.jsx` | `Hero` — full-bleed photo + headline |
| `ProjectCard.jsx` | `ProjectCard`, `WritingCard` — case-study and writing list items |
| `Pipeline.jsx` | `Pipeline` — animated CI/CD stage diagram |
| `Terminal.jsx` | `Terminal` — code/output block |
| `NavyRibbon.jsx` | `NavyRibbon` — USN service block (military theme) |
| `ClimbingLog.jsx` | `ClimbingLog` — recent climbing ticks |
| `ContactForm.jsx` | `ContactForm` — name / email / textarea |
| `Footer.jsx` | `Footer` — minimal end-of-page |
| `Section.jsx` | `Section`, `Eyebrow` — layout primitives |

All components are simple, mostly-cosmetic recreations — they look right, not production-grade.

## Screens

1. **Home** — hero, "how I ship" with pipeline, case studies, recent writing
2. **Writing** — list of essays
3. **Bio** — long-form, includes USN ribbon and climbing log
4. **Contact** — form + map pin

## How to run

Open `index.html`. Nav links swap screens via in-memory state.
