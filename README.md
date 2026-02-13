# LinkedIn Carousel Maker (Vite + React + TypeScript)

A static-deployable web app for creating mostly text-based LinkedIn carousel posts with optional image blocks, local project persistence, and PDF export.

## Features
- Template-first workflow: choose template → customize branding → edit slides → preview/export.
- Slide editor with text/image blocks and position controls.
- Project save/load/delete using browser `localStorage`.
- PDF export using `html2canvas` + `jsPDF`.
- React Router-based editor/preview routes.
- GitHub Pages-ready build and deploy script.

## Project structure

```text
.
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── src
    ├── App.tsx
    ├── main.tsx
    ├── styles.css
    ├── types.ts
    ├── components
    │   ├── BrandingEditor.tsx
    │   ├── ProjectLibrary.tsx
    │   ├── SlideEditor.tsx
    │   ├── SlidePreview.tsx
    │   └── TemplatePicker.tsx
    ├── data
    │   └── templates.ts
    └── lib
        ├── pdf.ts
        └── storage.ts
```

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

1. Create a GitHub repo (expected repo name in this project config: `linkpost`).
2. Ensure `vite.config.ts` `repoName` matches your repository name if different.
3. Run:

```bash
npm run deploy
```

This pushes the built `dist/` folder to the `gh-pages` branch via the `gh-pages` package.

