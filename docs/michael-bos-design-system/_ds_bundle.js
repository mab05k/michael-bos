/* @ds-bundle: {"format":3,"namespace":"MichaelBosDesignSystem_f7ef65","components":[],"sourceHashes":{"bio/app.jsx":"29a5fb7dd11e","bio/chapters.jsx":"ec1a77dc5a2e","cards.jsx":"1272ff625e5b","design-canvas.jsx":"bd8746af6e58","marks.jsx":"f0b4e642ec62","themes/design-canvas.jsx":"bd8746af6e58","themes/theme-tiles.jsx":"f9e7d8f6af8d","ui_kits/portfolio/App.jsx":"c7b1f9d4d77c","ui_kits/portfolio/Cards.jsx":"c17607669806","ui_kits/portfolio/ContactForm.jsx":"cd7725403322","ui_kits/portfolio/Footer.jsx":"d46f8ae6c14a","ui_kits/portfolio/Hero.jsx":"5dbb5cb6b947","ui_kits/portfolio/Nav.jsx":"e9078428dbd0","ui_kits/portfolio/NavyRibbon.jsx":"7636741904e1","ui_kits/portfolio/Pipeline.jsx":"04065c3698b4","ui_kits/portfolio/Terminal.jsx":"60a6386b9830"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.MichaelBosDesignSystem_f7ef65 = window.MichaelBosDesignSystem_f7ef65 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// bio/app.jsx
try { (() => {
// bio/app.jsx — full-screen bio with a horizontal timeline rail.
// Clicking a node re-themes the whole page and swaps the chapter content.
const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;
const Arrow = ({
  dir
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, dir === 'prev' ? /*#__PURE__*/React.createElement("path", {
  d: "M15 18l-6-6 6-6"
}) : /*#__PURE__*/React.createElement("path", {
  d: "M9 18l6-6-6-6"
}));
function App() {
  const chapters = window.CHAPTERS;
  const [i, setI] = useState(() => {
    const saved = Number(localStorage.getItem('bio-chapter'));
    return Number.isInteger(saved) && saved >= 0 && saved < window.CHAPTERS.length ? saved : 0;
  });
  const [anim, setAnim] = useState(true);
  const animTimer = useRef(null);
  const go = useCallback(next => {
    setI(cur => {
      const n = Math.max(0, Math.min(chapters.length - 1, next));
      if (n !== cur) {
        setAnim(false);
        // retrigger entrance animation on the new chapter
        requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
      }
      return n;
    });
  }, [chapters.length]);
  useEffect(() => {
    localStorage.setItem('bio-chapter', String(i));
  }, [i]);
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        go(i + 1);
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        go(i - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i, go]);
  const active = chapters[i];
  const Body = active.render;
  const N = chapters.length;
  const edge = 100 / (2 * N); // half a column, in %
  const span = 100 - 2 * edge; // distance between first & last dot center
  const progress = N > 1 ? i / (N - 1) * span : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "stage",
    "data-theme": active.theme,
    "data-anim": anim ? 'in' : 'out'
  }, /*#__PURE__*/React.createElement("header", {
    className: "topbar"
  }, /*#__PURE__*/React.createElement("a", {
    className: "brand",
    href: "../ui_kits/portfolio/index.html"
  }, /*#__PURE__*/React.createElement("span", {
    className: "brand-name"
  }, "Michael Bos"), /*#__PURE__*/React.createElement("span", {
    className: "brand-slash"
  }, "/"), /*#__PURE__*/React.createElement("span", {
    className: "brand-sub"
  }, "bio")), /*#__PURE__*/React.createElement("nav", {
    className: "topnav",
    "aria-label": "Primary"
  }, /*#__PURE__*/React.createElement("a", {
    className: "topnav-link",
    href: "../ui_kits/portfolio/index.html"
  }, "Home"), /*#__PURE__*/React.createElement("a", {
    className: "topnav-link is-active",
    href: "#",
    "aria-current": "page",
    onClick: e => e.preventDefault()
  }, "Bio"), /*#__PURE__*/React.createElement("a", {
    className: "topnav-link",
    href: "../ui_kits/portfolio/index.html#portfolio"
  }, "Portfolio")), /*#__PURE__*/React.createElement("div", {
    className: "topbar-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "loc"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pin"
  }), " Las Vegas, NV"), /*#__PURE__*/React.createElement("span", {
    className: "chapter-count"
  }, /*#__PURE__*/React.createElement("b", null, String(i + 1).padStart(2, '0')), " / ", String(chapters.length).padStart(2, '0')))), /*#__PURE__*/React.createElement("main", {
    className: "stage-body",
    key: active.id,
    "data-screen-label": `Bio · ${active.label}`
  }, /*#__PURE__*/React.createElement(Body, null)), /*#__PURE__*/React.createElement("nav", {
    className: "rail",
    "aria-label": "Life timeline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-track"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-line",
    style: {
      left: `${edge}%`,
      right: `${edge}%`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "rail-progress",
    style: {
      left: `${edge}%`,
      width: `${progress}%`
    }
  }), chapters.map((c, idx) => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    className: `node ${idx === i ? 'is-active' : ''} ${idx < i ? 'is-done' : ''}`,
    onClick: () => go(idx),
    "aria-current": idx === i ? 'step' : undefined
  }, /*#__PURE__*/React.createElement("span", {
    className: "node-dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "node-year"
  }, c.year), /*#__PURE__*/React.createElement("span", {
    className: "node-label"
  }, c.label))), /*#__PURE__*/React.createElement("div", {
    className: "rail-nav"
  }, /*#__PURE__*/React.createElement("button", {
    className: "arrow",
    onClick: () => go(i - 1),
    disabled: i === 0,
    "aria-label": "Previous chapter"
  }, /*#__PURE__*/React.createElement(Arrow, {
    dir: "prev"
  })), /*#__PURE__*/React.createElement("button", {
    className: "arrow",
    onClick: () => go(i + 1),
    disabled: i === chapters.length - 1,
    "aria-label": "Next chapter"
  }, /*#__PURE__*/React.createElement(Arrow, {
    dir: "next"
  }))))));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "bio/app.jsx", error: String((e && e.message) || e) }); }

// bio/chapters.jsx
try { (() => {
// bio/chapters.jsx — the six life chapters. Each exports a content renderer.
// Theme tokens live in theme.css keyed on [data-theme]; here we render content
// + the chapter's signature device. Exposes window.CHAPTERS.

const Chip = ({
  children
}) => /*#__PURE__*/React.createElement("span", {
  className: "ch-chip"
}, children);

/* ----- 01 · Florida Keys ------------------------------------------------ */
const Keys = () => /*#__PURE__*/React.createElement("div", {
  className: "chapter"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-left"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-kicker"
}, /*#__PURE__*/React.createElement("span", {
  className: "ch-num"
}, "01"), " Florida Keys ", /*#__PURE__*/React.createElement("span", {
  className: "yr"
}, "\xB7 before everything")), /*#__PURE__*/React.createElement("h2", {
  className: "ch-title"
}, "Saltwater first."), /*#__PURE__*/React.createElement("div", {
  className: "ch-body"
}, /*#__PURE__*/React.createElement("p", null, "I grew up on a thin strip of limestone between two oceans \u2014 Marathon, in the middle Keys. ", /*#__PURE__*/React.createElement("strong", null, "Boats before bikes."), " You learn to read weather, tie knots that hold, and fix the thing yourself because the next part is a three-hour drive up US-1."), /*#__PURE__*/React.createElement("p", null, "Hurricane season taught me to plan for the deploy that goes wrong. Island time taught me the rest is rarely an emergency. I still run on-call like a boat captain: calm voice, short list, everyone knows their job.")), /*#__PURE__*/React.createElement("div", {
  className: "ch-chips"
}, /*#__PURE__*/React.createElement(Chip, null, "Saltwater"), /*#__PURE__*/React.createElement(Chip, null, "Boats & engines"), /*#__PURE__*/React.createElement(Chip, null, "Hurricane seasons"), /*#__PURE__*/React.createElement(Chip, null, "Fix it yourself"))), /*#__PURE__*/React.createElement("div", {
  className: "ch-right"
}, /*#__PURE__*/React.createElement("div", {
  className: "keys-horizon"
}, /*#__PURE__*/React.createElement("span", {
  className: "kh-coord"
}, "24\xB043\u2032N \xB7 81\xB002\u2032W"), /*#__PURE__*/React.createElement("span", {
  className: "kh-tag"
}, "home water"), /*#__PURE__*/React.createElement("div", {
  className: "hz-line"
}), /*#__PURE__*/React.createElement("span", {
  className: "kh-mm"
}, "MM 50 \xB7 Marathon, FL"))));

/* ----- 02 · Florida State University ------------------------------------ */
const Fsu = () => /*#__PURE__*/React.createElement("div", {
  className: "chapter"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-left"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-kicker"
}, /*#__PURE__*/React.createElement("span", {
  className: "ch-num"
}, "02"), " Florida State University ", /*#__PURE__*/React.createElement("span", {
  className: "yr"
}, "\xB7 2004 \u2014 2008")), /*#__PURE__*/React.createElement("h2", {
  className: "ch-title"
}, "Garnet & gold."), /*#__PURE__*/React.createElement("div", {
  className: "ch-body"
}, /*#__PURE__*/React.createElement("p", null, "I left the islands for Tallahassee and the first real codebase of my life \u2014 a fluorescent-lit CS lab and a compiler that did not care about my excuses. ", /*#__PURE__*/React.createElement("strong", null, "That is where software stopped being a hobby.")), /*#__PURE__*/React.createElement("p", null, "Four years of all-nighters, intramural everything, and a campus that taught me how to work inside a big, loud, opinionated organization \u2014 useful practice for every team I have run since.")), /*#__PURE__*/React.createElement("div", {
  className: "ch-chips"
}, /*#__PURE__*/React.createElement(Chip, null, "First compiler"), /*#__PURE__*/React.createElement(Chip, null, "Seminoles"), /*#__PURE__*/React.createElement(Chip, null, "All-nighters"))), /*#__PURE__*/React.createElement("div", {
  className: "ch-right"
}, /*#__PURE__*/React.createElement("div", {
  className: "degree-card"
}, /*#__PURE__*/React.createElement("div", {
  className: "seal"
}, "FSU"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "dc-deg"
}, "B.S. \xB7 Computer Science"), /*#__PURE__*/React.createElement("div", {
  className: "dc-school"
}, "Florida State University"), /*#__PURE__*/React.createElement("div", {
  className: "dc-meta"
}, "Tallahassee, FL \xB7 Class of 2008"))), /*#__PURE__*/React.createElement("div", {
  className: "dc-rule"
})));

/* ----- 03 · U.S. Navy --------------------------------------------------- */
const Navy = () => /*#__PURE__*/React.createElement("div", {
  className: "chapter"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-left"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-kicker"
}, /*#__PURE__*/React.createElement("span", {
  className: "ch-num"
}, "03"), " United States Navy ", /*#__PURE__*/React.createElement("span", {
  className: "yr"
}, "\xB7 2008 \u2014 2014")), /*#__PURE__*/React.createElement("h2", {
  className: "ch-title"
}, "Where I learned what a process is for."), /*#__PURE__*/React.createElement("div", {
  className: "ch-body"
}, /*#__PURE__*/React.createElement("p", null, "Out of school I enlisted as an ", /*#__PURE__*/React.createElement("strong", null, "Information Systems Technician"), ". Two deployments, a watch bill, and a lot of nights keeping comms up on a ship in the middle of nowhere."), /*#__PURE__*/React.createElement("p", null, "I run engineering teams with the same calm we ran a watch: clear roles, written orders, room to act. Standups are short. Postmortems are blameless. Pagers go off less."))), /*#__PURE__*/React.createElement("div", {
  className: "ch-right"
}, /*#__PURE__*/React.createElement("div", {
  className: "service-card"
}, /*#__PURE__*/React.createElement("div", {
  className: "service-grid"
}, /*#__PURE__*/React.createElement("div", {
  className: "service-line"
}, /*#__PURE__*/React.createElement("div", {
  className: "service-k"
}, "Rate"), /*#__PURE__*/React.createElement("div", {
  className: "service-v"
}, "IT2 \xB7 Information Systems Technician")), /*#__PURE__*/React.createElement("div", {
  className: "service-line"
}, /*#__PURE__*/React.createElement("div", {
  className: "service-k"
}, "Sea"), /*#__PURE__*/React.createElement("div", {
  className: "service-v"
}, "Two deployments \xB7 Sea Service \xD7 2")), /*#__PURE__*/React.createElement("div", {
  className: "service-line"
}, /*#__PURE__*/React.createElement("div", {
  className: "service-k"
}, "Awards"), /*#__PURE__*/React.createElement("div", {
  className: "service-v"
}, "NAM \xD7 2 \xB7 GWOT-S")), /*#__PURE__*/React.createElement("div", {
  className: "service-line"
}, /*#__PURE__*/React.createElement("div", {
  className: "service-k"
}, "Sep."), /*#__PURE__*/React.createElement("div", {
  className: "service-v"
}, "Honorable Discharge, 2014"))), /*#__PURE__*/React.createElement("div", {
  className: "ribbon-bar"
}, /*#__PURE__*/React.createElement("span", {
  style: {
    background: '#14233F'
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    background: '#C9A227'
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    background: '#7A1F2B'
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    background: '#1D3A2A'
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    background: '#C9A227'
  }
}), /*#__PURE__*/React.createElement("span", {
  style: {
    background: '#14233F'
  }
})))));

