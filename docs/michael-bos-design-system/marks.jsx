// marks.jsx — the six logo marks, drawn from the Red Rock + engineering language.
// Each mark is simple geometry (contour lines, slash, triangle, ring, nodes).
// Palette: rust primary, ochre accent — both legible on bone and on ink.
const RUST  = '#B84A26';
const OCHRE = '#D4892C';
const INK   = '#1F140C';

// ----- A · STRATA — nested peak built from topographic contour lines -------
function MarkStrata({ s = 48, stroke = RUST, accent = OCHRE }) {
  const w = s / 48;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <g stroke={stroke} strokeWidth={2.5 * w} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 37 L24 12 L42 37" />
        <path d="M13 37 L24 21.5 L35 37" />
        <path d="M19.5 37 L24 30 L28.5 37" />
      </g>
      <circle cx="24" cy="11" r={2.5 * w} fill={accent} />
    </svg>
  );
}

// ----- B · TRUNK — ascending git-graph line with commit / deploy nodes -----
function MarkTrunk({ s = 48, stroke = RUST, accent = OCHRE }) {
  const w = s / 48;
  const dots = [[6, 34], [15, 27], [22, 30], [30, 18]];
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <path d="M6 34 L15 27 L22 30 L30 18 L42 11"
        stroke={stroke} strokeWidth={2.5 * w} strokeLinecap="round" strokeLinejoin="round" />
      {dots.map(([cx, cy], k) => <circle key={k} cx={cx} cy={cy} r={1.9 * w} fill={stroke} />)}
      <circle cx="42" cy="11" r={2.7 * w} fill={accent} />
    </svg>
  );
}

// ----- C · SLASH — the path separator as a single bold route ---------------
function MarkSlash({ s = 48, stroke = RUST, accent = OCHRE }) {
  const w = s / 48;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <line x1="15" y1="38" x2="33" y2="13" stroke={stroke} strokeWidth={5.2 * w} strokeLinecap="round" />
      <circle cx="33.6" cy="11" r="2.7" fill={accent} />
    </svg>
  );
}

// ----- D · SUMMIT — solid beacon, a node set on the peak -------------------
function MarkSummit({ s = 48, fill = RUST, accent = OCHRE }) {
  const w = s / 48;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <path d="M24 12.5 L41 38.5 L7 38.5 Z"
        fill={fill} stroke={fill} strokeWidth={2.4 * w} strokeLinejoin="round" />
      <circle cx="24" cy="10" r={3.1 * w} fill={accent} />
    </svg>
  );
}

// ----- E · CARABINER — climbing link, the CI chain -------------------------
function MarkCarabiner({ s = 48, stroke = RUST, accent = OCHRE }) {
  const w = s / 48;
  return (
    <svg width={s} height={s} viewBox="0 0 48 48" fill="none">
      <rect x="14.5" y="7.5" width="19" height="33" rx="9.5"
        stroke={stroke} strokeWidth={2.6 * w} fill="none" />
      <path d="M23 9.5 L31.5 22.5" stroke={stroke} strokeWidth={2.4 * w} strokeLinecap="round" />
      <circle cx="23" cy="9.5" r={1.9 * w} fill={accent} />
    </svg>
  );
}

// ----- F · MONOGRAM — "m/b", the wordmark reduced to a path glyph ----------
// Rendered as type (not SVG) so it sits crisp at any size. Sits inside whatever
// surface the cell provides; onDark only flips the glyph color.
function Monogram({ s = 48, onDark = false, light = '#F2EAD9', slash = RUST }) {
  const box = {
    height: s, display: 'grid', placeItems: 'center',
    fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600,
    fontSize: s * 0.62, lineHeight: 1, letterSpacing: '-0.02em',
    color: onDark ? light : INK,
  };
  return (
    <div style={box}>
      <span>m<span style={{ color: slash, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>/</span>b</span>
    </div>
  );
}

Object.assign(window, { MarkStrata, MarkTrunk, MarkSlash, MarkSummit, MarkCarabiner, Monogram, RUST, OCHRE, INK });
