// Organisations shown in the scrolling strip on the home page.
//
// kind: 'partner' → an organisation that has AGREED to work with CancerCare.
// kind: 'source'  → a public body whose published information the site uses.
// Only add a 'partner' after they confirm in writing. While there are no partners,
// the strip is titled "Trusted information sources" instead of "Our partners".
// logo (optional): a file in /public, used only with the organisation's permission.

export type Organisation = {
  name: string;
  short?: string;
  url?: string;
  logo?: string;
  kind: 'partner' | 'source';
};

export const organisations: Organisation[] = [
  { name: 'World Health Organization', short: 'WHO', url: 'https://www.who.int', kind: 'source' },
  { name: 'Kenya Ministry of Health', short: 'MoH', url: 'https://www.health.go.ke', kind: 'source' },
  { name: 'Social Health Authority', short: 'SHA', url: 'https://sha.go.ke', kind: 'source' },
  { name: 'Global Cancer Observatory (IARC)', short: 'GCO', url: 'https://gco.iarc.who.int', kind: 'source' },
  { name: 'Kenya Health Facility Registry', short: 'KHFR', url: 'https://nhfr.dha.go.ke/facilities', kind: 'source' },
  { name: 'WHO Regional Office for Africa', short: 'AFRO', url: 'https://www.afro.who.int', kind: 'source' },
  { name: 'geoBoundaries', short: 'GEO', url: 'https://www.geoboundaries.org', kind: 'source' },
];
