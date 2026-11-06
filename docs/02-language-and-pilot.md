# CancerCare — Step 2: Language and pilot area

## Implemented

- The interface uses TypeScript types for both English and Kiswahili copy.
- Visitors can choose EN or SW. The choice is saved locally in their browser and restored after a reload.
- The page language attribute and title follow the chosen language.
- The first facility-directory pilot area is Embu County.
- The page remains a planning preview. There are no facility listings, patient accounts, or medical advice yet.
- The narrow-phone layout was checked and corrected.

The Kiswahili text is a draft interface translation. It needs review by a proficient Kiswahili speaker before public publication. Any future medical information needs separate clinical review.

## Next step

Build the Embu County directory data model and search/filter interface. Start from Kenya's official facility registry, then verify each facility's cancer-related services, contact details, and operating status before showing it as a care option. Keep the source and date of verification with every listing.

## Documentation reviewed 26 October 2026

- React with TypeScript: https://react.dev/learn/typescript
- Vite guide and React TypeScript template: https://vite.dev/guide/
- Cloudflare Pages React/Vite deployment: https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/
- Kenya Master Health Facility Registry: https://kmhfr.health.go.ke/public/about
- Kenya National Health Facility Registry: https://nhfr.dha.go.ke/about
