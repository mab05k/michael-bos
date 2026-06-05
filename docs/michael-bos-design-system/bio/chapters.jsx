// bio/chapters.jsx — the six life chapters. Each exports a content renderer.
// Theme tokens live in theme.css keyed on [data-theme]; here we render content
// + the chapter's signature device. Exposes window.CHAPTERS.

const Chip = ({ children }) => <span className="ch-chip">{children}</span>;

/* ----- 01 · Florida Keys ------------------------------------------------ */
const Keys = () => (
  <div className="chapter">
    <div className="ch-left">
      <div className="ch-kicker"><span className="ch-num">01</span> Florida Keys <span className="yr">· before everything</span></div>
      <h2 className="ch-title">Saltwater first.</h2>
      <div className="ch-body">
        <p>
          I grew up on a thin strip of limestone between two oceans — Marathon, in
          the middle Keys. <strong>Boats before bikes.</strong> You learn to read
          weather, tie knots that hold, and fix the thing yourself because the next
          part is a three-hour drive up US-1.
        </p>
        <p>
          Hurricane season taught me to plan for the deploy that goes wrong. Island
          time taught me the rest is rarely an emergency. I still run on-call like a
          boat captain: calm voice, short list, everyone knows their job.
        </p>
      </div>
      <div className="ch-chips">
        <Chip>Saltwater</Chip><Chip>Boats &amp; engines</Chip>
        <Chip>Hurricane seasons</Chip><Chip>Fix it yourself</Chip>
      </div>
    </div>
    <div className="ch-right">
      <div className="keys-horizon">
        <span className="kh-coord">24°43′N · 81°02′W</span>
        <span className="kh-tag">home water</span>
        <div className="hz-line"></div>
        <span className="kh-mm">MM 50 · Marathon, FL</span>
      </div>
    </div>
  </div>
);

/* ----- 02 · Florida State University ------------------------------------ */
const Fsu = () => (
  <div className="chapter">
    <div className="ch-left">
      <div className="ch-kicker"><span className="ch-num">02</span> Florida State University <span className="yr">· 2004 — 2008</span></div>
      <h2 className="ch-title">Garnet &amp; gold.</h2>
      <div className="ch-body">
        <p>
          I left the islands for Tallahassee and the first real codebase of my life
          — a fluorescent-lit CS lab and a compiler that did not care about my
          excuses. <strong>That is where software stopped being a hobby.</strong>
        </p>
        <p>
          Four years of all-nighters, intramural everything, and a campus that taught
          me how to work inside a big, loud, opinionated organization — useful
          practice for every team I have run since.
        </p>
      </div>
      <div className="ch-chips">
        <Chip>First compiler</Chip><Chip>Seminoles</Chip><Chip>All-nighters</Chip>
      </div>
    </div>
    <div className="ch-right">
      <div className="degree-card">
        <div className="seal">FSU</div>
        <div>
          <div className="dc-deg">B.S. · Computer Science</div>
          <div className="dc-school">Florida State University</div>
          <div className="dc-meta">Tallahassee, FL · Class of 2008</div>
        </div>
      </div>
      <div className="dc-rule"></div>
    </div>
  </div>
);

