# Deployment — GitHub Pages + Namecheap

This site is deployed as a static site via **GitHub Pages**, triggered automatically on every push/merge to `main`.

---

## 1. One-time GitHub setup

### 1a. Enable Pages in the repo

1. Go to your GitHub repo → **Settings → Pages**.
2. Under **Build and deployment**, set Source to **GitHub Actions**.
3. Save. You don't need to pick a branch — the workflow below handles publishing.

### 1b. Set the custom domain in GitHub

1. Still in **Settings → Pages**, enter `michael-bos.com` in the **Custom domain** field and click Save.
2. Check **Enforce HTTPS** (available once DNS propagates — see step 3).

> GitHub writes a `CNAME` file to the deployed output automatically when you set this in Settings, but we also commit one to `public/CNAME` (step 2) so it survives every deploy.

---

## 2. Commit the CNAME file

Create `public/CNAME` with a single line — no protocol, no trailing slash:

```
michael-bos.com
```

Astro copies everything in `public/` into `dist/` at build time, so this file will be present in every deployment.

---

## 3. DNS configuration in Namecheap

Log in to Namecheap → **Domain List → michael-bos.com → Manage → Advanced DNS**.

### Apex domain A records (required)

Add four **A Record** entries for `@` pointing to GitHub's Pages IPs:

| Type | Host | Value           | TTL        |
|------|------|-----------------|------------|
| A    | @    | 185.199.108.153 | Automatic  |
| A    | @    | 185.199.109.153 | Automatic  |
| A    | @    | 185.199.110.153 | Automatic  |
| A    | @    | 185.199.111.153 | Automatic  |

### www subdomain CNAME (recommended)

| Type  | Host | Value                        | TTL       |
|-------|------|------------------------------|-----------|
| CNAME | www  | `<your-github-username>.github.io` | Automatic |

Replace `<your-github-username>` with your actual GitHub username.

> DNS propagation typically takes 15 minutes to a few hours. You can verify with:
> `dig michael-bos.com +noall +answer`

---

## 4. Update `astro.config.mjs`

Set the `site` field so Astro generates correct canonical URLs and sitemaps:

```js
// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://michael-bos.com',
});
```

---

## 5. GitHub Actions workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: pnpm/action-setup@v4
        with:
          version: latest

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build
        run: pnpm build

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    name: Deploy
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## How it works end-to-end

```
git push / merge PR → main
        ↓
GitHub Actions: build job
  - installs pnpm deps
  - runs pnpm build → dist/
  - uploads dist/ as Pages artifact
        ↓
GitHub Actions: deploy job
  - publishes artifact to GitHub Pages CDN
        ↓
https://michael-bos.com — live within ~1 min
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| 404 on custom domain after deploy | Check `public/CNAME` is committed and contains only `michael-bos.com` |
| HTTPS not available | Wait for DNS to propagate; then re-check "Enforce HTTPS" in Pages settings |
| Build fails on `pnpm install` | Ensure `pnpm-lock.yaml` is committed; `--frozen-lockfile` will error if it's missing |
| Old content served | GitHub Pages CDN caches aggressively; wait ~2 min or do a hard refresh |