/* ----- 04 · Technology -------------------------------------------------- */
const Tech = () => /*#__PURE__*/React.createElement("div", {
  className: "chapter"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-left"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-kicker"
}, /*#__PURE__*/React.createElement("span", {
  className: "ch-num"
}, "04"), " Software engineering ", /*#__PURE__*/React.createElement("span", {
  className: "yr"
}, "\xB7 2014 \u2014 present")), /*#__PURE__*/React.createElement("h2", {
  className: "ch-title"
}, "Twelve years on a clean trunk."), /*#__PURE__*/React.createElement("div", {
  className: "ch-body"
}, /*#__PURE__*/React.createElement("p", null, "Out of the Navy I went all-in on shipping software \u2014 a few smaller Vegas shops, then data-center tooling at ", /*#__PURE__*/React.createElement("strong", null, "Switch"), ", and today leading the platform team at ", /*#__PURE__*/React.createElement("strong", null, "Guidepoint"), "."), /*#__PURE__*/React.createElement("p", null, "My whole bias: small reversible deploys, on green main, all day. Boring code, calm teams, fast feedback."), /*#__PURE__*/React.createElement("div", {
  className: "tech-stack"
}, /*#__PURE__*/React.createElement(Chip, null, "python"), /*#__PURE__*/React.createElement(Chip, null, "go"), /*#__PURE__*/React.createElement(Chip, null, "kubernetes"), /*#__PURE__*/React.createElement(Chip, null, "github actions"), /*#__PURE__*/React.createElement(Chip, null, "observability")))), /*#__PURE__*/React.createElement("div", {
  className: "ch-right"
}, /*#__PURE__*/React.createElement("div", {
  className: "term"
}, /*#__PURE__*/React.createElement("div", {
  className: "term-bar"
}, /*#__PURE__*/React.createElement("div", {
  className: "tdot",
  style: {
    background: '#FF5F57'
  }
}), /*#__PURE__*/React.createElement("div", {
  className: "tdot",
  style: {
    background: '#FEBC2E'
  }
}), /*#__PURE__*/React.createElement("div", {
  className: "tdot",
  style: {
    background: '#28C840'
  }
}), /*#__PURE__*/React.createElement("div", {
  className: "term-title"
}, "career.log \xB7 git")), /*#__PURE__*/React.createElement("div", {
  className: "term-body"
}, /*#__PURE__*/React.createElement("span", {
  className: "dim"
}, "$ git log --oneline --author=mbos"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  className: "accent"
}, "a1f9c0"), " guidepoint \u2014 built a platform team from scratch", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  className: "accent"
}, "7b2e44"), " switch \u2014 cut p50 deploy 42m ", /*#__PURE__*/React.createElement("span", {
  className: "dim"
}, "\u2192"), " 6m", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  className: "accent"
}, "3c0d18"), " switch \u2014 split the monolith pipeline into 3 lanes", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  className: "accent"
}, "9e5a2f"), " vegas shops \u2014 first prod on-call rotation", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
  className: "ok"
}, "HEAD \u2192 main \xB7 clean working tree \u2713")))));

/* ----- 05 · UNLV Executive MBA ------------------------------------------ */
const Unlv = () => /*#__PURE__*/React.createElement("div", {
  className: "chapter"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-left"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-kicker"
}, /*#__PURE__*/React.createElement("span", {
  className: "ch-num"
}, "05"), " UNLV \xB7 Executive MBA ", /*#__PURE__*/React.createElement("span", {
  className: "yr"
}, "\xB7 2022")), /*#__PURE__*/React.createElement("h2", {
  className: "ch-title"
}, "Vocabulary to argue with finance."), /*#__PURE__*/React.createElement("div", {
  className: "ch-body"
}, /*#__PURE__*/React.createElement("p", null, "By then I was already managing engineers in Las Vegas, so I did the Executive MBA at UNLV mostly to learn the language on the other side of the table \u2014 margin, runway, opportunity cost."), /*#__PURE__*/React.createElement("p", null, "The thing I actually learned: ", /*#__PURE__*/React.createElement("strong", null, "most \u201Cpeople problems\u201D are process problems wearing a costume."), " Fix the system and the drama usually leaves on its own.")), /*#__PURE__*/React.createElement("div", {
  className: "ch-chips"
}, /*#__PURE__*/React.createElement(Chip, null, "Las Vegas, NV"), /*#__PURE__*/React.createElement(Chip, null, "Finance"), /*#__PURE__*/React.createElement(Chip, null, "Systems thinking"))), /*#__PURE__*/React.createElement("div", {
  className: "ch-right"
}, /*#__PURE__*/React.createElement("div", {
  className: "ledger"
}, /*#__PURE__*/React.createElement("div", {
  className: "ledger-head"
}, /*#__PURE__*/React.createElement("div", {
  className: "seal"
}, "UNLV"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
  className: "lh-deg"
}, "Executive MBA \xB7 2022"), /*#__PURE__*/React.createElement("div", {
  className: "lh-school"
}, "Lee Business School"))), /*#__PURE__*/React.createElement("div", {
  className: "ledger-row"
}, /*#__PURE__*/React.createElement("div", {
  className: "ledger-l"
}, /*#__PURE__*/React.createElement("em", null, "\u201Cpeople problem\u201D")), /*#__PURE__*/React.createElement("div", {
  className: "ledger-eq"
}, "\u2192"), /*#__PURE__*/React.createElement("div", {
  className: "ledger-r"
}, "unclear ownership")), /*#__PURE__*/React.createElement("div", {
  className: "ledger-row"
}, /*#__PURE__*/React.createElement("div", {
  className: "ledger-l"
}, /*#__PURE__*/React.createElement("em", null, "\u201Cthey\u2019re slow\u201D")), /*#__PURE__*/React.createElement("div", {
  className: "ledger-eq"
}, "\u2192"), /*#__PURE__*/React.createElement("div", {
  className: "ledger-r"
}, "no defined done")), /*#__PURE__*/React.createElement("div", {
  className: "ledger-row"
}, /*#__PURE__*/React.createElement("div", {
  className: "ledger-l"
}, /*#__PURE__*/React.createElement("em", null, "\u201Clow morale\u201D")), /*#__PURE__*/React.createElement("div", {
  className: "ledger-eq"
}, "\u2192"), /*#__PURE__*/React.createElement("div", {
  className: "ledger-r"
}, "painful deploys")))));

/* ----- 06 · Red Rock climbing ------------------------------------------- */
const ticks = [{
  date: '05-18',
  route: 'Cloud Tower',
  area: 'Red Rock · Ingalls Buttress',
  grade: '5.11c',
  style: 'send'
}, {
  date: '05-11',
  route: 'Levitation 29',
  area: 'Red Rock · Eagle Wall',
  grade: '5.11c',
  style: 'send'
}, {
  date: '05-04',
  route: 'Crimson Chrysalis',
  area: 'Red Rock · Cloud Tower',
  grade: '5.8',
  style: 'send'
}, {
  date: '04-27',
  route: 'Epinephrine',
  area: 'Black Velvet Canyon',
  grade: '5.9',
  style: 'send'
}, {
  date: '04-20',
  route: 'Resolution Arête',
  area: 'Mt. Wilson',
  grade: '5.10b',
  style: 'proj'
}];
const Climb = () => /*#__PURE__*/React.createElement("div", {
  className: "chapter"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-left"
}, /*#__PURE__*/React.createElement("div", {
  className: "ch-kicker"
}, /*#__PURE__*/React.createElement("span", {
  className: "ch-num"
}, "06"), " Red Rock Canyon ", /*#__PURE__*/React.createElement("span", {
  className: "yr"
}, "\xB7 now")), /*#__PURE__*/React.createElement("h2", {
  className: "ch-title"
}, "Six years on the rope."), /*#__PURE__*/React.createElement("div", {
  className: "ch-body"
}, /*#__PURE__*/React.createElement("p", null, "Twenty minutes from my desk the sandstone turns red and vertical. I climb mostly trad in ", /*#__PURE__*/React.createElement("strong", null, "Red Rock Canyon"), " \u2014 long, committing routes where the gear you place is the only thing between you and a bad day."), /*#__PURE__*/React.createElement("p", null, "It is the same discipline as the job: short repeatable moves, clean protection, room to back off. The best postmortems read like climbing accidents.")), /*#__PURE__*/React.createElement("div", {
  className: "grade-strip",
  style: {
    marginTop: 24
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "grade-cell"
}, /*#__PURE__*/React.createElement("div", {
  className: "g"
}, "5.8"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "warmup")), /*#__PURE__*/React.createElement("div", {
  className: "grade-cell"
}, /*#__PURE__*/React.createElement("div", {
  className: "g"
}, "5.9"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "cruise")), /*#__PURE__*/React.createElement("div", {
  className: "grade-cell"
}, /*#__PURE__*/React.createElement("div", {
  className: "g"
}, "5.10"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "work")), /*#__PURE__*/React.createElement("div", {
  className: "grade-cell hot"
}, /*#__PURE__*/React.createElement("div", {
  className: "g"
}, "5.11c"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "onsight")), /*#__PURE__*/React.createElement("div", {
  className: "grade-cell"
}, /*#__PURE__*/React.createElement("div", {
  className: "g"
}, "5.12"), /*#__PURE__*/React.createElement("div", {
  className: "l"
}, "project")))), /*#__PURE__*/React.createElement("div", {
  className: "ch-right"
}, /*#__PURE__*/React.createElement("div", {
  className: "climb-photo"
}, /*#__PURE__*/React.createElement("img", {
  src: "michael-climbing.jpg",
  alt: "Michael climbing red sandstone in Red Rock Canyon"
}), /*#__PURE__*/React.createElement("span", {
  className: "cp-tag"
}, "36.135\xB0 N \xB7 Red Rock Canyon, NV")), /*#__PURE__*/React.createElement("div", {
  className: "latest-tick"
}, /*#__PURE__*/React.createElement("span", {
  className: "climb-style send"
}, "\u2713 latest send"), /*#__PURE__*/React.createElement("span", {
  className: "lt-route"
}, "Cloud Tower"), /*#__PURE__*/React.createElement("span", {
  className: "lt-area"
}, "Ingalls Buttress"), /*#__PURE__*/React.createElement("span", {
  className: "lt-grade"
}, "5.11c"))));
const CHAPTERS = [{
  id: 'keys',
  theme: 'keys',
  year: '∞',
  label: 'Florida Keys',
  render: Keys
}, {
  id: 'fsu',
  theme: 'fsu',
  year: '2004',
  label: 'FSU',
  render: Fsu
}, {
  id: 'navy',
  theme: 'navy',
  year: '2008',
  label: 'U.S. Navy',
  render: Navy
}, {
  id: 'tech',
  theme: 'tech',
  year: '2014',
  label: 'Engineering',
  render: Tech
}, {
  id: 'unlv',
  theme: 'unlv',
  year: '2022',
  label: 'UNLV MBA',
  render: Unlv
}, {
  id: 'climb',
  theme: 'climb',
  year: 'now',
  label: 'Red Rock',
  render: Climb
}];
window.CHAPTERS = CHAPTERS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "bio/chapters.jsx", error: String((e && e.message) || e) }); }

// cards.jsx
try { (() => {
// cards.jsx — spec card that presents one logo direction four ways:
// mark on sand, mark on ink, the horizontal lockup, and favicon sizes.

const BONE = '#F2EAD9',
  SAND = '#E5D3B3',
  INK2 = '#1F140C';
const RUST2 = '#B84A26',
  FADE = '#6E5B45',
  SHADOW = '#3D2418';
const HAIR = 'rgba(31,20,12,0.12)';

// The reusable wordmark: mark + "michael / bos" + optional role.
function Wordmark({
  mark,
  size = 30,
  role = true,
  onDark = false
}) {
  const ink = onDark ? '#ECE3CF' : INK2;
  const fade = onDark ? '#8C99AD' : FADE;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      placeItems: 'center',
      width: size,
      height: size
    }
  }, mark(size, onDark)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontWeight: 600,
      fontSize: size * 0.66,
      letterSpacing: '-0.01em',
      color: ink,
      whiteSpace: 'nowrap'
    }
  }, "michael ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: RUST2,
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 500
    }
  }, "/"), " bos"), role && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: size * 0.4,
      color: fade,
      letterSpacing: '0.02em',
      marginLeft: 4
    }
  }, "\u2014 engineering manager")));
}
function Tile({
  bg,
  label,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: bg,
      borderRadius: 12,
      height: 150,
      display: 'grid',
      placeItems: 'center',
      boxShadow: '0 1px 2px rgba(31,20,12,0.06), 0 2px 8px rgba(31,20,12,0.05)',
      border: bg === BONE ? `1px solid ${HAIR}` : 'none'
    }
  }, children), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: FADE
    }
  }, label));
}
function Favicon({
  s,
  mark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 7
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: s,
      height: s,
      background: INK2,
      borderRadius: Math.max(3, s * 0.22),
      display: 'grid',
      placeItems: 'center'
    }
  }, mark(s * 0.6, true)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 9,
      color: FADE
    }
  }, s));
}

