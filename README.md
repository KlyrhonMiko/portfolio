# Portfolio

Klyrhon Aurel’s project-first portfolio, built with Next.js, React, TypeScript, and CSS Modules.

## Features

- Selected projects with real product screenshots and expandable build notes.
- A mobile screen gallery for Koin and an interactive Python loop illustration for nulll.
- Section-aware navigation, light and dark themes, and reduced-motion support.
- A responsive résumé page with a print layout and downloadable PDF.
- Visible certificates and direct project, source, and contact links.

## Development

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).

```sh
npm run lint
npx tsc --noEmit
npm run build
```

## Structure

- `src/app`: portfolio and résumé routes, metadata, and global styles.
- `src/components`: portfolio presentation, interactive showcases, certificates, and theme provider.
- `public`: product screenshots, certificate assets, icons, and the résumé PDF.
- `DESIGN.md`: the current visual system.
- `PRODUCT.md`: portfolio purpose and requirements.

## Portfolio versions

This branch contains the portfolio for [klyrhon.me](https://klyrhon.me). The previous animated design lives on the `creative` branch and is deployed at [creative.klyrhon.me](https://creative.klyrhon.me).
