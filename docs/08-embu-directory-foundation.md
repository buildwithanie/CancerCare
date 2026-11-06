# Embu facility directory foundation

The homepage now has a bilingual directory section. It states clearly that there are no live listings while the project verifies facilities. The layout uses the existing shadcn Card component and renders published records only when they are added to `publishedFacilities`.

## Data rules

`src/data/facilities.ts` separates research candidates from published facilities. A published record requires a location, at least one confirmed service, a contact route, an official source, a source review date, and a provider confirmation date. The Embu Level 5 Hospital record (KMHFR code 12004) is a research candidate only; its services and contact details are **not** presented as current care options.

Before publishing any facility, check the official register entry, confirm the displayed details with the provider, and record the dates of those checks. Do not use the KMHFR help-desk contact as the hospital's contact.

## Sources and implementation references

- [Kenya National Health Facility Registry](https://nhfr.dha.go.ke/facilities) — working public facility search. The older KMHFR Embu Level 5 record was a research lead, but its site timed out on 26 October 2026; do not treat it as provider confirmation.
- [shadcn/ui Vite and Card documentation](https://ui.shadcn.com/docs/installation/vite) — existing Card component pattern.
- [React rendering lists](https://react.dev/learn/rendering-lists) and [conditional rendering](https://react.dev/learn/conditional-rendering) — listing and empty states.

The later [first-facility verification step](11-first-facility-verification.md) adds a direct-confirmation record and completeness validation.

## Next step

Confirm the first Embu facility's current contact route and relevant services with the provider. Then add its bilingual published record and test the listing. Add search and filters once there are enough verified listings to make them useful.

