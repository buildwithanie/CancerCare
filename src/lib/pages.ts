export type PageId = 'home' | 'learn' | 'find-care' | 'how-it-works' | 'get-involved' | 'not-found';

const routes: [RegExp, PageId][] = [
  [/^\/(?:index\.html)?$/, 'home'],
  [/^\/learn(?:\/|$)/, 'learn'],
  [/^\/find-care(?:\/|$)/, 'find-care'],
  [/^\/how-it-works(?:\/|$)/, 'how-it-works'],
  [/^\/get-involved(?:\/|$)/, 'get-involved'],
];

export function pageFromPath(pathname: string): PageId {
  return routes.find(([pattern]) => pattern.test(pathname))?.[1] ?? 'not-found';
}