// mark = (size, onDark) => ReactNode
function LogoCard({
  letter,
  name,
  concept,
  note,
  mark
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 30,
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
      fontFamily: "'IBM Plex Sans', sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 700,
      fontSize: 11,
      color: '#F8F2E6',
      background: RUST2,
      padding: '3px 7px',
      borderRadius: 4
    }
  }, letter), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 11,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: FADE
    }
  }, concept)), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '12px 0 0',
      fontWeight: 600,
      fontSize: 25,
      letterSpacing: '-0.02em',
      color: INK2
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      fontSize: 13.5,
      lineHeight: 1.55,
      color: SHADOW,
      maxWidth: '42ch'
    }
  }, note)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Tile, {
    bg: SAND,
    label: "on sandstone"
  }, mark(64, false)), /*#__PURE__*/React.createElement(Tile, {
    bg: INK2,
    label: "on canyon ink"
  }, mark(64, true))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 9
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: FADE
    }
  }, "horizontal lockup"), /*#__PURE__*/React.createElement("div", {
    style: {
      background: BONE,
      border: `1px solid ${HAIR}`,
      borderRadius: 10,
      padding: '18px 20px'
    }
  }, /*#__PURE__*/React.createElement(Wordmark, {
    mark: mark,
    size: 28
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 11
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: 10,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: FADE
    }
  }, "app icon \xB7 favicon"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Favicon, {
    s: 44,
    mark: mark
  }), /*#__PURE__*/React.createElement(Favicon, {
    s: 28,
    mark: mark
  }), /*#__PURE__*/React.createElement(Favicon, {
    s: 18,
    mark: mark
  }))));
}
Object.assign(window, {
  LogoCard,
  Wordmark
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "cards.jsx", error: String((e && e.message) || e) }); }

// design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "design-canvas.jsx", error: String((e && e.message) || e) }); }

// marks.jsx
try { (() => {
// marks.jsx — the six logo marks, drawn from the Red Rock + engineering language.
// Each mark is simple geometry (contour lines, slash, triangle, ring, nodes).
// Palette: rust primary, ochre accent — both legible on bone and on ink.
const RUST = '#B84A26';
const OCHRE = '#D4892C';
const INK = '#1F140C';

// ----- A · STRATA — nested peak built from topographic contour lines -------
function MarkStrata({
  s = 48,
  stroke = RUST,
  accent = OCHRE
}) {
  const w = s / 48;
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 48 48",
    fill: "none"
  }, /*#__PURE__*/React.createElement("g", {
    stroke: stroke,
    strokeWidth: 2.5 * w,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 37 L24 12 L42 37"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 37 L24 21.5 L35 37"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.5 37 L24 30 L28.5 37"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "11",
    r: 2.5 * w,
    fill: accent
  }));
}

// ----- B · TRUNK — ascending git-graph line with commit / deploy nodes -----
function MarkTrunk({
  s = 48,
  stroke = RUST,
  accent = OCHRE
}) {
  const w = s / 48;
  const dots = [[6, 34], [15, 27], [22, 30], [30, 18]];
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 48 48",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M6 34 L15 27 L22 30 L30 18 L42 11",
    stroke: stroke,
    strokeWidth: 2.5 * w,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), dots.map(([cx, cy], k) => /*#__PURE__*/React.createElement("circle", {
    key: k,
    cx: cx,
    cy: cy,
    r: 1.9 * w,
    fill: stroke
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "42",
    cy: "11",
    r: 2.7 * w,
    fill: accent
  }));
}

// ----- C · SLASH — the path separator as a single bold route ---------------
function MarkSlash({
  s = 48,
  stroke = RUST,
  accent = OCHRE
}) {
  const w = s / 48;
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 48 48",
    fill: "none"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "15",
    y1: "38",
    x2: "33",
    y2: "13",
    stroke: stroke,
    strokeWidth: 5.2 * w,
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "33.6",
    cy: "11",
    r: "2.7",
    fill: accent
  }));
}

// ----- D · SUMMIT — solid beacon, a node set on the peak -------------------
function MarkSummit({
  s = 48,
  fill = RUST,
  accent = OCHRE
}) {
  const w = s / 48;
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 48 48",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M24 12.5 L41 38.5 L7 38.5 Z",
    fill: fill,
    stroke: fill,
    strokeWidth: 2.4 * w,
    strokeLinejoin: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "24",
    cy: "10",
    r: 3.1 * w,
    fill: accent
  }));
}

// ----- E · CARABINER — climbing link, the CI chain -------------------------
function MarkCarabiner({
  s = 48,
  stroke = RUST,
  accent = OCHRE
}) {
  const w = s / 48;
  return /*#__PURE__*/React.createElement("svg", {
    width: s,
    height: s,
    viewBox: "0 0 48 48",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "14.5",
    y: "7.5",
    width: "19",
    height: "33",
    rx: "9.5",
    stroke: stroke,
    strokeWidth: 2.6 * w,
    fill: "none"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M23 9.5 L31.5 22.5",
    stroke: stroke,
    strokeWidth: 2.4 * w,
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "23",
    cy: "9.5",
    r: 1.9 * w,
    fill: accent
  }));
}

// ----- F · MONOGRAM — "m/b", the wordmark reduced to a path glyph ----------
// Rendered as type (not SVG) so it sits crisp at any size. Sits inside whatever
// surface the cell provides; onDark only flips the glyph color.
function Monogram({
  s = 48,
  onDark = false,
  light = '#F2EAD9',
  slash = RUST
}) {
  const box = {
    height: s,
    display: 'grid',
    placeItems: 'center',
    fontFamily: "'IBM Plex Sans', sans-serif",
    fontWeight: 600,
    fontSize: s * 0.62,
    lineHeight: 1,
    letterSpacing: '-0.02em',
    color: onDark ? light : INK
  };
  return /*#__PURE__*/React.createElement("div", {
    style: box
  }, /*#__PURE__*/React.createElement("span", null, "m", /*#__PURE__*/React.createElement("span", {
    style: {
      color: slash,
      fontFamily: "'JetBrains Mono', monospace",
      fontWeight: 500
    }
  }, "/"), "b"));
}
Object.assign(window, {
  MarkStrata,
  MarkTrunk,
  MarkSlash,
  MarkSummit,
  MarkCarabiner,
  Monogram,
  RUST,
  OCHRE,
  INK
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "marks.jsx", error: String((e && e.message) || e) }); }

// themes/design-canvas.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// DesignCanvas.jsx — Figma-ish design canvas wrapper
// Warm gray grid bg + Sections + Artboards + PostIt notes.
// Exports (to window): DesignCanvas, DCSection, DCArtboard, DCPostIt.
// Artboards are reorderable (grip-drag), deletable, labels/titles are
// inline-editable, and any artboard can be opened in a fullscreen focus
// overlay (←/→/Esc). State persists to a .design-canvas.state.json sidecar
// via the host bridge. No assets, no deps.
//
// Usage:
//   <DesignCanvas>
//     <DCSection id="onboarding" title="Onboarding" subtitle="First-run variants">
//       <DCArtboard id="a" label="A · Dusk" width={260} height={480}>…</DCArtboard>
//       <DCArtboard id="b" label="B · Minimal" width={260} height={480}>…</DCArtboard>
//     </DCSection>
//   </DesignCanvas>
//
// Artboards are static design frames, not scroll regions — never use
// height: 100% + overflow: auto/scroll on inner elements; size each artboard
// to fit its content (explicit pixel height, or let it grow).
/* END USAGE */

const DC = {
  bg: '#f0eee9',
  grid: 'rgba(0,0,0,0.06)',
  label: 'rgba(60,50,40,0.7)',
  title: 'rgba(40,30,20,0.85)',
  subtitle: 'rgba(60,50,40,0.6)',
  postitBg: '#fef4a8',
  postitText: '#5a4a2a',
  font: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif'
};

// One-time CSS injection (classes are dc-prefixed so they don't collide with
// the hosted design's own styles).
if (typeof document !== 'undefined' && !document.getElementById('dc-styles')) {
  const s = document.createElement('style');
  s.id = 'dc-styles';
  s.textContent = ['.dc-editable{cursor:text;outline:none;white-space:nowrap;border-radius:3px;padding:0 2px;margin:0 -2px}', '.dc-editable:focus{background:#fff;box-shadow:0 0 0 1.5px #c96442}', '[data-dc-slot]{transition:transform .18s cubic-bezier(.2,.7,.3,1)}', '[data-dc-slot].dc-dragging{transition:none;z-index:10;pointer-events:none}', '[data-dc-slot].dc-dragging .dc-card{box-shadow:0 12px 40px rgba(0,0,0,.25),0 0 0 2px #c96442;transform:scale(1.02)}',
  // isolation:isolate contains artboard content's z-indexes so a
  // z-indexed child (sticky navbar etc.) can't paint over .dc-header or
  // the .dc-menu popover that drops into the top of the card.
  '.dc-card{isolation:isolate;transition:box-shadow .15s,transform .15s}', '.dc-card *{scrollbar-width:none}', '.dc-card *::-webkit-scrollbar{display:none}',
  // Per-artboard header: grip + label on the left, delete/expand on the
  // right. Single flex row; when the artboard's on-screen width is too
  // narrow for both the label yields (ellipsis, then hidden entirely below
  // ~4ch via the container query) and the buttons stay on the row.
  '.dc-header{position:absolute;bottom:100%;left:-4px;margin-bottom:calc(4px * var(--dc-inv-zoom,1));z-index:2;', '  display:flex;align-items:center;container-type:inline-size}', '.dc-labelrow{display:flex;align-items:center;gap:4px;height:24px;flex:1 1 auto;min-width:0}', '.dc-grip{flex:0 0 auto;cursor:grab;display:flex;align-items:center;padding:5px 4px;border-radius:4px;transition:background .12s,opacity .12s}', '.dc-grip:hover{background:rgba(0,0,0,.08)}', '.dc-grip:active{cursor:grabbing}', '.dc-labeltext{flex:1 1 auto;min-width:0;cursor:pointer;border-radius:4px;padding:3px 6px;', '  display:flex;align-items:center;transition:background .12s;overflow:hidden}',
  // Below ~4ch of label room: hide the label entirely, and drop the grip to
  // hover-only (same reveal rule as .dc-btns) so a narrow header is clean
  // until the card is moused.
  '@container (max-width: 110px){', '  .dc-labeltext{display:none}', '  .dc-grip{opacity:0}', '  [data-dc-slot]:hover .dc-grip{opacity:1}', '}', '.dc-labeltext:hover{background:rgba(0,0,0,.05)}', '.dc-labeltext .dc-editable{overflow:hidden;text-overflow:ellipsis;max-width:100%}', '.dc-labeltext .dc-editable:focus{overflow:visible;text-overflow:clip}', '.dc-btns{flex:0 0 auto;margin-left:auto;display:flex;gap:2px;opacity:0;transition:opacity .12s}', '[data-dc-slot]:hover .dc-btns,.dc-btns:has(.dc-menu){opacity:1}', '.dc-expand,.dc-kebab{width:22px;height:22px;border-radius:5px;border:none;cursor:pointer;padding:0;', '  background:transparent;color:rgba(60,50,40,.7);display:flex;align-items:center;justify-content:center;', '  font:inherit;transition:background .12s,color .12s}', '.dc-expand:hover,.dc-kebab:hover{background:rgba(0,0,0,.06);color:#2a251f}',
  // Slot hosting an open menu floats above later siblings (which otherwise
  // paint on top — same z-index:auto, later DOM order) so the popup isn't
  // clipped by the next card.
  '[data-dc-slot]:has(.dc-menu){z-index:10}', '.dc-menu{position:absolute;top:100%;right:0;margin-top:4px;background:#fff;border-radius:8px;', '  box-shadow:0 8px 28px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.05);padding:4px;min-width:160px;z-index:10}', '.dc-menu button{display:block;width:100%;padding:7px 10px;border:0;background:transparent;', '  border-radius:5px;font-family:inherit;font-size:13px;font-weight:500;line-height:1.2;', '  color:#29261b;cursor:pointer;text-align:left;transition:background .12s;white-space:nowrap}', '.dc-menu button:hover{background:rgba(0,0,0,.05)}', '.dc-menu hr{border:0;border-top:1px solid rgba(0,0,0,.08);margin:4px 2px}', '.dc-menu .dc-danger{color:#c96442}', '.dc-menu .dc-danger:hover{background:rgba(201,100,66,.1)}',
  // Chrome (titles / labels / buttons) counter-scales against the viewport
  // zoom so it stays a constant on-screen size. --dc-inv-zoom is set by
  // DCViewport on every transform update and inherits to all descendants —
  // any overlay inside the world (e.g. a TweaksPanel on an artboard) can use
  // it the same way.
  //
  // The header uses transform:scale (out-of-flow, so layout impact doesn't
  // matter) with its world-space width set to card-width / inv-zoom so that
  // after counter-scaling its on-screen width exactly matches the card's —
  // that's what lets the container query + text-overflow behave against the
  // card's visible edge at every zoom level.
  //
  // The section head uses CSS zoom instead of transform so its layout box
  // grows with the counter-scale, pushing the card row down — otherwise the
  // constant-screen-size title would overflow into the (shrinking) world-
  // space gap and overlap the artboard headers at low zoom.
  '.dc-header{width:calc((100% + 4px) / var(--dc-inv-zoom,1));', '  transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom left}', '.dc-sectionhead{zoom:var(--dc-inv-zoom,1)}'].join('\n');
  document.head.appendChild(s);
}
const DCCtx = React.createContext(null);

