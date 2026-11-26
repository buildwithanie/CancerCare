// Vercel Function: the same assistant handler used by Cloudflare Pages (functions/api/chat.js).
// Environment variables come from the Vercel project settings.
import { onRequestGet, onRequestPost } from '../functions/api/chat.js';

export const maxDuration = 30;
export const GET = request => onRequestGet({ request, env: process.env });
export const POST = request => onRequestPost({ request, env: process.env });
