import assert from 'node:assert/strict';
import test from 'node:test';
import { validatePublishedFacility } from '../src/data/facilities.ts';

const completeListing = () => ({
  id: 'example',
  name: 'Example facility',
  registryCode: '12345',
  county: 'Embu',
  subCounty: 'Example',
  location: { en: 'Example', sw: 'Mfano' },
  services: [{ name: { en: 'Example service', sw: 'Huduma ya mfano' }, confirmedOn: '2026-10-31' }],
  patientAccess: { en: 'Call to arrange a visit.', sw: 'Piga simu kupanga ziara.' },
  contact: { label: { en: 'Call', sw: 'Piga simu' }, href: 'tel:+254700000000' },
  source: { label: 'Example registry', url: 'https://example.org/facility' },
  sourceReviewedOn: '2026-10-31',
  providerConfirmation: { confirmedOn: '2026-10-31', method: 'phone', contactUsed: '+254700000000' },
  status: 'published',
});

test('accepts a complete facility listing', () => {
  const listing = completeListing();
  assert.equal(validatePublishedFacility(listing), listing);
});

test('rejects a listing without a provider confirmation contact', () => {
  const listing = completeListing();
  listing.providerConfirmation.contactUsed = '';
  assert.throws(() => validatePublishedFacility(listing), /provider confirmation contact/);
});

test('rejects a listing without a confirmed service', () => {
  const listing = completeListing();
  listing.services = [];
  assert.throws(() => validatePublishedFacility(listing), /confirmed service/);
});

test('rejects a listing without bilingual access guidance', () => {
  const listing = completeListing();
  listing.patientAccess.sw = '';
  assert.throws(() => validatePublishedFacility(listing), /Kiswahili patient access guidance/);
});

test('rejects an invalid verification date', () => {
  const listing = completeListing();
  listing.services[0].confirmedOn = '2026-02-30';
  assert.throws(() => validatePublishedFacility(listing), /invalid service confirmation date/);
});
