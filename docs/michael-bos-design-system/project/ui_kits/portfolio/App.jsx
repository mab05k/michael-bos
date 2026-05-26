// App.jsx — top-level screen router & screen compositions
const { useState } = React;

const HomeScreen = ({ onNavigate }) => (
  <>
    <Hero onNavigate={onNavigate}/>

    <section className="section container">
      <div className="grid-7-5">
        <div>
          <div className="eyebrow"><span className="num">01</span> · How I ship</div>
          <h2 className="section-title">Three things I optimize for: cycle time, blast radius, team morale.</h2>
          <p className="section-lede">
            I treat delivery the way I treat a long pitch — short repeatable moves, clean gear, room to back off.
            The result is small reversible deploys, on green main, all day.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Pipeline/>
          <Terminal>
            <span className="prompt">→</span> make deploy<br/>
            <span className="dim">[1/4]</span> tests passed in 64s <span className="ok">✓</span><br/>
            <span className="dim">[2/4]</span> build → docker push <span className="ok">✓</span><br/>
            <span className="dim">[3/4]</span> rolling restart (3 pods) <span className="ok">✓</span><br/>
            <span className="dim">[4/4]</span> smoke checks <span className="ok">✓</span><br/>
            <span className="ok">deployed michael-bos.com · 2m 17s</span>
          </Terminal>
        </div>
      </div>
    </section>

    <section className="section container" style={{ paddingTop: 0 }}>
      <div className="eyebrow"><span className="num">02</span> · Case studies</div>
      <h2 className="section-title" style={{ marginBottom: 36 }}>Things I'm proud of.</h2>
      <div className="grid-2">
        <ProjectCard
          eyebrow="Switch · 2019–2022"
          title="Cut p50 deploy from 42m → 6m"
          body="Parallelized the test matrix, cached deps between PR builds, split the monolith pipeline into three lanes. Team got their afternoons back."
          metric={{ value: '−86%', label: 'cycle time' }}
          tags={['python', 'github actions', 'docker', 'kubernetes']}
        />
        <ProjectCard
          eyebrow="Guidepoint · 2022–present"
          title="Built a platform team from scratch"
          body="Hired seven engineers in 14 months. Standing weekly tooling office hours. We now own CI, observability, and the deploy story for every product team."
          metric={{ value: '7 → 0', label: 'sev-1 pages/qtr' }}
          tags={['leadership', 'hiring', 'platform', 'observability']}
        />
      </div>
    </section>

    <section className="section container" style={{ paddingTop: 0 }}>
      <div className="eyebrow"><span className="num">03</span> · Recent writing</div>
      <h2 className="section-title" style={{ marginBottom: 24 }}>Notes on management, delivery, & rope.</h2>
      <div>
        <WritingRow date="2026.05" title="A staff engineer is not a senior senior." read="6 min" />
        <WritingRow date="2026.04" title="The case for boring pipelines." read="9 min" />
        <WritingRow date="2026.03" title="Postmortems should read like climbing accidents." read="7 min" />
        <WritingRow date="2026.02" title="How to run a one-on-one when nothing's wrong." read="5 min" />
      </div>
      <div style={{ marginTop: 24 }}>
        <a className="btn btn-ghost" href="#" onClick={(e) => { e.preventDefault(); onNavigate('writing'); }}>
          All writing →
        </a>
      </div>
    </section>

    <Footer/>
  </>
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

const BioScreen = () => (
  <main>
    <section className="section container" style={{ paddingBottom: 24 }}>
      <div className="eyebrow"><span className="num">bio</span></div>
      <h1 className="section-title" style={{ fontSize: 56, marginBottom: 8 }}>About</h1>
      <p className="section-lede" style={{ maxWidth: '50ch' }}>
        Engineering manager. Las Vegas, Nevada. Twelve years of code, six on the rope, six in the Navy.
      </p>
    </section>

    <section className="container" style={{ paddingBottom: 48 }}>
      <div className="grid-7-5">
        <div>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--canyon-shadow)', maxWidth: '60ch' }}>
            I currently lead an engineering team at Guidepoint, where we run the platform that powers our research products.
            Before that I spent five years at Switch building data-center infrastructure tooling, and four years as a software engineer at smaller shops in Las Vegas.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--canyon-shadow)', maxWidth: '60ch' }}>
            I picked up an Executive MBA from UNLV in 2022 — mostly because I wanted vocabulary to argue with finance.
            The thing I actually learned: most "people problems" are process problems wearing a costume.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          <div className="stat">
            <div className="stat-num">12</div>
            <div className="stat-label">years writing software</div>
          </div>
          <div className="stat">
            <div className="stat-num">7</div>
            <div className="stat-label">engineers on my team today</div>
          </div>
          <div className="stat">
            <div className="stat-num">~12/day</div>
            <div className="stat-label">deploys to main</div>
          </div>
          <div className="stat" style={{ borderBottom: '1px solid var(--hairline)' }}>
            <div className="stat-num">5.11c</div>
            <div className="stat-label">hardest trad onsight (Red Rock)</div>
          </div>
        </div>
      </div>
    </section>

    <section className="container" style={{ paddingBottom: 64 }}>
      <NavyRibbon/>
    </section>

    <section className="container" style={{ paddingBottom: 64 }}>
      <div className="eyebrow">recent ticks</div>
      <h2 className="section-title" style={{ marginBottom: 24 }}>Climbing log.</h2>
      <ClimbingLog/>
    </section>

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
  const [screen, setScreen] = useState('home');
  const onNavigate = (s) => { setScreen(s); window.scrollTo({ top: 0, behavior: 'instant' }); };

  return (
    <>
      <Nav active={screen} onNavigate={onNavigate}/>
      {screen === 'home' && <HomeScreen onNavigate={onNavigate}/>}
      {screen === 'writing' && <WritingScreen/>}
      {screen === 'bio' && <BioScreen/>}
      {screen === 'contact' && <ContactScreen/>}
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
