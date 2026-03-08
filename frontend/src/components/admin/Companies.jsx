import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { Search, Plus } from 'lucide-react'

const Companies = () => {
  useGetAllCompanies()
  const [input, setInput] = useState('')
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSearchCompanyByText(input))
  }, [input])

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .co-root {
          min-height: 100vh;
          background: #060606;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Grid bg */
        .co-grid-bg {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(234,179,8,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,179,8,0.02) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 30%, transparent 100%);
        }

        /* Orbs */
        .co-orb1 {
          position: fixed; top: -120px; right: -80px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none; z-index: 0;
        }

        .co-page {
          position: relative; z-index: 1;
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 6rem;
        }

        /* ── TOPBAR ── */
        .co-topbar {
          display: flex; align-items: center; justify-content: space-between;
          gap: 1.5rem; flex-wrap: wrap;
          margin-bottom: 2rem;
          opacity: 0; transform: translateY(16px);
          transition: opacity .5s ease, transform .5s ease;
        }
        .co-topbar.show { opacity: 1; transform: translateY(0); }

        .co-title-block {}
        .co-eyebrow {
          font-size: .6rem; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #eab308;
          display: flex; align-items: center; gap: .45rem; margin-bottom: .4rem;
        }
        .co-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #eab308; box-shadow: 0 0 7px #eab308;
          animation: coDot 2s ease-in-out infinite;
        }
        @keyframes coDot { 0%,100%{opacity:1} 50%{opacity:.25} }
        .co-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.7rem; font-weight: 700; color: #fff;
          letter-spacing: -.02em; margin: 0;
        }
        .co-title span { color: #eab308; }

        /* Right side controls */
        .co-controls { display: flex; align-items: center; gap: .75rem; }

        /* Search input */
        .co-search-wrap {
          position: relative;
        }
        .co-search-ico {
          position: absolute; left: .85rem; top: 50%; transform: translateY(-50%);
          color: #333; pointer-events: none; transition: color .25s;
        }
        .co-search-wrap:focus-within .co-search-ico { color: #eab308; }
        .co-search {
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
        .co-search::placeholder { color: #2e2e2e; }
        .co-search:focus {
          border-color: rgba(234,179,8,.35);
          background: #111;
          box-shadow: 0 0 0 3px rgba(234,179,8,.06);
          width: 260px;
        }

        /* New company button */
        .co-new-btn {
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
        .co-new-btn::before {
          content: '';
          position: absolute; top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: rgba(255,255,255,.25);
          transform: skewX(-22deg);
          animation: coShine 3s ease-in-out infinite;
        }
        @keyframes coShine { 0%{left:-60%} 100%{left:160%} }
        .co-new-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 36px rgba(234,179,8,.42);
        }

        /* ── CARD ── */
        .co-card {
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          opacity: 0; transform: translateY(20px);
          transition: opacity .5s ease .1s, transform .5s ease .1s;
        }
        .co-card.show { opacity: 1; transform: translateY(0); }

        /* Animated top border */
        .co-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg,
            transparent, #eab308 40%, #f59e0b 50%, #eab308 60%, transparent);
          background-size: 200% 100%;
          animation: coTopBorder 3s linear infinite;
        }
        @keyframes coTopBorder {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="co-root">
        <div className="co-grid-bg" />
        <div className="co-orb1" />

        <Navbar />

        <div className="co-page">

          {/* ── TOPBAR ── */}
          <div className={`co-topbar${visible ? ' show' : ''}`}>
            <div className="co-title-block">
              <div className="co-eyebrow">
                <span className="co-eyebrow-dot" />
                Admin Panel
              </div>
              <h1 className="co-title">My <span>Companies</span></h1>
            </div>

            <div className="co-controls">
              <div className="co-search-wrap">
                <Search size={14} className="co-search-ico" />
                <input
                  className="co-search"
                  placeholder="Filter by name..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button className="co-new-btn" onClick={() => navigate('/admin/companies/create')}>
                <Plus size={15} />
                New Company
              </button>
            </div>
          </div>

          {/* ── TABLE CARD ── */}
          <div className={`co-card${visible ? ' show' : ''}`}>
            <CompaniesTable />
          </div>

        </div>
      </div>
    </>
  )
}

export default Companies