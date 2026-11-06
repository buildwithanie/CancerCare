# CancerCare — Step 7: Component and shadcn refactor

The homepage is now assembled from focused TypeScript components. Tailwind v4 provides layout and color utility classes, while shadcn/ui provides the Button and Card source components. shadcn still uses CSS under the hood; the remaining src/index.css file contains Tailwind imports, shadcn theme variables, and CancerCare design tokens. The old page-wide src/styles.css is no longer used.

## Where to edit

- src/content.ts — English and Kiswahili copy.
- src/components/sections/ — the six homepage sections, each in its own file.
- src/components/SiteHeader.tsx and SiteFooter.tsx — navigation and page shell.
- src/components/ui/ — shadcn components owned by this project.
- src/lib/site-styles.ts — shared Tailwind class groups for section width, spacing, and headings.
- src/index.css — brand colors, display font, and minimal global rules.
- src/hooks/useLanguage.ts — language selection, document language, title, and saved preference.
- scripts/generate-embu-map.mjs — reproducible map asset generation.

The page keeps the Embu boundary graphic, numberless section markers, concept status, and AI-image disclosure.

## Documentation checked 26 October 2026

- shadcn/ui Vite installation: https://ui.shadcn.com/docs/installation/vite
- shadcn/ui CLI: https://ui.shadcn.com/docs/cli
- Tailwind CSS Vite installation: https://tailwindcss.com/docs/installation/using-vite
- TypeScript 7 release: https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/

The shadcn Vite guide includes baseUrl, but TypeScript 7 removed that option. This project uses an explicit @/* path mapping without baseUrl. The TypeScript production build and desktop/phone browser checks passed.
