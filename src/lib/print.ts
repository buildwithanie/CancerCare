// Prints only one element of the page (a leaflet or the visit question list).
export function printOnly(element: HTMLElement | null) {
  if (!element) return window.print();
  document.documentElement.classList.add('print-one');
  element.classList.add('print-target');
  const cleanup = () => {
    document.documentElement.classList.remove('print-one');
    element.classList.remove('print-target');
    window.removeEventListener('afterprint', cleanup);
  };
  window.addEventListener('afterprint', cleanup);
  window.print();
}
