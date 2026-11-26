type Language = 'en' | 'sw';
type Localized = { en: string; sw: string };

export type Topic = { id: string; keywords: string[]; answer: Localized; link?: { href: string; label: Localized } };

export const emergencyNumbers: string;
export const topics: Topic[];
export function isUrgent(text: string): boolean;
export function urgentReply(language: Language, text?: string): string;
export function matchTopic(text: string): Topic | null;
export function fallbackReply(language: Language): string;
export function systemPrompt(language: Language): string;
