// Nav.jsx — sticky top nav with brand mark + screen switcher
const Nav = ({ active, onNavigate }) => {
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'writing', label: 'Writing' },
    { id: 'bio', label: 'Bio' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a className="nav-brand" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} href="#">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#1F140C"/>
            <path d="M6 22 L11 12 L14 18 L17 13 L22 21 L26 14" stroke="#B84A26" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <circle cx="22" cy="9" r="1.6" fill="#D4892C"/>
          </svg>
          <span className="nav-brand-name">michael <span className="nav-brand-slash">/</span> bos</span>
        </a>

        <div className="nav-links">
          {links.map(l => (
            <a
              key={l.id}
              className={`nav-link ${active === l.id ? 'active' : ''}`}
              href="#"
              onClick={(e) => { e.preventDefault(); onNavigate(l.id); }}
            >
              {l.label}
            </a>
          ))}
          <span className="nav-status"><span className="dot"></span>main · 12 deploys today</span>
        </div>
      </div>
    </nav>
  );
};

window.Nav = Nav;
