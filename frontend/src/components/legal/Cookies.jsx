import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Cookie } from 'lucide-react';

const SECTIONS = [
  {
    num: '01',
    title: 'What are Cookies?',
    content: 'Cookies are small text files stored on your device when you visit a website. They help the website remember your actions and preferences (such as login details) over a period of time.',
  },
  {
    num: '02',
    title: 'How TalentLens Uses Cookies',
    intro: 'We use cookies primarily for the following purposes:',
    list: [
      { label: 'Authentication', desc: 'We use secure cookies (JWT tokens) to keep you logged in as you navigate between pages.' },
      { label: 'Preferences', desc: 'To remember your UI choices and filter settings across sessions.' },
      { label: 'Security', desc: 'To protect user accounts and prevent unauthorized access.' },
    ],
  },
  {
    num: '03',
    title: 'Managing Cookies',
    content: 'Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of our website to set cookies, you may not be able to log in or apply for jobs successfully.',
  },
];

const Cookies = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .lg-root { min-height: 100vh; background: #060606; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; position: relative; overflow-x: hidden; }
        .lg-grid { position: fixed; inset: 0; background-image: linear-gradient(rgba(234,179,8,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.02) 1px, transparent 1px); background-size: 64px 64px; pointer-events: none; z-index: 0; mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 30%, transparent 100%); }
        .lg-orb { position: fixed; top: -100px; right: -80px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%); filter: blur(60px); pointer-events: none; z-index: 0; }
        .lg-body { flex: 1; position: relative; z-index: 1; max-width: 780px; margin: 0 auto; padding: 3rem 1.5rem 5rem; width: 100%; }
        .lg-hero { display: flex; align-items: flex-start; gap: 1.5rem; margin-bottom: 3rem; opacity: 0; transform: translateY(18px); transition: opacity .5s ease, transform .5s ease; }
        .lg-hero.show { opacity: 1; transform: translateY(0); }
        .lg-icon-box { width: 60px; height: 60px; border-radius: 16px; flex-shrink: 0; background: rgba(234,179,8,0.07); border: 1px solid rgba(234,179,8,0.18); display: flex; align-items: center; justify-content: center; color: #eab308; box-shadow: 0 0 40px rgba(234,179,8,0.1); }
        .lg-eyebrow { font-size: .6rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #eab308; display: flex; align-items: center; gap: .4rem; margin-bottom: .5rem; }
        .lg-dot { width: 5px; height: 5px; border-radius: 50%; background: #eab308; box-shadow: 0 0 7px #eab308; animation: lgDot 2s ease-in-out infinite; }
        @keyframes lgDot { 0%,100%{opacity:1} 50%{opacity:.25} }
        .lg-title { font-family: 'Space Grotesk', sans-serif; font-size: 2.2rem; font-weight: 700; color: #fff; letter-spacing: -.02em; margin: 0 0 .6rem; }
        .lg-title span { color: #eab308; }
        .lg-date { display: inline-flex; align-items: center; font-size: .72rem; color: #555; padding: .3rem .85rem; background: rgba(255,255,255,0.04); border: 1px solid #1e1e1e; border-radius: 999px; font-family: 'JetBrains Mono', monospace; }
        .lg-sections { display: flex; flex-direction: column; gap: 1rem; }
        .lg-card { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 18px; overflow: hidden; position: relative; opacity: 0; transform: translateY(16px); transition: opacity .45s ease, transform .45s ease, border-color .25s; }
        .lg-card.show { opacity: 1; transform: translateY(0); }
        .lg-card:hover { border-color: rgba(234,179,8,0.15); }
        .lg-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1.5px; background: linear-gradient(90deg, transparent, #eab308 40%, #f59e0b 50%, #eab308 60%, transparent); background-size: 200% 100%; animation: lgBorder 3s linear infinite; opacity: 0; transition: opacity .3s; }
        .lg-card:hover::before { opacity: 1; }
        @keyframes lgBorder { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        .lg-card-inner { padding: 1.5rem 1.8rem; display: flex; gap: 1.2rem; }
        .lg-num { font-family: 'JetBrains Mono', monospace; font-size: .65rem; font-weight: 500; color: #2a2a2a; min-width: 24px; padding-top: .15rem; flex-shrink: 0; transition: color .25s; }
        .lg-card:hover .lg-num { color: #eab308; }
        .lg-card-title { font-family: 'Space Grotesk', sans-serif; font-size: 1rem; font-weight: 600; color: #ccc; margin: 0 0 .75rem; transition: color .25s; }
        .lg-card:hover .lg-card-title { color: #fff; }
        .lg-card-p { font-size: .88rem; color: #555; line-height: 1.75; margin: 0 0 .6rem; }
        /* Rich list for cookies */
        .lg-rich-list { display: flex; flex-direction: column; gap: .6rem; margin-top: .4rem; }
        .lg-rich-item { display: flex; gap: .75rem; align-items: flex-start; padding: .7rem .9rem; background: #0e0e0e; border: 1px solid #1a1a1a; border-radius: 10px; transition: border-color .2s; }
        .lg-rich-item:hover { border-color: rgba(234,179,8,0.15); }
        .lg-rich-dot { width: 6px; height: 6px; border-radius: 50%; background: #eab308; opacity: .6; flex-shrink: 0; margin-top: .45rem; }
        .lg-rich-label { font-family: 'Space Grotesk', sans-serif; font-size: .8rem; font-weight: 600; color: #888; margin-bottom: .15rem; }
        .lg-rich-desc { font-size: .8rem; color: #444; line-height: 1.6; }
      `}</style>

      <div className="lg-root">
        <div className="lg-grid" /><div className="lg-orb" />
        <Navbar />
        <div className="lg-body">

          <div className={`lg-hero${visible ? ' show' : ''}`}>
            <div className="lg-icon-box"><Cookie size={26} /></div>
            <div>
              <div className="lg-eyebrow"><span className="lg-dot" />Legal</div>
              <h1 className="lg-title">Cookie <span>Policy</span></h1>
              <div className="lg-date">Last updated: March 2026</div>
            </div>
          </div>

          <div className="lg-sections">
            {SECTIONS.map((s, i) => (
              <div key={s.num} className={`lg-card${visible ? ' show' : ''}`} style={{ transitionDelay: `${0.08 + i * 0.07}s` }}>
                <div className="lg-card-inner">
                  <span className="lg-num">{s.num}</span>
                  <div style={{ flex: 1 }}>
                    <h2 className="lg-card-title">{s.title}</h2>
                    {s.content && <p className="lg-card-p">{s.content}</p>}
                    {s.intro  && <p className="lg-card-p">{s.intro}</p>}
                    {s.list && (
                      <div className="lg-rich-list">
                        {s.list.map((item, j) => (
                          <div key={j} className="lg-rich-item">
                            <div className="lg-rich-dot" />
                            <div>
                              <div className="lg-rich-label">{item.label}</div>
                              <div className="lg-rich-desc">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
        <Footer />
      </div>
    </>
  );
};

export default Cookies;