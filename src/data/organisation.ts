// Facts about the CancerCare organisation shown on the About page.
// Leave a field empty until it is confirmed. Empty fields and sections are hidden.

export type TeamMember = {
  name: string;
  role: { en: string; sw: string };
  photo?: string; // file in /public, only with the person's permission
};

export const organisation = {
  contactEmail: 'buildwithanie@gmail.com',
  // e.g. 'Registered NGO, NGOs Co-ordination Board, reg. no. OP.218/051/…'
  registration: { en: '', sw: '' },
  founded: '', // e.g. '2026'
  team: [] as TeamMember[],
};
