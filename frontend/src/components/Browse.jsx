import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'

const Browse = () => {
  useGetAllJobs()
  const { allJobs } = useSelector(store => store.job)
  const dispatch = useDispatch()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50)
    return () => {
      clearTimeout(timer)
      dispatch(setSearchedQuery(''))
    }
  }, [dispatch])

  useEffect(() => {
    const h = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .br-root {
          min-height: 100vh;
          background: #060606;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Cursor spotlight */
        .br-cursor {
          position: fixed;
          width: 650px; height: 650px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 60%);
          pointer-events: none;
          transform: translate(-50%,-50%);
          transition: left .1s ease, top .1s ease;
          z-index: 0;
        }

        /* Grid bg */
        .br-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(234,179,8,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,179,8,0.022) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 90% 60% at 50% 20%, #000 30%, transparent 100%);
        }

        /* Ambient orbs */
        .br-orb1 {
          position: fixed; top: -150px; left: -100px;
          width: 500px; height: 500px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.055) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none; z-index: 0;
        }
        .br-orb2 {
          position: fixed; bottom: -100px; right: -80px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.045) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none; z-index: 0;
        }

        .br-page {
          position: relative; z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 3rem 1.5rem 6rem;
        }

        /* ── HEADER ── */
        .br-header {
          margin-bottom: 2rem;
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem; flex-wrap: wrap;
          opacity: 0; transform: translateY(14px);
          transition: opacity .5s ease, transform .5s ease;
        }
        .br-header.show { opacity: 1; transform: translateY(0); }

        .br-title {
          font-family: 'Inter', sans-serif;
          font-size: 1rem; font-weight: 600; color: #888;
          margin: 0; letter-spacing: .01em;
        }
        .br-title span { color: #eab308; font-weight: 700; }

        .br-count-badge {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .32rem .85rem;
          background: rgba(234,179,8,0.07);
          border: 1px solid rgba(234,179,8,0.18);
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: .72rem; font-weight: 600; color: #eab308;
        }
        .br-count-badge-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #22c55e; box-shadow: 0 0 6px #22c55e;
          animation: bdot 1.5s ease-in-out infinite;
        }
        @keyframes bdot { 0%,100%{opacity:1} 50%{opacity:.25} }

        /* Divider */
        .br-divider {
          display: flex; align-items: center; gap: 1rem;
          margin: 1.5rem 0 2.5rem;
          opacity: 0; transform: translateY(10px);
          transition: opacity .6s ease .1s, transform .6s ease .1s;
        }
        .br-divider.show { opacity: 1; transform: translateY(0); }
        .br-div-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, #161616 30%, #161616 70%, transparent);
        }
        .br-div-text {
          font-size: .6rem; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #242424;
        }

        /* ── GRID ── */
        .br-grid-jobs {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        /* Each Job card wrapper — staggered entry */
        .br-job-wrap {
          opacity: 0; transform: translateY(28px);
          transition: opacity .5s ease, transform .5s ease;
        }
        .br-job-wrap.show { opacity: 1; transform: translateY(0); }

        /* ── EMPTY STATE ── */
        .br-empty {
          grid-column: 1 / -1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 6rem 2rem; text-align: center; gap: 1.4rem;
        }
        .br-empty-icon {
          width: 80px; height: 80px; border-radius: 22px;
          background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.12);
          display: flex; align-items: center; justify-content: center;
          font-size: 2.2rem;
          box-shadow: 0 0 60px rgba(234,179,8,0.07);
          animation: emptyFloat 3.5s ease-in-out infinite;
        }
        @keyframes emptyFloat {
          0%,100% { transform: translateY(0) rotate(-2deg); }
          50%      { transform: translateY(-10px) rotate(2deg); }
        }
        .br-empty h3 {
          font-family: 'Syne', sans-serif;
          font-size: 1.2rem; font-weight: 800; color: #333; margin: 0;
        }
        .br-empty p { font-size: .82rem; color: #252525; margin: 0; max-width: 260px; line-height: 1.7; }

        @media (max-width: 900px) { .br-grid-jobs { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) { .br-grid-jobs { grid-template-columns: 1fr; } }
      `}</style>

      <div className="br-root">
        <div className="br-cursor" style={{ left: mousePos.x, top: mousePos.y }} />
        <div className="br-grid" />
        <div className="br-orb1" />
        <div className="br-orb2" />

        <Navbar />

        <div className="br-page">

          {/* ── HEADER ── */}
          <div className={`br-header${visible ? ' show' : ''}`}>
            <h1 className="br-title">
              Search <span>Results</span>
            </h1>
            <span className="br-count-badge">
              <span className="br-count-badge-dot" />
              {allJobs?.length || 0} Jobs Found
            </span>
          </div>

          {/* ── JOB GRID ── */}
          <div className="br-grid-jobs">
            {!allJobs || allJobs.length === 0 ? (
              <div className="br-empty">
                <div className="br-empty-icon">🔍</div>
                <h3>No results found</h3>
                <p>Try a different keyword or explore all available openings.</p>
              </div>
            ) : (
              allJobs.map((job, i) => (
                <div
                  key={job._id}
                  className={`br-job-wrap${visible ? ' show' : ''}`}
                  style={{ transitionDelay: `${0.05 * i}s` }}
                >
                  <Job job={job} />
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default Browse