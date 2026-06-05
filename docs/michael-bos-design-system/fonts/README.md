# Fonts

This system loads three Google Fonts via CDN — no font files are bundled here:

| Family | Role | Google Fonts URL |
|---|---|---|
| IBM Plex Sans | Display & body | https://fonts.google.com/specimen/IBM+Plex+Sans |
| JetBrains Mono | Mono / code / CI output | https://fonts.google.com/specimen/JetBrains+Mono |

The `@import` lives in `colors_and_type.css`.

**To self-host:** download the TTF / WOFF2 files, drop them in this folder, replace the `@import` with `@font-face` blocks, and update CSS variables in `colors_and_type.css` if the family names differ.
