// Cloudflare Turnstile ("are you human?") checks for the Pages Functions.
// Protection is ON only when both TURNSTILE_SITE_KEY and TURNSTILE_SECRET_KEY are set.

const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const passLifetimeMs = 2 * 60 * 60 * 1000; // a verified chat stays verified for 2 hours

/** The visitor's IP address on Cloudflare or Vercel (used for rate limits and Turnstile). */
export function clientIp(request) {
  return request.headers.get('cf-connecting-ip')
    ?? request.headers.get('x-real-ip')
    ?? request.headers.get('x-forwarded-for')?.split(',')[0].trim()
    ?? null;
}

export function turnstileEnabled(env) {
  return Boolean(env?.TURNSTILE_SITE_KEY?.trim() && env?.TURNSTILE_SECRET_KEY?.trim());
}

/** Extra fields for GET responses so the browser knows to show the check. */
export function turnstilePublic(env) {
  return turnstileEnabled(env) ? { siteKey: env.TURNSTILE_SITE_KEY.trim() } : {};
}

export async function verifyTurnstile(token, request, env, fetcher = fetch) {
  if (typeof token !== 'string' || !token || token.length > 2048) return false;
  const body = new FormData();
  body.append('secret', env.TURNSTILE_SECRET_KEY.trim());
  body.append('response', token);
  const ip = clientIp(request);
  if (ip) body.append('remoteip', ip);
  try {
    const result = await fetcher(verifyUrl, { method: 'POST', body, signal: AbortSignal.timeout(8000) });
    const payload = await result.json();
    return payload?.success === true;
  } catch {
    return false;
  }
}

const encoder = new TextEncoder();

function toBase64Url(bytes) {
  return btoa(String.fromCharCode(...new Uint8Array(bytes))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sign(value, secret) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toBase64Url(await crypto.subtle.sign('HMAC', key, encoder.encode(value)));
}

/** A short-lived signed pass, so a chat is checked once rather than on every message. */
export async function issuePass(env, now = Date.now()) {
  const expires = String(now + passLifetimeMs);
  return `${expires}.${await sign(`chat:${expires}`, env.TURNSTILE_SECRET_KEY.trim())}`;
}

export async function validPass(pass, env, now = Date.now()) {
  if (typeof pass !== 'string' || pass.length > 200) return false;
  const [expires, signature] = pass.split('.');
  if (!/^\d+$/.test(expires ?? '') || Number(expires) < now || !signature) return false;
  const expected = await sign(`chat:${expires}`, env.TURNSTILE_SECRET_KEY.trim());
  if (expected.length !== signature.length) return false;
  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) difference |= expected.charCodeAt(index) ^ signature.charCodeAt(index);
  return difference === 0;
}
