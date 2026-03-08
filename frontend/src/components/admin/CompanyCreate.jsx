import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { Building2, ArrowRight, X, Sparkles } from 'lucide-react'

const CompanyCreate = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [companyName, setCompanyName] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error('Please enter a company name')
      return
    }
    try {
      setLoading(true)
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      )
      if (res.status === 201) {
        dispatch(setSingleCompany(res.data.data))
        toast.success(res.data.message)
        navigate(`/admin/companies/${res.data.data._id}`)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') registerNewCompany()
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .cc-root {
          min-height: 100vh;
          background: #060606;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Grid */
        .cc-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(234,179,8,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,179,8,0.022) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, #000 30%, transparent 100%);
        }

        /* Center orb */
        .cc-orb {
          position: fixed; top: 50%; left: 50%;
          width: 600px; height: 600px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.04) 0%, transparent 65%);
          transform: translate(-50%, -50%);
          filter: blur(40px); pointer-events: none; z-index: 0;
        }

        .cc-page {
          position: relative; z-index: 1;
          max-width: 560px;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 6rem;
          display: flex; flex-direction: column; align-items: center;
        }

        /* ── ICON ── */
        .cc-icon-wrap {
          width: 72px; height: 72px; border-radius: 20px;
          background: rgba(234,179,8,0.07);
          border: 1px solid rgba(234,179,8,0.18);
          display: flex; align-items: center; justify-content: center;
          color: #eab308; margin-bottom: 2rem;
          box-shadow: 0 0 50px rgba(234,179,8,0.1);
          opacity: 0; transform: translateY(20px) scale(0.9);
          transition: opacity .5s ease, transform .5s ease;
          position: relative; overflow: hidden;
        }
        .cc-icon-wrap::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(234,179,8,0.12) 0%, transparent 60%);
        }
        .cc-icon-wrap.show { opacity: 1; transform: translateY(0) scale(1); }

        /* ── TEXT ── */
        .cc-text {
          text-align: center; margin-bottom: 2.5rem;
          opacity: 0; transform: translateY(18px);
          transition: opacity .5s ease .08s, transform .5s ease .08s;
        }
        .cc-text.show { opacity: 1; transform: translateY(0); }

        .cc-eyebrow {
          font-size: .62rem; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #eab308;
          display: flex; align-items: center; justify-content: center;
          gap: .45rem; margin-bottom: .75rem;
        }
        .cc-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #eab308; box-shadow: 0 0 7px #eab308;
          animation: ccDot 2s ease-in-out infinite;
        }
        @keyframes ccDot { 0%,100%{opacity:1} 50%{opacity:.25} }

        .cc-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2rem; font-weight: 700; color: #fff;
          letter-spacing: -.02em; margin: 0 0 .6rem;
        }
        .cc-title span { color: #eab308; }

        .cc-sub {
          font-size: .85rem; color: #484848; line-height: 1.65;
          max-width: 360px; margin: 0 auto;
        }

        /* ── CARD ── */
        .cc-card {
          width: 100%;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          opacity: 0; transform: translateY(22px);
          transition: opacity .5s ease .16s, transform .5s ease .16s;
        }
        .cc-card.show { opacity: 1; transform: translateY(0); }

        /* Animated top border */
        .cc-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg,
            transparent, #eab308 40%, #f59e0b 50%, #eab308 60%, transparent);
          background-size: 200% 100%;
          animation: ccBorder 3s linear infinite;
          z-index: 1;
        }
        @keyframes ccBorder {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Card glow on focus */
        .cc-card.focused {
          border-color: rgba(234,179,8,0.2);
          box-shadow: 0 0 60px rgba(234,179,8,0.06);
        }

        .cc-card-inner { padding: 2rem 2.2rem; }

        /* Label */
        .cc-label {
          font-size: .62rem; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #444;
          display: flex; align-items: center; gap: .5rem; margin-bottom: .75rem;
        }
        .cc-label::after { content: ''; flex: 1; height: 1px; background: #141414; }

        /* Input wrap */
        .cc-input-wrap { position: relative; }
        .cc-input-icon {
          position: absolute; left: .9rem; top: 50%; transform: translateY(-50%);
          color: #2e2e2e; pointer-events: none; transition: color .25s;
        }
        .cc-input-wrap.focused .cc-input-icon { color: #eab308; }

        .cc-input {
          width: 100%;
          background: #0e0e0e;
          border: 1px solid #1e1e1e;
          border-radius: 12px;
          padding: .85rem 1rem .85rem 2.7rem;
          font-size: .95rem; font-weight: 500; color: #e0e0e0;
          font-family: 'Space Grotesk', sans-serif;
          outline: none; transition: all .25s;
          caret-color: #eab308;
        }
        .cc-input::placeholder { color: #252525; font-weight: 400; }
        .cc-input:focus {
          border-color: rgba(234,179,8,0.35);
          background: #111;
          box-shadow: 0 0 0 3px rgba(234,179,8,0.06), 0 0 30px rgba(234,179,8,0.07);
        }

        /* Hint */
        .cc-hint {
          font-size: .7rem; color: #2a2a2a; margin-top: .5rem;
          display: flex; align-items: center; gap: .35rem;
        }

        /* ── BUTTONS ── */
        .cc-btns {
          display: flex; gap: .75rem; margin-top: 1.5rem;
        }

        .cc-cancel {
          flex: 1; padding: .82rem;
          background: transparent; border: 1px solid #1e1e1e; border-radius: 12px;
          color: #555; font-size: .83rem; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: all .22s; display: flex; align-items: center; justify-content: center; gap: .45rem;
        }
        .cc-cancel:hover { border-color: #2a2a2a; color: #888; background: #0e0e0e; }

        .cc-continue {
          flex: 2; padding: .82rem;
          background: linear-gradient(135deg, #eab308, #f59e0b 50%, #d97706);
          border: none; border-radius: 12px;
          color: #000; font-size: .88rem; font-weight: 700;
          font-family: 'Space Grotesk', sans-serif; letter-spacing: .04em;
          cursor: pointer; position: relative; overflow: hidden;
          transition: all .35s cubic-bezier(.34,1.56,.64,1);
          box-shadow: 0 4px 22px rgba(234,179,8,0.28), inset 0 1px 0 rgba(255,255,255,.2);
          display: flex; align-items: center; justify-content: center; gap: .5rem;
        }
        .cc-continue:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(234,179,8,0.45);
        }
        .cc-continue:disabled { opacity: .6; cursor: not-allowed; transform: none; }
        .cc-continue::before {
          content: '';
          position: absolute; top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: rgba(255,255,255,.22);
          transform: skewX(-22deg);
          animation: ccShine 3s ease-in-out infinite;
        }
        @keyframes ccShine { 0%{left:-60%} 100%{left:160%} }

        .cc-spin {
          width: 15px; height: 15px; border-radius: 50%;
          border: 2px solid rgba(0,0,0,.3); border-top-color: #000;
          animation: spin .7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── STEPS HINT ── */
        .cc-steps {
          display: flex; align-items: center; gap: .5rem;
          margin-top: 1.8rem;
          opacity: 0; transform: translateY(10px);
          transition: opacity .5s ease .24s, transform .5s ease .24s;
        }
        .cc-steps.show { opacity: 1; transform: translateY(0); }
        .cc-step {
          display: flex; align-items: center; gap: .4rem;
          font-size: .68rem; color: #2a2a2a;
        }
        .cc-step.active { color: #eab308; }
        .cc-step-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #1e1e1e;
        }
        .cc-step.active .cc-step-dot {
          background: #eab308;
          box-shadow: 0 0 8px rgba(234,179,8,0.5);
        }
        .cc-step-line {
          flex: 1; height: 1px; background: #141414; width: 28px;
        }
      `}</style>

      <div className="cc-root">
        <div className="cc-grid" />
        <div className="cc-orb" />

        <Navbar />

        <div className="cc-page">

          {/* Icon */}
          <div className={`cc-icon-wrap${visible ? ' show' : ''}`}>
            <Building2 size={30} />
          </div>

          {/* Text */}
          <div className={`cc-text${visible ? ' show' : ''}`}>
            <div className="cc-eyebrow">
              <span className="cc-eyebrow-dot" />
              Admin · New Company
            </div>
            <h1 className="cc-title">Register a <span>Company</span></h1>
            <p className="cc-sub">
              Give your company a name to get started. You can update the logo, description and other details later.
            </p>
          </div>

          {/* Card */}
          <div className={`cc-card${visible ? ' show' : ''}${focused ? ' focused' : ''}`}>
            <div className="cc-card-inner">

              <div className="cc-label">Company Name</div>

              <div className={`cc-input-wrap${focused ? ' focused' : ''}`}>
                <Building2 size={15} className="cc-input-icon" />
                <input
                  className="cc-input"
                  type="text"
                  placeholder="e.g. Microsoft, JobHunt, Acme Corp..."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onKeyDown={handleKey}
                  autoFocus
                />
              </div>
              <div className="cc-hint">
                <Sparkles size={10} />
                Press Enter to continue quickly
              </div>

              <div className="cc-btns">
                <button className="cc-cancel" onClick={() => navigate('/admin/companies')}>
                  <X size={13} /> Cancel
                </button>
                <button
                  className="cc-continue"
                  onClick={registerNewCompany}
                  disabled={loading || !companyName.trim()}
                >
                  {loading
                    ? <><div className="cc-spin" /> Creating...</>
                    : <>Continue <ArrowRight size={15} /></>
                  }
                </button>
              </div>

            </div>
          </div>

          {/* Steps indicator */}
          <div className={`cc-steps${visible ? ' show' : ''}`}>
            <div className="cc-step active">
              <div className="cc-step-dot" />
              Name
            </div>
            <div className="cc-step-line" />
            <div className="cc-step">
              <div className="cc-step-dot" />
              Details
            </div>
            <div className="cc-step-line" />
            <div className="cc-step">
              <div className="cc-step-dot" />
              Done
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default CompanyCreate