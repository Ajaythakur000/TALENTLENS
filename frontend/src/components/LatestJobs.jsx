import React from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'
import { Flame } from 'lucide-react'

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job)

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .lj-section {
          position: relative; background: #060606;
          padding: 64px 20px 88px; overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        .lj-orb {
          position: absolute; pointer-events: none;
          width: 800px; height: 300px; border-radius: 999px;
          background: radial-gradient(ellipse, rgba(234,179,8,0.04) 0%, transparent 70%);
          top: 40%; left: 50%; transform: translate(-50%,-50%);
        }

        .lj-inner { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; }

        /* Header */
        .lj-header {
          display: flex; align-items: flex-end; justify-content: space-between;
          margin-bottom: 36px; flex-wrap: wrap; gap: 1rem;
        }

        .lj-label {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: .6rem; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #eab308; margin-bottom: 10px;
        }
        .lj-label::before {
          content: ''; display: inline-block; width: 20px; height: 1.5px;
          background: linear-gradient(90deg, transparent, #eab308); border-radius: 2px;
        }

        .lj-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2rem); font-weight: 800;
          color: #f0f0f0; letter-spacing: -.02em; line-height: 1.1; margin: 0;
        }
        .lj-title span {
          background: linear-gradient(135deg, #eab308, #f5c840);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* View all */
        .lj-viewall {
          display: inline-flex; align-items: center; gap: 6px;
          padding: .55rem 1.1rem; border-radius: 10px;
          border: 1px solid #1e1e1e; background: #0e0e0e;
          color: #555; font-size: .78rem; font-weight: 500;
          text-decoration: none; cursor: pointer;
          transition: all .2s; white-space: nowrap;
          font-family: 'Inter', sans-serif;
        }
        .lj-viewall:hover {
          border-color: rgba(234,179,8,0.4); color: #eab308;
          background: rgba(234,179,8,0.06);
          box-shadow: 0 0 14px rgba(234,179,8,0.1);
        }

        /* Grid */
        .lj-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        @media (max-width: 900px) { .lj-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 560px) { .lj-grid { grid-template-columns: 1fr; } }

        /* Empty */
        .lj-empty {
          grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;
          border: 1px dashed #1e1e1e; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; gap: 1rem;
        }
        .lj-empty-box {
          width: 64px; height: 64px; border-radius: 18px;
          background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.12);
          display: flex; align-items: center; justify-content: center; color: #eab308;
          animation: ljFloat 3s ease-in-out infinite;
        }
        @keyframes ljFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .lj-empty p { font-size: .85rem; color: #2e2e2e; margin: 0; }
      `}</style>

      <div className="lj-section">
        <div className="lj-orb" />
        <div className="lj-inner">

          <div className="lj-header">
            <div>
              <p className="lj-label"><Flame size={11} /> Fresh Opportunities</p>
              <h2 className="lj-title"><span>Latest</span> Job Openings</h2>
            </div>
            <a href="/jobs" className="lj-viewall">View All Jobs →</a>
          </div>

          <div className="lj-grid">
            {(!allJobs || allJobs.length === 0) ? (
              <div className="lj-empty">
                <div className="lj-empty-box"><Flame size={24} /></div>
                <p>No job openings available right now. Check back soon!</p>
              </div>
            ) : (
              allJobs.slice(0, 6).map((job) => (
                <LatestJobCards key={job?._id} job={job} />
              ))
            )}
          </div>

        </div>
      </div>
    </>
  )
}

export default LatestJobs