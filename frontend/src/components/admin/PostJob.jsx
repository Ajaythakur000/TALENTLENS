import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import {
  Loader2, ArrowLeft, Type, FileText, ListChecks,
  IndianRupee, MapPin, Briefcase, Star, Users, Building2, AlertTriangle
} from 'lucide-react'

const PostJob = () => {
  const [input, setInput] = useState({
    title: '', description: '', requirements: '',
    salary: '', location: '', jobType: '',
    experience: '', position: 0, companyId: ''
  })
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const navigate = useNavigate()
  const { companies } = useSelector(store => store.company)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

  const selectCompany = (company) => {
    setSelectedCompany(company)
    setInput({ ...input, companyId: company._id })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
      if (res.status === 201) {
        toast.success(res.data.message)
        navigate('/admin/jobs')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { id: 'title',       label: 'Job Title',        icon: Type,         type: 'text',   placeholder: 'e.g. Senior React Developer',   span: 1 },
    { id: 'description', label: 'Description',      icon: FileText,     type: 'text',   placeholder: 'Brief about the role...',        span: 1 },
    { id: 'requirements',label: 'Requirements',     icon: ListChecks,   type: 'text',   placeholder: 'React, Node.js, MongoDB...',     span: 2 },
    { id: 'salary',      label: 'Salary (LPA)',     icon: IndianRupee,  type: 'text',   placeholder: 'e.g. 12',                        span: 1 },
    { id: 'location',    label: 'Location',         icon: MapPin,       type: 'text',   placeholder: 'Mumbai, Remote...',              span: 1 },
    { id: 'jobType',     label: 'Job Type',         icon: Briefcase,    type: 'text',   placeholder: 'Full Time, Part Time...',        span: 1 },
    { id: 'experience',  label: 'Experience Level', icon: Star,         type: 'text',   placeholder: '0-1 years, 2-4 years...',        span: 1 },
    { id: 'position',    label: 'No. of Positions', icon: Users,        type: 'number', placeholder: '1',                              span: 1 },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .pj-root {
          min-height: 100vh;
          background: #060606;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Grid */
        .pj-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(234,179,8,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,179,8,0.02) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 30%, transparent 100%);
        }

        /* Orbs */
        .pj-orb1 {
          position: fixed; top: -100px; right: -80px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none; z-index: 0;
        }
        .pj-orb2 {
          position: fixed; bottom: -80px; left: -60px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none; z-index: 0;
        }

        .pj-page {
          position: relative; z-index: 1;
          max-width: 780px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 6rem;
        }

        /* ── TOPBAR ── */
        .pj-topbar {
          display: flex; align-items: center; gap: 1.2rem;
          margin-bottom: 2.2rem;
          opacity: 0; transform: translateY(14px);
          transition: opacity .5s ease, transform .5s ease;
        }
        .pj-topbar.show { opacity: 1; transform: translateY(0); }

        .pj-back {
          display: flex; align-items: center; gap: .5rem;
          padding: .55rem 1rem;
          background: transparent; border: 1px solid #1e1e1e; border-radius: 10px;
          color: #555; font-size: .78rem; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: all .22s; white-space: nowrap;
        }
        .pj-back:hover { border-color: #2a2a2a; color: #888; background: #0e0e0e; }
        .pj-back-line { width: 22px; height: 1.5px; background: currentColor; transition: width .25s; }
        .pj-back:hover .pj-back-line { width: 32px; }

        .pj-eyebrow {
          font-size: .6rem; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #eab308;
          display: flex; align-items: center; gap: .45rem; margin-bottom: .3rem;
        }
        .pj-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #eab308; box-shadow: 0 0 7px #eab308;
          animation: pjDot 2s ease-in-out infinite;
        }
        @keyframes pjDot { 0%,100%{opacity:1} 50%{opacity:.25} }
        .pj-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem; font-weight: 700; color: #fff;
          letter-spacing: -.02em; margin: 0;
        }
        .pj-title span { color: #eab308; }

        /* ── MAIN CARD ── */
        .pj-card {
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          opacity: 0; transform: translateY(20px);
          transition: opacity .5s ease .1s, transform .5s ease .1s;
        }
        .pj-card.show { opacity: 1; transform: translateY(0); }

        .pj-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg,
            transparent, #eab308 40%, #f59e0b 50%, #eab308 60%, transparent);
          background-size: 200% 100%;
          animation: pjBorder 3s linear infinite;
          z-index: 1;
        }
        @keyframes pjBorder {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Fields grid */
        .pj-fields {
          padding: 2rem 2.2rem 1.5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }

        .pj-field { display: flex; flex-direction: column; gap: .45rem; }
        .pj-field.span2 { grid-column: span 2; }

        .pj-field-label {
          font-size: .6rem; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #404040;
          display: flex; align-items: center; gap: .45rem;
        }

        .pj-input-wrap { position: relative; }
        .pj-input-ico {
          position: absolute; left: .82rem; top: 50%; transform: translateY(-50%);
          color: #252525; pointer-events: none; transition: color .25s;
        }
        .pj-input-wrap:focus-within .pj-input-ico { color: #eab308; }

        .pj-input {
          width: 100%;
          background: #0e0e0e; border: 1px solid #1e1e1e; border-radius: 11px;
          padding: .72rem 1rem .72rem 2.5rem;
          font-size: .85rem; font-weight: 400; color: #d0d0d0;
          font-family: 'Inter', sans-serif; outline: none;
          transition: all .25s; caret-color: #eab308;
        }
        .pj-input::placeholder { color: #222; }
        .pj-input:focus {
          border-color: rgba(234,179,8,.35);
          background: #111;
          box-shadow: 0 0 0 3px rgba(234,179,8,.06);
        }
        .pj-input:hover:not(:focus) { border-color: #2a2a2a; }

        /* ── Company selector ── */
        .pj-company-section {
          padding: 0 2.2rem 1.8rem;
        }
        .pj-company-label {
          font-size: .6rem; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #404040;
          display: flex; align-items: center; gap: .5rem; margin-bottom: .75rem;
        }
        .pj-company-label::after { content: ''; flex: 1; height: 1px; background: #141414; }

        .pj-company-grid {
          display: flex; flex-wrap: wrap; gap: .6rem;
        }
        .pj-company-chip {
          display: flex; align-items: center; gap: .5rem;
          padding: .5rem .95rem;
          border: 1px solid #1e1e1e; border-radius: 10px;
          background: #0e0e0e; cursor: pointer;
          transition: all .22s; position: relative; overflow: hidden;
        }
        .pj-company-chip:hover {
          border-color: rgba(234,179,8,.25);
          background: rgba(234,179,8,.04);
        }
        .pj-company-chip.selected {
          border-color: rgba(234,179,8,.5);
          background: rgba(234,179,8,.07);
          box-shadow: 0 0 18px rgba(234,179,8,.1);
        }
        .pj-co-av {
          width: 24px; height: 24px; border-radius: 7px;
          background: #1a1a1a; border: 1px solid #252525;
          display: flex; align-items: center; justify-content: center;
          font-size: .65rem; font-weight: 700; color: #eab308;
          font-family: 'Space Grotesk', sans-serif; flex-shrink: 0;
          transition: all .22s;
        }
        .pj-company-chip.selected .pj-co-av {
          background: rgba(234,179,8,.12);
          border-color: rgba(234,179,8,.3);
        }
        .pj-co-name {
          font-size: .8rem; font-weight: 500; color: #777;
          transition: color .22s;
        }
        .pj-company-chip.selected .pj-co-name { color: #eab308; font-weight: 600; }

        .pj-chip-tick {
          width: 14px; height: 14px; border-radius: 50%;
          background: #eab308;
          display: flex; align-items: center; justify-content: center;
          font-size: .55rem; color: #000; font-weight: 700;
          margin-left: auto;
        }

        /* No company warning */
        .pj-no-company {
          display: flex; align-items: center; gap: .6rem;
          padding: .85rem 1rem;
          background: rgba(239,68,68,0.06);
          border: 1px solid rgba(239,68,68,0.18);
          border-radius: 11px;
          font-size: .78rem; color: #f87171;
          font-weight: 500;
        }

        /* ── Footer ── */
        .pj-footer {
          padding: 1.2rem 2.2rem 2rem;
          border-top: 1px solid #111;
          display: flex; gap: .75rem;
        }

        .pj-cancel {
          flex: 1; padding: .82rem;
          background: transparent; border: 1px solid #1e1e1e; border-radius: 12px;
          color: #555; font-size: .83rem; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer; transition: all .22s;
        }
        .pj-cancel:hover { border-color: #2a2a2a; color: #888; background: #0e0e0e; }

        .pj-submit {
          flex: 2; padding: .82rem;
          background: linear-gradient(135deg, #eab308, #f59e0b 50%, #d97706);
          border: none; border-radius: 12px;
          color: #000; font-size: .88rem; font-weight: 700;
          font-family: 'Space Grotesk', sans-serif; letter-spacing: .04em;
          cursor: pointer; position: relative; overflow: hidden;
          transition: all .35s cubic-bezier(.34,1.56,.64,1);
          box-shadow: 0 4px 22px rgba(234,179,8,.28), inset 0 1px 0 rgba(255,255,255,.2);
          display: flex; align-items: center; justify-content: center; gap: .5rem;
        }
        .pj-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(234,179,8,.45);
        }
        .pj-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
        .pj-submit::before {
          content: '';
          position: absolute; top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: rgba(255,255,255,.22);
          transform: skewX(-22deg);
          animation: pjShine 3s ease-in-out infinite;
        }
        @keyframes pjShine { 0%{left:-60%} 100%{left:160%} }

        .pj-spin { animation: spin .7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 580px) {
          .pj-fields { grid-template-columns: 1fr; }
          .pj-field.span2 { grid-column: span 1; }
          .pj-footer { flex-direction: column; }
        }
      `}</style>

      <div className="pj-root">
        <div className="pj-grid" />
        <div className="pj-orb1" />
        <div className="pj-orb2" />

        <Navbar />

        <div className="pj-page">

          {/* ── TOPBAR ── */}
          <div className={`pj-topbar${visible ? ' show' : ''}`}>
            <button className="pj-back" type="button" onClick={() => navigate('/admin/jobs')}>
              <div className="pj-back-line" />
              Back
            </button>
            <div>
              <div className="pj-eyebrow">
                <span className="pj-eyebrow-dot" />
                Admin · Post Job
              </div>
              <h1 className="pj-title">New Job <span>Opening</span></h1>
            </div>
          </div>

          {/* ── CARD ── */}
          <div className={`pj-card${visible ? ' show' : ''}`}>
            <form onSubmit={submitHandler}>

              {/* Fields */}
              <div className="pj-fields">
                {fields.map(({ id, label, icon: Icon, type, placeholder, span }) => (
                  <div key={id} className={`pj-field${span === 2 ? ' span2' : ''}`}>
                    <div className="pj-field-label">
                      <Icon size={10} />
                      {label}
                    </div>
                    <div className="pj-input-wrap">
                      <Icon size={13} className="pj-input-ico" />
                      <input
                        className="pj-input"
                        id={id} name={id} type={type}
                        value={input[id]}
                        onChange={changeHandler}
                        placeholder={placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Company selector */}
              <div className="pj-company-section">
                <div className="pj-company-label">
                  <Building2 size={10} />
                  Select Company
                </div>

                {companies?.length > 0 ? (
                  <div className="pj-company-grid">
                    {companies.map(company => {
                      const isSelected = selectedCompany?._id === company._id
                      return (
                        <div
                          key={company._id}
                          className={`pj-company-chip${isSelected ? ' selected' : ''}`}
                          onClick={() => selectCompany(company)}
                        >
                          <div className="pj-co-av">{company.name?.charAt(0).toUpperCase()}</div>
                          <span className="pj-co-name">{company.name}</span>
                          {isSelected && <div className="pj-chip-tick">✓</div>}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="pj-no-company">
                    <AlertTriangle size={15} />
                    You need to register a company before posting a job.
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pj-footer">
                <button type="button" className="pj-cancel" onClick={() => navigate('/admin/jobs')}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="pj-submit"
                  disabled={loading || companies?.length === 0}
                >
                  {loading
                    ? <><Loader2 size={15} className="pj-spin" /> Posting...</>
                    : '⚡ Post Job Opening'
                  }
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default PostJob