# Portfolio starter

A small three-file site (`index.html`, `style.css`, `script.js`) meant as a
sample to test GitHub Pages and as a starting point for your real portfolio.
Styled as a minimal, chemistry-inspired lab notebook — periodic-table-style
identity tile, data-sheet project table, hairline rules on off-white paper.

## Publish it on GitHub Pages

1. Create a new repository on GitHub (public, or private on a paid plan).
   A repo named `your-username.github.io` publishes at the root domain;
   any other name publishes at `your-username.github.io/repo-name`.
2. Add these three files to the repo root, then commit and push:
   ```
   git init
   git add index.html style.css script.js README.md
   git commit -m "Add portfolio starter"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a branch",
   pick the `main` branch and `/ (root)` folder, then save.
5. GitHub gives you a URL (usually live within a minute or two) at
   `https://your-username.github.io/your-repo/`.

## Make it yours

Everything worth changing is in one of three places:

- **Content** — edit the text directly in `index.html`. Replace the name,
  role, project descriptions, and links in the `mailto:` and social list.
- **Colors** — edit the `:root` block at the top of `style.css`. Every
  color in the page is a CSS variable, so changing `--accent` or `--bg`
  re-themes the whole site.
- **Fonts** — the Google Fonts `<link>` tags are in the `<head>` of
  `index.html`; swap the family names there and in the `--font-*`
  variables in `style.css`.

The layout is responsive down to mobile and works with no build step —
just static files, so any static host (GitHub Pages, Netlify, Vercel) works.
