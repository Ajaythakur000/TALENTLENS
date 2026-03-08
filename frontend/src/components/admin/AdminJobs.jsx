import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'
import { Search, Plus } from 'lucide-react'

const AdminJobs = () => {
  useGetAllAdminJobs()
  const [input, setInput] = useState('')
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchJobByText(input))
  }, [input])

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .aj-root {
          min-height: 100vh;
          background: #060606;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Grid bg */
        .aj-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(234,179,8,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,179,8,0.02) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 30%, transparent 100%);
        }

        /* Orb */
        .aj-orb {
          position: fixed; top: -120px; right: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none; z-index: 0;
        }

        .aj-page {
          position: relative; z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 6rem;
        }

        /* ── TOPBAR ── */
        .aj-topbar {
          display: flex; align-items: center; justify-content: space-between;
          gap: 1.5rem; flex-wrap: wrap;
          margin-bottom: 2rem;
          opacity: 0; transform: translateY(16px);
          transition: opacity .5s ease, transform .5s ease;
        }
        .aj-topbar.show { opacity: 1; transform: translateY(0); }

        .aj-title-block {}
        .aj-eyebrow {
          font-size: .6rem; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #eab308;
          display: flex; align-items: center; gap: .45rem; margin-bottom: .4rem;
        }
        .aj-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #eab308; box-shadow: 0 0 7px #eab308;
          animation: ajDot 2s ease-in-out infinite;
        }
        @keyframes ajDot { 0%,100%{opacity:1} 50%{opacity:.25} }

        .aj-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.7rem; font-weight: 700; color: #fff;
          letter-spacing: -.02em; margin: 0;
        }
        .aj-title span { color: #eab308; }

        /* Controls */
        .aj-controls { display: flex; align-items: center; gap: .75rem; }

        /* Search */
        .aj-search-wrap { position: relative; }
        .aj-search-ico {
          position: absolute; left: .85rem; top: 50%; transform: translateY(-50%);
          color: #333; pointer-events: none; transition: color .25s;
        }
        .aj-search-wrap:focus-within .aj-search-ico { color: #eab308; }

        .aj-search {
          background: #0e0e0e;
          border: 1px solid #1e1e1e;
          border-radius: 11px;
          padding: .65rem 1rem .65rem 2.5rem;
          font-size: .83rem; color: #ccc;
          font-family: 'Inter', sans-serif;
          outline: none; width: 220px;
          transition: all .25s;
          caret-color: #eab308;
        }
        .aj-search::placeholder { color: #2e2e2e; }
        .aj-search:focus {
          border-color: rgba(234,179,8,.35);
          background: #111;
          box-shadow: 0 0 0 3px rgba(234,179,8,.06);
          width: 260px;
        }

        /* Add job button */
        .aj-new-btn {
          display: flex; align-items: center; gap: .5rem;
          padding: .68rem 1.3rem;
          background: linear-gradient(135deg, #eab308, #d97706);
          border: none; border-radius: 11px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: .82rem; font-weight: 700;
          letter-spacing: .04em; color: #000;
          cursor: pointer; white-space: nowrap;
          position: relative; overflow: hidden;
          transition: all .3s cubic-bezier(.34,1.56,.64,1);
          box-shadow: 0 4px 20px rgba(234,179,8,.25);
        }
        .aj-new-btn::before {
          content: '';
          position: absolute; top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: rgba(255,255,255,.25);
          transform: skewX(-22deg);
          animation: ajShine 3s ease-in-out infinite;
        }
        @keyframes ajShine { 0%{left:-60%} 100%{left:160%} }
        .aj-new-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(234,179,8,.42);
        }

        /* ── TABLE CARD ── */
        .aj-card {
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          opacity: 0; transform: translateY(20px);
          transition: opacity .5s ease .1s, transform .5s ease .1s;
        }
        .aj-card.show { opacity: 1; transform: translateY(0); }

        .aj-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg,
            transparent, #eab308 40%, #f59e0b 50%, #eab308 60%, transparent);
          background-size: 200% 100%;
          animation: ajBorder 3s linear infinite;
          z-index: 1;
        }
        @keyframes ajBorder {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="aj-root">
        <div className="aj-grid" />
        <div className="aj-orb" />

        <Navbar />

        <div className="aj-page">

          {/* ── TOPBAR ── */}
          <div className={`aj-topbar${visible ? ' show' : ''}`}>
            <div className="aj-title-block">
              <div className="aj-eyebrow">
                <span className="aj-eyebrow-dot" />
                Admin Panel
              </div>
              <h1 className="aj-title">Job <span>Openings</span></h1>
            </div>

            <div className="aj-controls">
              <div className="aj-search-wrap">
                <Search size={14} className="aj-search-ico" />
                <input
                  className="aj-search"
                  placeholder="Filter by name, role..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button className="aj-new-btn" onClick={() => navigate('/admin/jobs/create')}>
                <Plus size={15} />
                Add Job Opening
              </button>
            </div>
          </div>

          {/* ── TABLE CARD ── */}
          <div className={`aj-card${visible ? ' show' : ''}`}>
            <AdminJobsTable />
          </div>

        </div>
      </div>
    </>
  )
}

export default AdminJobs