# Spam protection and visitor counts

Both features are **off until you add keys**, so the site works exactly as before until then.

## Spam protection (Cloudflare Turnstile)

Turnstile is Cloudflare's free "are you human?" check. Most visitors see nothing; a few see a one-tap box. When it is on:

- **Contact form:** every message needs a fresh Turnstile token, which `/api/contact` verifies with Cloudflare before sending the email.
- **AI assistant:**
  - The first AI question in a chat runs the check once. The server then issues a signed pass that is valid for 2 hours, so later questions are not checked again.
  - Emergency replies (999/112) never wait for the check.
  - Quick-answers mode (no Gemini key) never calls the server, so it is unaffected.
- If the check fails, the contact form shows its normal error, and the chat falls back to a quick answer.

The code is in `shared/turnstile.js` (server checks and signed passes) and `src/lib/turnstile.ts` (loads the Cloudflare script only when protection is on). Tests are in `scripts/turnstile.test.mjs`.

### Switch it on

1. In the Cloudflare dashboard, open **Turnstile** and select **Add widget**.
2. Name it **CancerCare** and add your site's domain, for example `cancercare.pages.dev` and your own domain if you have one. Choose **Managed** mode.
3. Copy the **Site key** and the **Secret key**.
4. In your Cloudflare **Pages project**, open **Settings → Variables and Secrets** and add:
   - `TURNSTILE_SITE_KEY`: the site key. It is public, so plain text is fine.
   - `TURNSTILE_SECRET_KEY`: the secret key. Mark it **Encrypt**.
5. Redeploy. `/api/contact` and `/api/chat` should now return a `siteKey` in their `{ "ready": … }` reply.
6. Send a test message and ask the assistant a question to confirm both still work.

Protection switches on only when **both** keys are set. For local testing, put them in `.env`. Cloudflare's test keys always pass: site key `1x00000000000000000000AA` and secret key `1x0000000000000000000000000000000AA`.

**Extra protection (recommended):** in Cloudflare, add a **Rate limiting rule** under Security → WAF for `/api/` paths, for example 20 requests per minute per IP. The free plan includes one rule.

## Visitor counts (Cloudflare Web Analytics)

Free, no cookies, and it does not identify visitors. It shows how many people visit and which pages they read most.

**Easiest:** in your Cloudflare Pages project, open **Metrics** and select **Enable** under Web Analytics. Cloudflare adds the tracking automatically, with no code needed.

**Or:** create a site under **Analytics & Logs → Web Analytics**, copy the token, and add `VITE_CF_ANALYTICS_TOKEN` as a **build** variable in the Pages project, then redeploy. `src/main.tsx` then adds the beacon on the built site only.

The privacy notice now describes Turnstile and Web Analytics. If you decide not to use either, remove that sentence from `src/content-pages.ts`.

## Checks

- `pnpm build`
- `pnpm test` (30 tests, including 6 new Turnstile tests):
  - the site key is only shared when both keys are set
  - the contact form is rejected without a valid token and accepted with one
  - the contact form works with no keys
  - the chat checks once and then reuses its pass
  - urgent replies skip the check
  - passes expire and cannot be forged
- Simulated browser run with a fake Turnstile:
  - the first chat message ran the check, received a pass and reused it on the next message
  - the contact form sent its token and showed "Message accepted"
  - no console errors