// Recursively unwrap React.Fragment so <>…</> grouping doesn't hide
// DCSection/DCArtboard children from the type-based walks below.
function dcFlatten(children) {
  const out = [];
  React.Children.forEach(children, c => {
    if (c && c.type === React.Fragment) out.push(...dcFlatten(c.props.children));else out.push(c);
  });
  return out;
}

// ─────────────────────────────────────────────────────────────
// DesignCanvas — stateful wrapper around the pan/zoom viewport.
// Owns runtime state (per-section order, renamed titles/labels, hidden
// artboards, focused artboard). Order/titles/labels/hidden persist to a
// .design-canvas.state.json
// sidecar next to the HTML. Reads go via plain fetch() so the saved
// arrangement is visible anywhere the HTML + sidecar are served together
// (omelette preview, direct link, downloaded zip). Writes go through the
// host's window.omelette bridge — editing requires the omelette runtime.
// Focus is ephemeral.
// ─────────────────────────────────────────────────────────────
const DC_STATE_FILE = '.design-canvas.state.json';
function DesignCanvas({
  children,
  minScale,
  maxScale,
  style
}) {
  const [state, setState] = React.useState({
    sections: {},
    focus: null
  });
  // Hold rendering until the sidecar read settles so the saved order/titles
  // appear on first paint (no source-order flash). didRead gates writes until
  // the read settles so the empty initial state can't clobber a slow read;
  // skipNextWrite suppresses the one echo-write that would otherwise follow
  // hydration.
  const [ready, setReady] = React.useState(false);
  const didRead = React.useRef(false);
  const skipNextWrite = React.useRef(false);
  React.useEffect(() => {
    let off = false;
    fetch('./' + DC_STATE_FILE).then(r => r.ok ? r.json() : null).then(saved => {
      if (off || !saved || !saved.sections) return;
      skipNextWrite.current = true;
      setState(s => ({
        ...s,
        sections: saved.sections
      }));
    }).catch(() => {}).finally(() => {
      didRead.current = true;
      if (!off) setReady(true);
    });
    const t = setTimeout(() => {
      if (!off) setReady(true);
    }, 150);
    return () => {
      off = true;
      clearTimeout(t);
    };
  }, []);
  React.useEffect(() => {
    if (!didRead.current) return;
    if (skipNextWrite.current) {
      skipNextWrite.current = false;
      return;
    }
    const t = setTimeout(() => {
      window.omelette?.writeFile(DC_STATE_FILE, JSON.stringify({
        sections: state.sections
      })).catch(() => {});
    }, 250);
    return () => clearTimeout(t);
  }, [state.sections]);

  // Build registries synchronously from children so FocusOverlay can read
  // them in the same render. Fragments are flattened; wrapping in other
  // elements still opts out of focus/reorder.
  const registry = {}; // slotId -> { sectionId, artboard }
  const sectionMeta = {}; // sectionId -> { title, subtitle, slotIds[] }
  const sectionOrder = [];
  dcFlatten(children).forEach(sec => {
    if (!sec || sec.type !== DCSection) return;
    const sid = sec.props.id ?? sec.props.title;
    if (!sid) return;
    sectionOrder.push(sid);
    const persisted = state.sections[sid] || {};
    const abs = [];
    dcFlatten(sec.props.children).forEach(ab => {
      if (!ab || ab.type !== DCArtboard) return;
      const aid = ab.props.id ?? ab.props.label;
      if (aid) abs.push([aid, ab]);
    });
    // hidden is scoped to one source revision — when the agent regenerates
    // (artboard-ID set changes), prior deletes don't apply to new content.
    const srcKey = abs.map(([k]) => k).join('\x1f');
    const hidden = persisted.srcKey === srcKey ? persisted.hidden || [] : [];
    const srcIds = [];
    abs.forEach(([aid, ab]) => {
      if (hidden.includes(aid)) return;
      registry[`${sid}/${aid}`] = {
        sectionId: sid,
        artboard: ab
      };
      srcIds.push(aid);
    });
    const kept = (persisted.order || []).filter(k => srcIds.includes(k));
    sectionMeta[sid] = {
      title: persisted.title ?? sec.props.title,
      subtitle: sec.props.subtitle,
      slotIds: [...kept, ...srcIds.filter(k => !kept.includes(k))]
    };
  });
  const api = React.useMemo(() => ({
    state,
    section: id => state.sections[id] || {},
    patchSection: (id, p) => setState(s => ({
      ...s,
      sections: {
        ...s.sections,
        [id]: {
          ...s.sections[id],
          ...(typeof p === 'function' ? p(s.sections[id] || {}) : p)
        }
      }
    })),
    setFocus: slotId => setState(s => ({
      ...s,
      focus: slotId
    }))
  }), [state]);

  // Esc exits focus; any outside pointerdown commits an in-progress rename.
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') api.setFocus(null);
    };
    const onPd = e => {
      const ae = document.activeElement;
      if (ae && ae.isContentEditable && !ae.contains(e.target)) ae.blur();
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPd, true);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPd, true);
    };
  }, [api]);
  return /*#__PURE__*/React.createElement(DCCtx.Provider, {
    value: api
  }, /*#__PURE__*/React.createElement(DCViewport, {
    minScale: minScale,
    maxScale: maxScale,
    style: style
  }, ready && children), state.focus && registry[state.focus] && /*#__PURE__*/React.createElement(DCFocusOverlay, {
    entry: registry[state.focus],
    sectionMeta: sectionMeta,
    sectionOrder: sectionOrder
  }));
}

// ─────────────────────────────────────────────────────────────
// DCViewport — transform-based pan/zoom (internal)
//
// Input mapping (Figma-style):
//   • trackpad pinch  → zoom   (ctrlKey wheel; Safari gesture* events)
//   • trackpad scroll → pan    (two-finger)
//   • mouse wheel     → zoom   (notched; distinguished from trackpad scroll)
//   • middle-drag / primary-drag-on-bg → pan
//
// Transform state lives in a ref and is written straight to the DOM
// (translate3d + will-change) so wheel ticks don't go through React —
// keeps pans at 60fps on dense canvases.
// ─────────────────────────────────────────────────────────────
function DCViewport({
  children,
  minScale = 0.1,
  maxScale = 8,
  style = {}
}) {
  const vpRef = React.useRef(null);
  const worldRef = React.useRef(null);
  const tf = React.useRef({
    x: 0,
    y: 0,
    scale: 1
  });
  // Persist viewport across reloads so the user lands back where they were
  // after an agent edit or browser refresh. The sandbox origin is already
  // per-project; pathname keeps multiple canvas files in one project apart.
  const tfKey = 'dc-viewport:' + location.pathname;
  const saveT = React.useRef(0);
  const lastPostedScale = React.useRef();
  const apply = React.useCallback(() => {
    const {
      x,
      y,
      scale
    } = tf.current;
    const el = worldRef.current;
    if (!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
    // Exposed for zoom-invariant chrome (labels, buttons, TweaksPanel).
    el.style.setProperty('--dc-inv-zoom', String(1 / scale));
    // Keep the host toolbar's % readout in sync with the canvas scale. Pan
    // ticks leave scale unchanged — skip the cross-frame post for those.
    if (lastPostedScale.current !== scale) {
      lastPostedScale.current = scale;
      window.parent.postMessage({
        type: '__dc_zoom',
        scale
      }, '*');
    }
    clearTimeout(saveT.current);
    saveT.current = setTimeout(() => {
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    }, 200);
  }, [tfKey]);
  React.useLayoutEffect(() => {
    const flush = () => {
      clearTimeout(saveT.current);
      try {
        localStorage.setItem(tfKey, JSON.stringify(tf.current));
      } catch {}
    };
    try {
      const s = JSON.parse(localStorage.getItem(tfKey) || 'null');
      if (s && Number.isFinite(s.x) && Number.isFinite(s.y) && Number.isFinite(s.scale)) {
        tf.current = {
          x: s.x,
          y: s.y,
          scale: Math.min(maxScale, Math.max(minScale, s.scale))
        };
        apply();
      }
    } catch {}
    // Flush on pagehide and unmount so a reload within the 200ms debounce
    // window doesn't drop the last pan/zoom.
    window.addEventListener('pagehide', flush);
    return () => {
      window.removeEventListener('pagehide', flush);
      flush();
    };
  }, []);
  React.useEffect(() => {
    const vp = vpRef.current;
    if (!vp) return;
    const zoomAt = (cx, cy, factor) => {
      const r = vp.getBoundingClientRect();
      const px = cx - r.left,
        py = cy - r.top;
      const t = tf.current;
      const next = Math.min(maxScale, Math.max(minScale, t.scale * factor));
      const k = next / t.scale;
      // --dc-inv-zoom consumers (.dc-sectionhead's CSS zoom, each section's
      // marginBottom) reflow on every scale change, vertically shifting the
      // world layout — so a world point mathematically pinned under the cursor
      // drifts as you zoom (content creeps up on zoom-in, down on zoom-out).
      // Anchor the DOM element under the cursor instead: record its screen Y,
      // apply the transform + --dc-inv-zoom, then cancel whatever vertical
      // drift the reflow introduced so it stays put on screen.
      let marker = null,
        markerY0 = 0;
      if (k !== 1) {
        const hit = document.elementFromPoint(cx, cy);
        marker = hit && hit.closest ? hit.closest('[data-dc-slot],[data-dc-section]') : null;
        if (marker) markerY0 = marker.getBoundingClientRect().top;
      }
      // keep the world point under the cursor fixed
      t.x = px - (px - t.x) * k;
      t.y = py - (py - t.y) * k;
      t.scale = next;
      apply();
      if (marker) {
        // A pure zoom around (cx, cy) maps screen Y → cy + (Y - cy) * k. Any
        // departure after the --dc-inv-zoom reflow is the layout drift.
        const drift = marker.getBoundingClientRect().top - (cy + (markerY0 - cy) * k);
        if (Math.abs(drift) > 0.1) {
          t.y -= drift;
          apply();
        }
      }
    };

    // Mouse-wheel vs trackpad-scroll heuristic. A physical wheel sends
    // line-mode deltas (Firefox) or large integer pixel deltas with no X
    // component (Chrome/Safari, typically multiples of 100/120). Trackpad
    // two-finger scroll sends small/fractional pixel deltas, often with
    // non-zero deltaX. ctrlKey is set by the browser for trackpad pinch.
    const isMouseWheel = e => e.deltaMode !== 0 || e.deltaX === 0 && Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40;
    const onWheel = e => {
      e.preventDefault();
      if (isGesturing) return; // Safari: gesture* owns the pinch — discard concurrent wheels
      if ((e.ctrlKey || e.metaKey) && !isMouseWheel(e)) {
        // trackpad pinch, or ctrl/cmd + smooth-scroll mouse. Notched
        // wheels fall through to the fixed-step branch below.
        zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.01));
      } else if (isMouseWheel(e)) {
        // notched mouse wheel — fixed-ratio step per click
        zoomAt(e.clientX, e.clientY, Math.exp(-Math.sign(e.deltaY) * 0.18));
      } else {
        // trackpad two-finger scroll — pan
        tf.current.x -= e.deltaX;
        tf.current.y -= e.deltaY;
        apply();
      }
    };

    // Safari sends native gesture* events for trackpad pinch with a smooth
    // e.scale; preferring these over the ctrl+wheel fallback gives a much
    // better feel there. No-ops on other browsers. Safari also fires
    // ctrlKey wheel events during the same pinch — isGesturing makes
    // onWheel drop those entirely so they neither zoom nor pan.
    let gsBase = 1;
    let isGesturing = false;
    const onGestureStart = e => {
      e.preventDefault();
      isGesturing = true;
      gsBase = tf.current.scale;
    };
    const onGestureChange = e => {
      e.preventDefault();
      zoomAt(e.clientX, e.clientY, gsBase * e.scale / tf.current.scale);
    };
    const onGestureEnd = e => {
      e.preventDefault();
      isGesturing = false;
    };

    // Drag-pan: middle button anywhere, or primary button on canvas
    // background (anything that isn't an artboard or an inline editor).
    let drag = null;
    const onPointerDown = e => {
      const onBg = !e.target.closest('[data-dc-slot], .dc-editable');
      if (!(e.button === 1 || e.button === 0 && onBg)) return;
      e.preventDefault();
      vp.setPointerCapture(e.pointerId);
      drag = {
        id: e.pointerId,
        lx: e.clientX,
        ly: e.clientY
      };
      vp.style.cursor = 'grabbing';
    };
    const onPointerMove = e => {
      if (!drag || e.pointerId !== drag.id) return;
      tf.current.x += e.clientX - drag.lx;
      tf.current.y += e.clientY - drag.ly;
      drag.lx = e.clientX;
      drag.ly = e.clientY;
      apply();
    };
    const onPointerUp = e => {
      if (!drag || e.pointerId !== drag.id) return;
      vp.releasePointerCapture(e.pointerId);
      drag = null;
      vp.style.cursor = '';
    };

    // Host-driven zoom (toolbar % menu). Zooms around viewport centre so the
    // visible midpoint stays fixed — matching the host's iframe-zoom feel.
    const onHostMsg = e => {
      const d = e.data;
      if (d && d.type === '__dc_set_zoom' && typeof d.scale === 'number') {
        const r = vp.getBoundingClientRect();
        zoomAt(r.left + r.width / 2, r.top + r.height / 2, d.scale / tf.current.scale);
      } else if (d && d.type === '__dc_probe') {
        // Host's [readyGen] reset asks whether a canvas is present; it
        // fires on the iframe's native 'load', which for canvases with
        // images/fonts is after our mount-time announce, so re-announce.
        // Clear the pan-tick guard so apply() re-posts the current scale
        // even if it's unchanged — the host just reset dcScale to 1.
        window.parent.postMessage({
          type: '__dc_present'
        }, '*');
        lastPostedScale.current = undefined;
        apply();
      }
    };
    window.addEventListener('message', onHostMsg);
    // Announce canvas mode so the host toolbar proxies its % control here
    // instead of scaling the iframe element (which would just shrink the
    // viewport window of an infinite canvas). The apply() that follows emits
    // the initial __dc_zoom so the toolbar % is correct before first pinch.
    // lastPostedScale reset mirrors the __dc_probe handler: the layout
    // effect's restore-path apply() may already have posted the restored
    // scale (before __dc_present), so clear the guard to re-post it in order.
    window.parent.postMessage({
      type: '__dc_present'
    }, '*');
    lastPostedScale.current = undefined;
    apply();
    vp.addEventListener('wheel', onWheel, {
      passive: false
    });
    vp.addEventListener('gesturestart', onGestureStart, {
      passive: false
    });
    vp.addEventListener('gesturechange', onGestureChange, {
      passive: false
    });
    vp.addEventListener('gestureend', onGestureEnd, {
      passive: false
    });
    vp.addEventListener('pointerdown', onPointerDown);
    vp.addEventListener('pointermove', onPointerMove);
    vp.addEventListener('pointerup', onPointerUp);
    vp.addEventListener('pointercancel', onPointerUp);
    return () => {
      window.removeEventListener('message', onHostMsg);
      vp.removeEventListener('wheel', onWheel);
      vp.removeEventListener('gesturestart', onGestureStart);
      vp.removeEventListener('gesturechange', onGestureChange);
      vp.removeEventListener('gestureend', onGestureEnd);
      vp.removeEventListener('pointerdown', onPointerDown);
      vp.removeEventListener('pointermove', onPointerMove);
      vp.removeEventListener('pointerup', onPointerUp);
      vp.removeEventListener('pointercancel', onPointerUp);
    };
  }, [apply, minScale, maxScale]);
  const gridSvg = `url("data:image/svg+xml,%3Csvg width='120' height='120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M120 0H0v120' fill='none' stroke='${encodeURIComponent(DC.grid)}' stroke-width='1'/%3E%3C/svg%3E")`;
  return /*#__PURE__*/React.createElement("div", {
    ref: vpRef,
    className: "design-canvas",
    style: {
      height: '100vh',
      width: '100vw',
      background: DC.bg,
      overflow: 'hidden',
      overscrollBehavior: 'none',
      touchAction: 'none',
      position: 'relative',
      fontFamily: DC.font,
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    ref: worldRef,
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      transformOrigin: '0 0',
      willChange: 'transform',
      width: 'max-content',
      minWidth: '100%',
      minHeight: '100%',
      padding: '60px 0 80px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -6000,
      backgroundImage: gridSvg,
      backgroundSize: '120px 120px',
      pointerEvents: 'none',
      zIndex: -1
    }
  }), children));
}

