// Cards.jsx — Project case study & writing list-row components
const ProjectCard = ({ eyebrow, title, body, tags, metric }) => (
  <a href="#" className="card" onClick={(e) => e.preventDefault()}>
    <div className="card-eyebrow">{eyebrow}</div>
    <h3 className="card-title">{title}</h3>
    <p className="card-body">{body}</p>
    {metric && (
      <div style={{ display:'flex', alignItems:'baseline', gap:8, marginTop: 10, marginBottom: 14 }}>
        <span style={{ fontFamily:'var(--font-display)', fontSize:32, fontWeight:600, color:'var(--rust)', letterSpacing:'-0.02em' }}>{metric.value}</span>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:11, color:'var(--canyon-fade)', letterSpacing:'0.08em', textTransform:'uppercase' }}>{metric.label}</span>
      </div>
    )}
    {tags && (
      <div className="card-tags">
        {tags.map(t => <span key={t} className="tag">{t}</span>)}
      </div>
    )}
  </a>
);

const WritingRow = ({ date, title, read }) => (
  <a href="#" className="writing-row" onClick={(e) => e.preventDefault()}>
    <span className="writing-date">{date}</span>
    <span className="writing-title">{title}</span>
    <span className="writing-read">{read}</span>
  </a>
);

window.ProjectCard = ProjectCard;
window.WritingRow = WritingRow;
