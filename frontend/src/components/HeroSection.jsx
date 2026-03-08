import React, { useState, useEffect } from 'react'
import { Search, Zap, ArrowRight } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const [query, setQuery] = useState('')
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // cursor spotlight
    const handleMove = (e) => {
      document.documentElement.style.setProperty('--hx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--hy', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', handleMove)
    const t = setTimeout(() => setVisible(true), 80)
    return () => { window.removeEventListener('mousemove', handleMove); clearTimeout(t) }
  }, [])

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }

  const tags = [
    { label: 'Generative AI',    color: '#eab308', bg: 'rgba(234,179,8,0.08)',    border: 'rgba(234,179,8,0.2)'    },
    { label: 'Agentic AI',       color: '#a78bfa', bg: 'rgba(167,139,250,0.08)',  border: 'rgba(167,139,250,0.2)'  },
    { label: 'MERN Stack',       color: '#60a5fa', bg: 'rgba(96,165,250,0.08)',   border: 'rgba(96,165,250,0.2)'   },
    { label: 'Cloud Native',     color: '#34d399', bg: 'rgba(52,211,153,0.08)',   border: 'rgba(52,211,153,0.2)'   },
    { label: 'Data Engineering', color: '#f472b6', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.2)'  },
  ]

  const stats = [
    { num: '1200+', label: 'Live Jobs',    color: '#eab308' },
    { num: '400+',  label: 'Companies',    color: '#60a5fa' },
    { num: '50K+',  label: 'Job Seekers',  color: '#34d399' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        :root { --hx: 50vw; --hy: 50vh; }

        .hs-root {
          position: relative; min-height: 92vh;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; background: #060606;
          font-family: 'Inter', sans-serif;
        }

        /* Cursor spotlight */
        .hs-spotlight {
          position: absolute; inset: 0; pointer-events: none; z-index: 1;
          background: radial-gradient(700px circle at var(--hx) var(--hy),
            rgba(234,179,8,0.04), transparent 60%);
        }

        /* Gold grid */
        .hs-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(234,179,8,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,179,8,0.022) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, #000 20%, transparent 100%);
        }

        /* Orbs */
        .hs-orb1 {
          position: absolute; pointer-events: none; z-index: 0;
          width: 700px; height: 700px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 65%);
          top: 50%; left: 50%; transform: translate(-50%, -58%);
          animation: hsOrb1 7s ease-in-out infinite;
        }
        @keyframes hsOrb1 { 0%,100%{transform:translate(-50%,-58%) scale(1)} 50%{transform:translate(-50%,-58%) scale(1.1)} }
        .hs-orb2 {
          position: absolute; pointer-events: none; z-index: 0;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 65%);
          top: 15%; right: 8%; animation: hsOrb2 9s ease-in-out infinite reverse;
        }
        @keyframes hsOrb2 { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.2);opacity:1} }
        .hs-orb3 {
          position: absolute; pointer-events: none; z-index: 0;
          width: 220px; height: 220px; border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 65%);
          bottom: 18%; left: 6%; animation: hsOrb2 11s ease-in-out infinite;
        }

        .hs-inner {
          position: relative; z-index: 2;
          text-align: center; padding: 0 20px;
          max-width: 840px; margin: 0 auto;
        }

        /* Badge */
        .hs-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 18px; border-radius: 999px;
          background: rgba(234,179,8,0.07);
          border: 1px solid rgba(234,179,8,0.2);
          font-size: .78rem; font-weight: 600; color: #eab308;
          letter-spacing: .04em; margin-bottom: 2rem;
          box-shadow: 0 0 24px rgba(234,179,8,0.08);
          opacity: 0; transform: translateY(20px);
          transition: opacity .6s ease, transform .6s ease;
        }
        .hs-badge.show { opacity: 1; transform: translateY(0); }
        .hs-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #eab308; box-shadow: 0 0 7px rgba(234,179,8,0.9);
          animation: hsBlink 2s ease-in-out infinite;
        }
        @keyframes hsBlink { 0%,100%{opacity:1} 50%{opacity:.3} }

        /* Heading */
        .hs-h1 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.2rem, 6vw, 4.2rem);
          font-weight: 800; line-height: 1.08;
          letter-spacing: -.03em; color: #f0f0f0;
          margin: 0 0 1.2rem;
          opacity: 0; transform: translateY(20px);
          transition: opacity .6s ease .08s, transform .6s ease .08s;
        }
        .hs-h1.show { opacity: 1; transform: translateY(0); }
        .hs-gold {
          background: linear-gradient(135deg, #eab308, #f5c840);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; position: relative; display: inline-block;
        }
        .hs-gold::after {
          content: ''; position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 3px; border-radius: 2px;
          background: linear-gradient(90deg, #eab308, #f5c840);
          box-shadow: 0 0 14px rgba(234,179,8,0.7); opacity: .7;
        }

        /* Sub */
        .hs-sub {
          font-size: .97rem; color: #444; line-height: 1.75;
          max-width: 460px; margin: 0 auto 2.2rem;
          opacity: 0; transform: translateY(20px);
          transition: opacity .6s ease .15s, transform .6s ease .15s;
        }
        .hs-sub.show { opacity: 1; transform: translateY(0); }

        /* Search */
        .hs-search-wrap {
          display: flex; align-items: center;
          max-width: 540px; margin: 0 auto 2.5rem;
          background: #0e0e0e; border: 1px solid #2a2a2a;
          border-radius: 999px; padding: 6px 6px 6px 20px; gap: 10px;
          transition: border-color .25s, box-shadow .25s;
          opacity: 0; transform: translateY(20px);
          transition: opacity .6s ease .22s, transform .6s ease .22s, border-color .25s, box-shadow .25s;
        }
        .hs-search-wrap.show { opacity: 1; transform: translateY(0); }
        .hs-search-wrap:focus-within {
          border-color: rgba(234,179,8,0.5);
          box-shadow: 0 0 0 3px rgba(234,179,8,0.08), 0 0 28px rgba(234,179,8,0.1);
        }
        .hs-search-ico { color: #333; flex-shrink: 0; transition: color .25s; }
        .hs-search-wrap:focus-within .hs-search-ico { color: #eab308; }
        .hs-search-input {
          flex: 1; background: transparent; border: none; outline: none;
          font-size: .88rem; color: #e0e0e0; caret-color: #eab308;
          font-family: 'Inter', sans-serif;
        }
        .hs-search-input::placeholder { color: #2e2e2e; }
        .hs-search-btn {
          display: flex; align-items: center; gap: 7px;
          padding: .65rem 1.4rem; border-radius: 999px; border: none;
          background: linear-gradient(135deg, #eab308, #f5c040);
          color: #080808; font-size: .82rem; font-weight: 700;
          cursor: pointer; flex-shrink: 0;
          font-family: 'Space Grotesk', sans-serif; letter-spacing: .03em;
          box-shadow: 0 0 18px rgba(234,179,8,0.35);
          position: relative; overflow: hidden;
          transition: transform .18s, box-shadow .18s;
        }
        .hs-search-btn::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 55%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.28), transparent);
          transition: left .4s ease;
        }
        .hs-search-btn:hover::before { left: 160%; }
        .hs-search-btn:hover {
          transform: scale(1.04);
          box-shadow: 0 0 32px rgba(234,179,8,0.55);
        }

        /* Stats */
        .hs-stats {
          display: flex; align-items: center; justify-content: center;
          gap: 0; flex-wrap: wrap; margin-bottom: 2.2rem;
          opacity: 0; transform: translateY(20px);
          transition: opacity .6s ease .3s, transform .6s ease .3s;
        }
        .hs-stats.show { opacity: 1; transform: translateY(0); }
        .hs-stat {
          padding: 0 2rem; text-align: center; position: relative;
        }
        .hs-stat:not(:last-child)::after {
          content: ''; position: absolute; right: 0; top: 50%;
          transform: translateY(-50%); width: 1px; height: 28px; background: #1a1a1a;
        }
        .hs-stat-num {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.4rem; font-weight: 800; line-height: 1;
        }
        .hs-stat-label { font-size: .7rem; color: #444; margin-top: 4px; letter-spacing: .05em; }

        /* Tags */
        .hs-tags {
          display: flex; align-items: center; justify-content: center;
          gap: .5rem; flex-wrap: wrap;
          opacity: 0; transform: translateY(20px);
          transition: opacity .6s ease .38s, transform .6s ease .38s;
        }
        .hs-tags.show { opacity: 1; transform: translateY(0); }
        .hs-tags-label { font-size: .72rem; color: #333; margin-right: .2rem; }
        .hs-tag {
          padding: 4px 12px; border-radius: 7px;
          font-size: .72rem; font-weight: 600; border: 1px solid;
          cursor: default; background: transparent;
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="hs-root">
        <div className="hs-spotlight" />
        <div className="hs-grid" />
        <div className="hs-orb1" /><div className="hs-orb2" /><div className="hs-orb3" />

        <div className="hs-inner">

          {/* Badge */}
          <div className={`hs-badge${visible ? ' show' : ''}`}>
            <span className="hs-badge-dot" />
            Where Talent Meets Opportunity
            <Zap size={12} />
          </div>

          {/* Heading */}
          <h1 className={`hs-h1${visible ? ' show' : ''}`}>
            Explore, Apply &amp; Land<br />
            Your <span className="hs-gold">Dream Job</span>
          </h1>

          {/* Sub */}
          <p className={`hs-sub${visible ? ' show' : ''}`}>
            Discover thousands of opportunities from top companies.
            Start building the career you deserve — right now.
          </p>

          {/* Search */}
          <div className={`hs-search-wrap${visible ? ' show' : ''}`}>
            <Search size={16} className="hs-search-ico" />
            <input
              className="hs-search-input"
              type="text"
              placeholder="Search jobs, companies, skills..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchJobHandler()}
            />
            <button className="hs-search-btn" onClick={searchJobHandler}>
              Search <ArrowRight size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* Stats */}
          <div className={`hs-stats${visible ? ' show' : ''}`}>
            {stats.map((s, i) => (
              <div key={i} className="hs-stat">
                <div className="hs-stat-num" style={{ color: s.color }}>{s.num}</div>
                <div className="hs-stat-label">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className={`hs-tags${visible ? ' show' : ''}`}>
            <span className="hs-tags-label">Trending:</span>
            {tags.map((t, i) => (
              <span
                key={i} className="hs-tag"
                style={{ color: t.color, background: t.bg, borderColor: t.border }}
              >
                {t.label}
              </span>
            ))}
          </div>

        </div>
      </div>
    </>
  )
}

export default HeroSection