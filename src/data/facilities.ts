export type LocalizedText = { en: string; sw: string };

export type FacilitySource = {
  label: string;
  url: string;
};

export type FacilityEvidence = {
  source: FacilitySource;
  reviewedOn: string;
  finding: string;
};

export type FacilityCandidate = {
  id: string;
  name: string;
  registryCode: string;
  county: 'Embu';
  evidence: readonly [FacilityEvidence, ...FacilityEvidence[]];
  pendingChecks: readonly string[];
  status: 'research';
};

export type FacilityService = {
  name: LocalizedText;
  confirmedOn: string;
};

export type PublishedFacility = {
  id: string;
  name: string;
  registryCode: string;
  county: 'Embu';
  subCounty: string;
  location: LocalizedText;
  services: readonly [FacilityService, ...FacilityService[]];
  patientAccess: LocalizedText;
  contact: { label: LocalizedText; href: string };
  source: FacilitySource;
  sourceReviewedOn: string;
  providerConfirmation: {
    confirmedOn: string;
    method: 'phone' | 'email' | 'in-person';
    contactUsed: string;
  };
  status: 'published';
};

// Research evidence is for editors only and is never shown as a current care option.
export const researchCandidates = [
  {
    id: 'embu-level-5-hospital',
    name: 'Embu Level 5 Hospital',
    registryCode: '12004',
    county: 'Embu',
    evidence: [
      {
        source: {
          label: 'National Health Facility Registry public profile',
          url: 'https://nhfr.dha.go.ke/search/PID-14-920011-4',
        },
        reviewedOn: '2026-11-05',
        finding: 'Registration code 12004 resolves to Embu Provincial General Hospital (PID-14-920011-4). The public profile lists Embu County and Kirimari ward but gives no patient contact, services, sub-county, current status or last update date.',
      },
      {
        source: {
          label: 'Kenya Master Health Facility Register (legacy record)',
          url: 'https://kmhfr.health.go.ke/public/facilities/ad7b8046-b776-4b0c-a1a0-0b8399e8dfbe',
        },
        reviewedOn: '2026-10-31',
        finding: 'Search index identifies facility 12004 in Embu; direct page timed out during review.',
      },
      {
        source: {
          label: 'National Cancer Institute Kenya facility portal',
          url: 'https://portal.ncikenya.go.ke/en/facilities/embu-teaching-and-referral-hospital',
        },
        reviewedOn: '2026-10-31',
        finding: 'Lists Embu Teaching and Referral Hospital at the Embu Level 5 address, chemotherapy, and contact numbers. This does not establish current availability.',
      },
    ],
    pendingChecks: [
      'Confirm with the provider whether the registry, legacy and NCI names refer to the same operating facility.',
      'Confirm the current name, exact location, sub-county and operational status with the provider.',
      'Confirm which cancer-related services are currently available and how patients can access them, including appointment and referral requirements.',
      'Confirm a working patient contact route with the provider.',
      'Record the date and method of direct provider confirmation.',
    ],
    status: 'research',
  },
] satisfies readonly FacilityCandidate[];

function requireText(value: string, field: string): void {
  if (!value.trim()) throw new Error(`Facility listing is missing ${field}.`);
}

function requireDate(value: string, field: string): void {
  const date = new Date(`${value}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(date.valueOf()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`Facility listing has an invalid ${field} date.`);
  }
}

export function validatePublishedFacility(facility: PublishedFacility): PublishedFacility {
  requireText(facility.id, 'ID');
  requireText(facility.name, 'name');
  requireText(facility.registryCode, 'registry code');
  requireText(facility.subCounty, 'sub-county');
  requireText(facility.location.en, 'English location');
  requireText(facility.location.sw, 'Kiswahili location');
  requireText(facility.patientAccess.en, 'English patient access guidance');
  requireText(facility.patientAccess.sw, 'Kiswahili patient access guidance');
  requireText(facility.contact.label.en, 'English contact label');
  requireText(facility.contact.label.sw, 'Kiswahili contact label');
  requireText(facility.source.label, 'source label');
  requireText(facility.providerConfirmation.contactUsed, 'provider confirmation contact');
  requireDate(facility.sourceReviewedOn, 'source review');
  requireDate(facility.providerConfirmation.confirmedOn, 'provider confirmation');

  if (!/^https:\/\//.test(facility.source.url)) throw new Error('Facility source must be an HTTPS URL.');
  if (!/^(tel:\+?[0-9]{7,15}|mailto:[^@\s]+@[^@\s]+|https:\/\/\S+)$/.test(facility.contact.href)) {
    throw new Error('Facility contact must be a phone, email or HTTPS route.');
  }
  if (facility.services.length === 0) throw new Error('Facility listing requires a confirmed service.');
  for (const service of facility.services) {
    requireText(service.name.en, 'English service name');
    requireText(service.name.sw, 'Kiswahili service name');
    requireDate(service.confirmedOn, 'service confirmation');
  }
  return facility;
}

// Add a record only after direct provider confirmation of its contact and each displayed service.
// Validation catches incomplete records; it cannot establish whether the provider's statements are true.
const facilityDrafts: readonly PublishedFacility[] = [];
export const publishedFacilities: readonly PublishedFacility[] = facilityDrafts.map(validatePublishedFacility);
