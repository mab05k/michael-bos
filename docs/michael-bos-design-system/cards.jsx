// cards.jsx — spec card that presents one logo direction four ways:
// mark on sand, mark on ink, the horizontal lockup, and favicon sizes.

const BONE = '#F2EAD9', SAND = '#E5D3B3', INK2 = '#1F140C';
const RUST2 = '#B84A26', FADE = '#6E5B45', SHADOW = '#3D2418';
const HAIR = 'rgba(31,20,12,0.12)';

// The reusable wordmark: mark + "michael / bos" + optional role.
function Wordmark({ mark, size = 30, role = true, onDark = false }) {
  const ink = onDark ? '#ECE3CF' : INK2;
  const fade = onDark ? '#8C99AD' : FADE;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
      <div style={{ display: 'grid', placeItems: 'center', width: size, height: size }}>{mark(size, onDark)}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, fontSize: size * 0.66, letterSpacing: '-0.01em', color: ink, whiteSpace: 'nowrap' }}>
          michael <span style={{ color: RUST2, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}>/</span> bos
        </span>
        {role && (
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: size * 0.4, color: fade, letterSpacing: '0.02em', marginLeft: 4 }}>
            — engineering manager
          </span>
        )}
      </div>
    </div>
  );
}

function Tile({ bg, label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
      <div style={{
        background: bg, borderRadius: 12, height: 150, display: 'grid', placeItems: 'center',
        boxShadow: '0 1px 2px rgba(31,20,12,0.06), 0 2px 8px rgba(31,20,12,0.05)',
        border: bg === BONE ? `1px solid ${HAIR}` : 'none',
      }}>{children}</div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: FADE }}>{label}</span>
    </div>
  );
}

function Favicon({ s, mark }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7 }}>
      <div style={{ width: s, height: s, background: INK2, borderRadius: Math.max(3, s * 0.22), display: 'grid', placeItems: 'center' }}>
        {mark(s * 0.6, true)}
      </div>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: FADE }}>{s}</span>
    </div>
  );
}

// mark = (size, onDark) => ReactNode
function LogoCard({ letter, name, concept, note, mark }) {
  return (
    <div style={{ padding: 30, display: 'flex', flexDirection: 'column', gap: 22, fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* header */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 11, color: '#F8F2E6', background: RUST2, padding: '3px 7px', borderRadius: 4 }}>{letter}</span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: FADE }}>{concept}</span>
        </div>
        <h3 style={{ margin: '12px 0 0', fontWeight: 600, fontSize: 25, letterSpacing: '-0.02em', color: INK2 }}>{name}</h3>
        <p style={{ margin: '8px 0 0', fontSize: 13.5, lineHeight: 1.55, color: SHADOW, maxWidth: '42ch' }}>{note}</p>
      </div>

      {/* two surfaces */}
      <div style={{ display: 'flex', gap: 14 }}>
        <Tile bg={SAND} label="on sandstone">{mark(64, false)}</Tile>
        <Tile bg={INK2} label="on canyon ink">{mark(64, true)}</Tile>
      </div>

      {/* lockup */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: FADE }}>horizontal lockup</span>
        <div style={{ background: BONE, border: `1px solid ${HAIR}`, borderRadius: 10, padding: '18px 20px' }}>
          <Wordmark mark={mark} size={28} />
        </div>
      </div>

      {/* favicons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: FADE }}>app icon · favicon</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18 }}>
          <Favicon s={44} mark={mark} />
          <Favicon s={28} mark={mark} />
          <Favicon s={18} mark={mark} />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LogoCard, Wordmark });