// ─────────────────────────────────────────────────────────────
// DCSection — editable title + h-row of artboards in persisted order
// ─────────────────────────────────────────────────────────────
function DCSection({
  id,
  title,
  subtitle,
  children,
  gap = 48
}) {
  const ctx = React.useContext(DCCtx);
  const sid = id ?? title;
  const all = React.Children.toArray(dcFlatten(children));
  const artboards = all.filter(c => c && c.type === DCArtboard);
  const rest = all.filter(c => !(c && c.type === DCArtboard));
  const sec = ctx && sid && ctx.section(sid) || {};
  // Must match DesignCanvas's srcKey computation exactly (it filters falsy
  // IDs), or onDelete persists a srcKey that DesignCanvas never recognizes.
  const allIds = artboards.map(a => a.props.id ?? a.props.label).filter(Boolean);
  const srcKey = allIds.join('\x1f');
  const hidden = sec.srcKey === srcKey ? sec.hidden || [] : [];
  const srcOrder = allIds.filter(k => !hidden.includes(k));
  const order = React.useMemo(() => {
    const kept = (sec.order || []).filter(k => srcOrder.includes(k));
    return [...kept, ...srcOrder.filter(k => !kept.includes(k))];
  }, [sec.order, srcOrder.join('|')]);
  const byId = Object.fromEntries(artboards.map(a => [a.props.id ?? a.props.label, a]));

  // marginBottom counter-scales so the on-screen gap between sections stays
  // constant — otherwise at low zoom the (world-space) gap collapses while
  // the screen-constant sectionhead below it doesn't, and the title reads as
  // belonging to the section above. paddingBottom below is just enough for
  // the 24px artboard-header (abs-positioned above each card) plus ~8px, so
  // the title sits tight against its own row at every zoom.
  return /*#__PURE__*/React.createElement("div", {
    "data-dc-section": sid,
    style: {
      marginBottom: 'calc(80px * var(--dc-inv-zoom, 1))',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 60px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-sectionhead",
    style: {
      paddingBottom: 36
    }
  }, /*#__PURE__*/React.createElement(DCEditable, {
    tag: "div",
    value: sec.title ?? title,
    onChange: v => ctx && sid && ctx.patchSection(sid, {
      title: v
    }),
    style: {
      fontSize: 28,
      fontWeight: 600,
      color: DC.title,
      letterSpacing: -0.4,
      marginBottom: 6,
      display: 'inline-block'
    }
  }), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: DC.subtitle
    }
  }, subtitle))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap,
      padding: '0 60px',
      alignItems: 'flex-start',
      width: 'max-content'
    }
  }, order.map(k => /*#__PURE__*/React.createElement(DCArtboardFrame, {
    key: k,
    sectionId: sid,
    artboard: byId[k],
    order: order,
    label: (sec.labels || {})[k] ?? byId[k].props.label,
    onRename: v => ctx && ctx.patchSection(sid, x => ({
      labels: {
        ...x.labels,
        [k]: v
      }
    })),
    onReorder: next => ctx && ctx.patchSection(sid, {
      order: next
    }),
    onDelete: () => ctx && ctx.patchSection(sid, x => ({
      hidden: [...(x.srcKey === srcKey ? x.hidden || [] : []), k],
      srcKey
    })),
    onFocus: () => ctx && ctx.setFocus(`${sid}/${k}`)
  }))), rest);
}

// DCArtboard — marker; rendered by DCArtboardFrame via DCSection.
function DCArtboard() {
  return null;
}

// Per-artboard export (kind: 'png' | 'html'). Both paths share the same
// self-contained clone: computed styles baked in, @font-face / <img> /
// inline-style background-image urls inlined as data URIs. PNG wraps the
// clone in foreignObject→canvas at 3× the artboard's natural width×height
// (same pipeline the host uses for page captures); HTML wraps it in a
// minimal standalone document. Both are independent of viewport zoom.
async function dcExport(node, w, h, name, kind) {
  try {
    await document.fonts.ready;
  } catch {}
  const toDataURL = url => fetch(url).then(r => r.blob()).then(b => new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = () => res(url);
    fr.readAsDataURL(b);
  })).catch(() => url);

  // Collect @font-face rules. ss.cssRules throws SecurityError on
  // cross-origin sheets (e.g. fonts.googleapis.com) — in that case fetch
  // the CSS text directly (those endpoints send ACAO:*) and regex-extract
  // the blocks. @import and @media/@supports are walked so nested
  // @font-face rules aren't missed.
  const fontRules = [],
    pending = [],
    seen = new Set();
  const scrapeCss = href => {
    if (seen.has(href)) return;
    seen.add(href);
    pending.push(fetch(href).then(r => r.text()).then(css => {
      for (const m of css.match(/@font-face\s*{[^}]*}/g) || []) fontRules.push({
        css: m,
        base: href
      });
      for (const m of css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)/g)) scrapeCss(new URL(m[1], href).href);
    }).catch(() => {}));
  };
  const walk = (rules, base) => {
    for (const r of rules) {
      if (r.type === CSSRule.FONT_FACE_RULE) fontRules.push({
        css: r.cssText,
        base
      });else if (r.type === CSSRule.IMPORT_RULE && r.styleSheet) {
        const ibase = r.styleSheet.href || base;
        try {
          walk(r.styleSheet.cssRules, ibase);
        } catch {
          scrapeCss(ibase);
        }
      } else if (r.cssRules) walk(r.cssRules, base);
    }
  };
  for (const ss of document.styleSheets) {
    const base = ss.href || location.href;
    try {
      walk(ss.cssRules, base);
    } catch {
      if (ss.href) scrapeCss(ss.href);
    }
  }
  while (pending.length) await pending.shift();
  const fontCss = (await Promise.all(fontRules.map(async rule => {
    let out = rule.css,
      m;
    const re = /url\((['"]?)([^'")]+)\1\)/g;
    while (m = re.exec(rule.css)) {
      if (m[2].indexOf('data:') === 0) continue;
      let abs;
      try {
        abs = new URL(m[2], rule.base).href;
      } catch {
        continue;
      }
      out = out.split(m[0]).join('url("' + (await toDataURL(abs)) + '")');
    }
    return out;
  }))).join('\n');
  const cloneStyled = src => {
    if (src.nodeType === 8 || src.nodeType === 1 && src.tagName === 'SCRIPT') return document.createTextNode('');
    const dst = src.cloneNode(false);
    if (src.nodeType === 1) {
      const cs = getComputedStyle(src);
      let txt = '';
      for (let i = 0; i < cs.length; i++) txt += cs[i] + ':' + cs.getPropertyValue(cs[i]) + ';';
      dst.setAttribute('style', txt + 'animation:none;transition:none;');
      if (src.tagName === 'CANVAS') try {
        const im = document.createElement('img');
        im.src = src.toDataURL();
        im.setAttribute('style', txt);
        return im;
      } catch {}
    }
    for (let c = src.firstChild; c; c = c.nextSibling) dst.appendChild(cloneStyled(c));
    return dst;
  };
  const clone = cloneStyled(node);
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  // Drop the card's own shadow/radius so the export is a flush w×h rect;
  // the artboard's own background (if any) is already in the computed style.
  clone.style.boxShadow = 'none';
  clone.style.borderRadius = '0';
  const jobs = [];
  clone.querySelectorAll('img').forEach(el => {
    const s = el.getAttribute('src');
    if (s && s.indexOf('data:') !== 0) jobs.push(toDataURL(el.src).then(d => el.setAttribute('src', d)));
  });
  [clone, ...clone.querySelectorAll('*')].forEach(el => {
    const bg = el.style.backgroundImage;
    if (!bg) return;
    let m;
    const re = /url\(["']?([^"')]+)["']?\)/g;
    while (m = re.exec(bg)) {
      const tok = m[0],
        url = m[1];
      if (url.indexOf('data:') === 0) continue;
      jobs.push(toDataURL(url).then(d => {
        el.style.backgroundImage = el.style.backgroundImage.split(tok).join('url("' + d + '")');
      }));
    }
  });
  await Promise.all(jobs);
  const xml = new XMLSerializer().serializeToString(clone);
  const save = (blob, ext) => {
    if (!blob) return;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name + '.' + ext;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  };
  if (kind === 'html') {
    const html = '<!doctype html><html><head><meta charset="utf-8"><title>' + name + '</title>' + (fontCss ? '<style>' + fontCss + '</style>' : '') + '</head><body style="margin:0">' + xml + '</body></html>';
    return save(new Blob([html], {
      type: 'text/html'
    }), 'html');
  }

  // PNG: the SVG's own width/height must be the output resolution — an
  // <img>-loaded SVG rasterizes at its intrinsic size, so sizing it at 1×
  // and ctx.scale()-ing up would just upscale a 1× bitmap. viewBox maps the
  // w×h foreignObject onto the px·w × px·h SVG canvas so the browser renders
  // the HTML at full resolution.
  const px = 3;
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w * px + '" height="' + h * px + '" viewBox="0 0 ' + w + ' ' + h + '"><foreignObject width="' + w + '" height="' + h + '">' + (fontCss ? '<style><![CDATA[' + fontCss + ']]></style>' : '') + xml + '</foreignObject></svg>';
  const img = new Image();
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg load failed'));
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  });
  const cv = document.createElement('canvas');
  cv.width = w * px;
  cv.height = h * px;
  cv.getContext('2d').drawImage(img, 0, 0);
  cv.toBlob(blob => save(blob, 'png'), 'image/png');
}
function DCArtboardFrame({
  sectionId,
  artboard,
  label,
  order,
  onRename,
  onReorder,
  onFocus,
  onDelete
}) {
  const {
    id: rawId,
    label: rawLabel,
    width = 260,
    height = 480,
    children,
    style = {}
  } = artboard.props;
  const id = rawId ?? rawLabel;
  const ref = React.useRef(null);
  const cardRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [confirming, setConfirming] = React.useState(false);

  // ⋯ menu: close on any outside pointerdown. Two-click delete lives inside
  // the menu — first click arms the row, second commits; closing disarms.
  React.useEffect(() => {
    if (!menuOpen) {
      setConfirming(false);
      return;
    }
    const off = e => {
      if (!menuRef.current || !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', off, true);
    return () => document.removeEventListener('pointerdown', off, true);
  }, [menuOpen]);
  const doExport = kind => {
    setMenuOpen(false);
    if (!cardRef.current) return;
    const name = String(label || id || 'artboard').replace(/[^\w\s.-]+/g, '_');
    dcExport(cardRef.current, width, height, name, kind).catch(e => console.error('[design-canvas] export failed:', e));
  };

  // Live drag-reorder: dragged card sticks to cursor; siblings slide into
  // their would-be slots in real time via transforms. DOM order only
  // changes on drop.
  const onGripDown = e => {
    e.preventDefault();
    e.stopPropagation();
    const me = ref.current;
    // translateX is applied in local (pre-scale) space but pointer deltas and
    // getBoundingClientRect().left are screen-space — divide by the viewport's
    // current scale so the dragged card tracks the cursor at any zoom level.
    const scale = me.getBoundingClientRect().width / me.offsetWidth || 1;
    const peers = Array.from(document.querySelectorAll(`[data-dc-section="${sectionId}"] [data-dc-slot]`));
    const homes = peers.map(el => ({
      el,
      id: el.dataset.dcSlot,
      x: el.getBoundingClientRect().left
    }));
    const slotXs = homes.map(h => h.x);
    const startIdx = order.indexOf(id);
    const startX = e.clientX;
    let liveOrder = order.slice();
    me.classList.add('dc-dragging');
    const layout = () => {
      for (const h of homes) {
        if (h.id === id) continue;
        const slot = liveOrder.indexOf(h.id);
        h.el.style.transform = `translateX(${(slotXs[slot] - h.x) / scale}px)`;
      }
    };
    const move = ev => {
      const dx = ev.clientX - startX;
      me.style.transform = `translateX(${dx / scale}px)`;
      const cur = homes[startIdx].x + dx;
      let nearest = 0,
        best = Infinity;
      for (let i = 0; i < slotXs.length; i++) {
        const d = Math.abs(slotXs[i] - cur);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      if (liveOrder.indexOf(id) !== nearest) {
        liveOrder = order.filter(k => k !== id);
        liveOrder.splice(nearest, 0, id);
        layout();
      }
    };
    const up = () => {
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerup', up);
      const finalSlot = liveOrder.indexOf(id);
      me.classList.remove('dc-dragging');
      me.style.transform = `translateX(${(slotXs[finalSlot] - homes[startIdx].x) / scale}px)`;
      // After the settle transition, kill transitions + clear transforms +
      // commit the reorder in the same frame so there's no visual snap-back.
      setTimeout(() => {
        for (const h of homes) {
          h.el.style.transition = 'none';
          h.el.style.transform = '';
        }
        if (liveOrder.join('|') !== order.join('|')) onReorder(liveOrder);
        requestAnimationFrame(() => requestAnimationFrame(() => {
          for (const h of homes) h.el.style.transition = '';
        }));
      }, 180);
    };
    document.addEventListener('pointermove', move);
    document.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    "data-dc-slot": id,
    style: {
      position: 'relative',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-header",
    "data-omelette-chrome": "",
    style: {
      color: DC.label
    },
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-labelrow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dc-grip",
    onPointerDown: onGripDown,
    title: "Drag to reorder"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "13",
    viewBox: "0 0 9 13",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "2",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "6.5",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "2",
    cy: "11",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "7",
    cy: "11",
    r: "1.1"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-labeltext",
    onClick: onFocus,
    title: "Click to focus"
  }, /*#__PURE__*/React.createElement(DCEditable, {
    value: label,
    onChange: onRename,
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: DC.label,
      lineHeight: 1
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dc-btns"
  }, /*#__PURE__*/React.createElement("div", {
    ref: menuRef,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "dc-kebab",
    title: "More",
    onClick: () => setMenuOpen(o => !o)
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "2.5",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "6",
    cy: "6",
    r: "1.1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "9.5",
    cy: "6",
    r: "1.1"
  }))), menuOpen && /*#__PURE__*/React.createElement("div", {
    className: "dc-menu",
    onPointerDown: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('png')
  }, "Download PNG"), /*#__PURE__*/React.createElement("button", {
    onClick: () => doExport('html')
  }, "Download HTML"), /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement("button", {
    className: "dc-danger",
    onClick: () => {
      if (confirming) {
        setMenuOpen(false);
        onDelete();
      } else setConfirming(true);
    }
  }, confirming ? 'Click again to delete' : 'Delete'))), /*#__PURE__*/React.createElement("button", {
    className: "dc-expand",
    onClick: onFocus,
    title: "Focus"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M7 1h4v4M5 11H1V7M11 1L7.5 4.5M1 11l3.5-3.5"
  }))))), /*#__PURE__*/React.createElement("div", {
    ref: cardRef,
    className: "dc-card",
    style: {
      borderRadius: 2,
      boxShadow: '0 1px 3px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.06)',
      overflow: 'hidden',
      width,
      height,
      background: '#fff',
      ...style
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb',
      fontSize: 13,
      fontFamily: DC.font
    }
  }, id)));
}

