// Terminal.jsx — dark canyon-ink terminal with sandstone text
const Terminal = ({ title, children }) => (
  <div className="term">
    <div className="term-bar">
      <div className="tdot" style={{ background: '#FF5F57' }}></div>
      <div className="tdot" style={{ background: '#FEBC2E' }}></div>
      <div className="tdot" style={{ background: '#28C840' }}></div>
      <div className="term-title">{title || '~/portfolio · main'}</div>
    </div>
    <div className="term-body">
      {children}
    </div>
  </div>
);

window.Terminal = Terminal;
