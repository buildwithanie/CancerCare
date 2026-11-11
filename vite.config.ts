import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath, URL } from 'node:url';
import type { IncomingMessage, ServerResponse } from 'node:http';

const projectRoot = fileURLToPath(new URL('.', import.meta.url));

function localContactApi(mode: string): Plugin {
  async function handle(req: IncomingMessage, res: ServerResponse, next: () => void) {
    if (req.url !== '/' || (req.method !== 'GET' && req.method !== 'POST')) return next();

    try {
      let body: string | undefined;
      if (req.method === 'POST') {
        const chunks: Buffer[] = [];
        let size = 0;
        for await (const chunk of req) {
          size += chunk.length;
          if (size > 10_000) {
            res.writeHead(413).end();
            return;
          }
          chunks.push(chunk);
        }
        body = Buffer.concat(chunks).toString('utf8');
      }

      const headers = new Headers();
      if (req.headers.origin) headers.set('origin', req.headers.origin);
      if (req.headers['content-type']) headers.set('content-type', req.headers['content-type']);
      const url = `http://${req.headers.host ?? 'localhost'}/api/contact`;
      const request = new Request(url, { method: req.method, headers, body });
      const env = { SMTP_PASS: loadEnv(mode, projectRoot, 'SMTP_PASS').SMTP_PASS ?? '' };
      const handlerUrl = new URL('./functions/api/contact.js', import.meta.url).href;
      const { onRequestGet, onRequestPost } = await import(handlerUrl);
      const response: Response = await (req.method === 'GET' ? onRequestGet({ request, env }) : onRequestPost({ request, env }));
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(await response.text());
    } catch {
      res.writeHead(500, { 'content-type': 'application/json; charset=utf-8' });
      res.end('{"error":"server_error"}');
    }
  }

  return {
    name: 'local-contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', (req, res, next) => { void handle(req, res, next); });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/contact', (req, res, next) => { void handle(req, res, next); });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), localContactApi(mode)],
  build: {
    rolldownOptions: {
      input: {
        home: fileURLToPath(new URL('./index.html', import.meta.url)),
        learn: fileURLToPath(new URL('./learn/index.html', import.meta.url)),
        findCare: fileURLToPath(new URL('./find-care/index.html', import.meta.url)),
        howItWorks: fileURLToPath(new URL('./how-it-works/index.html', import.meta.url)),
        getInvolved: fileURLToPath(new URL('./get-involved/index.html', import.meta.url)),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
}));
