// theme-tiles.jsx — renders one "direction" tile per desert theme.
// Each tile = a representative portfolio hero in that theme + a token strip
// (palette swatches, type pairing, accents). Exports window.ThemeTile + THEMES.

const THEMES = [
  {
    id: 'sandstone',
    name: 'Red Rock Sandstone',
    tag: 'Warm, sun-bleached, editorial. The Calico Hills at midday.',
    fonts: {
      display: "'Spectral', Georgia, serif",
      body: "'IBM Plex Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    typeNote: 'Spectral · IBM Plex Sans · JetBrains Mono',
    mode: 'light',
    colors: {
      bg: '#F3ECDC', surface: '#E8D8BB', ink: '#2A1B11', sub: '#6E5B45',
      hair: 'rgba(42,27,17,0.14)',
    },
    accent: '#B0492A', accent2: '#C98A2E', support: '#7E8C6B',
    swatches: [
      ['#F3ECDC', 'Bone'], ['#E8D8BB', 'Sand'], ['#B0492A', 'Rust'],
      ['#C98A2E', 'Ochre'], ['#7E8C6B', 'Sage'], ['#2A1B11', 'Varnish'],
    ],
  },
  {
    id: 'dusk',
    name: 'Canyon Dusk',
    tag: 'Warm dark, golden hour. Lets the rock photography glow.',
    fonts: {
      display: "'Archivo', system-ui, sans-serif",
      body: "'IBM Plex Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    typeNote: 'Archivo · IBM Plex Sans · JetBrains Mono',
    mode: 'dark',
    colors: {
      bg: '#1B130D', surface: '#291D13', ink: '#F0E4D1', sub: '#B49C82',
      hair: 'rgba(240,228,209,0.12)',
    },
    accent: '#E0A23C', accent2: '#C8542B', support: '#9AA585',
    swatches: [
      ['#1B130D', 'Shadow'], ['#291D13', 'Ember'], ['#E0A23C', 'Gold'],
      ['#C8542B', 'Rust'], ['#9AA585', 'Sage'], ['#F0E4D1', 'Sand'],
    ],
  },
  {
    id: 'topo',
    name: 'Topo Field Guide',
    tag: 'Paper, ink, contour lines. National-park trailhead signage.',
    fonts: {
      display: "'Barlow Semi Condensed', system-ui, sans-serif",
      body: "'IBM Plex Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    typeNote: 'Barlow Semi Condensed · IBM Plex Sans · JetBrains Mono',
    mode: 'light',
    colors: {
      bg: '#F4EEE0', surface: '#EBE3CF', ink: '#202619', sub: '#5C6450',
      hair: 'rgba(32,38,25,0.16)',
    },
    accent: '#BC4B2B', accent2: '#3C5A3E', support: '#9A7B4A',
    topo: true,
    swatches: [
      ['#F4EEE0', 'Paper'], ['#EBE3CF', 'Linen'], ['#3C5A3E', 'Pinyon'],
      ['#BC4B2B', 'Marker'], ['#9A7B4A', 'Trail'], ['#202619', 'Ink'],
    ],
  },
  {
    id: 'dawn',
    name: 'High Desert Dawn',
    tag: 'Soft, airy, minimal. First light, lots of open sky.',
    fonts: {
      display: "'Newsreader', Georgia, serif",
      body: "'Work Sans', system-ui, sans-serif",
      mono: "'JetBrains Mono', ui-monospace, monospace",
    },
    typeNote: 'Newsreader · Work Sans · JetBrains Mono',
    mode: 'light',
    colors: {
      bg: '#F7F2EC', surface: '#E9E5DC', ink: '#39322C', sub: '#857B70',
      hair: 'rgba(57,50,44,0.12)',
    },
    accent: '#C0795C', accent2: '#9DA890', support: '#A7B0B8',
    swatches: [
      ['#F7F2EC', 'Dawn'], ['#E9E5DC', 'Linen'], ['#C0795C', 'Clay'],
      ['#9DA890', 'Sage'], ['#A7B0B8', 'Sky'], ['#39322C', 'Stone'],
    ],
  },
];

function Chip({ theme }) {
  const c = theme.colors;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      font: `500 12px/1 ${theme.fonts.mono}`, letterSpacing: '0.02em',
      color: theme.support, padding: '7px 11px', borderRadius: 999,
      border: `1px solid ${theme.colors.hair}`,
      background: theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
    }}>
      <span style={{ width: 7, height: 7, borderRadius: 999, background: theme.support }}></span>
      build&nbsp;passing
    </span>
  );
}

