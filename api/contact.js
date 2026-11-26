// Vercel Function: the same contact handler used by Cloudflare Pages (functions/api/contact.js).
// Environment variables come from the Vercel project settings.
import { onRequestGet, onRequestPost } from '../functions/api/contact.js';

export const GET = request => onRequestGet({ request, env: process.env });
export const POST = request => onRequestPost({ request, env: process.env });
