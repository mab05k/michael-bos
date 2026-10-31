// Build-time topographic contours: seeded fractal value noise, traced into
// iso-lines with marching squares, chained into paths, then simplified.
// Runs only during `astro build`; the browser receives a static SVG.

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function makeNoise(seed: number) {
  const rand = lcg(seed);
  const SIZE = 256;
  const perm = new Uint16Array(SIZE * 2);
  const vals = new Float32Array(SIZE);
  for (let i = 0; i < SIZE; i++) { perm[i] = i; vals[i] = rand(); }
  for (let i = SIZE - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  for (let i = 0; i < SIZE; i++) perm[i + SIZE] = perm[i];
  const lattice = (x: number, y: number) => vals[perm[(perm[x & 255] + y) & 511] & 255];
  const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const value = (x: number, y: number) => {
    const xi = Math.floor(x), yi = Math.floor(y);
    const u = fade(x - xi), v = fade(y - yi);
    return lerp(
      lerp(lattice(xi, yi), lattice(xi + 1, yi), u),
      lerp(lattice(xi, yi + 1), lattice(xi + 1, yi + 1), u),
      v,
    );
  };
  return (x: number, y: number) => {
    let sum = 0, amp = 1, freq = 1, norm = 0;
    for (let o = 0; o < 5; o++) {
      sum += amp * value(x * freq + o * 17.3, y * freq - o * 9.1);
      norm += amp;
      amp *= 0.5;
      freq *= 2.03;
    }
    return sum / norm;
  };
}

type Pt = [number, number];

// Ramer–Douglas–Peucker: drop points that sit within eps of the line between neighbours.
function simplify(pts: Pt[], eps: number): Pt[] {
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0], [bx, by] = pts[pts.length - 1];
  const dx = bx - ax, dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  let max = 0, idx = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
    if (d > max) { max = d; idx = i; }
  }
  if (max <= eps) return [pts[0], pts[pts.length - 1]];
  const left = simplify(pts.slice(0, idx + 1), eps);
  return left.slice(0, -1).concat(simplify(pts.slice(idx), eps));
}

// One pass of Chaikin corner cutting so the simplified lines read as terrain, not polygons.
function chaikin(pts: Pt[], closed: boolean): Pt[] {
  if (pts.length < 3) return pts;
  const out: Pt[] = closed ? [] : [pts[0]];
  const n = closed ? pts.length : pts.length - 1;
  for (let i = 0; i < n; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    out.push([0.75 * x0 + 0.25 * x1, 0.75 * y0 + 0.25 * y1]);
    out.push([0.25 * x0 + 0.75 * x1, 0.25 * y0 + 0.75 * y1]);
  }
  if (!closed) out.push(pts[pts.length - 1]);
  return out;
}

export interface Contour { level: number; index: boolean; d: string; length: number }

export function buildContours(opts: {
  width: number; height: number; cols: number; rows: number; levels: number; seed: number; scale: number;
}): Contour[] {
  const { width, height, cols, rows, levels, seed, scale } = opts;
  const noise = makeNoise(seed);
  const cw = width / cols, ch = height / rows;

  // Height field, with a gentle slope so the lines read as a hillside.
  const field: number[][] = [];
  let lo = Infinity, hi = -Infinity;
  for (let j = 0; j <= rows; j++) {
    const row: number[] = [];
    for (let i = 0; i <= cols; i++) {
      const x = i * cw, y = j * ch;
      const h = noise(x * scale, y * scale) * 0.85 + (1 - y / height) * 0.12 + (x / width) * 0.08;
      row.push(h);
      if (h < lo) lo = h;
      if (h > hi) hi = h;
    }
    field.push(row);
  }

  const out: Contour[] = [];
  const key = (p: Pt) => `${p[0].toFixed(2)},${p[1].toFixed(2)}`;

  for (let li = 1; li <= levels; li++) {
    const iso = lo + ((hi - lo) * li) / (levels + 1);
    const segs: [Pt, Pt][] = [];

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const tl = field[j][i], tr = field[j][i + 1], br = field[j + 1][i + 1], bl = field[j + 1][i];
        const c = (tl > iso ? 8 : 0) | (tr > iso ? 4 : 0) | (br > iso ? 2 : 0) | (bl > iso ? 1 : 0);
        if (c === 0 || c === 15) continue;
        const x = i * cw, y = j * ch;
        const t = (a: number, b: number) => (iso - a) / (b - a);
        const top: Pt = [x + cw * t(tl, tr), y];
        const right: Pt = [x + cw, y + ch * t(tr, br)];
        const bottom: Pt = [x + cw * t(bl, br), y + ch];
        const left: Pt = [x, y + ch * t(tl, bl)];
        const centerHigh = (tl + tr + br + bl) / 4 > iso;
        switch (c) {
          case 1: case 14: segs.push([left, bottom]); break;
          case 2: case 13: segs.push([bottom, right]); break;
          case 3: case 12: segs.push([left, right]); break;
          case 4: case 11: segs.push([top, right]); break;
          case 6: case 9: segs.push([top, bottom]); break;
          case 7: case 8: segs.push([left, top]); break;
          case 5:
            if (centerHigh) { segs.push([left, top]); segs.push([bottom, right]); }
            else { segs.push([left, bottom]); segs.push([top, right]); }
            break;
          case 10:
            if (centerHigh) { segs.push([left, bottom]); segs.push([top, right]); }
            else { segs.push([left, top]); segs.push([bottom, right]); }
            break;
        }
      }
    }

    // Chain segments that share endpoints into longer polylines.
    const ends = new Map<string, number[]>();
    segs.forEach(([a, b], n) => {
      for (const p of [a, b]) {
        const k = key(p);
        const list = ends.get(k);
        if (list) list.push(n); else ends.set(k, [n]);
      }
    });
    const used = new Uint8Array(segs.length);
    const extend = (chain: Pt[], from: Pt) => {
      let cur = from;
      for (;;) {
        const next = (ends.get(key(cur)) || []).find(n => !used[n]);
        if (next === undefined) break;
        used[next] = 1;
        const [a, b] = segs[next];
        cur = key(a) === key(cur) ? b : a;
        chain.push(cur);
      }
    };
    for (let n = 0; n < segs.length; n++) {
      if (used[n]) continue;
      used[n] = 1;
      const fwd: Pt[] = [segs[n][0], segs[n][1]];
      extend(fwd, segs[n][1]);
      const back: Pt[] = [];
      extend(back, segs[n][0]);
      const chain = back.reverse().concat(fwd);
      if (chain.length < 6) continue; // drop specks
      const closed = key(chain[0]) === key(chain[chain.length - 1]);
      const pts = chaikin(simplify(chain, 0.9), closed);
      let length = 0;
      for (let k = 1; k < pts.length; k++) length += Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]);
      const d = 'M' + pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('L') + (closed ? 'Z' : '');
      out.push({ level: li, index: li % 4 === 0, d, length });
    }
  }
  return out;
}
