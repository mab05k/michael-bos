// Footer.jsx — minimal end-of-page
const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-meta">
        © 2026 Michael Bos · Built on a clean trunk · Las Vegas, NV
      </div>
      <div className="footer-links">
        <a href="https://github.com" onClick={(e) => e.preventDefault()}>github</a>
        <a href="https://linkedin.com" onClick={(e) => e.preventDefault()}>linkedin</a>
        <a href="mailto:" onClick={(e) => e.preventDefault()}>mail</a>
        <a href="/rss.xml" onClick={(e) => e.preventDefault()}>rss</a>
      </div>
    </div>
  </footer>
);

window.Footer = Footer;
