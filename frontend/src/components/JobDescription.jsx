import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant'
import { setSingleJob } from '@/redux/jobSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job)
  const { user } = useSelector(store => store.auth)
  const [isApplied, setIsApplied] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const params = useParams()
  const jobId = params.id
  const dispatch = useDispatch()

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true })
      if (res.status === 201) {
        setIsApplied(true)
        dispatch(setSingleJob({ ...singleJob, applications: [...(singleJob?.applications || []), { applicant: user?._id }] }))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true })
        if (res.status === 200) {
          dispatch(setSingleJob(res.data.data))
          setIsApplied(res.data.data.applications?.some(a => a.applicant?.toString() === user?._id))
        }
      } catch (error) { console.log(error) }
    }
    fetchSingleJob()
  }, [jobId, dispatch, user?._id])

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .jd-root {
          min-height: 100vh;
          background: #070707;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Cursor glow */
        .jd-cursor-glow {
          position: fixed;
          width: 700px; height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.055) 0%, transparent 60%);
          pointer-events: none;
          transform: translate(-50%, -50%);
          transition: left 0.1s ease, top 0.1s ease;
          z-index: 0;
        }

        /* Grid */
        .jd-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(234,179,8,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,179,8,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, #000 40%, transparent 100%);
        }

        .jd-page {
          position: relative; z-index: 1;
          max-width: 1000px;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 6rem;
        }

        /* Back */
        .jd-back {
          display: inline-flex; align-items: center; gap: 0.6rem;
          color: #3a3a3a; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.1em; text-transform: uppercase;
          background: none; border: none; cursor: pointer;
          text-decoration: none; margin-bottom: 3.5rem;
          transition: color 0.25s;
        }
        .jd-back:hover { color: #eab308; }
        .jd-back-bar { width: 30px; height: 1.5px; background: currentColor; transition: width 0.3s; }
        .jd-back:hover .jd-back-bar { width: 50px; }

        /* ══ HERO ══ */
        .jd-hero {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: start;
        }

        /* Live pill */
        .jd-live {
          display: inline-flex; align-items: center; gap: 0.55rem;
          margin-bottom: 1.4rem;
        }
        .jd-live-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 0 rgba(34,197,94,0.5);
          animation: ringPulse 2s ease-in-out infinite;
        }
        @keyframes ringPulse {
          0%   { box-shadow: 0 0 0 0   rgba(34,197,94,0.5); }
          70%  { box-shadow: 0 0 0 10px rgba(34,197,94,0);   }
          100% { box-shadow: 0 0 0 0   rgba(34,197,94,0);    }
        }
        .jd-live-label {
          font-size: 0.68rem; font-weight: 700; color: #22c55e;
          letter-spacing: 0.14em; text-transform: uppercase;
        }
        .jd-live-sep { width: 1px; height: 12px; background: #222; }
        .jd-live-meta { font-size: 0.68rem; color: #444; letter-spacing: 0.06em; }

        /* Giant title */
        .jd-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.8rem, 7vw, 5.5rem);
          line-height: 1.0;
          color: #fff;
          font-weight: 700;
          letter-spacing: -0.03em;
          margin: 0 0 2rem;
        }
        .jd-title .stroke {
          color: #eab308;
          position: relative;
        }
        .jd-title .stroke::after {
          content: '';
          position: absolute;
          bottom: -4px; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #eab308, #f59e0b, transparent);
          border-radius: 2px;
        }

        /* Chips */
        .jd-chips { display: flex; flex-wrap: wrap; gap: 0.55rem; }
        .jd-chip {
          display: inline-flex; align-items: center; gap: 0.35rem;
          padding: 0.42rem 1rem; border-radius: 100px;
          font-size: 0.77rem; font-weight: 600; border: 1px solid;
          transition: all 0.25s; cursor: default;
        }
        .jd-chip:hover { transform: translateY(-2px); }
        .c-blue  { background:rgba(59,130,246,.08);  border-color:rgba(59,130,246,.22);  color:#93c5fd; }
        .c-blue:hover  { box-shadow: 0 6px 22px rgba(59,130,246,.2); }
        .c-green { background:rgba(34,197,94,.08);   border-color:rgba(34,197,94,.22);   color:#86efac; }
        .c-green:hover { box-shadow: 0 6px 22px rgba(34,197,94,.2); }
        .c-gold  { background:rgba(234,179,8,.08);   border-color:rgba(234,179,8,.22);   color:#fde68a; }
        .c-gold:hover  { box-shadow: 0 6px 22px rgba(234,179,8,.2); }

        /* ── Apply CTA (right side) ── */
        .jd-cta-col {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 0.85rem;
          padding-top: 0.3rem;
        }

        /* Glowing apply button */
        .jd-btn {
          position: relative; overflow: hidden;
          padding: 1rem 2.4rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.88rem; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          border: none; border-radius: 14px;
          cursor: pointer; white-space: nowrap;
          transition: all 0.4s cubic-bezier(.34,1.56,.64,1);
        }
        .jd-btn-on {
          background: linear-gradient(135deg,#eab308,#f59e0b 50%,#d97706);
          color: #000;
          box-shadow:
            0 0 0 1px rgba(234,179,8,.4),
            0 4px 28px rgba(234,179,8,.3),
            inset 0 1px 0 rgba(255,255,255,.28);
        }
        .jd-btn-on:hover {
          transform: translateY(-4px) scale(1.04);
          box-shadow:
            0 0 0 1px rgba(234,179,8,.8),
            0 16px 55px rgba(234,179,8,.5),
            0 0 100px rgba(234,179,8,.15),
            inset 0 1px 0 rgba(255,255,255,.35);
        }
        .jd-btn-on::before {
          content:'';
          position:absolute; top:-50%; left:-60%;
          width:40%; height:200%;
          background:rgba(255,255,255,.32);
          transform:skewX(-22deg);
          animation: shineMove 3.5s ease-in-out infinite;
        }
        @keyframes shineMove { 0%{left:-60%} 100%{left:160%} }

        .jd-btn-off {
          background: transparent; color: #3a3a3a;
          border: 1px solid #222; cursor: not-allowed;
        }

        /* Mini avatar row */
        .jd-avatars {
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.7rem; color: #3a3a3a;
        }
        .jd-av-stack { display: flex; }
        .jd-av {
          width: 24px; height: 24px; border-radius: 50%;
          border: 2px solid #0a0a0a;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.6rem; font-weight: 700; color: #fff;
          margin-left: -7px;
        }
        .jd-av:first-child { margin-left: 0; }
        .av1{background:#1d4ed8} .av2{background:#7c3aed} .av3{background:#b45309}

        /* ══ DIVIDER ══ */
        .jd-divider {
          display:flex; align-items:center; gap:1.2rem;
          margin: 4rem 0 2.5rem;
        }
        .jd-div-line {
          flex:1; height:1px;
          background: linear-gradient(90deg, transparent, #1f1f1f 30%, #1f1f1f 70%, transparent);
        }
        .jd-div-text {
          font-size:0.62rem; font-weight:700; color:#2e2e2e;
          letter-spacing:.18em; text-transform:uppercase;
        }

        /* ══ BENTO GRID ══ */
        .jd-bento {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          grid-template-rows: auto auto auto;
          gap: 2px;
          background: #131313;
          border-radius: 22px;
          overflow: hidden;
          border: 1px solid #131313;
        }

        /* Card base */
        .jb {
          background: #0c0c0c;
          padding: 1.7rem 1.8rem;
          position: relative; overflow: hidden;
          transition: background 0.3s;
        }
        .jb:hover { background: #0f0f0f; }

        /* Left accent on hover */
        .jb::before {
          content:''; position:absolute;
          left:0; top:20%; bottom:20%; width:2px;
          background: linear-gradient(180deg,transparent,#eab308,transparent);
          opacity:0; transition:opacity .3s;
        }
        .jb:hover::before { opacity:1; }

        /* Hover glow */
        .jb::after {
          content:''; position:absolute;
          top:-50px; right:-50px; width:130px; height:130px;
          background: radial-gradient(circle, rgba(234,179,8,.07) 0%, transparent 70%);
          border-radius:50%; opacity:0; transition:opacity .3s; pointer-events:none;
        }
        .jb:hover::after { opacity:1; }

        /* Column spans */
        .jb-role    { grid-column: span 3; }
        .jb-loc     { grid-column: span 3; }
        .jb-sal     { grid-column: span 2; }
        .jb-type    { grid-column: span 2; }
        .jb-date    { grid-column: span 2; }
        .jb-desc    { grid-column: span 6; }
        .jb-count   { grid-column: span 6; }

        .jb-lbl {
          font-size:.62rem; font-weight:700; color:#2e2e2e;
          letter-spacing:.14em; text-transform:uppercase;
          display:flex; align-items:center; gap:.5rem; margin-bottom:.65rem;
        }
        .jb-lbl::after { content:''; flex:1; height:1px; background:#181818; }

        .jb-val {
          font-size:.95rem; font-weight:400; color:#b0b0b0; line-height:1.65;
        }
        .jb-val-lg {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.45rem; font-weight: 700; color: #eee; line-height: 1.2;
        }
        .jb-val-gold {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.2rem; font-weight: 700;
          color: #eab308; letter-spacing: -0.02em; line-height: 1;
          text-shadow: 0 0 50px rgba(234,179,8,.45);
        }
        .jb-val-gold span { font-size: 1.1rem; color: #a16207; font-weight: 600; }
        .jb-val-white {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.2rem; font-weight: 700;
          color: #fff; letter-spacing: -0.02em; line-height: 1;
        }
        .jb-val-white span { font-size: 1.1rem; color: #333; }
        .jb-sub { font-size:.7rem; color:#2e2e2e; margin-top:.3rem; font-weight:500; }

        /* Applicant count card — horizontal layout */
        .jb-count-inner {
          display:flex; align-items:center; justify-content:space-between; gap:1rem;
          flex-wrap:wrap;
        }
        .jb-count-left h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:.3rem;
        }
        .jb-count-left p { font-size:.8rem; color:#444; }
        .jb-count-left p span { color:#eab308; font-weight:600; }

        /* ══ BOTTOM CTA ══ */
        .jd-bottom-cta {
          margin-top: 2px;
          background: #0c0c0c;
          border-radius: 0 0 22px 22px;
          border: 1px solid #131313;
          border-top: 2px solid transparent;
          background-clip: padding-box;
          padding: 2rem 2rem;
          display: flex; align-items: center;
          justify-content: space-between; gap: 2rem;
          flex-wrap: wrap;
          position: relative; overflow: hidden;
        }
        .jd-bottom-cta::before {
          content:''; position:absolute;
          left:0; top:0; bottom:0; width:3px;
          background: linear-gradient(180deg,#eab308,#d97706);
          border-radius:2px 0 0 2px;
        }
        .jd-bottom-cta::after {
          content:''; position:absolute;
          right:-80px; top:-80px; width:260px; height:260px;
          background: radial-gradient(circle, rgba(234,179,8,.065) 0%, transparent 65%);
          border-radius:50%; pointer-events:none;
        }
        .jd-btm-left h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size:1.1rem; font-weight:700; color:#fff; margin-bottom:.25rem;
        }
        .jd-btm-left p { font-size:.8rem; color:#444; }
        .jd-btm-left p em { color:#eab308; font-style:normal; font-weight:600; }

        .jd-btm-btn {
          flex-shrink:0; position:relative; overflow:hidden;
          padding:.9rem 2.2rem;
          font-family: 'Space Grotesk', sans-serif;
          font-size:.83rem; font-weight:700; letter-spacing:.06em; text-transform:uppercase;
          border:none; border-radius:12px; cursor:pointer;
          transition: all .35s cubic-bezier(.34,1.56,.64,1);
        }
        .jd-btm-btn-on {
          background: linear-gradient(135deg,#eab308,#d97706);
          color:#000; box-shadow: 0 4px 24px rgba(234,179,8,.28);
        }
        .jd-btm-btn-on:hover { transform:translateY(-3px); box-shadow:0 14px 42px rgba(234,179,8,.48); }
        .jd-btm-btn-on::before {
          content:''; position:absolute; top:-50%; left:-60%;
          width:40%; height:200%; background:rgba(255,255,255,.28);
          transform:skewX(-22deg); animation:shineMove 3.5s ease-in-out infinite;
        }
        .jd-btm-btn-off {
          background:#111; color:#333; border:1px solid #1e1e1e; cursor:not-allowed;
        }

        /* ══ ENTRY ANIMATION ══ */
        .jd-page > * { animation: entryUp .65s ease both; }
        .jd-page > *:nth-child(1){animation-delay:.0s}
        .jd-page > *:nth-child(2){animation-delay:.08s}
        .jd-page > *:nth-child(3){animation-delay:.16s}
        .jd-page > *:nth-child(4){animation-delay:.24s}
        .jd-page > *:nth-child(5){animation-delay:.32s}
        @keyframes entryUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }

        @media(max-width:640px){
          .jd-hero { grid-template-columns:1fr; }
          .jd-cta-col { align-items:flex-start; }
          .jd-btn { width:100%; text-align:center; }
          .jd-bento { grid-template-columns:1fr 1fr; }
          .jb-role,.jb-loc,.jb-sal,.jb-type,.jb-date,.jb-desc,.jb-count { grid-column:span 2; }
          .jd-title { font-size:3.2rem; }
          .jd-bottom-cta { flex-direction:column; }
          .jd-btm-btn { width:100%; }
        }
      `}</style>

      <div className="jd-root">
        <div className="jd-cursor-glow" style={{ left: mousePos.x, top: mousePos.y }} />
        <div className="jd-grid" />

        <div className="jd-page">

          {/* Back */}
          <button className="jd-back" onClick={() => window.history.back()}>
            <div className="jd-back-bar" />
            Back to Jobs
          </button>

          {/* ══ HERO ══ */}
          <div className="jd-hero">
            <div>
              {/* Live strip */}
              <div className="jd-live">
                <span className="jd-live-dot" />
                <span className="jd-live-label">Live</span>
                <span className="jd-live-sep" />
                <span className="jd-live-meta">TalentLens · Active Posting</span>
              </div>

              {/* Title */}
              <h1 className="jd-title">
                {singleJob?.title?.split(' ').map((word, i) =>
                  i === 0
                    ? <span key={i} className="stroke">{word} </span>
                    : <span key={i}>{word} </span>
                )}
              </h1>

              {/* Chips */}
              <div className="jd-chips">
                <span className="jd-chip c-blue">👥 {singleJob?.position} Positions</span>
                <span className="jd-chip c-green">⚡ {singleJob?.jobType}</span>
                <span className="jd-chip c-gold">₹ {singleJob?.salary} LPA</span>
              </div>
            </div>

            {/* Right col */}
            <div className="jd-cta-col">
              <button
                onClick={isApplied ? undefined : applyJobHandler}
                disabled={isApplied}
                className={`jd-btn ${isApplied ? 'jd-btn-off' : 'jd-btn-on'}`}
              >
                {isApplied ? '✓ Already Applied' : '⚡ Apply Now'}
              </button>

              {!isApplied && (
                <div className="jd-avatars">
                  <div className="jd-av-stack">
                    <div className="jd-av av1">A</div>
                    <div className="jd-av av2">B</div>
                    <div className="jd-av av3">C</div>
                  </div>
                  <span>{singleJob?.applications?.length}+ applied</span>
                </div>
              )}
            </div>
          </div>

          {/* Divider */}
          <div className="jd-divider">
            <div className="jd-div-line" />
            <span className="jd-div-text">Position Details</span>
            <div className="jd-div-line" />
          </div>

          {/* ══ BENTO GRID ══ */}
          <div className="jd-bento">

            <div className="jb jb-role">
              <div className="jb-lbl">Role</div>
              <div className="jb-val-lg">{singleJob?.title}</div>
            </div>

            <div className="jb jb-loc">
              <div className="jb-lbl">Location</div>
              <div className="jb-val-lg">{singleJob?.location}</div>
            </div>

            <div className="jb jb-sal">
              <div className="jb-lbl">Salary</div>
              <div className="jb-val-gold">₹{singleJob?.salary}<span> LPA</span></div>
              <div className="jb-sub">Annual CTC</div>
            </div>

            <div className="jb jb-type">
              <div className="jb-lbl">Job Type</div>
              <div className="jb-val-lg">{singleJob?.jobType}</div>
            </div>

            <div className="jb jb-date">
              <div className="jb-lbl">Posted</div>
              <div className="jb-val-lg" style={{fontSize:'1.1rem'}}>{singleJob?.createdAt?.split("T")[0]}</div>
            </div>

            <div className="jb jb-desc">
              <div className="jb-lbl">About This Role</div>
              <div className="jb-val">{singleJob?.description}</div>
            </div>

            <div className="jb jb-count">
              <div className="jb-count-inner">
                <div className="jb-count-left">
                  <h3>🚀 Ready to apply?</h3>
                  <p>Join <em>{singleJob?.applications?.length} other candidates</em> who've already applied.</p>
                </div>
                <button
                  onClick={isApplied ? undefined : applyJobHandler}
                  disabled={isApplied}
                  className={`jd-btm-btn ${isApplied ? 'jd-btm-btn-off' : 'jd-btm-btn-on'}`}
                >
                  {isApplied ? '✓ Applied' : 'Apply Now →'}
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  )
}

export default JobDescription