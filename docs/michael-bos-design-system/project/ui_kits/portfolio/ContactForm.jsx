// ContactForm.jsx — fake form with focus states
const ContactForm = () => {
  const [sent, setSent] = React.useState(false);
  const onSubmit = (e) => { e.preventDefault(); setSent(true); };

  if (sent) {
    return (
      <div style={{ background: 'var(--bg-sand)', borderRadius: 'var(--r-md)', padding: 32, boxShadow: 'var(--shadow-1)' }}>
        <div className="card-eyebrow">→ message queued</div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, margin: '10px 0 8px' }}>Got it. I'll reply within a week.</h3>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--canyon-shadow)' }}>If it's urgent — climbing partner cancelled, you need a co-signer on a critical RFC — ping me on LinkedIn.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 18 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
        <div>
          <label className="form-label">Name</label>
          <input className="field" placeholder="Avery Kim" required/>
        </div>
        <div>
          <label className="form-label">Email</label>
          <input className="field" type="email" placeholder="you@company.com" required/>
        </div>
      </div>
      <div>
        <label className="form-label">What are you working on?</label>
        <textarea className="field" rows="4" placeholder="A short pitch. I read every one." required></textarea>
        <div className="field-hint">Plain text only. I'll reply within a week.</div>
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          Send
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </button>
      </div>
    </form>
  );
};

window.ContactForm = ContactForm;