// Inline rename — commits on blur or Enter.
function DCEditable({
  value,
  onChange,
  style,
  tag = 'span',
  onClick
}) {
  const T = tag;
  return /*#__PURE__*/React.createElement(T, {
    className: "dc-editable",
    contentEditable: true,
    suppressContentEditableWarning: true,
    onClick: onClick,
    onPointerDown: e => e.stopPropagation(),
    onBlur: e => onChange && onChange(e.currentTarget.textContent),
    onKeyDown: e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.currentTarget.blur();
      }
    },
    style: style
  }, value);
}

// ─────────────────────────────────────────────────────────────
// Focus mode — overlay one artboard; ←/→ within section, ↑/↓ across
// sections, Esc or backdrop click to exit.
// ─────────────────────────────────────────────────────────────
function DCFocusOverlay({
  entry,
  sectionMeta,
  sectionOrder
}) {
  const ctx = React.useContext(DCCtx);
  const {
    sectionId,
    artboard
  } = entry;
  const sec = ctx.section(sectionId);
  const meta = sectionMeta[sectionId];
  const peers = meta.slotIds;
  const aid = artboard.props.id ?? artboard.props.label;
  const idx = peers.indexOf(aid);
  const secIdx = sectionOrder.indexOf(sectionId);
  const go = d => {
    const n = peers[(idx + d + peers.length) % peers.length];
    if (n) ctx.setFocus(`${sectionId}/${n}`);
  };
  const goSection = d => {
    // Sections whose artboards are all deleted have slotIds:[] — step past
    // them to the next non-empty section so ↑/↓ doesn't dead-end.
    const n = sectionOrder.length;
    for (let i = 1; i < n; i++) {
      const ns = sectionOrder[((secIdx + d * i) % n + n) % n];
      const first = sectionMeta[ns] && sectionMeta[ns].slotIds[0];
      if (first) {
        ctx.setFocus(`${ns}/${first}`);
        return;
      }
    }
  };
  React.useEffect(() => {
    const k = e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(-1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(1);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        goSection(-1);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        goSection(1);
      }
    };
    document.addEventListener('keydown', k);
    return () => document.removeEventListener('keydown', k);
  });
  const {
    width = 260,
    height = 480,
    children
  } = artboard.props;
  const [vp, setVp] = React.useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  React.useEffect(() => {
    const r = () => setVp({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);
  const scale = Math.max(0.1, Math.min((vp.w - 200) / width, (vp.h - 260) / height, 2));
  const [ddOpen, setDd] = React.useState(false);
  const Arrow = ({
    dir,
    onClick
  }) => /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      onClick();
    },
    style: {
      position: 'absolute',
      top: '50%',
      [dir]: 28,
      transform: 'translateY(-50%)',
      border: 'none',
      background: 'rgba(255,255,255,.08)',
      color: 'rgba(255,255,255,.9)',
      width: 44,
      height: 44,
      borderRadius: 22,
      fontSize: 18,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background .15s'
    },
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.18)',
    onMouseLeave: e => e.currentTarget.style.background = 'rgba(255,255,255,.08)'
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: dir === 'left' ? 'M11 3L5 9l6 6' : 'M7 3l6 6-6 6'
  })));

  // Portal to body so position:fixed is the real viewport regardless of any
  // transform on DesignCanvas's ancestors (including the canvas zoom itself).
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    onClick: () => ctx.setFocus(null),
    onWheel: e => e.preventDefault(),
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(24,20,16,.6)',
      backdropFilter: 'blur(14px)',
      fontFamily: DC.font,
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 72,
      display: 'flex',
      alignItems: 'flex-start',
      padding: '16px 20px 0',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setDd(o => !o),
    style: {
      border: 'none',
      background: 'transparent',
      color: '#fff',
      cursor: 'pointer',
      padding: '6px 8px',
      borderRadius: 6,
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      fontWeight: 600,
      letterSpacing: -0.3
    }
  }, meta.title), /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    style: {
      opacity: .7
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3.5 3.5L9 4"
  }))), meta.subtitle && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      opacity: .6,
      fontWeight: 400,
      marginTop: 2
    }
  }, meta.subtitle)), ddOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '100%',
      left: 0,
      marginTop: 4,
      background: '#2a251f',
      borderRadius: 8,
      boxShadow: '0 8px 32px rgba(0,0,0,.4)',
      padding: 4,
      minWidth: 200,
      zIndex: 10
    }
  }, sectionOrder.filter(sid => sectionMeta[sid].slotIds.length).map(sid => /*#__PURE__*/React.createElement("button", {
    key: sid,
    onClick: () => {
      setDd(false);
      const f = sectionMeta[sid].slotIds[0];
      if (f) ctx.setFocus(`${sid}/${f}`);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 'none',
      cursor: 'pointer',
      background: sid === sectionId ? 'rgba(255,255,255,.1)' : 'transparent',
      color: '#fff',
      padding: '8px 12px',
      borderRadius: 5,
      fontSize: 14,
      fontWeight: sid === sectionId ? 600 : 400,
      fontFamily: 'inherit'
    }
  }, sectionMeta[sid].title)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: () => ctx.setFocus(null),
    onMouseEnter: e => e.currentTarget.style.background = 'rgba(255,255,255,.12)',
    onMouseLeave: e => e.currentTarget.style.background = 'transparent',
    style: {
      border: 'none',
      background: 'transparent',
      color: 'rgba(255,255,255,.7)',
      width: 32,
      height: 32,
      borderRadius: 16,
      fontSize: 20,
      cursor: 'pointer',
      lineHeight: 1,
      transition: 'background .12s'
    }
  }, "\xD7")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 64,
      bottom: 56,
      left: 100,
      right: 100,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: width * scale,
      height: height * scale,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width,
      height,
      transform: `scale(${scale})`,
      transformOrigin: 'top left',
      background: '#fff',
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: '0 20px 80px rgba(0,0,0,.4)'
    }
  }, children || /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#bbb'
    }
  }, aid))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      fontSize: 14,
      fontWeight: 500,
      opacity: .85,
      textAlign: 'center'
    }
  }, (sec.labels || {})[aid] ?? artboard.props.label, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .5,
      marginLeft: 10,
      fontVariantNumeric: 'tabular-nums'
    }
  }, idx + 1, " / ", peers.length))), /*#__PURE__*/React.createElement(Arrow, {
    dir: "left",
    onClick: () => go(-1)
  }), /*#__PURE__*/React.createElement(Arrow, {
    dir: "right",
    onClick: () => go(1)
  }), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      position: 'absolute',
      bottom: 20,
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: 8
    }
  }, peers.map((p, i) => /*#__PURE__*/React.createElement("button", {
    key: p,
    onClick: () => ctx.setFocus(`${sectionId}/${p}`),
    style: {
      border: 'none',
      padding: 0,
      cursor: 'pointer',
      width: 6,
      height: 6,
      borderRadius: 3,
      background: i === idx ? '#fff' : 'rgba(255,255,255,.3)'
    }
  })))), document.body);
}

// ─────────────────────────────────────────────────────────────
// Post-it — absolute-positioned sticky note
// ─────────────────────────────────────────────────────────────
function DCPostIt({
  children,
  top,
  left,
  right,
  bottom,
  rotate = -2,
  width = 180
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top,
      left,
      right,
      bottom,
      width,
      background: DC.postitBg,
      padding: '14px 16px',
      fontFamily: '"Comic Sans MS", "Marker Felt", "Segoe Print", cursive',
      fontSize: 14,
      lineHeight: 1.4,
      color: DC.postitText,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.08)',
      transform: `rotate(${rotate}deg)`,
      zIndex: 5
    }
  }, children);
}
Object.assign(window, {
  DesignCanvas,
  DCSection,
  DCArtboard,
  DCPostIt
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "themes/design-canvas.jsx", error: String((e && e.message) || e) }); }

