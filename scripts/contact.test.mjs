import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createContactHandlers } from '../functions/api/contact.js';

const env = { SMTP_PASS: 'test-app-password' };

function request(input, headers = {}) {
  return new Request('https://example.org/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://example.org', ...headers },
    body: JSON.stringify(input),
  });
}

const valid = {
  topic: 'facility',
  message: 'Please verify the name shown in the public registry.',
  replyEmail: 'visitor@example.org',
  requestId: 'b5870aa9-26cb-4d70-8d46-eed241f30534',
  website: '',
};

test('reports unavailable until SMTP credentials are configured', async () => {
  const { onRequestGet, onRequestPost } = createContactHandlers(() => { throw new Error('SMTP should not be used'); });
  const status = onRequestGet({ env: {} });
  assert.deepEqual(await status.json(), { ready: false });
  const submit = await onRequestPost({ request: request(valid), env: {} });
  assert.equal(submit.status, 503);
});

test('rejects invalid messages before creating an SMTP connection', async () => {
  const { onRequestPost } = createContactHandlers(() => { throw new Error('SMTP should not be used'); });
  const result = await onRequestPost({ request: request({ ...valid, message: 'short' }), env });
  assert.equal(result.status, 400);
  assert.deepEqual(await result.json(), { error: 'invalid_message' });
});

test('rejects a cross-origin submission', async () => {
  const { onRequestPost } = createContactHandlers(() => { throw new Error('SMTP should not be used'); });
  const result = await onRequestPost({ request: request(valid, { origin: 'https://other.example' }), env });
  assert.equal(result.status, 403);
});

test('uses Nodemailer over encrypted Gmail SMTP and accepts only a confirmed recipient', async () => {
  let transportOptions;
  let messageOptions;
  const { onRequestGet, onRequestPost } = createContactHandlers(options => {
    transportOptions = options;
    return { sendMail: async message => {
      messageOptions = message;
      return { accepted: ['buildwithanie@gmail.com'], messageId: '<mail-123@example.org>' };
    } };
  });
  assert.deepEqual(await onRequestGet({ env }).json(), { ready: true });
  const result = await onRequestPost({ request: request(valid), env });
  assert.equal(result.status, 202);
  assert.deepEqual(await result.json(), { accepted: true, receipt: '<mail-123@example.org>' });
  assert.equal(transportOptions.host, 'smtp.gmail.com');
  assert.equal(transportOptions.port, 465);
  assert.equal(transportOptions.secure, true);
  assert.deepEqual(transportOptions.auth, { user: 'buildwithanie@gmail.com', pass: 'test-app-password' });
  assert.equal(messageOptions.to, 'buildwithanie@gmail.com');
  assert.equal(messageOptions.replyTo, 'visitor@example.org');
  assert.match(messageOptions.text, /Please verify the name/);
});

test('does not report success when SMTP rejects the recipient', async () => {
  const { onRequestPost } = createContactHandlers(() => ({ sendMail: async () => ({ accepted: [], rejected: ['buildwithanie@gmail.com'] }) }));
  const result = await onRequestPost({ request: request(valid), env });
  assert.equal(result.status, 502);
  assert.deepEqual(await result.json(), { error: 'delivery_failed' });
});

test('does not report success when SMTP fails', async () => {
  const { onRequestPost } = createContactHandlers(() => ({ sendMail: async () => { throw new Error('SMTP failed'); } }));
  const result = await onRequestPost({ request: request(valid), env });
  assert.equal(result.status, 502);
  assert.deepEqual(await result.json(), { error: 'delivery_failed' });
});
