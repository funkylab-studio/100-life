# 人森百態 · 100 LIFE

Podcast landing page for Amidon's 100 LIFE show. Static React/Vite site, content-driven by a single JSON file, editable via Pages CMS.

## Stack
- **Vite + React + TypeScript**
- **Content** : `public/content.json` (fetched at runtime — no rebuild needed for content changes)
- **CMS** : [Pages CMS](https://pagescms.org) (schema in `.pages.yml`)
- **Build output** : pure static HTML/CSS/JS (deploy `dist/` anywhere)

## Commands
```bash
yarn dev       # dev server http://localhost:5173
yarn build     # tsc + vite build → dist/
yarn preview   # preview dist/ locally
```

## Editing content

### Option 1 — Pages CMS (recommended, online)
1. Push this repo to GitHub
2. Go to https://app.pagescms.org → *Add project* → select your repo
3. It auto-detects `.pages.yml` and builds the form UI
4. Edit fields → *Save* → it commits to `public/content.json` on GitHub
5. Redeploy (push triggers your CI, or rebuild manually)

### Option 2 — Built-in editor (local preview)
- Open the site → click **✎** button (or press **⌘E** / **Ctrl+E**)
- Edit the JSON in the textarea
- **Apply preview** → localStorage override (only you see it)
- **Download JSON** → upload the file to replace `/content.json` on your server

### Option 3 — Direct file edit
Edit `public/content.json` in any editor, `yarn build`, redeploy.

## File structure
```
100-life/
├── .pages.yml             # Pages CMS schema
├── package.json           # Vite + React + TS
├── index.html             # Vite entry
├── public/
│   ├── content.json       # ← EDITABLE CONTENT
│   └── assets/            # images (logo, episode covers)
└── src/
    ├── main.tsx
    ├── App.tsx            # fetch content.json + route sections
    ├── types.ts           # SiteContent interface
    ├── styles.css
    ├── utils/richText.tsx # **bold** / _italic_ inline parser
    └── components/
        ├── Marquee.tsx
        ├── NavPills.tsx
        ├── Intro.tsx
        ├── SectionHead.tsx
        ├── EpisodeRow.tsx
        ├── TrilogyCard.tsx
        ├── PlatformPill.tsx
        ├── BigCTA.tsx
        ├── Footer.tsx
        └── Editor.tsx
```

## Notes
- `public/content.json` is fetched at page load (`cache: 'no-store'`), so content updates don't require a rebuild — replace the file and reload.
- Text fields support `**bold**` (highlighted gold) and `_italic_` markers.
- `colorScheme: 'light'` is enforced on podcast iframes — Apple Podcasts respects it when the system isn't in forced dark mode.
