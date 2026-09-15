# BLUDLUNG 360

React dashboard built with Vite, ready for GitHub Pages.

## Run locally

Use Node.js 22 and npm:

```sh
npm ci
npm run dev
```

To preview the production build:

```sh
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repository and push this project's source files to its `main` branch. Include `.github/workflows/deploy.yml`, `package-lock.json`, and the six images imported by `src/main.jsx` (`1.png` through `4.png`, `avatar.png`, and `xbox-achievement-badge.png`). The `.gitignore` excludes `node_modules` and `dist`.
2. In the repository, open **Settings > Pages** and select **GitHub Actions** under **Build and deployment > Source**.
3. Open **Actions > Deploy to GitHub Pages > Run workflow** and run it on `main`. Later pushes to `main` deploy automatically.
4. Once the workflow succeeds, open the site URL shown by the deployment, usually `https://USERNAME.github.io/REPOSITORY/`.

If your default branch has another name, update `on.push.branches` in `.github/workflows/deploy.yml`.

Vite uses relative asset URLs, so the build works under any repository name, at `https://USERNAME.github.io/`, or on a custom domain. Images are imported into the bundle and included automatically in `dist/assets`.

The workflow builds and publishes `dist`; no separate `gh-pages` branch or deployment token is needed.

See [GitHub's Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Update social links

Replace the `REPLACE_ME` values in `SOCIAL_LINKS` near the top of `src/main.jsx` with your real profile and invite URLs.
