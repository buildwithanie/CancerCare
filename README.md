# CancerCare

CancerCare is an early, community-focused project concept for clearer access to cancer information and care, beginning in Embu County. This repository contains a responsive organization-style website preview built with React, TypeScript, and Vite.

The preview has an English/Kiswahili switch and a short, source-linked cancer education section. The educational wording awaits local clinical review. The site does not yet provide medical advice, patient accounts, referrals, or a live facility directory.

## Development

```sh
pnpm install
pnpm dev
```

## Build

```sh
pnpm build
```

The build output is `dist/`. Cloudflare Pages can use `pnpm build` and `dist` when the site is ready to publish.

## Project steps

1. [Foundation and technology choice](docs/01-foundation.md)
2. [Language switch and Embu pilot](docs/02-language-and-pilot.md)
3. [Organization-style site](docs/03-organization-site.md)
4. [Realistic cancer-care hero image](docs/04-realistic-cancer-hero.md)
5. [Collaboration diagram](docs/05-collaboration-diagram.md)
6. [Embu map and numberless homepage](docs/06-embu-map-and-numberless-layout.md)
7. [shadcn and component refactor](docs/07-shadcn-component-refactor.md)
8. [Embu facility directory foundation](docs/08-embu-directory-foundation.md)
9. [Warm community NGO visual refresh](docs/09-warm-community-visual-refresh.md)
10. [One font and one color family](docs/10-single-font-green-palette.md)
11. [First Embu facility verification](docs/11-first-facility-verification.md)
12. [Copy and layout polish](docs/12-copy-and-layout-polish.md)
13. [Directory access readiness](docs/13-directory-access-readiness.md)
14. [Hero imagery and first education guide](docs/14-hero-and-first-education-guide.md)

The next steps are local clinical review of the introductory guide and direct provider confirmation of the first Embu facility. Publish facility details only after its services, access and contact route are verified.



## Where to make changes

- Edit words and translations in `src/content.ts`.
- Edit one homepage section in `src/components/sections/`.
- Edit the site colors and font tokens in `src/index.css`.
- Reuse or customize shadcn components in `src/components/ui/`.
- Edit language behavior in `src/hooks/useLanguage.ts`.




