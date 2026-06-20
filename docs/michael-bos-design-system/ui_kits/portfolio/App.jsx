// App.jsx — top-level screen router & screen compositions
const { useState } = React;

const HomeScreen = ({ onNavigate }) => (
  <Hero onNavigate={onNavigate}/>
);

const WritingScreen = () => (
  <main className="section container">
    <div className="eyebrow"><span className="num">writing</span></div>
    <h1 className="section-title" style={{ fontSize: 56, marginBottom: 8 }}>Writing</h1>
    <p className="section-lede" style={{ maxWidth: '50ch' }}>
      Short essays on engineering management, delivery, and what climbing teaches me about systems.
      Roughly one a month. No newsletter — RSS only.
    </p>

    <div style={{ marginTop: 40 }}>
      {[
        ['2026.05', 'A staff engineer is not a senior senior.', '6 min'],
        ['2026.04', 'The case for boring pipelines.', '9 min'],
        ['2026.03', 'Postmortems should read like climbing accidents.', '7 min'],
        ['2026.02', "How to run a one-on-one when nothing's wrong.", '5 min'],
        ['2026.01', 'Hiring for the platform team you wish you had.', '11 min'],
        ['2025.12', "Delete the project management tool. Use a doc.", '4 min'],
        ['2025.11', 'Two questions I ask in every interview.', '6 min'],
        ['2025.10', 'On-call should be a feature, not a punishment.', '8 min'],
      ].map(([d, t, r]) => <WritingRow key={t} date={d} title={t} read={r}/>)}
    </div>

    <Footer/>
  </main>
);

// BioScreen lives in its own full-screen page (../../bio/Bio Timeline.html) —
// the timeline experience. Navigating to 'bio' routes there.

// PortfolioScreen — intentionally empty for now. Placeholder shell kept on-brand
// so it's ready to fill with project work.
const PortfolioScreen = () => (
  <main className="section container">
    <div className="eyebrow"><span className="num">portfolio</span></div>
    <h1 className="section-title" style={{ fontSize: 56, marginBottom: 8 }}>Portfolio</h1>
    <p className="section-lede" style={{ maxWidth: '50ch' }}>
      Selected work, coming soon.
    </p>
    <Footer/>
  </main>
);

const ContactScreen = () => (
  <main className="section container">
    <div className="eyebrow"><span className="num">contact</span></div>
    <h1 className="section-title" style={{ fontSize: 56, marginBottom: 8 }}>Get in touch</h1>
    <p className="section-lede" style={{ maxWidth: '50ch' }}>
      I read every message. Quickest way to reach me is here, then LinkedIn.
      I usually reply within a week.
    </p>

    <div className="grid-7-5" style={{ marginTop: 48, alignItems: 'start' }}>
      <ContactForm/>
      <div style={{ background: 'var(--bg-sand)', borderRadius: 'var(--r-md)', padding: 28, boxShadow: 'var(--shadow-1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--canyon-shadow)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em' }}>Las Vegas, NV</span>
        </div>
        <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, margin: '12px 0 4px' }}>Office hours, sort of.</h4>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--canyon-shadow)', margin: '0 0 16px' }}>
          Free / cheap calls with engineers thinking about moving into management. I do 2–3 a month.
        </p>
        <div style={{ borderTop: '1px solid var(--hairline)', paddingTop: 16, display:'flex', flexDirection:'column', gap:8 }}>
          <a href="#" onClick={(e)=>e.preventDefault()} style={{ display:'flex', alignItems:'center', gap:10, color:'var(--canyon-ink)', textDecoration:'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:13 }}>mike@michael-bos.com</span>
          </a>
          <a href="#" onClick={(e)=>e.preventDefault()} style={{ display:'flex', alignItems:'center', gap:10, color:'var(--canyon-ink)', textDecoration:'none' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:13 }}>linkedin.com/in/michael-a-bos</span>
          </a>
        </div>
      </div>
    </div>

    <Footer/>
  </main>
);

// ----- Root ---------------------------------------------------------------
const App = () => {
  const screens = ['home', 'writing', 'portfolio', 'contact'];
  const [screen, setScreen] = useState(() => {
    const h = (window.location.hash || '').replace('#', '');
    return screens.includes(h) ? h : 'home';
  });
  const onNavigate = (s) => {
    if (s === 'bio') { window.location.href = '../../bio/Bio%20Timeline.html'; return; }
    setScreen(s);
    if (window.history.replaceState) {
      window.history.replaceState(null, '', s === 'home' ? window.location.pathname : '#' + s);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <Nav active={screen} onNavigate={onNavigate}/>
      {screen === 'home' && <HomeScreen onNavigate={onNavigate}/>}
      {screen === 'writing' && <WritingScreen/>}
      {screen === 'portfolio' && <PortfolioScreen/>}
      {screen === 'contact' && <ContactScreen/>}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
