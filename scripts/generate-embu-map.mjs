import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/generate-embu-map.mjs <Kenya ADM1 GeoJSON path>');

const collection = JSON.parse(await readFile(input, 'utf8'));
const features = collection.features;
const embu = features.find((feature) => feature.properties.shapeName === 'Embu');
if (!embu || features.length !== 47) throw new Error('Expected Embu and 47 Kenya county features');

function pointsOf(feature) {
  const { type, coordinates } = feature.geometry;
  return type === 'Polygon' ? coordinates.flat(1) : coordinates.flat(2);
}

function boundsOf(items) {
  const points = items.flatMap(pointsOf);
  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);
  return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
}

function projector(bounds, box) {
  const [minX, minY, maxX, maxY] = bounds;
  const scale = Math.min(box.width / (maxX - minX), box.height / (maxY - minY));
  const left = box.x + (box.width - (maxX - minX) * scale) / 2;
  const top = box.y + (box.height - (maxY - minY) * scale) / 2;
  return ([lon, lat]) => [left + (lon - minX) * scale, top + (maxY - lat) * scale];
}

function distanceSquared(point, start, end) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const length = dx * dx + dy * dy;
  const t = length ? Math.max(0, Math.min(1, ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / length)) : 0;
  return (point[0] - start[0] - t * dx) ** 2 + (point[1] - start[1] - t * dy) ** 2;
}

function simplifyLine(points, tolerance) {
  if (points.length <= 2) return points;
  let farthest = -1;
  let index = -1;
  for (let i = 1; i < points.length - 1; i += 1) {
    const distance = distanceSquared(points[i], points[0], points.at(-1));
    if (distance > farthest) { farthest = distance; index = i; }
  }
  if (farthest <= tolerance * tolerance) return [points[0], points.at(-1)];
  const first = simplifyLine(points.slice(0, index + 1), tolerance);
  const second = simplifyLine(points.slice(index), tolerance);
  return [...first.slice(0, -1), ...second];
}

function simplifyRing(ring, tolerance) {
  const open = ring.slice(0, -1);
  let pivot = 1;
  let farthest = -1;
  for (let i = 1; i < open.length; i += 1) {
    const d = (open[i][0] - open[0][0]) ** 2 + (open[i][1] - open[0][1]) ** 2;
    if (d > farthest) { farthest = d; pivot = i; }
  }
  const first = simplifyLine(open.slice(0, pivot + 1), tolerance);
  const second = simplifyLine([...open.slice(pivot), open[0]], tolerance);
  return [...first.slice(0, -1), ...second.slice(0, -1)];
}

function pathOf(feature, project, tolerance) {
  const polygons = feature.geometry.type === 'Polygon' ? [feature.geometry.coordinates] : feature.geometry.coordinates;
  return polygons.flatMap((polygon) => polygon.map((ring) => {
    const points = simplifyRing(ring.map(project), tolerance);
    return 'M' + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z';
  })).join('');
}

const embuProject = projector(boundsOf([embu]), { x: 31, y: 23, width: 251, height: 254 });
const kenyaProject = projector(boundsOf(features), { x: 351, y: 31, width: 175, height: 236 });
const embuPath = pathOf(embu, embuProject, 0.55);
const countyPaths = features.filter((feature) => feature !== embu)
  .map((feature) => `<path d="${pathOf(feature, kenyaProject, 0.8)}"/>`).join('');
const embuInset = pathOf(embu, kenyaProject, 0.35);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300" width="560" height="300">
  <title>Embu County and its location in Kenya</title>
  <desc>The large shape is Embu County. A small map of Kenya highlights Embu among the counties.</desc>
  <path d="${embuPath}" fill="#dc805a" stroke="#f4c6a9" stroke-width="4" stroke-linejoin="round"/>
  <path d="${embuPath}" fill="none" stroke="#a84933" stroke-width="1.4" stroke-linejoin="round"/>
  <path d="M312 32V268" fill="none" stroke="#a8b7a8" stroke-width="1" stroke-dasharray="3 6"/>
  <g fill="#b8cbbd" stroke="#658271" stroke-opacity=".7" stroke-width=".6" stroke-linejoin="round">${countyPaths}</g>
  <path d="${embuInset}" fill="#c46745" stroke="#fff1df" stroke-width="1.8" stroke-linejoin="round"/>
</svg>`;

const output = resolve('public/embu-county-map.svg');
await writeFile(output, svg);
console.log(`Wrote ${output} (${Buffer.byteLength(svg)} bytes)`);