/* ----- 03 · U.S. Navy --------------------------------------------------- */
const Navy = () => (
  <div className="chapter">
    <div className="ch-left">
      <div className="ch-kicker"><span className="ch-num">03</span> United States Navy <span className="yr">· 2008 — 2014</span></div>
      <h2 className="ch-title">Where I learned what a process is for.</h2>
      <div className="ch-body">
        <p>
          Out of school I enlisted as an <strong>Information Systems Technician</strong>.
          Two deployments, a watch bill, and a lot of nights keeping comms up on a
          ship in the middle of nowhere.
        </p>
        <p>
          I run engineering teams with the same calm we ran a watch: clear roles,
          written orders, room to act. Standups are short. Postmortems are blameless.
          Pagers go off less.
        </p>
      </div>
    </div>
    <div className="ch-right">
      <div className="service-card">
        <div className="service-grid">
          <div className="service-line"><div className="service-k">Rate</div><div className="service-v">IT2 · Information Systems Technician</div></div>
          <div className="service-line"><div className="service-k">Sea</div><div className="service-v">Two deployments · Sea Service × 2</div></div>
          <div className="service-line"><div className="service-k">Awards</div><div className="service-v">NAM × 2 · GWOT-S</div></div>
          <div className="service-line"><div className="service-k">Sep.</div><div className="service-v">Honorable Discharge, 2014</div></div>
        </div>
        <div className="ribbon-bar">
          <span style={{ background: '#14233F' }}></span>
          <span style={{ background: '#C9A227' }}></span>
          <span style={{ background: '#7A1F2B' }}></span>
          <span style={{ background: '#1D3A2A' }}></span>
          <span style={{ background: '#C9A227' }}></span>
          <span style={{ background: '#14233F' }}></span>
        </div>
      </div>
    </div>
  </div>
);

/* ----- 04 · Technology -------------------------------------------------- */
const Tech = () => (
  <div className="chapter">
    <div className="ch-left">
      <div className="ch-kicker"><span className="ch-num">04</span> Software engineering <span className="yr">· 2014 — present</span></div>
      <h2 className="ch-title">Twelve years on a clean trunk.</h2>
      <div className="ch-body">
        <p>
          Out of the Navy I went all-in on shipping software — a few smaller Vegas
          shops, then data-center tooling at <strong>Switch</strong>, and today
          leading the platform team at <strong>Guidepoint</strong>.
        </p>
        <p>
          My whole bias: small reversible deploys, on green main, all day. Boring
          code, calm teams, fast feedback.
        </p>
        <div className="tech-stack">
          <Chip>python</Chip><Chip>go</Chip><Chip>kubernetes</Chip>
          <Chip>github actions</Chip><Chip>observability</Chip>
        </div>
      </div>
    </div>
    <div className="ch-right">
      <div className="term">
        <div className="term-bar">
          <div className="tdot" style={{ background: '#FF5F57' }}></div>
          <div className="tdot" style={{ background: '#FEBC2E' }}></div>
          <div className="tdot" style={{ background: '#28C840' }}></div>
          <div className="term-title">career.log · git</div>
        </div>
        <div className="term-body">
          <span className="dim">$ git log --oneline --author=mbos</span><br />
          <span className="accent">a1f9c0</span> guidepoint — built a platform team from scratch<br />
          <span className="accent">7b2e44</span> switch — cut p50 deploy 42m <span className="dim">→</span> 6m<br />
          <span className="accent">3c0d18</span> switch — split the monolith pipeline into 3 lanes<br />
          <span className="accent">9e5a2f</span> vegas shops — first prod on-call rotation<br />
          <span className="ok">HEAD → main · clean working tree ✓</span>
        </div>
      </div>
    </div>
  </div>
);

/* ----- 05 · UNLV Executive MBA ------------------------------------------ */
const Unlv = () => (
  <div className="chapter">
    <div className="ch-left">
      <div className="ch-kicker"><span className="ch-num">05</span> UNLV · Executive MBA <span className="yr">· 2022</span></div>
      <h2 className="ch-title">Vocabulary to argue with finance.</h2>
      <div className="ch-body">
        <p>
          By then I was already managing engineers in Las Vegas, so I did the
          Executive MBA at UNLV mostly to learn the language on the other side of the
          table — margin, runway, opportunity cost.
        </p>
        <p>
          The thing I actually learned: <strong>most “people problems” are process
          problems wearing a costume.</strong> Fix the system and the drama usually
          leaves on its own.
        </p>
      </div>
      <div className="ch-chips">
        <Chip>Las Vegas, NV</Chip><Chip>Finance</Chip><Chip>Systems thinking</Chip>
      </div>
    </div>
    <div className="ch-right">
      <div className="ledger">
        <div className="ledger-head">
          <div className="seal">UNLV</div>
          <div>
            <div className="lh-deg">Executive MBA · 2022</div>
            <div className="lh-school">Lee Business School</div>
          </div>
        </div>
        <div className="ledger-row"><div className="ledger-l"><em>“people problem”</em></div><div className="ledger-eq">→</div><div className="ledger-r">unclear ownership</div></div>
        <div className="ledger-row"><div className="ledger-l"><em>“they’re slow”</em></div><div className="ledger-eq">→</div><div className="ledger-r">no defined done</div></div>
        <div className="ledger-row"><div className="ledger-l"><em>“low morale”</em></div><div className="ledger-eq">→</div><div className="ledger-r">painful deploys</div></div>
      </div>
    </div>
  </div>
);

