# CancerCare

CancerCare is an early, community-focused project concept for clearer access to cancer information and care, beginning in Embu County. This repository contains a responsive organization-style website preview built with React, TypeScript, and Vite.

The preview has an English/Kiswahili switch, a dedicated `/learn/` page with source-linked cancer basics and an interactive screening guide, a `/find-care/` page that explains how facilities will be verified, a `/how-it-works/` page that separates current progress from the proposed Embu pilot, and a `/get-involved/` page for project feedback. A bilingual **CancerCare assistant** chat is available on every page, the Learn page has a printable **questions-for-your-visit** builder and **myth vs fact** cards, and unknown links show a friendly 404 page. The redesigned contact form is fillable on desktop and mobile; it sends directly to the project mailbox when SMTP is configured. The educational wording awaits local clinical review. The site does not yet provide medical advice, patient accounts, referrals, or live facility listings.

## Development

```sh
pnpm install
pnpm dev
```

For a local contact-form send, put a Gmail app password in the ignored `.env` file as `SMTP_PASS=...` and run `pnpm dev`. For AI chat answers, also add a Google AI Studio key as `GEMINI_API_KEY=...`; without it the assistant uses built-in quick answers. See [assistant setup](docs/21-assistant-and-interactive-learning.md) and `.env.example`. The Vite development server uses the same contact handler as the Cloudflare Pages Function. See [contact setup](docs/20-contact-rebuild.md).

## Build

```sh
pnpm build
```

The build output is `dist/`. Cloudflare Pages can use `pnpm build` and `dist` when the site is ready to publish.

The `/api/contact` endpoint is a Cloudflare Pages Function using Nodemailer and Gmail SMTP. The local `.env` file is ignored by Git and used only for local Pages development. To enable the deployed form, configure `SMTP_PASS` as a Cloudflare Pages encrypted secret containing an app password for `buildwithanie@gmail.com`, enable Node.js compatibility for Pages Functions, then confirm a non-sensitive live test reaches that inbox. Until the secret is configured, the form remains fillable and clearly disables Send. See [contact setup](docs/20-contact-rebuild.md).

The `/api/chat` endpoint is a Cloudflare Pages Function that calls the Gemini API when the encrypted `GEMINI_API_KEY` secret is set. Emergency messages always get a fixed reply with 999 and 112, and the assistant never gives diagnoses or names unverified facilities.

Run all tests with `pnpm test`.

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
15. [Screening guide preview](docs/15-screening-guide.md)
16. [Dedicated Learn page](docs/16-dedicated-learn-page.md)
17. [Dedicated Find care page](docs/17-dedicated-find-care-page.md)
18. [Dedicated How it works page](docs/18-dedicated-how-it-works-page.md)
19. [Get involved email flow](docs/19-get-involved-email-flow.md)
20. [Contact page and on-site delivery](docs/20-contact-rebuild.md)
21. [CancerCare assistant and interactive learning](docs/21-assistant-and-interactive-learning.md)
22. [Smarter assistant, partners strip and awareness calendar](docs/22-smarter-assistant-partners-awareness.md)
23. [About page, privacy and terms, voice features and printable leaflets](docs/23-about-privacy-voice-leaflets.md)
24. [Grouped navigation menus](docs/24-navigation-menus.md)

The next steps are local clinical review of the introductory guide and direct provider confirmation of the first Embu facility. Publish facility details only after its services, access and contact route are verified.



## Where to make changes

- Edit words and translations in `src/content.ts`.
- Edit what the chat assistant knows, its safety rules and emergency wording in `shared/assistant.js` and `shared/cancer-topics.js`.
- Edit the main menu and footer links in `src/data/navigation.ts`.
- Edit partners and trusted sources in `src/data/partners.ts`.
- Edit organisation facts and the team in `src/data/organisation.ts`.
- Edit the About, Privacy, Leaflets and voice wording in `src/content-pages.ts`.
- Edit a page section in `src/components/sections/`.
- Edit the site colors and font tokens in `src/index.css`.
- Reuse or customize shadcn components in `src/components/ui/`.
- Edit language behavior in `src/hooks/useLanguage.ts`.




