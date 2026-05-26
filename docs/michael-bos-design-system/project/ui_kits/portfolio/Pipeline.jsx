// Pipeline.jsx — animated CI/CD stage diagram
const Pipeline = ({ stages }) => {
  const data = stages || [
    { label: 'lint',   time: '12s',     state: 'pass' },
    { label: 'test',   time: '1m 04s',  state: 'pass' },
    { label: 'build',  time: '38s',     state: 'pass' },
    { label: 'deploy', time: '14s',     state: 'build' },
    { label: 'smoke',  time: 'queued',  state: 'idle' },
  ];
  const glyph = (s) => s === 'pass' ? '✓' : s === 'build' ? '▌' : s === 'fail' ? '×' : '—';

  return (
    <div className="pipeline">
      {data.map((s, i) => (
        <React.Fragment key={s.label}>
          <div className="pipe-stage">
            <div className={`pipe-node ${s.state}`}>{glyph(s.state)}</div>
            <div className="pipe-label">{s.label}</div>
            <div className="pipe-time">{s.time}</div>
          </div>
          {i < data.length - 1 && (
            <div className={`pipe-line ${data[i + 1].state === 'pass' || s.state === 'pass' && data[i+1].state === 'build' ? 'pass' : ''}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

window.Pipeline = Pipeline;
