// ClimbingLog.jsx — recent ticks list. Trad / sport routes with grades.
const climbingTicks = [
  { date: '2026-05-18', route: 'Cloud Tower',     area: 'Red Rock · Ingalls Buttress', grade: '5.11c', style: 'send' },
  { date: '2026-05-11', route: 'Levitation 29',   area: 'Red Rock · Eagle Wall',       grade: '5.11c', style: 'send' },
  { date: '2026-05-04', route: 'Crimson Chrysalis', area: 'Red Rock · Cloud Tower',    grade: '5.8',   style: 'send' },
  { date: '2026-04-27', route: 'Epinephrine',     area: 'Black Velvet Canyon',         grade: '5.9',   style: 'send' },
  { date: '2026-04-20', route: 'Resolution Arête', area: 'Mt. Wilson',                 grade: '5.10b', style: 'proj' },
];

const ClimbingLog = () => (
  <div>
    <div className="climb-row" style={{ borderTop: '1px solid var(--hairline)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--canyon-fade)' }}>Style</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--canyon-fade)' }}>Route · Area</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--canyon-fade)', textAlign: 'right' }}>Grade</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--canyon-fade)', textAlign: 'right' }}>Date</div>
    </div>
    {climbingTicks.map((t) => (
      <div key={t.route + t.date} className="climb-row">
        <div><span className={`climb-style ${t.style}`}>{t.style === 'send' ? '✓ sent' : '⌖ proj'}</span></div>
        <div>
          <div className="climb-route">{t.route}</div>
          <div className="climb-area">{t.area}</div>
        </div>
        <div className="climb-grade">{t.grade}</div>
        <div className="climb-date">{t.date.slice(5)}</div>
      </div>
    ))}
  </div>
);

window.ClimbingLog = ClimbingLog;
