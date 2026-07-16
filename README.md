# Customer Knowledge Base

This repository publishes a simple static customer knowledge base to GitHub Pages.

The live site is generated from Markdown files in `content/`. The old `docs/` Docusaurus folder is no longer the source of truth.

## Edit Content

Recommended editor:

```text
https://pagescms.org
```

Sign in with GitHub, open `Kisdof1919/customer-knowledge`, and edit the collections configured in `.pages.yml`.

Main content folders:

```text
content/how-to/
content/troubleshooting/
```

Downloadable PDFs, Excel files, and similar documents live in:

```text
static/files/
```

Images used inside articles live in:

```text
site/assets/images/
```

## Local Build

Run this before previewing or deploying if Markdown content changed:

```bat
node scripts/build-content.mjs
```

The script generates:

```text
site/content/knowledge.json
```

## GitHub Pages Deployment

GitHub Actions runs `node scripts/build-content.mjs`, copies `static/files/` into the published site, and deploys the `site/` folder.

Every push to `main` redeploys the public site automatically.
