# Security review (26 November 2026)

A review of the whole site: code, server functions, dependencies, secrets and browser protections. Fixes from the review are included in this change.

## What was checked and the result

| Area | Result |
| --- | --- |
| **Secrets in the code and history** | ✅ None. No passwords or API keys have ever been committed. `.env` and `.dev.vars` are ignored by Git, and keys live only in Cloudflare encrypted secrets. |
| **Dependencies** | ⚠️ 8 warnings (1 low, 7 moderate), all from `shadcn`, a developer tool for generating components. Its code never reaches visitors or the server, but it was listed as a site dependency. **Fixed:** moved to developer dependencies and updated. `pnpm audit` now reports **0 known vulnerabilities**. |
| **Unsafe code** | ✅ No `innerHTML`, `dangerouslySetInnerHTML`, `eval` or similar. React escapes all text, including assistant replies, so injected content cannot run. Only site paths are turned into links in chat replies. |
| **External links** | ✅ Every link that opens a new tab uses `rel="noopener noreferrer"`. |
| **Contact API (`/api/contact`)** | ✅ It enforces: same-origin requests only; JSON only; a 5 KB size limit; topic, message length, email and request ID validation; a honeypot field; and an optional Turnstile check. The sender and recipient are fixed and the visitor's email is used only as Reply-To, so the form cannot be used to send mail to anyone else. Nothing is stored. |
| **Chat API (`/api/chat`)** | ✅ It enforces: same-origin requests only; JSON only; at most 12 messages of 600 characters each; only `user` and `assistant` roles, so visitors cannot inject a system prompt; a per-address rate limit; an optional Turnstile check with a signed 2-hour pass; and a 20-second timeout. Emergency messages get a fixed reply. The API key stays on the server. |
| **Browser security headers** | ❌ None were set. **Fixed:** `public/_headers` now sends a strict Content-Security-Policy (only this site, Cloudflare Turnstile and Cloudflare analytics are allowed to load code), HSTS, `X-Frame-Options: DENY` (prevents clickjacking), `nosniff`, a referrer policy, and a permissions policy (camera and location off; microphone only for the site's own voice input). Long caching for hashed files, no caching for `sw.js`. |
| **Offline cache** | ✅ It never stores `/api/` responses and only saves the site's own pages and files. The offline page's inline script was replaced with a plain form so it works under the strict policy. |
| **Privacy** | ✅ No accounts, no tracking cookies, and no health data is requested. The privacy notice matches what the site does. |

Verified by a browser run of all 11 pages plus the chat, search, display options and the spam check under the new headers: **0 policy violations**.

## Remaining risks (known and accepted)

- **The AI assistant can be wrong or be talked into off-topic answers.** The system prompt sets firm rules, replies are shown as plain text, and the site states that answers are general information. Keep an eye on usage, and set a spending cap on the Gemini key.
- **The rate limit is per server instance.** Turn on Turnstile and add a Cloudflare WAF rate-limiting rule for `/api/` before promoting the site widely (see step 27).
- **Contact messages sit in a Gmail inbox.** Protect that account well (see below).

## Owner checklist

- [ ] Turn on **two-step verification** for GitHub, Cloudflare and the `buildwithanie@gmail.com` Google account.
- [ ] Use a Gmail **app password** for `SMTP_PASS`, never the real password. Revoke and replace it if it may have leaked.
- [ ] Keep `GEMINI_API_KEY`, `SMTP_PASS` and `TURNSTILE_SECRET_KEY` only as **encrypted** Cloudflare secrets. Never paste them into chats, documents or code.
- [ ] Set a **spending limit or quota** on the Gemini API key.
- [ ] On GitHub, protect the `master` branch so changes go through pull requests: Settings → Branches → Add rule → Require a pull request.
- [ ] Merge the weekly **Dependabot** pull requests (`.github/dependabot.yml`) after the checks pass.
- [ ] Turn on **Turnstile** and **Web Analytics**, and add a WAF rate-limit rule (step 27).
- [ ] After the first deploy, check the headers at securityheaders.com.

To report a problem, see `SECURITY.md`.
