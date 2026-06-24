// bio/app.jsx — full-screen bio with a horizontal timeline rail.
// Clicking a node re-themes the whole page and swaps the chapter content.
const { useState, useEffect, useRef, useCallback } = React;

const Arrow = ({ dir }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'prev' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
  </svg>
);

function App() {
  const chapters = window.CHAPTERS;
  const [i, setI] = useState(() => {
    const saved = Number(localStorage.getItem('bio-chapter'));
    return Number.isInteger(saved) && saved >= 0 && saved < window.CHAPTERS.length ? saved : 0;
  });
  const [anim, setAnim] = useState(true);
  const animTimer = useRef(null);

  const go = useCallback((next) => {
    setI((cur) => {
      const n = Math.max(0, Math.min(chapters.length - 1, next));
      if (n !== cur) {
        setAnim(false);
        // retrigger entrance animation on the new chapter
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
      }
      return n;
    });
  }, [chapters.length]);

  useEffect(() => { localStorage.setItem('bio-chapter', String(i)); }, [i]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(i + 1); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(i - 1); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, go]);

  const active = chapters[i];
  const Body = active.render;
  const N = chapters.length;
  const edge = 100 / (2 * N);              // half a column, in %
  const span = 100 - 2 * edge;            // distance between first & last dot center
  const progress = N > 1 ? (i / (N - 1)) * span : 0;

  return (
    <div className="stage" data-theme={active.theme} data-anim={anim ? 'in' : 'out'}>
      {/* Top bar */}
      <header className="topbar">
        <a className="brand" href="../ui_kits/portfolio/index.html">
          <span className="brand-name">Michael Bos</span>
          <span className="brand-slash">/</span>
          <span className="brand-sub">bio</span>
        </a>
        <nav className="topnav" aria-label="Primary">
          <a className="topnav-link" href="../ui_kits/portfolio/index.html">Home</a>
          <a className="topnav-link is-active" href="#" aria-current="page" onClick={(e) => e.preventDefault()}>Bio</a>
          <a className="topnav-link" href="../ui_kits/portfolio/index.html#portfolio">Portfolio</a>
        </nav>
        <div className="topbar-right">
          <span className="loc"><span className="pin"></span> Las Vegas, NV</span>
          <span className="chapter-count"><b>{String(i + 1).padStart(2, '0')}</b> / {String(chapters.length).padStart(2, '0')}</span>
        </div>
      </header>

      {/* Chapter stage */}
      <main className="stage-body" key={active.id} data-screen-label={`Bio · ${active.label}`}>
        <Body />
      </main>

      {/* Timeline rail */}
      <nav className="rail" aria-label="Life timeline">
        <div className="rail-track">
          <div className="rail-line" style={{ left: `${edge}%`, right: `${edge}%` }}></div>
          <div className="rail-progress" style={{ left: `${edge}%`, width: `${progress}%` }}></div>
          {chapters.map((c, idx) => (
            <button
              key={c.id}
              className={`node ${idx === i ? 'is-active' : ''} ${idx < i ? 'is-done' : ''}`}
              onClick={() => go(idx)}
              aria-current={idx === i ? 'step' : undefined}>
              <span className="node-dot"></span>
              <span className="node-year">{c.year}</span>
              <span className="node-label">{c.label}</span>
            </button>
          ))}
          <div className="rail-nav">
            <button className="arrow" onClick={() => go(i - 1)} disabled={i === 0} aria-label="Previous chapter"><Arrow dir="prev" /></button>
            <button className="arrow" onClick={() => go(i + 1)} disabled={i === chapters.length - 1} aria-label="Next chapter"><Arrow dir="next" /></button>
          </div>
        </div>
      </nav>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
