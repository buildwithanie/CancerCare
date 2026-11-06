# First Embu facility verification

Reviewed 31 October and 5 November 2026. Embu Level 5 Hospital is a **research candidate**, not a published CancerCare listing. No cancer service or contact route is displayed on the public site from this research.

## Evidence found

- The [public National Health Facility Registry profile](https://nhfr.dha.go.ke/search/PID-14-920011-4), searched by registration code **12004** on 5 November, names **Embu Provincial General Hospital** and lists Embu County and Kirimari ward. It gives no patient contact, services, sub-county, current operating status or last update date. This is a registration-code match, not proof of current cancer services.
- The [legacy Kenya Master Health Facility Register record](https://kmhfr.health.go.ke/public/facilities/ad7b8046-b776-4b0c-a1a0-0b8399e8dfbe) is indexed as Embu Level 5 Hospital, code 12004. The direct page timed out during the October review.
- The [National Cancer Institute Kenya facility page](https://portal.ncikenya.go.ke/en/facilities/embu-teaching-and-referral-hospital) lists Embu Teaching and Referral Hospital at the Embu Level 5 address, lists chemotherapy, and provides contact numbers. The page does not show when that service or those numbers were last confirmed by the hospital.
- The [hospital contact page](https://www.embuhospital.go.ke/?page_id=1125) lists a matching mobile number and the Embu–Nairobi Highway address. That page is dated 2019, so it is a lead for contacting the provider, not current confirmation.

The registry, legacy register and NCI use different names. Their relationship, the facility's current status and the exact sub-county still need direct provider confirmation.

## Direct confirmation needed before publication

Ask the provider to confirm:

1. The current facility name, registry code, address, and sub-county.
2. Which cancer-related services are currently offered, and how patients access each service, including appointment and referral requirements.
3. A working patient contact route for those services and any relevant clinic hours.
4. Whether the provider agrees that these details may be shown in CancerCare's public directory.

Record the date, confirmation method, contact used, and exact services confirmed. Translate only the confirmed details. Recheck the official registry entry and its URL. The editor must then add the completed record to `facilityDrafts` in `src/data/facilities.ts`.

The TypeScript record requires bilingual location, contact, service and patient access guidance, an official source, review dates, and direct provider confirmation. `validatePublishedFacility` rejects missing or malformed fields before the listing can render. This validation checks completeness, while direct confirmation establishes accuracy.

## Checks run

`pnpm test:facilities` and `pnpm build` passed after the 5 November update.