// themes/theme-tiles.jsx
try { (() => {
// theme-tiles.jsx — renders one "direction" tile per desert theme.
// Each tile = a representative portfolio hero in that theme + a token strip
// (palette swatches, type pairing, accents). Exports window.ThemeTile + THEMES.

const THEMES = [{
  id: 'sandstone',
  name: 'Red Rock Sandstone',
  tag: 'Warm, sun-bleached, editorial. The Calico Hills at midday.',
  fonts: {
    display: "'Spectral', Georgia, serif",
    body: "'IBM Plex Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace"
  },
  typeNote: 'Spectral · IBM Plex Sans · JetBrains Mono',
  mode: 'light',
  colors: {
    bg: '#F3ECDC',
    surface: '#E8D8BB',
    ink: '#2A1B11',
    sub: '#6E5B45',
    hair: 'rgba(42,27,17,0.14)'
  },
  accent: '#B0492A',
  accent2: '#C98A2E',
  support: '#7E8C6B',
  swatches: [['#F3ECDC', 'Bone'], ['#E8D8BB', 'Sand'], ['#B0492A', 'Rust'], ['#C98A2E', 'Ochre'], ['#7E8C6B', 'Sage'], ['#2A1B11', 'Varnish']]
}, {
  id: 'dusk',
  name: 'Canyon Dusk',
  tag: 'Warm dark, golden hour. Lets the rock photography glow.',
  fonts: {
    display: "'Archivo', system-ui, sans-serif",
    body: "'IBM Plex Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace"
  },
  typeNote: 'Archivo · IBM Plex Sans · JetBrains Mono',
  mode: 'dark',
  colors: {
    bg: '#1B130D',
    surface: '#291D13',
    ink: '#F0E4D1',
    sub: '#B49C82',
    hair: 'rgba(240,228,209,0.12)'
  },
  accent: '#E0A23C',
  accent2: '#C8542B',
  support: '#9AA585',
  swatches: [['#1B130D', 'Shadow'], ['#291D13', 'Ember'], ['#E0A23C', 'Gold'], ['#C8542B', 'Rust'], ['#9AA585', 'Sage'], ['#F0E4D1', 'Sand']]
}, {
  id: 'topo',
  name: 'Topo Field Guide',
  tag: 'Paper, ink, contour lines. National-park trailhead signage.',
  fonts: {
    display: "'Barlow Semi Condensed', system-ui, sans-serif",
    body: "'IBM Plex Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace"
  },
  typeNote: 'Barlow Semi Condensed · IBM Plex Sans · JetBrains Mono',
  mode: 'light',
  colors: {
    bg: '#F4EEE0',
    surface: '#EBE3CF',
    ink: '#202619',
    sub: '#5C6450',
    hair: 'rgba(32,38,25,0.16)'
  },
  accent: '#BC4B2B',
  accent2: '#3C5A3E',
  support: '#9A7B4A',
  topo: true,
  swatches: [['#F4EEE0', 'Paper'], ['#EBE3CF', 'Linen'], ['#3C5A3E', 'Pinyon'], ['#BC4B2B', 'Marker'], ['#9A7B4A', 'Trail'], ['#202619', 'Ink']]
}, {
  id: 'dawn',
  name: 'High Desert Dawn',
  tag: 'Soft, airy, minimal. First light, lots of open sky.',
  fonts: {
    display: "'Newsreader', Georgia, serif",
    body: "'Work Sans', system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace"
  },
  typeNote: 'Newsreader · Work Sans · JetBrains Mono',
  mode: 'light',
  colors: {
    bg: '#F7F2EC',
    surface: '#E9E5DC',
    ink: '#39322C',
    sub: '#857B70',
    hair: 'rgba(57,50,44,0.12)'
  },
  accent: '#C0795C',
  accent2: '#9DA890',
  support: '#A7B0B8',
  swatches: [['#F7F2EC', 'Dawn'], ['#E9E5DC', 'Linen'], ['#C0795C', 'Clay'], ['#9DA890', 'Sage'], ['#A7B0B8', 'Sky'], ['#39322C', 'Stone']]
}];
function Chip({
  theme
}) {
  const c = theme.colors;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      font: `500 12px/1 ${theme.fonts.mono}`,
      letterSpacing: '0.02em',
      color: theme.support,
      padding: '7px 11px',
      borderRadius: 999,
      border: `1px solid ${theme.colors.hair}`,
      background: theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 7,
      borderRadius: 999,
      background: theme.support
    }
  }), "build\xA0passing");
}
function Swatch({
  hex,
  label,
  theme
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      flex: '1 1 0',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 40,
      borderRadius: 6,
      background: hex,
      border: `1px solid ${theme.colors.hair}`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `500 11px/1.2 ${theme.fonts.body}`,
      color: theme.colors.ink
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 10px/1.2 ${theme.fonts.mono}`,
      color: theme.colors.sub
    }
  }, hex)));
}
function ThemeTile({
  theme
}) {
  const c = theme.colors;
  const onDark = theme.mode === 'dark';

  // Topographic contour-line motif for the field-guide theme.
  const topoBg = theme.topo ? {
    backgroundImage: `repeating-radial-gradient(ellipse 120% 80% at 78% 18%, transparent 0 17px, ${hexA(theme.accent2, 0.10)} 17px 18px, transparent 18px 34px)`
  } : {};
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      background: c.bg,
      fontFamily: theme.fonts.body,
      color: c.ink
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '34px 34px 30px',
      ...topoBg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 26,
      alignItems: 'stretch'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 0',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `500 12px/1 ${theme.fonts.mono}`,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: theme.accent
    }
  }, "Engineering Manager \xB7 Las Vegas"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '16px 0 0',
      font: `600 46px/1.0 ${theme.fonts.display}`,
      letterSpacing: '-0.02em',
      color: c.ink
    }
  }, "Michael Bos"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '16px 0 0',
      font: `400 15px/1.55 ${theme.fonts.body}`,
      color: c.sub,
      maxWidth: '30ch'
    }
  }, "I build teams and ship delivery pipelines. Navy veteran, MBA, and a climber who lives next to Red Rock."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      paddingTop: 22,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    style: {
      font: `600 14px/1 ${theme.fonts.body}`,
      color: onDark ? '#1B130D' : '#fff',
      background: theme.accent,
      border: 'none',
      padding: '13px 20px',
      borderRadius: 7,
      cursor: 'pointer',
      whiteSpace: 'nowrap'
    }
  }, "Get in touch \u2192"), /*#__PURE__*/React.createElement(Chip, {
    theme: theme
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '0 0 132px',
      borderRadius: 10,
      overflow: 'hidden',
      border: `1px solid ${c.hair}`,
      position: 'relative',
      boxShadow: onDark ? '0 8px 30px rgba(0,0,0,0.5)' : '0 8px 24px rgba(42,27,17,0.18)'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "michael-climbing.jpg",
    alt: "",
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 8,
      bottom: 8,
      font: `500 10px/1 ${theme.fonts.mono}`,
      letterSpacing: '0.04em',
      color: '#F0E4D1',
      padding: '4px 7px',
      borderRadius: 5,
      background: 'rgba(20,14,9,0.55)',
      backdropFilter: 'blur(2px)',
      whiteSpace: 'nowrap'
    }
  }, "36.135\xB0 N")))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: c.surface,
      padding: '22px 34px 26px',
      borderTop: `1px solid ${c.hair}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, theme.swatches.map(([hex, label]) => /*#__PURE__*/React.createElement(Swatch, {
    key: hex + label,
    hex: hex,
    label: label,
    theme: theme
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 20,
      marginTop: 22,
      paddingTop: 20,
      borderTop: `1px solid ${c.hair}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 16,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 44px/0.9 ${theme.fonts.display}`,
      color: c.ink
    }
  }, "Aa"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: `600 13px/1.2 ${theme.fonts.body}`,
      color: c.ink
    }
  }, theme.name), /*#__PURE__*/React.createElement("span", {
    style: {
      font: `400 11px/1.3 ${theme.fonts.mono}`,
      color: c.sub,
      whiteSpace: 'normal'
    }
  }, theme.typeNote))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flex: '0 0 auto'
    }
  }, [theme.accent, theme.accent2, theme.support].map((a, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 30,
      height: 30,
      borderRadius: 999,
      background: a,
      border: `1px solid ${c.hair}`
    }
  }))))));
}