function Swatch({ hex, label, theme }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: '1 1 0', minWidth: 0 }}>
      <div style={{
        height: 40, borderRadius: 6, background: hex,
        border: `1px solid ${theme.colors.hair}`,
      }}></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <span style={{ font: `500 11px/1.2 ${theme.fonts.body}`, color: theme.colors.ink }}>{label}</span>
        <span style={{ font: `400 10px/1.2 ${theme.fonts.mono}`, color: theme.colors.sub }}>{hex}</span>
      </div>
    </div>
  );
}

function ThemeTile({ theme }) {
  const c = theme.colors;
  const onDark = theme.mode === 'dark';

  // Topographic contour-line motif for the field-guide theme.
  const topoBg = theme.topo ? {
    backgroundImage:
      `repeating-radial-gradient(ellipse 120% 80% at 78% 18%, transparent 0 17px, ${hexA(theme.accent2, 0.10)} 17px 18px, transparent 18px 34px)`,
  } : {};

  return (
    <div style={{ width: '100%', background: c.bg, fontFamily: theme.fonts.body, color: c.ink }}>
      {/* Hero preview */}
      <div style={{ position: 'relative', padding: '34px 34px 30px', ...topoBg }}>
        <div style={{ display: 'flex', gap: 26, alignItems: 'stretch' }}>
          {/* Left: copy */}
          <div style={{ flex: '1 1 0', minWidth: 0, display: 'flex', flexDirection: 'column' }}>
            <span style={{
              font: `500 12px/1 ${theme.fonts.mono}`, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: theme.accent,
            }}>Engineering Manager · Las Vegas</span>
            <h1 style={{
              margin: '16px 0 0', font: `600 46px/1.0 ${theme.fonts.display}`,
              letterSpacing: '-0.02em', color: c.ink,
            }}>Michael Bos</h1>
            <p style={{
              margin: '16px 0 0', font: `400 15px/1.55 ${theme.fonts.body}`,
              color: c.sub, maxWidth: '30ch',
            }}>I build teams and ship delivery pipelines. Navy veteran, MBA, and a climber who lives next to Red Rock.</p>
            <div style={{ marginTop: 'auto', paddingTop: 22, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <button style={{
                font: `600 14px/1 ${theme.fonts.body}`, color: onDark ? '#1B130D' : '#fff',
                background: theme.accent, border: 'none', padding: '13px 20px',
                borderRadius: 7, cursor: 'pointer', whiteSpace: 'nowrap',
              }}>Get in touch →</button>
              <Chip theme={theme} />
            </div>
          </div>
          {/* Right: photo */}
          <div style={{
            flex: '0 0 132px', borderRadius: 10, overflow: 'hidden',
            border: `1px solid ${c.hair}`, position: 'relative',
            boxShadow: onDark ? '0 8px 30px rgba(0,0,0,0.5)' : '0 8px 24px rgba(42,27,17,0.18)',
          }}>
            <img src="michael-climbing.jpg" alt="" style={{
              width: '100%', height: '100%', objectFit: 'cover', display: 'block',
            }} />
            <span style={{
              position: 'absolute', left: 8, bottom: 8, font: `500 10px/1 ${theme.fonts.mono}`,
              letterSpacing: '0.04em', color: '#F0E4D1', padding: '4px 7px',
              borderRadius: 5, background: 'rgba(20,14,9,0.55)', backdropFilter: 'blur(2px)',
              whiteSpace: 'nowrap',
            }}>36.135° N</span>
          </div>
        </div>
      </div>

      {/* Token strip */}
      <div style={{
        background: c.surface, padding: '22px 34px 26px',
        borderTop: `1px solid ${c.hair}`,
      }}>
        {/* Palette */}
        <div style={{ display: 'flex', gap: 10 }}>
          {theme.swatches.map(([hex, label]) => (
            <Swatch key={hex + label} hex={hex} label={label} theme={theme} />
          ))}
        </div>
        {/* Type + accents */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          gap: 20, marginTop: 22, paddingTop: 20, borderTop: `1px solid ${c.hair}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, minWidth: 0 }}>
            <span style={{ font: `600 44px/0.9 ${theme.fonts.display}`, color: c.ink }}>Aa</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
              <span style={{ font: `600 13px/1.2 ${theme.fonts.body}`, color: c.ink }}>{theme.name}</span>
              <span style={{ font: `400 11px/1.3 ${theme.fonts.mono}`, color: c.sub, whiteSpace: 'normal' }}>{theme.typeNote}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, flex: '0 0 auto' }}>
            {[theme.accent, theme.accent2, theme.support].map((a, i) => (
              <span key={i} style={{
                width: 30, height: 30, borderRadius: 999, background: a,
                border: `1px solid ${c.hair}`,
              }}></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// tiny hex+alpha helper
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

Object.assign(window, { THEMES, ThemeTile });
