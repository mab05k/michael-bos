// Hero.jsx — split layout: text left, tall climbing photo right
const Hero = ({ onNavigate }) => (
  <section className="hero">
    <div className="hero-left">
      <div className="hero-kicker">
        <span className="dot"></span>
        Engineering Manager · Las Vegas, NV
      </div>
      <h1 className="hero-h1">Ship boring code.<br/>Build calm teams.</h1>
      <p className="hero-lede">
        I lead engineering teams that ship — fast, calm, and on a clean trunk.
        Twelve years of code, six years on the rope, six in the Navy.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <a className="btn btn-primary" href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}>
          Get in touch
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        <a className="btn btn-secondary-dark" href="#" onClick={(e) => { e.preventDefault(); onNavigate('writing'); }}>Read the writing</a>
      </div>
    </div>
    <div className="hero-right">
      <img src="../../assets/michael-climbing.jpg" alt="Michael climbing red sandstone in Red Rock Canyon, Nevada"/>
      <div className="hero-img-tag">36°08′N · 115°27′W · Red Rock, NV</div>
    </div>
  </section>
);

window.Hero = Hero;