// tiny hex+alpha helper
function hexA(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${n >> 16 & 255}, ${n >> 8 & 255}, ${n & 255}, ${a})`;
}
Object.assign(window, {
  THEMES,
  ThemeTile
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "themes/theme-tiles.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/App.jsx
try { (() => {
// App.jsx — top-level screen router & screen compositions
const {
  useState
} = React;
const HomeScreen = ({
  onNavigate
}) => /*#__PURE__*/React.createElement(Hero, {
  onNavigate: onNavigate
});
const WritingScreen = () => /*#__PURE__*/React.createElement("main", {
  className: "section container"
}, /*#__PURE__*/React.createElement("div", {
  className: "eyebrow"
}, /*#__PURE__*/React.createElement("span", {
  className: "num"
}, "writing")), /*#__PURE__*/React.createElement("h1", {
  className: "section-title",
  style: {
    fontSize: 56,
    marginBottom: 8
  }
}, "Writing"), /*#__PURE__*/React.createElement("p", {
  className: "section-lede",
  style: {
    maxWidth: '50ch'
  }
}, "Short essays on engineering management, delivery, and what climbing teaches me about systems. Roughly one a month. No newsletter \u2014 RSS only."), /*#__PURE__*/React.createElement("div", {
  style: {
    marginTop: 40
  }
}, [['2026.05', 'A staff engineer is not a senior senior.', '6 min'], ['2026.04', 'The case for boring pipelines.', '9 min'], ['2026.03', 'Postmortems should read like climbing accidents.', '7 min'], ['2026.02', "How to run a one-on-one when nothing's wrong.", '5 min'], ['2026.01', 'Hiring for the platform team you wish you had.', '11 min'], ['2025.12', "Delete the project management tool. Use a doc.", '4 min'], ['2025.11', 'Two questions I ask in every interview.', '6 min'], ['2025.10', 'On-call should be a feature, not a punishment.', '8 min']].map(([d, t, r]) => /*#__PURE__*/React.createElement(WritingRow, {
  key: t,
  date: d,
  title: t,
  read: r
}))), /*#__PURE__*/React.createElement(Footer, null));

// BioScreen lives in its own full-screen page (../../bio/Bio Timeline.html) —
// the timeline experience. Navigating to 'bio' routes there.

// PortfolioScreen — intentionally empty for now. Placeholder shell kept on-brand
// so it's ready to fill with project work.
const PortfolioScreen = () => /*#__PURE__*/React.createElement("main", {
  className: "section container"
}, /*#__PURE__*/React.createElement("div", {
  className: "eyebrow"
}, /*#__PURE__*/React.createElement("span", {
  className: "num"
}, "portfolio")), /*#__PURE__*/React.createElement("h1", {
  className: "section-title",
  style: {
    fontSize: 56,
    marginBottom: 8
  }
}, "Portfolio"), /*#__PURE__*/React.createElement("p", {
  className: "section-lede",
  style: {
    maxWidth: '50ch'
  }
}, "Selected work, coming soon."), /*#__PURE__*/React.createElement(Footer, null));
const ContactScreen = () => /*#__PURE__*/React.createElement("main", {
  className: "section container"
}, /*#__PURE__*/React.createElement("div", {
  className: "eyebrow"
}, /*#__PURE__*/React.createElement("span", {
  className: "num"
}, "contact")), /*#__PURE__*/React.createElement("h1", {
  className: "section-title",
  style: {
    fontSize: 56,
    marginBottom: 8
  }
}, "Get in touch"), /*#__PURE__*/React.createElement("p", {
  className: "section-lede",
  style: {
    maxWidth: '50ch'
  }
}, "I read every message. Quickest way to reach me is here, then LinkedIn. I usually reply within a week."), /*#__PURE__*/React.createElement("div", {
  className: "grid-7-5",
  style: {
    marginTop: 48,
    alignItems: 'start'
  }
}, /*#__PURE__*/React.createElement(ContactForm, null), /*#__PURE__*/React.createElement("div", {
  style: {
    background: 'var(--bg-sand)',
    borderRadius: 'var(--r-md)',
    padding: 28,
    boxShadow: 'var(--shadow-1)'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: 'var(--canyon-shadow)'
  }
}, /*#__PURE__*/React.createElement("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "10",
  r: "3"
})), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    letterSpacing: '0.06em'
  }
}, "Las Vegas, NV")), /*#__PURE__*/React.createElement("h4", {
  style: {
    fontFamily: 'var(--font-display)',
    fontSize: 20,
    fontWeight: 600,
    margin: '12px 0 4px'
  }
}, "Office hours, sort of."), /*#__PURE__*/React.createElement("p", {
  style: {
    fontSize: 14,
    lineHeight: 1.6,
    color: 'var(--canyon-shadow)',
    margin: '0 0 16px'
  }
}, "Free / cheap calls with engineers thinking about moving into management. I do 2\u20133 a month."), /*#__PURE__*/React.createElement("div", {
  style: {
    borderTop: '1px solid var(--hairline)',
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }
}, /*#__PURE__*/React.createElement("a", {
  href: "#",
  onClick: e => e.preventDefault(),
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: 'var(--canyon-ink)',
    textDecoration: 'none'
  }
}, /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("rect", {
  width: "20",
  height: "16",
  x: "2",
  y: "4",
  rx: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
})), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'var(--font-mono)',
    fontSize: 13
  }
}, "mike@michael-bos.com")), /*#__PURE__*/React.createElement("a", {
  href: "#",
  onClick: e => e.preventDefault(),
  style: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    color: 'var(--canyon-ink)',
    textDecoration: 'none'
  }
}, /*#__PURE__*/React.createElement("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"
}), /*#__PURE__*/React.createElement("rect", {
  width: "4",
  height: "12",
  x: "2",
  y: "9"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "4",
  cy: "4",
  r: "2"
})), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'var(--font-mono)',
    fontSize: 13
  }
}, "linkedin.com/in/michael-a-bos"))))), /*#__PURE__*/React.createElement(Footer, null));

// ----- Root ---------------------------------------------------------------
const App = () => {
  const screens = ['home', 'writing', 'portfolio', 'contact'];
  const [screen, setScreen] = useState(() => {
    const h = (window.location.hash || '').replace('#', '');
    return screens.includes(h) ? h : 'home';
  });
  const onNavigate = s => {
    if (s === 'bio') {
      window.location.href = '../../bio/Bio%20Timeline.html';
      return;
    }
    setScreen(s);
    if (window.history.replaceState) {
      window.history.replaceState(null, '', s === 'home' ? window.location.pathname : '#' + s);
    }
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Nav, {
    active: screen,
    onNavigate: onNavigate
  }), screen === 'home' && /*#__PURE__*/React.createElement(HomeScreen, {
    onNavigate: onNavigate
  }), screen === 'writing' && /*#__PURE__*/React.createElement(WritingScreen, null), screen === 'portfolio' && /*#__PURE__*/React.createElement(PortfolioScreen, null), screen === 'contact' && /*#__PURE__*/React.createElement(ContactScreen, null));
};
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Cards.jsx
try { (() => {
// Cards.jsx — Project case study & writing list-row components
const ProjectCard = ({
  eyebrow,
  title,
  body,
  tags,
  metric
}) => /*#__PURE__*/React.createElement("a", {
  href: "#",
  className: "card",
  onClick: e => e.preventDefault()
}, /*#__PURE__*/React.createElement("div", {
  className: "card-eyebrow"
}, eyebrow), /*#__PURE__*/React.createElement("h3", {
  className: "card-title"
}, title), /*#__PURE__*/React.createElement("p", {
  className: "card-body"
}, body), metric && /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 8,
    marginTop: 10,
    marginBottom: 14
  }
}, /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'var(--font-display)',
    fontSize: 32,
    fontWeight: 600,
    color: 'var(--rust)',
    letterSpacing: '-0.02em'
  }
}, metric.value), /*#__PURE__*/React.createElement("span", {
  style: {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--canyon-fade)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase'
  }
}, metric.label)), tags && /*#__PURE__*/React.createElement("div", {
  className: "card-tags"
}, tags.map(t => /*#__PURE__*/React.createElement("span", {
  key: t,
  className: "tag"
}, t))));
const WritingRow = ({
  date,
  title,
  read
}) => /*#__PURE__*/React.createElement("a", {
  href: "#",
  className: "writing-row",
  onClick: e => e.preventDefault()
}, /*#__PURE__*/React.createElement("span", {
  className: "writing-date"
}, date), /*#__PURE__*/React.createElement("span", {
  className: "writing-title"
}, title), /*#__PURE__*/React.createElement("span", {
  className: "writing-read"
}, read));
window.ProjectCard = ProjectCard;
window.WritingRow = WritingRow;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Cards.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/ContactForm.jsx
try { (() => {
// ContactForm.jsx — fake form with focus states
const ContactForm = () => {
  const [sent, setSent] = React.useState(false);
  const onSubmit = e => {
    e.preventDefault();
    setSent(true);
  };
  if (sent) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'var(--bg-sand)',
        borderRadius: 'var(--r-md)',
        padding: 32,
        boxShadow: 'var(--shadow-1)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "card-eyebrow"
    }, "\u2192 message queued"), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: 'var(--font-display)',
        fontSize: 22,
        fontWeight: 600,
        margin: '10px 0 8px'
      }
    }, "Got it. I'll reply within a week."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 15,
        lineHeight: 1.6,
        color: 'var(--canyon-shadow)'
      }
    }, "If it's urgent \u2014 climbing partner cancelled, you need a co-signer on a critical RFC \u2014 ping me on LinkedIn."));
  }
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: onSubmit,
    style: {
      display: 'grid',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Name"), /*#__PURE__*/React.createElement("input", {
    className: "field",
    placeholder: "Avery Kim",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    className: "field",
    type: "email",
    placeholder: "you@company.com",
    required: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "form-label"
  }, "What are you working on?"), /*#__PURE__*/React.createElement("textarea", {
    className: "field",
    rows: "4",
    placeholder: "A short pitch. I read every one.",
    required: true
  }), /*#__PURE__*/React.createElement("div", {
    className: "field-hint"
  }, "Plain text only. I'll reply within a week.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Send", /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12h14"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m12 5 7 7-7 7"
  })))));
};
window.ContactForm = ContactForm;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/ContactForm.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Footer.jsx
try { (() => {
// Footer.jsx — minimal end-of-page
const Footer = () => /*#__PURE__*/React.createElement("footer", {
  className: "footer"
}, /*#__PURE__*/React.createElement("div", {
  className: "container footer-inner"
}, /*#__PURE__*/React.createElement("div", {
  className: "footer-meta"
}, "\xA9 2026 Michael Bos \xB7 Built on a clean trunk \xB7 Las Vegas, NV"), /*#__PURE__*/React.createElement("div", {
  className: "footer-links"
}, /*#__PURE__*/React.createElement("a", {
  href: "https://github.com",
  onClick: e => e.preventDefault()
}, "github"), /*#__PURE__*/React.createElement("a", {
  href: "https://linkedin.com",
  onClick: e => e.preventDefault()
}, "linkedin"), /*#__PURE__*/React.createElement("a", {
  href: "mailto:",
  onClick: e => e.preventDefault()
}, "mail"), /*#__PURE__*/React.createElement("a", {
  href: "/rss.xml",
  onClick: e => e.preventDefault()
}, "rss"))));
window.Footer = Footer;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Hero.jsx
try { (() => {
// Hero.jsx — split layout: text left, tall climbing photo right
const Hero = ({
  onNavigate
}) => /*#__PURE__*/React.createElement("section", {
  className: "hero"
}, /*#__PURE__*/React.createElement("div", {
  className: "hero-left"
}, /*#__PURE__*/React.createElement("div", {
  className: "hero-kicker"
}, /*#__PURE__*/React.createElement("span", {
  className: "dot"
}), "Engineering Manager \xB7 Las Vegas, NV"), /*#__PURE__*/React.createElement("h1", {
  className: "hero-h1"
}, "Ship boring code.", /*#__PURE__*/React.createElement("br", null), "Build calm teams."), /*#__PURE__*/React.createElement("p", {
  className: "hero-lede"
}, "I lead engineering teams that ship \u2014 fast, calm, and on a clean trunk. Twelve years of code, six years on the rope, six in the Navy."), /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap'
  }
}, /*#__PURE__*/React.createElement("a", {
  className: "btn btn-primary",
  href: "#",
  onClick: e => {
    e.preventDefault();
    onNavigate('contact');
  }
}, "Get in touch", /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M5 12h14"
}), /*#__PURE__*/React.createElement("path", {
  d: "m12 5 7 7-7 7"
}))), /*#__PURE__*/React.createElement("a", {
  className: "btn btn-secondary-dark",
  href: "#",
  onClick: e => {
    e.preventDefault();
    onNavigate('writing');
  }
}, "Read the writing"))), /*#__PURE__*/React.createElement("div", {
  className: "hero-right"
}, /*#__PURE__*/React.createElement("img", {
  src: "../../assets/michael-climbing.jpg",
  alt: "Michael climbing red sandstone in Red Rock Canyon, Nevada"
}), /*#__PURE__*/React.createElement("div", {
  className: "hero-img-tag"
}, "36\xB008\u2032N \xB7 115\xB027\u2032W \xB7 Red Rock, NV")));
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Nav.jsx
try { (() => {
// Nav.jsx — sticky top nav with brand mark + screen switcher
const Nav = ({
  active,
  onNavigate
}) => {
  const links = [{
    id: 'home',
    label: 'Home'
  }, {
    id: 'bio',
    label: 'Bio'
  }, {
    id: 'portfolio',
    label: 'Portfolio'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: "nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container nav-inner"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-brand",
    onClick: e => {
      e.preventDefault();
      onNavigate('home');
    },
    href: "#"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "28",
    height: "28",
    viewBox: "0 0 32 32",
    fill: "none"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "32",
    height: "32",
    rx: "6",
    fill: "#1F140C"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M6 22 L11 12 L14 18 L17 13 L22 21 L26 14",
    stroke: "#B84A26",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "22",
    cy: "9",
    r: "1.6",
    fill: "#D4892C"
  })), /*#__PURE__*/React.createElement("span", {
    className: "nav-brand-name"
  }, "michael ", /*#__PURE__*/React.createElement("span", {
    className: "nav-brand-slash"
  }, "/"), " bos")), /*#__PURE__*/React.createElement("div", {
    className: "nav-links"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    className: `nav-link ${active === l.id ? 'active' : ''}`,
    href: "#",
    onClick: e => {
      e.preventDefault();
      onNavigate(l.id);
    }
  }, l.label)), /*#__PURE__*/React.createElement("span", {
    className: "nav-status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "main \xB7 12 deploys today"))));
};
window.Nav = Nav;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/NavyRibbon.jsx
try { (() => {
// NavyRibbon.jsx — the bio-only USN service block. Reserved theme.
const NavyRibbon = () => /*#__PURE__*/React.createElement("div", {
  className: "navy"
}, /*#__PURE__*/React.createElement("div", {
  className: "navy-eyebrow"
}, /*#__PURE__*/React.createElement("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.5",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "4",
  r: "2"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 6v14"
}), /*#__PURE__*/React.createElement("path", {
  d: "M9 8h6"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 15a8 8 0 0 0 8 5 8 8 0 0 0 8-5"
})), "Service record"), /*#__PURE__*/React.createElement("h3", {
  className: "navy-h"
}, "U.S. Navy \xB7 2008 \u2014 2014"), /*#__PURE__*/React.createElement("div", {
  className: "navy-sub"
}, "IT2 \xB7 Information Systems Technician \xB7 Two deployments"), /*#__PURE__*/React.createElement("p", {
  className: "navy-body"
}, "The Navy is where I learned what a process is for. I run my engineering teams with the same calm we ran a watch: clear roles, written orders, room to act. Standups are short. Postmortems are blameless. Pagers go off less."), /*#__PURE__*/React.createElement("div", {
  className: "navy-ribbons"
}, /*#__PURE__*/React.createElement("span", {
  className: "navy-ribbon-tag"
}, "Honorable Discharge"), /*#__PURE__*/React.createElement("span", {
  className: "navy-ribbon-tag"
}, "NAM \xD7 2"), /*#__PURE__*/React.createElement("span", {
  className: "navy-ribbon-tag"
}, "GWOT-S"), /*#__PURE__*/React.createElement("span", {
  className: "navy-ribbon-tag"
}, "Sea Service \xD7 2")));
window.NavyRibbon = NavyRibbon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/NavyRibbon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Pipeline.jsx
try { (() => {
// Pipeline.jsx — animated CI/CD stage diagram
const Pipeline = ({
  stages
}) => {
  const data = stages || [{
    label: 'lint',
    time: '12s',
    state: 'pass'
  }, {
    label: 'test',
    time: '1m 04s',
    state: 'pass'
  }, {
    label: 'build',
    time: '38s',
    state: 'pass'
  }, {
    label: 'deploy',
    time: '14s',
    state: 'build'
  }, {
    label: 'smoke',
    time: 'queued',
    state: 'idle'
  }];
  const glyph = s => s === 'pass' ? '✓' : s === 'build' ? '▌' : s === 'fail' ? '×' : '—';
  return /*#__PURE__*/React.createElement("div", {
    className: "pipeline"
  }, data.map((s, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: s.label
  }, /*#__PURE__*/React.createElement("div", {
    className: "pipe-stage"
  }, /*#__PURE__*/React.createElement("div", {
    className: `pipe-node ${s.state}`
  }, glyph(s.state)), /*#__PURE__*/React.createElement("div", {
    className: "pipe-label"
  }, s.label), /*#__PURE__*/React.createElement("div", {
    className: "pipe-time"
  }, s.time)), i < data.length - 1 && /*#__PURE__*/React.createElement("div", {
    className: `pipe-line ${data[i + 1].state === 'pass' || s.state === 'pass' && data[i + 1].state === 'build' ? 'pass' : ''}`
  }))));
};
window.Pipeline = Pipeline;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Pipeline.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Terminal.jsx
try { (() => {
// Terminal.jsx — dark canyon-ink terminal with sandstone text
const Terminal = ({
  title,
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: "term"
}, /*#__PURE__*/React.createElement("div", {
  className: "term-bar"
}, /*#__PURE__*/React.createElement("div", {
  className: "tdot",
  style: {
    background: '#FF5F57'
  }
}), /*#__PURE__*/React.createElement("div", {
  className: "tdot",
  style: {
    background: '#FEBC2E'
  }
}), /*#__PURE__*/React.createElement("div", {
  className: "tdot",
  style: {
    background: '#28C840'
  }
}), /*#__PURE__*/React.createElement("div", {
  className: "term-title"
}, title || '~/portfolio · main')), /*#__PURE__*/React.createElement("div", {
  className: "term-body"
}, children));
window.Terminal = Terminal;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Terminal.jsx", error: String((e && e.message) || e) }); }

})();
