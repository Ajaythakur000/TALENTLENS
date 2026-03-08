import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { Users } from 'lucide-react'

const Applicants = () => {
  const params = useParams()
  const dispatch = useDispatch()
  const { applicants } = useSelector(store => store.application)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true })
        dispatch(setAllApplicants(res.data.data))
      } catch (error) {
        console.log(error)
      }
    }
    fetchAllApplicants()
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  const count = applicants?.applications?.length || 0

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .ap-root {
          min-height: 100vh;
          background: #060606;
          font-family: 'Inter', sans-serif;
          position: relative; overflow-x: hidden;
        }

        .ap-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(234,179,8,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,179,8,0.02) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 30%, transparent 100%);
        }
        .ap-orb {
          position: fixed; top: -120px; right: -80px;
          width: 420px; height: 420px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none; z-index: 0;
        }

        .ap-page {
          position: relative; z-index: 1;
          max-width: 1100px; margin: 0 auto;
          padding: 2.5rem 1.5rem 6rem;
        }

        /* Topbar */
        .ap-topbar {
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 1rem;
          margin-bottom: 2rem;
          opacity: 0; transform: translateY(16px);
          transition: opacity .5s ease, transform .5s ease;
        }
        .ap-topbar.show { opacity: 1; transform: translateY(0); }

        .ap-eyebrow {
          font-size: .6rem; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #eab308;
          display: flex; align-items: center; gap: .45rem; margin-bottom: .4rem;
        }
        .ap-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #eab308; box-shadow: 0 0 7px #eab308;
          animation: apDot 2s ease-in-out infinite;
        }
        @keyframes apDot { 0%,100%{opacity:1} 50%{opacity:.25} }

        .ap-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.7rem; font-weight: 700; color: #fff;
          letter-spacing: -.02em; margin: 0;
        }
        .ap-title span { color: #eab308; }

        /* Count badge */
        .ap-badge {
          display: flex; align-items: center; gap: .55rem;
          padding: .5rem 1rem;
          background: rgba(234,179,8,0.07);
          border: 1px solid rgba(234,179,8,0.18);
          border-radius: 50px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: .82rem; font-weight: 600; color: #eab308;
        }

        /* Card */
        .ap-card {
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          opacity: 0; transform: translateY(20px);
          transition: opacity .5s ease .1s, transform .5s ease .1s;
        }
        .ap-card.show { opacity: 1; transform: translateY(0); }
        .ap-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg,
            transparent, #eab308 40%, #f59e0b 50%, #eab308 60%, transparent);
          background-size: 200% 100%;
          animation: apBorder 3s linear infinite; z-index: 1;
        }
        @keyframes apBorder {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="ap-root">
        <div className="ap-grid" />
        <div className="ap-orb" />
        <Navbar />
        <div className="ap-page">

          <div className={`ap-topbar${visible ? ' show' : ''}`}>
            <div>
              <div className="ap-eyebrow">
                <span className="ap-eyebrow-dot" />
                Admin · Job Applications
              </div>
              <h1 className="ap-title">Job <span>Applicants</span></h1>
            </div>
            <div className="ap-badge">
              <Users size={14} />
              {count} Applicant{count !== 1 ? 's' : ''}
            </div>
          </div>

          <div className={`ap-card${visible ? ' show' : ''}`}>
            <ApplicantsTable />
          </div>

        </div>
      </div>
    </>
  )
}

export default Applicants