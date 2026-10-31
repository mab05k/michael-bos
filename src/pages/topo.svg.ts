import type { APIRoute } from 'astro';
import { buildContours } from '../lib/topo';

// Served as /topo.svg. Generated once per build, so the homepage HTML stays small
// and the browser caches the art separately.
export const GET: APIRoute = () => {
  const W = 1200, H = 800;
  const contours = buildContours({ width: W, height: H, cols: 110, rows: 74, levels: 22, seed: 5104, scale: 0.0021 });

  // The longest index line gets traced in ochre when the page loads.
  const trace = contours.filter(c => c.index).sort((a, b) => b.length - a.length)[0];

  const lines = contours
    .map(c => `<path class="${c.index ? 'ix' : 'c'}" d="${c.d}"/>`)
    .join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">
<style>
path{fill:none;stroke-linejoin:round;stroke-linecap:round}
.c{stroke:#B84A26;stroke-opacity:.13;stroke-width:1}
.ix{stroke:#B84A26;stroke-opacity:.24;stroke-width:1.6}
.tr{stroke:#D4892C;stroke-opacity:.5;stroke-width:1.9;stroke-dasharray:1;stroke-dashoffset:1;animation:draw 5.5s cubic-bezier(.45,0,.2,1) .4s forwards}
@keyframes draw{to{stroke-dashoffset:0}}
@media (prefers-reduced-motion:reduce){.tr{animation:none;stroke-dashoffset:0}}
</style>
${lines}
${trace ? `<path class="tr" pathLength="1" d="${trace.d}"/>` : ''}
</svg>`;

  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } });
};
