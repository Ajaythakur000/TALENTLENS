import React, { useState, useEffect, useRef } from 'react'
import Navbar from './shared/Navbar'
import { Mail, Phone, Pencil, ExternalLink, Briefcase, MapPin } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
  useGetAppliedJobs()
  const [open, setOpen] = useState(false)
  const { user } = useSelector(store => store.auth)

  const heroRef = useRef(null)
  const cardRefs = useRef([])

  // Per-card mouse tracking for glare effect
  const handleCardMouseMove = (e, ref) => {
    if (!ref) return
    const rect = ref.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.style.setProperty('--mx', `${x}px`)
    ref.style.setProperty('--my', `${y}px`)
  }

  const skills = user?.profile?.skills || []
  const skillColors = [
    { bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.3)',  color: '#a5b4fc' },
    { bg: 'rgba(234,179,8,0.1)',    border: 'rgba(234,179,8,0.28)',  color: '#fde68a' },
    { bg: 'rgba(20,184,166,0.1)',   border: 'rgba(20,184,166,0.28)', color: '#5eead4' },
    { bg: 'rgba(244,63,94,0.1)',    border: 'rgba(244,63,94,0.28)',  color: '#fda4af' },
    { bg: 'rgba(34,197,94,0.1)',    border: 'rgba(34,197,94,0.28)',  color: '#86efac' },
    { bg: 'rgba(251,146,60,0.1)',   border: 'rgba(251,146,60,0.28)', color: '#fed7aa' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Cabinet+Grotesk:wght@400;500;700;800&family=Inter:wght@300;400;500&display=swap');
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=cabinet-grotesk@400,500,700,800&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .pf-root {
          min-height: 100vh;
          background: #050505;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
        }

        /* ─── PAGE ─── */
        .pf-page {
          max-width: 960px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 7rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        /* ════════════════════════
           HERO CARD
        ════════════════════════ */
        .pf-hero {
          position: relative;
          border-radius: 28px;
          border: 1px solid #1c1c1c;
          background: #0b0b0b;
          overflow: hidden;
          padding: 2.8rem 3rem;

          /* Card glare — reacts to --mx --my */
          --mx: 50%; --my: 50%;
        }

        /* Glare spotlight that follows mouse */
        .pf-hero::before {
          content: '';
          position: absolute;
          width: 500px; height: 500px;
          left: var(--mx); top: var(--my);
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 65%);
          border-radius: 50%;
          pointer-events: none;
          transition: left .08s ease, top .08s ease;
          z-index: 0;
        }

        /* Animated gold top border */
        .pf-hero::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg,
            transparent 0%,
            #eab308 40%, #f59e0b 50%, #eab308 60%,
            transparent 100%);
          background-size: 200% 100%;
          animation: borderFlow 3s linear infinite;
        }
        @keyframes borderFlow {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Ambient corner orbs */
        .pf-orb-tl {
          position: absolute; top: -120px; left: -80px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }
        .pf-orb-br {
          position: absolute; bottom: -100px; right: -60px;
          width: 260px; height: 260px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%);
          pointer-events: none; z-index: 0;
        }

        .pf-hero-inner { position: relative; z-index: 1; }

        /* Top row */
        .pf-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 2rem; margin-bottom: 2.5rem; }
        .pf-identity { display: flex; align-items: center; gap: 1.8rem; }

        /* Avatar */
        .pf-av-outer {
          position: relative; flex-shrink: 0;
          width: 96px; height: 96px;
        }
        .pf-av-spin {
          position: absolute; inset: -3px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #eab308 0%, #f59e0b 25%, transparent 50%, #eab308 75%, #f59e0b 100%);
          animation: spinAv 5s linear infinite;
        }
        @keyframes spinAv { to { transform: rotate(360deg); } }
        .pf-av-mask {
          position: absolute; inset: 2px;
          border-radius: 50%;
          background: #0b0b0b;
          z-index: 1;
        }
        .pf-av-img {
          position: absolute; inset: 5px;
          border-radius: 50%;
          object-fit: cover;
          z-index: 2;
        }
        .pf-av-pulse {
          position: absolute; bottom: 3px; right: 3px; z-index: 3;
          width: 13px; height: 13px; border-radius: 50%;
          background: #22c55e; border: 2px solid #0b0b0b;
          box-shadow: 0 0 0 0 rgba(34,197,94,.5);
          animation: avPulse 2s ease-in-out infinite;
        }
        @keyframes avPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(34,197,94,.45); }
          50%      { box-shadow: 0 0 0 8px rgba(34,197,94,0); }
        }

        /* Name block */
        .pf-eyebrow {
          font-size: 0.64rem; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: #eab308;
          margin-bottom: 0.5rem;
          display: flex; align-items: center; gap: 0.5rem;
        }
        .pf-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #eab308;
          box-shadow: 0 0 8px #eab308;
          animation: eyeDot 2s ease-in-out infinite;
        }
        @keyframes eyeDot { 0%,100%{opacity:1}50%{opacity:.3} }

        .pf-name {
          font-family: 'Cabinet Grotesk', 'Inter', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          font-weight: 800;
          color: #fff;
          line-height: 1;
          margin-bottom: 0.55rem;
          letter-spacing: -0.02em;
        }
        .pf-name span.hi { color: #eab308; }

        .pf-bio {
          font-size: 0.85rem; color: #484848;
          max-width: 340px; line-height: 1.65;
        }

        /* Edit btn */
        .pf-edit {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.65rem 1.3rem;
          border-radius: 12px;
          border: 1px solid #222;
          background: transparent;
          color: #555; font-size: 0.78rem; font-weight: 600;
          letter-spacing: 0.06em; text-transform: uppercase;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all .25s;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .pf-edit:hover {
          border-color: rgba(234,179,8,.45);
          color: #eab308;
          background: rgba(234,179,8,.05);
          box-shadow: 0 0 24px rgba(234,179,8,.12), inset 0 0 12px rgba(234,179,8,.04);
        }

        /* Divider */
        .pf-line {
          height: 1px; margin: 0 0 2rem;
          background: linear-gradient(90deg, transparent, #181818 30%, #181818 70%, transparent);
        }

        /* Contact row */
        .pf-contacts { display: flex; flex-wrap: wrap; gap: 0.75rem; margin-bottom: 2.2rem; }
        .pf-contact {
          display: flex; align-items: center; gap: 0.65rem;
          padding: 0.6rem 1.1rem;
          border: 1px solid #181818; border-radius: 12px;
          background: #0e0e0e;
          font-size: 0.82rem; color: #666;
          transition: all .25s; cursor: default;
          position: relative; overflow: hidden;
          --mx: 50%; --my: 50%;
        }
        .pf-contact::before {
          content: '';
          position: absolute;
          width: 160px; height: 160px;
          left: var(--mx); top: var(--my);
          transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          transition: left .06s, top .06s;
        }
        .pf-contact:hover { border-color: #282828; color: #999; background: #111; }
        .pf-contact-ico {
          width: 30px; height: 30px; border-radius: 9px;
          background: rgba(234,179,8,.07);
          border: 1px solid rgba(234,179,8,.14);
          display: flex; align-items: center; justify-content: center;
          color: #eab308; flex-shrink: 0;
        }
        .pf-contact span { position: relative; z-index: 1; }

        /* Skills */
        .pf-sec-label {
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: #282828;
          display: flex; align-items: center; gap: .75rem; margin-bottom: 1rem;
        }
        .pf-sec-label::after { content:''; flex:1; height:1px; background:#141414; }

        .pf-skills { display: flex; flex-wrap: wrap; gap: .5rem; margin-bottom: 2.2rem; }
        .pf-skill {
          padding: 0.38rem 1rem; border-radius: 100px;
          font-size: 0.76rem; font-weight: 600;
          border: 1px solid; cursor: default;
          transition: all .22s;
          position: relative; overflow: hidden;
        }
        .pf-skill::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.08) 0%, transparent 60%);
          opacity: 0; transition: opacity .22s;
        }
        .pf-skill:hover { transform: translateY(-2px) scale(1.03); }
        .pf-skill:hover::after { opacity: 1; }
        .pf-skill:hover { box-shadow: 0 6px 22px rgba(0,0,0,.4); }

        /* Resume */
        .pf-resume {
          display: flex; align-items: center; justify-content: space-between; gap: 1.5rem;
          padding: 1.1rem 1.4rem;
          border: 1px solid #181818; border-radius: 14px;
          background: #0e0e0e;
          transition: all .25s;
          position: relative; overflow: hidden;
          --mx: 50%; --my: 50%;
        }
        .pf-resume::before {
          content: '';
          position: absolute;
          width: 260px; height: 260px;
          left: var(--mx); top: var(--my);
          transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(234,179,8,.055) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
          transition: left .06s, top .06s;
        }
        .pf-resume:hover { border-color: #252525; background: #111; }
        .pf-resume-left { display: flex; align-items: center; gap: 1rem; position: relative; z-index: 1; }
        .pf-resume-ico {
          width: 40px; height: 40px; border-radius: 11px;
          background: rgba(234,179,8,.07); border: 1px solid rgba(234,179,8,.15);
          display: flex; align-items: center; justify-content: center; font-size: 1.1rem;
          flex-shrink: 0;
        }
        .pf-resume-name { font-size: .88rem; font-weight: 500; color: #ccc; margin-bottom: .12rem; }
        .pf-resume-sub  { font-size: .7rem; color: #303030; }
        .pf-resume-btn {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: .45rem;
          padding: .5rem 1.1rem;
          border-radius: 9px;
          background: rgba(234,179,8,.07); border: 1px solid rgba(234,179,8,.2);
          color: #eab308; font-size: .73rem; font-weight: 700;
          text-decoration: none; letter-spacing: .06em; text-transform: uppercase;
          font-family: 'Inter', sans-serif;
          transition: all .25s; white-space: nowrap;
          flex-shrink: 0;
        }
        .pf-resume-btn:hover {
          background: rgba(234,179,8,.13);
          box-shadow: 0 4px 22px rgba(234,179,8,.2);
          transform: translateY(-1px);
        }

        /* ════════════════════════
           JOBS SECTION
        ════════════════════════ */
        .pf-jobs {
          border-radius: 28px;
          border: 1px solid #1c1c1c;
          background: #0b0b0b;
          overflow: hidden;
          position: relative;
        }
        .pf-jobs::before {
          content: '';
          position: absolute; top:0; left:0; right:0; height:1.5px;
          background: linear-gradient(90deg, transparent, rgba(99,102,241,.7) 40%, rgba(99,102,241,1) 50%, rgba(99,102,241,.7) 60%, transparent);
          background-size: 200% 100%;
          animation: borderFlow 3s linear infinite reverse;
        }
        .pf-jobs-head {
          padding: 2rem 2.8rem 1.5rem;
          border-bottom: 1px solid #111;
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        .pf-jobs-eyebrow { font-size:.6rem; font-weight:700; letter-spacing:.16em; text-transform:uppercase; color:#2a2a2a; margin-bottom:.35rem; }
        .pf-jobs-title { font-family:'Cabinet Grotesk','Inter',sans-serif; font-size:1.3rem; font-weight:800; color:#fff; }
        .pf-jobs-pill {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .28rem .85rem; border-radius: 100px;
          background: rgba(99,102,241,.09); border: 1px solid rgba(99,102,241,.22);
          font-size: .68rem; font-weight: 700; color: #a5b4fc; letter-spacing:.05em;
        }
        .pf-jobs-body { padding: 1.5rem 2.8rem 2.5rem; }

        /* ── Animations ── */
        .pf-hero { animation: fadeUp .55s ease both; }
        .pf-jobs  { animation: fadeUp .55s ease .15s both; }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }

        @media(max-width:640px){
          .pf-hero { padding: 1.5rem; }
          .pf-top  { flex-direction: column; }
          .pf-identity { flex-direction: column; align-items: flex-start; }
          .pf-jobs-head, .pf-jobs-body { padding-left: 1.5rem; padding-right: 1.5rem; }
          .pf-name { font-size: 2rem; }
        }
      `}</style>

      <div className="pf-root">
        <Navbar />

        <div className="pf-page">

          {/* ══ HERO ══ */}
          <div
            className="pf-hero"
            onMouseMove={e => {
              const r = e.currentTarget.getBoundingClientRect()
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
            }}
          >
            <div className="pf-orb-tl" />
            <div className="pf-orb-br" />

            <div className="pf-hero-inner">
              {/* Top row */}
              <div className="pf-top">
                <div className="pf-identity">
                  {/* Spinning avatar */}
                  <div className="pf-av-outer">
                    <div className="pf-av-spin" />
                    <div className="pf-av-mask" />
                    <img
                      className="pf-av-img"
                      src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                      alt="profile"
                    />
                    <span className="pf-av-pulse" />
                  </div>

                  {/* Name */}
                  <div>
                    <div className="pf-eyebrow">
                      <span className="pf-eyebrow-dot" />
                      Candidate Profile
                    </div>
                    <h1 className="pf-name">
                      {(() => {
                        const parts = (user?.fullname || 'Your Name').split(' ')
                        return parts.map((w, i) =>
                          i === 0
                            ? <span key={i} className="hi">{w} </span>
                            : <span key={i}>{w} </span>
                        )
                      })()}
                    </h1>
                    <p className="pf-bio">{user?.profile?.bio || 'Add a short bio to tell companies about yourself.'}</p>
                  </div>
                </div>

                <button className="pf-edit" onClick={() => setOpen(true)}>
                  <Pencil size={13} />
                  Edit Profile
                </button>
              </div>

              <div className="pf-line" />

              {/* Contacts */}
              <div className="pf-contacts">
                {[
                  { Icon: Mail,  val: user?.email },
                  { Icon: Phone, val: user?.phoneNumber },
                ].map(({ Icon, val }, i) => (
                  <div
                    key={i} className="pf-contact"
                    onMouseMove={e => {
                      const r = e.currentTarget.getBoundingClientRect()
                      e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                      e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                    }}
                  >
                    <div className="pf-contact-ico"><Icon size={13} /></div>
                    <span>{val || '—'}</span>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="pf-sec-label">Skills</div>
              <div className="pf-skills">
                {skills.length > 0
                  ? skills.map((s, i) => {
                      const c = skillColors[i % skillColors.length]
                      return (
                        <span key={i} className="pf-skill"
                          style={{ background: c.bg, borderColor: c.border, color: c.color }}>
                          {s}
                        </span>
                      )
                    })
                  : <span style={{ fontSize: '.82rem', color: '#2e2e2e', fontStyle: 'italic' }}>No skills added yet.</span>
                }
              </div>

              {/* Resume */}
              <div className="pf-sec-label">Resume</div>
              {user?.profile?.resumeOriginalName ? (
                <div
                  className="pf-resume"
                  onMouseMove={e => {
                    const r = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
                  }}
                >
                  <div className="pf-resume-left">
                    <div className="pf-resume-ico">📄</div>
                    <div>
                      <div className="pf-resume-name">{user.profile.resumeOriginalName}</div>
                      <div className="pf-resume-sub">PDF · Click to view</div>
                    </div>
                  </div>
                  <a href={user.profile.resume} target="_blank" rel="noreferrer" className="pf-resume-btn">
                    <ExternalLink size={11} /> View
                  </a>
                </div>
              ) : (
                <p style={{ fontSize: '.82rem', color: '#2e2e2e', fontStyle: 'italic' }}>No resume uploaded yet.</p>
              )}
            </div>
          </div>

          {/* ══ APPLIED JOBS ══ */}
          <div className="pf-jobs">
            <div className="pf-jobs-head">
              <div>
                <div className="pf-jobs-eyebrow">Activity</div>
                <div className="pf-jobs-title">Applied Jobs</div>
              </div>
              <span className="pf-jobs-pill">⚡ Live Tracker</span>
            </div>
            <div className="pf-jobs-body">
              <AppliedJobTable />
            </div>
          </div>

        </div>
      </div>

      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </>
  )
}

export default Profile