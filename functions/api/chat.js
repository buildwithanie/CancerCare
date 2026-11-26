import { isUrgent, systemPrompt, urgentReply } from '../../shared/assistant.js';
import { issuePass, turnstileEnabled, turnstilePublic, validPass, verifyTurnstile } from '../../shared/turnstile.js';

const defaultModel = 'gemini-3.8-flash';
const maxMessages = 12;
const maxMessageLength = 600;
const rateWindowMs = 60_000;
const rateLimit = 12;
const recentRequests = new Map();

function response(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store',
      'x-content-type-options': 'nosniff',
    },
  });
}

function configured(env) {
  return Boolean(env?.GEMINI_API_KEY?.trim());
}

// Best effort only: each Cloudflare isolate keeps its own counter.
// Add Cloudflare rate limiting or Turnstile before broad public use.
function limited(key, now = Date.now()) {
  const times = (recentRequests.get(key) ?? []).filter(time => now - time < rateWindowMs);
  times.push(now);
  recentRequests.set(key, times);
  if (recentRequests.size > 5000) recentRequests.clear();
  return times.length > rateLimit;
}

function validMessages(input) {
  if (!Array.isArray(input) || input.length === 0 || input.length > maxMessages) return null;
  const messages = [];
  for (const item of input) {
    if (!item || (item.role !== 'user' && item.role !== 'assistant') || typeof item.content !== 'string') return null;
    const content = item.content.trim();
    if (!content || content.length > maxMessageLength) return null;
    messages.push({ role: item.role, content });
  }
  while (messages.length && messages[0].role !== 'user') messages.shift();
  if (!messages.length || messages.at(-1).role !== 'user') return null;
  return messages;
}

export function createChatHandlers(fetcher = (...args) => fetch(...args)) {
  function onRequestGet({ env }) {
    return response({ ready: configured(env), ...turnstilePublic(env) });
  }

  async function onRequestPost({ request, env }) {
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return response({ error: 'forbidden' }, 403);
    if (!request.headers.get('content-type')?.startsWith('application/json')) return response({ error: 'invalid_request' }, 415);

    const raw = await request.text();
    if (raw.length > 10_000) return response({ error: 'too_large' }, 413);

    let input;
    try {
      input = JSON.parse(raw);
    } catch {
      return response({ error: 'invalid_request' }, 400);
    }

    const language = input?.language === 'sw' ? 'sw' : 'en';
    const messages = validMessages(input?.messages);
    if (!messages) return response({ error: 'invalid_messages' }, 400);

    // Urgent messages always get the same safe answer, with or without AI.
    if (isUrgent(messages.at(-1).content)) return response({ reply: urgentReply(language, messages.at(-1).content), urgent: true });

    if (!configured(env)) return response({ error: 'unavailable' }, 503);

    const client = request.headers.get('cf-connecting-ip') ?? 'local';
    if (limited(client)) return response({ error: 'rate_limited' }, 429);

    // Spam check: a Turnstile token on the first message earns a 2-hour signed pass.
    let pass;
    if (turnstileEnabled(env) && !(await validPass(input?.pass, env))) {
      if (!(await verifyTurnstile(input?.turnstileToken, request, env, fetcher))) return response({ error: 'verification_required' }, 403);
      pass = await issuePass(env);
    }

    let result;
    try {
      const model = encodeURIComponent(env.CHAT_MODEL?.trim() || defaultModel);
      result = await fetcher(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-goog-api-key': env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemPrompt(language) }] },
          contents: messages.map(message => ({ role: message.role === 'assistant' ? 'model' : 'user', parts: [{ text: message.content }] })),
          generationConfig: { maxOutputTokens: 2048, temperature: 0.4 },
        }),
        signal: AbortSignal.timeout(20_000),
      });
    } catch {
      return response({ error: 'assistant_failed' }, 502);
    }

    if (!result.ok) return response({ error: 'assistant_failed' }, 502);
    const payload = await result.json().catch(() => null);
    const parts = payload?.candidates?.[0]?.content?.parts;
    const reply = Array.isArray(parts)
      ? parts.filter(part => typeof part?.text === 'string' && !part.thought).map(part => part.text).join('').trim()
      : '';
    if (!reply) return response({ error: 'assistant_failed' }, 502);
    return response(pass ? { reply, pass } : { reply });
  }

  return { onRequestGet, onRequestPost };
}

export const { onRequestGet, onRequestPost } = createChatHandlers();
