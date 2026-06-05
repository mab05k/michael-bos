// NavyRibbon.jsx — the bio-only USN service block. Reserved theme.
const NavyRibbon = () => (
  <div className="navy">
    <div className="navy-eyebrow">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="4" r="2"/>
        <path d="M12 6v14"/><path d="M9 8h6"/>
        <path d="M4 15a8 8 0 0 0 8 5 8 8 0 0 0 8-5"/>
      </svg>
      Service record
    </div>
    <h3 className="navy-h">U.S. Navy · 2008 — 2014</h3>
    <div className="navy-sub">IT2 · Information Systems Technician · Two deployments</div>
    <p className="navy-body">
      The Navy is where I learned what a process is for. I run my engineering teams
      with the same calm we ran a watch: clear roles, written orders, room to act.
      Standups are short. Postmortems are blameless. Pagers go off less.
    </p>
    <div className="navy-ribbons">
      <span className="navy-ribbon-tag">Honorable Discharge</span>
      <span className="navy-ribbon-tag">NAM × 2</span>
      <span className="navy-ribbon-tag">GWOT-S</span>
      <span className="navy-ribbon-tag">Sea Service × 2</span>
    </div>
  </div>
);

window.NavyRibbon = NavyRibbon;
