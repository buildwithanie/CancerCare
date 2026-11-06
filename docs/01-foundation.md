# CancerCare — Step 1: Foundation

## Product decision

Start with a mobile-friendly web application for people in Kenya seeking reliable cancer information and a route to appropriate services. Pilot Embu County before expanding the directory. The first release is public and does not need patient accounts.

This is a product planning decision. It is not a clinical protocol. All medical content and any care-navigation wording need review by qualified Kenyan clinicians before public use.

## First release

1. Clinically reviewed educational content in plain English and Kiswahili.
2. A verified directory of facilities and available services for one pilot area.
3. A simple explanation of what to do before, during and after seeking care.
4. A fast phone experience, with low-data pages and selected content available offline later.

The initial preview contains no live directory or clinical advice. Do not insert made-up facilities or screening rules.

## Technology choice

| Need | First choice | Reason |
| --- | --- | --- |
| User interface | React + TypeScript + Vite | Current Cloudflare documentation supports this stack, and the build can deploy as static files. |
| Hosting | Cloudflare Pages | Suitable for the public first release; a Vite build outputs `dist`. |
| Content data | Versioned files in the repository at first | The first release can launch without a database or account. |
| Database when editing or accounts are needed | Supabase Postgres | Open-source stack with a managed free tier for a prototype and self-hosting option later. |
| Authentication when accounts are needed | Supabase Auth | Integrated with its database; avoid building password handling ourselves. |

Cloudflare D1 is another viable database for a simple directory, but it does not include patient authentication. Choosing it now would add a separate auth service or a custom integration. D1 also does not currently list a Kenya-specific data jurisdiction. Thus the prototype will keep health records out of both platforms until hosting, data protection, and clinical governance are reviewed.

Cloudflare is a proprietary hosted service. Supabase's software is open source; its managed free tier is a hosted service with limits and may pause for inactivity. “Open source” and “free hosting” are different things.

## Boundaries for this step

- No patient account or health record.
- No symptom checker that diagnoses or estimates cancer risk.
- No real facility listing before verification with the facility.
- No production deployment until the public content is ready.

## Next implementation step

Embu County is the pilot area. Identify a clinical reviewer and a person who will verify facility details, then build the first usable directory and education pages from approved information. Decide on database and authentication when the workflow actually requires them.

## Sources checked 25 October 2026

- Cloudflare React + Vite deployment: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/
- Cloudflare D1 data location: https://developers.cloudflare.com/d1/configuration/data-location/
- Cloudflare D1 free limits: https://developers.cloudflare.com/d1/platform/pricing/
- Supabase Auth: https://supabase.com/docs/guides/auth
- Supabase free plan and limits: https://supabase.com/pricing
- Supabase self-hosting: https://supabase.com/docs/guides/self-hosting
- WHO early diagnosis: https://www.who.int/publications/i/item/guide-to-cancer-early-diagnosis
- Kenya ODPC health-data guidance: https://www.odpc.go.ke/wp-content/uploads/2024/02/ODPC-Guidance-Note-on-Processing-of-Health-Data.pdf

