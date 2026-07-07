# Customer Knowledge Base

This is a Docusaurus-based customer knowledge base.

## Local Preview

```powershell
pnpm start
```

Open:

```text
http://127.0.0.1:3000/
```

## Production Build

```powershell
pnpm build
```

The generated site is written to:

```text
build/
```

## Search

Local search is generated during the production build. In `pnpm start` development mode, the search box may show that the search index is only available after running `docusaurus build`.

To preview the production build with search:

```powershell
pnpm build
pnpm serve
```

## GitHub Pages Deployment

This repository includes a GitHub Actions workflow at:

```text
.github/workflows/deploy.yml
```

After the repository is pushed to GitHub, enable GitHub Pages with **GitHub Actions** as the source. Every push to the `main` branch will build and deploy the site.

## Adding Articles

Add `.mdx` files under `docs/`. The sidebar is generated automatically from the folder structure.
