import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createChatHandlers } from '../functions/api/chat.js';
import { createContactHandlers } from '../functions/api/contact.js';
import { issuePass, validPass } from '../shared/turnstile.js';

const keys = { TURNSTILE_SITE_KEY: 'site-key', TURNSTILE_SECRET_KEY: 'secret-key' };

function post(path, input) {
  return new Request(`https://example.org/api/${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', origin: 'https://example.org', 'cf-connecting-ip': crypto.randomUUID() },
    body: JSON.stringify(input),
  });
}

// A fake fetch that answers Turnstile with `human` and Gemini with a reply.
function fakeNetwork(human, calls = []) {
  return async (url, init) => {
    calls.push(String(url));
    if (String(url).includes('turnstile')) {
      assert.equal(init.body.get('secret'), 'secret-key');
      return new Response(JSON.stringify({ success: human && init.body.get('response') === 'good-token' }));
    }
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: 'Screening looks for early signs.' }] } }] }));
  };
}

const message = { topic: 'idea', message: 'Please add more Kiswahili leaflets.', replyEmail: '', website: '', requestId: 'b5870aa9-26cb-4d70-8d46-eed241f30534' };
const mailer = () => ({ sendMail: async () => ({ accepted: ['buildwithanie@gmail.com'], messageId: 'id-1' }) });

test('GET shares the site key only when protection is configured', async () => {
  const { onRequestGet } = createContactHandlers(mailer);
  assert.deepEqual(await onRequestGet({ env: { SMTP_PASS: 'x' } }).json(), { ready: true });
  assert.deepEqual(await onRequestGet({ env: { SMTP_PASS: 'x', ...keys } }).json(), { ready: true, siteKey: 'site-key' });
  const chat = createChatHandlers();
  assert.deepEqual(await chat.onRequestGet({ env: { GEMINI_API_KEY: 'g', TURNSTILE_SITE_KEY: 'only-one-key' } }).json(), { ready: true });
});

test('contact form needs a valid Turnstile token when protection is on', async () => {
  const env = { SMTP_PASS: 'x', ...keys };
  const missing = createContactHandlers(mailer, fakeNetwork(true));
  assert.equal((await missing.onRequestPost({ request: post('contact', message), env })).status, 403);
  const bot = createContactHandlers(mailer, fakeNetwork(false));
  assert.equal((await bot.onRequestPost({ request: post('contact', { ...message, turnstileToken: 'good-token' }), env })).status, 403);
  const human = createContactHandlers(mailer, fakeNetwork(true));
  assert.equal((await human.onRequestPost({ request: post('contact', { ...message, turnstileToken: 'good-token' }), env })).status, 202);
});

test('contact form works without a token while protection is off', async () => {
  const { onRequestPost } = createContactHandlers(mailer, () => { throw new Error('Turnstile should not be called'); });
  assert.equal((await onRequestPost({ request: post('contact', message), env: { SMTP_PASS: 'x' } })).status, 202);
});

test('chat checks once, then reuses a signed pass', async () => {
  const env = { GEMINI_API_KEY: 'g', ...keys };
  const calls = [];
  const { onRequestPost } = createChatHandlers(fakeNetwork(true, calls));
  const ask = extra => post('chat', { language: 'en', messages: [{ role: 'user', content: 'What is screening?' }], ...extra });

  assert.equal((await onRequestPost({ request: ask({}), env })).status, 403);
  const first = await onRequestPost({ request: ask({ turnstileToken: 'good-token' }), env });
  const payload = await first.json();
  assert.equal(first.status, 200);
  assert.match(payload.pass, /^\d+\.[\w-]+$/);

  const before = calls.filter(url => url.includes('turnstile')).length;
  const second = await onRequestPost({ request: ask({ pass: payload.pass }), env });
  assert.equal(second.status, 200);
  assert.equal((await second.json()).pass, undefined);
  assert.equal(calls.filter(url => url.includes('turnstile')).length, before, 'a valid pass skips Turnstile');
});

test('urgent chat replies never wait for a spam check', async () => {
  const { onRequestPost } = createChatHandlers(() => { throw new Error('no network expected'); });
  const result = await onRequestPost({ request: post('chat', { language: 'en', messages: [{ role: 'user', content: 'He cannot breathe' }] }), env: { GEMINI_API_KEY: 'g', ...keys } });
  assert.equal(result.status, 200);
  assert.equal((await result.json()).urgent, true);
});

test('passes expire and cannot be forged', async () => {
  const pass = await issuePass(keys, 1_000);
  assert.equal(await validPass(pass, keys, 2_000), true);
  assert.equal(await validPass(pass, keys, 1_000 + 3 * 60 * 60 * 1000), false);
  const [expires] = pass.split('.');
  assert.equal(await validPass(`${Number(expires) + 9_999_999}.${pass.split('.')[1]}`, keys, 2_000), false);
  assert.equal(await validPass(pass, { TURNSTILE_SECRET_KEY: 'other-secret' }, 2_000), false);
  assert.equal(await validPass('garbage', keys), false);
});
