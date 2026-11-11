import nodemailer from 'nodemailer';

const recipient = 'buildwithanie@gmail.com';
const topics = {
  idea: 'Website suggestion',
  facility: 'Facility information to check',
  collaborate: 'Collaboration',
};

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
  return Boolean(env?.SMTP_PASS?.trim());
}

export function createContactHandlers(createTransport = nodemailer.createTransport) {
  function onRequestGet({ env }) {
    return response({ ready: configured(env) });
  }

  async function onRequestPost({ request, env }) {
    if (!configured(env)) return response({ error: 'unavailable' }, 503);

    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) return response({ error: 'forbidden' }, 403);
    if (!request.headers.get('content-type')?.startsWith('application/json')) return response({ error: 'invalid_request' }, 415);

    const raw = await request.text();
    if (raw.length > 5000) return response({ error: 'too_large' }, 413);

    let input;
    try {
      input = JSON.parse(raw);
    } catch {
      return response({ error: 'invalid_request' }, 400);
    }

    if (!input || typeof input !== 'object' || Array.isArray(input)) return response({ error: 'invalid_request' }, 400);
    if (input.website) return response({ error: 'invalid_request' }, 400);
    if (typeof input.topic !== 'string' || !Object.hasOwn(topics, input.topic)) return response({ error: 'invalid_topic' }, 400);
    if (typeof input.message !== 'string') return response({ error: 'invalid_message' }, 400);
    const message = input.message.trim();
    if (message.length < 10 || message.length > 800) return response({ error: 'invalid_message' }, 400);

    const replyEmail = typeof input.replyEmail === 'string' ? input.replyEmail.trim() : '';
    if (replyEmail && (replyEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(replyEmail))) {
      return response({ error: 'invalid_email' }, 400);
    }
    if (typeof input.requestId !== 'string' || !/^[a-f0-9-]{36}$/i.test(input.requestId)) {
      return response({ error: 'invalid_request' }, 400);
    }

    const text = [
      `Topic: ${topics[input.topic]}`,
      `Reply email: ${replyEmail || 'Not provided'}`,
      '',
      message,
    ].join('\n');

    let delivery;
    try {
      const transporter = createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: { user: recipient, pass: env.SMTP_PASS },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
        disableFileAccess: true,
        disableUrlAccess: true,
      });
      delivery = await transporter.sendMail({
        from: `CancerCare <${recipient}>`,
        to: recipient,
        replyTo: replyEmail || undefined,
        subject: `CancerCare: ${topics[input.topic]}`,
        text,
        headers: { 'X-CancerCare-Request-ID': input.requestId },
      });
    } catch {
      return response({ error: 'delivery_failed' }, 502);
    }

    if (!Array.isArray(delivery?.accepted) || !delivery.accepted.some(address => address.toLowerCase() === recipient)) {
      return response({ error: 'delivery_failed' }, 502);
    }
    return response({ accepted: true, receipt: delivery.messageId || input.requestId }, 202);
  }

  return { onRequestGet, onRequestPost };
}

export const { onRequestGet, onRequestPost } = createContactHandlers();