/* ----- 06 · Red Rock climbing ------------------------------------------- */
const ticks = [
  { date: '05-18', route: 'Cloud Tower', area: 'Red Rock · Ingalls Buttress', grade: '5.11c', style: 'send' },
  { date: '05-11', route: 'Levitation 29', area: 'Red Rock · Eagle Wall', grade: '5.11c', style: 'send' },
  { date: '05-04', route: 'Crimson Chrysalis', area: 'Red Rock · Cloud Tower', grade: '5.8', style: 'send' },
  { date: '04-27', route: 'Epinephrine', area: 'Black Velvet Canyon', grade: '5.9', style: 'send' },
  { date: '04-20', route: 'Resolution Arête', area: 'Mt. Wilson', grade: '5.10b', style: 'proj' },
];
const Climb = () => (
  <div className="chapter">
    <div className="ch-left">
      <div className="ch-kicker"><span className="ch-num">06</span> Red Rock Canyon <span className="yr">· now</span></div>
      <h2 className="ch-title">Six years on the rope.</h2>
      <div className="ch-body">
        <p>
          Twenty minutes from my desk the sandstone turns red and vertical. I climb
          mostly trad in <strong>Red Rock Canyon</strong> — long, committing routes
          where the gear you place is the only thing between you and a bad day.
        </p>
        <p>
          It is the same discipline as the job: short repeatable moves, clean
          protection, room to back off. The best postmortems read like climbing
          accidents.
        </p>
      </div>
      <div className="grade-strip" style={{ marginTop: 24 }}>
        <div className="grade-cell"><div className="g">5.8</div><div className="l">warmup</div></div>
        <div className="grade-cell"><div className="g">5.9</div><div className="l">cruise</div></div>
        <div className="grade-cell"><div className="g">5.10</div><div className="l">work</div></div>
        <div className="grade-cell hot"><div className="g">5.11c</div><div className="l">onsight</div></div>
        <div className="grade-cell"><div className="g">5.12</div><div className="l">project</div></div>
      </div>
    </div>
    <div className="ch-right">
      <div className="climb-photo">
        <img src="michael-climbing.jpg" alt="Michael climbing red sandstone in Red Rock Canyon" />
        <span className="cp-tag">36.135° N · Red Rock Canyon, NV</span>
      </div>
      <div className="latest-tick">
        <span className="climb-style send">✓ latest send</span>
        <span className="lt-route">Cloud Tower</span>
        <span className="lt-area">Ingalls Buttress</span>
        <span className="lt-grade">5.11c</span>
      </div>
    </div>
  </div>
);

const CHAPTERS = [
  { id: 'keys',  theme: 'keys',  year: '∞',       label: 'Florida Keys', render: Keys },
  { id: 'fsu',   theme: 'fsu',   year: '2004',    label: 'FSU',          render: Fsu },
  { id: 'navy',  theme: 'navy',  year: '2008',    label: 'U.S. Navy',    render: Navy },
  { id: 'tech',  theme: 'tech',  year: '2014',    label: 'Engineering',  render: Tech },
  { id: 'unlv',  theme: 'unlv',  year: '2022',    label: 'UNLV MBA',     render: Unlv },
  { id: 'climb', theme: 'climb', year: 'now',     label: 'Red Rock',     render: Climb },
];

window.CHAPTERS = CHAPTERS;
