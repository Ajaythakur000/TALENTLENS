import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2, GraduationCap, Briefcase, Upload, Zap, Users, TrendingUp, ArrowRight, Sparkles, Shield, Star } from 'lucide-react'

const STATS = [
  { num: '10K+', label: 'Job Listings',   icon: Briefcase,     color: '#eab308', bg: 'rgba(234,179,8,0.08)',   border: 'rgba(234,179,8,0.2)'   },
  { num: '500+', label: 'Companies',      icon: Users,         color: '#34d399', bg: 'rgba(52,211,153,0.07)',  border: 'rgba(52,211,153,0.18)' },
  { num: '50K+', label: 'Students',       icon: GraduationCap, color: '#60a5fa', bg: 'rgba(96,165,250,0.07)', border: 'rgba(96,165,250,0.18)' },
  { num: '95%',  label: 'Placement Rate', icon: TrendingUp,    color: '#a78bfa', bg: 'rgba(167,139,250,0.07)',border: 'rgba(167,139,250,0.18)'},
]

const PILLS = [
  { label: 'Generative AI', color: '#eab308', bg: 'rgba(234,179,8,0.1)',   border: 'rgba(234,179,8,0.25)'   },
  { label: 'React',         color: '#60a5fa', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.25)'  },
  { label: 'Node.js',       color: '#34d399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.25)'  },
  { label: 'Python',        color: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.25)' },
  { label: 'ML/AI',         color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)' },
  { label: 'Cloud Native',  color: '#fbbf24', bg: 'rgba(251,191,36,0.1)',  border: 'rgba(251,191,36,0.25)'  },
]

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  dur: Math.random() * 8 + 6,
  delay: Math.random() * 5,
  color: ['#eab308','#60a5fa','#34d399','#a78bfa'][Math.floor(Math.random()*4)]
}))

const Signup = () => {
  const [input, setInput] = useState({ fullname: '', email: '', phoneNumber: '', password: '', role: '', file: '' })
  const [visible, setVisible] = useState(false)
  const [focused, setFocused] = useState('')
  const cardRef = useRef(null)
  const { loading, user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const handleMove = (e) => {
      document.documentElement.style.setProperty('--sx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--sy', `${e.clientY}px`)
      // 3D card tilt
      if (cardRef.current) {
        const r = cardRef.current.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dx = (e.clientX - cx) / (r.width / 2)
        const dy = (e.clientY - cy) / (r.height / 2)
        cardRef.current.style.transform = `perspective(1200px) rotateY(${dx * 2.2}deg) rotateX(${-dy * 1.8}deg)`
      }
    }
    const handleLeave = () => {
      if (cardRef.current) cardRef.current.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)'
    }
    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    const t = setTimeout(() => setVisible(true), 100)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      clearTimeout(t)
    }
  }, [])

  useEffect(() => { if (user) navigate('/') }, [user, navigate])

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })
  const changeFileHandler  = (e) => setInput({ ...input, file: e.target.files?.[0] })

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname',    input.fullname)
    formData.append('email',       input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('password',    input.password)
    formData.append('role',        input.role)
    if (input.file) formData.append('file', input.file)
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })
      if (res.status === 200 || res.status === 201) { navigate('/login'); toast.success(res.data.message) }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --sx:50vw; --sy:50vh; --gold:#eab308; --gold2:#f59e0b; --gold3:#fbbf24; }

        .sg-page {
          min-height: 100vh; background: #060606;
          font-family: 'Inter', sans-serif;
          position: relative; overflow: hidden;
        }

        /* Cursor spotlight */
        .sg-spotlight {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(600px circle at var(--sx) var(--sy), rgba(234,179,8,0.055), transparent 55%);
        }

        /* Noise texture */
        .sg-noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: .02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        /* Gold grid */
        .sg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: linear-gradient(rgba(234,179,8,0.025) 1px,transparent 1px), linear-gradient(90deg,rgba(234,179,8,0.025) 1px,transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 90% 70% at 50% 30%, #000 20%, transparent 80%);
        }

        /* Particles */
        .sg-particle { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; }
        @keyframes sgParticle {
          0%  { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: .5; }
          100%{ transform: translateY(-80px) scale(0); opacity: 0; }
        }

        /* Ambient orbs */
        .sg-orb1 { position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(234,179,8,0.05) 0%,transparent 65%);top:-150px;left:-150px;filter:blur(60px);pointer-events:none;z-index:0;animation:sgPulse 9s ease-in-out infinite; }
        .sg-orb2 { position:fixed;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.04) 0%,transparent 65%);bottom:-120px;right:-120px;filter:blur(70px);pointer-events:none;z-index:0;animation:sgPulse 11s ease-in-out infinite reverse; }
        .sg-orb3 { position:fixed;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle,rgba(52,211,153,0.03) 0%,transparent 65%);top:40%;right:5%;filter:blur(40px);pointer-events:none;z-index:0;animation:sgPulse 7s ease-in-out infinite; }
        @keyframes sgPulse { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.15);opacity:1} }

        /* Wrap */
        .sg-wrap {
          position: relative; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          min-height: 90vh; padding: 32px 16px;
        }

        /* Card with 3D tilt */
        .sg-card {
          display: grid; grid-template-columns: 1fr 1fr;
          max-width: 980px; width: 100%; border-radius: 22px; overflow: hidden;
          background: #0c0c0c; border: 1px solid #1e1e1e;
          box-shadow: 0 0 0 1px rgba(234,179,8,0.06), 0 40px 80px rgba(0,0,0,0.7);
          transition: transform .15s ease, box-shadow .15s ease;
          transform-style: preserve-3d; position: relative;
        }
        .sg-card:hover { box-shadow: 0 0 0 1px rgba(234,179,8,0.13), 0 60px 120px rgba(0,0,0,0.8), 0 0 60px rgba(234,179,8,0.06); }
        /* Animated gold top border */
        .sg-card::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px; z-index: 10;
          background: linear-gradient(90deg, transparent, rgba(234,179,8,0) 15%, #eab308 40%, #f59e0b 50%, #eab308 60%, rgba(234,179,8,0) 85%, transparent);
          background-size: 300% 100%; animation: sgBorderFlow 3.5s linear infinite;
        }
        @keyframes sgBorderFlow { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        /* LEFT panel */
        .sg-left {
          padding: 42px 38px; border-right: 1px solid #141414;
          background: linear-gradient(160deg, #0d0d0d 0%, #090909 100%);
          position: relative;
        }
        .sg-left::after {
          content: ''; position: absolute; top: 0; right: 0;
          width: 130px; height: 130px;
          background: radial-gradient(circle at top right, rgba(234,179,8,0.055), transparent 70%);
          pointer-events: none;
        }

        /* Badge */
        .sg-badge {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 4px 12px; border-radius: 999px; margin-bottom: 14px;
          background: rgba(234,179,8,0.07); border: 1px solid rgba(234,179,8,0.16);
          font-size: .68rem; font-weight: 600; color: var(--gold);
          letter-spacing: .05em; font-family: 'Space Grotesk', sans-serif;
        }
        .sg-badge-dot { width:5px;height:5px;border-radius:50%;background:var(--gold);box-shadow:0 0 6px rgba(234,179,8,.9);animation:sgBlink 2s ease-in-out infinite; }
        @keyframes sgBlink { 0%,100%{opacity:1} 50%{opacity:.2} }

        /* Heading - Space Grotesk (same as rest of app) */
        .sg-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.5rem; font-weight: 800; color: #f0f0f0;
          letter-spacing: .12em; text-transform: uppercase;
          line-height: 1.1;
        }
        .sg-title::after {
          content: ''; display: block; width: 36px; height: 3px;
          border-radius: 2px; margin-top: 10px;
          background: linear-gradient(90deg, #eab308, #f5b942);
          box-shadow: 0 0 8px rgba(234,179,8,0.45);
        }
        .sg-sub { color: #3a3a3a; font-size: .75rem; margin-top: 10px; margin-bottom: 24px; }

        /* Progress bar */
        .sg-progress { display: flex; align-items: center; gap: 5px; margin-bottom: 24px; }
        .sg-prog-seg { height: 3px; border-radius: 999px; }

        /* Field */
        .sg-field { position: relative; }
        .sg-label {
          display: block; font-size: .7rem; font-weight: 600;
          color: #555; letter-spacing: .1em; text-transform: uppercase;
          margin-bottom: 6px; transition: color .2s;
        }
        .sg-field:focus-within .sg-label { color: var(--gold); }
        .sg-input-wrap { position: relative; }
        .sg-ico {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: #282828; pointer-events: none; transition: color .2s;
        }
        .sg-field:focus-within .sg-ico { color: var(--gold); }

        /* Inputs */
        .sg-input {
          width: 100%; border-radius: 10px; padding: 11px 14px 11px 38px;
          color: #e8e8e8; background: #080808; border: 1px solid #1e1e1e;
          outline: none; font-size: .85rem;
          font-family: 'Inter', sans-serif;
          transition: border-color .2s, box-shadow .2s, background .2s;
        }
        .sg-input::placeholder { color: #2e2e2e; }
        .sg-input:hover { border-color: #2e2e2e; background: #0a0a0a; }
        .sg-input:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px rgba(234,179,8,0.1);
          background: #0b0800;
        }

        /* Role cards */
        .sg-role {
          display: flex; align-items: center; gap: 10px; flex: 1;
          padding: 12px 13px; border-radius: 12px; cursor: pointer;
          border: 1px solid #1a1a1a; background: #080808;
          transition: all .25s cubic-bezier(.34,1.56,.64,1);
          position: relative; overflow: hidden;
        }
        .sg-role::after { content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent,rgba(234,179,8,0.03));opacity:0;transition:opacity .2s; }
        .sg-role:hover { border-color: rgba(234,179,8,.3); transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 24px rgba(0,0,0,.5); }
        .sg-role:hover::after { opacity: 1; }
        .sg-role.active { border-color: var(--gold); background: rgba(234,179,8,0.07); box-shadow: 0 0 0 1px rgba(234,179,8,.12), 0 8px 24px rgba(234,179,8,.08); }
        .sg-role.active::after { opacity: 1; }
        .sg-check { width:16px;height:16px;border-radius:50%;border:1.5px solid #252525;display:flex;align-items:center;justify-content:center;margin-left:auto;flex-shrink:0;transition:all .2s; }
        .sg-role.active .sg-check { background:var(--gold);border-color:var(--gold);box-shadow:0 0 8px rgba(234,179,8,.5); }

        /* Upload */
        .sg-upload { display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:12px;cursor:pointer;background:#080808;border:1px dashed #1e1e1e;transition:all .25s; }
        .sg-upload:hover { border-color:rgba(234,179,8,.35);background:#0b0800; }
        .sg-upload-ico { width:38px;height:38px;border-radius:10px;flex-shrink:0;background:rgba(234,179,8,.08);border:1px solid rgba(234,179,8,.15);display:flex;align-items:center;justify-content:center;transition:all .25s; }
        .sg-upload:hover .sg-upload-ico { background:rgba(234,179,8,.14);transform:scale(1.08); }

        /* Button */
        .sg-btn {
          width: 100%; padding: 14px; border-radius: 12px; border: none;
          font-weight: 700; font-size: .82rem; letter-spacing: .13em; text-transform: uppercase;
          color: #060606; cursor: pointer; font-family: 'Space Grotesk', sans-serif;
          background: linear-gradient(135deg, #eab308, #f59e0b 45%, #eab308);
          background-size: 200% 100%;
          box-shadow: 0 0 0 1px rgba(234,179,8,.28), 0 4px 24px rgba(234,179,8,.28);
          position: relative; overflow: hidden;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          transition: transform .2s cubic-bezier(.34,1.56,.64,1), box-shadow .2s;
        }
        .sg-btn::before { content:'';position:absolute;top:-50%;left:-80%;width:40%;height:200%;background:rgba(255,255,255,.2);transform:skewX(-22deg);animation:sgShimmer 2.5s ease-in-out infinite; }
        @keyframes sgShimmer { 0%{left:-80%} 100%{left:160%} }
        .sg-btn::after { content:'';position:absolute;inset:0;border-radius:12px;box-shadow:0 0 30px rgba(234,179,8,.35);opacity:0;animation:sgGlow 2s ease-in-out infinite; }
        @keyframes sgGlow { 0%,100%{opacity:0} 50%{opacity:.7} }
        .sg-btn:hover { transform:translateY(-2px) scale(1.01);box-shadow:0 0 0 1px rgba(234,179,8,.5),0 8px 32px rgba(234,179,8,.4); }
        .sg-btn:active { transform:scale(.98); }

        /* Link */
        .sg-link { color:var(--gold);font-weight:600;text-decoration:none;transition:all .18s; }
        .sg-link:hover { color:var(--gold3);text-shadow:0 0 10px rgba(234,179,8,.5); }

        /* Trust */
        .sg-trust { display:flex;align-items:center;gap:6px;justify-content:center;margin-top:12px;flex-wrap:wrap; }
        .sg-trust-item { display:flex;align-items:center;gap:4px;font-size:.65rem;color:#252525; }

        /* Stagger */
        .sg-in { opacity:0;transform:translateY(16px);transition:opacity .5s ease,transform .5s ease; }
        .sg-in.show { opacity:1;transform:translateY(0); }
        .d0{transition-delay:.04s}.d1{transition-delay:.1s}.d2{transition-delay:.16s}
        .d3{transition-delay:.22s}.d4{transition-delay:.28s}.d5{transition-delay:.34s}.d6{transition-delay:.4s}

        /* RIGHT panel */
        .sg-right {
          background: #080808; position: relative; overflow: hidden;
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 40px 30px;
        }
        .sg-right-grid { position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(234,179,8,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(234,179,8,0.028) 1px,transparent 1px);background-size:34px 34px; }
        .sg-r-orb1 { position:absolute;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(234,179,8,0.09) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-60%);animation:sgPulse 5s ease-in-out infinite;pointer-events:none; }
        .sg-r-orb2 { position:absolute;width:120px;height:120px;border-radius:50%;background:radial-gradient(circle,rgba(96,165,250,0.08) 0%,transparent 70%);top:8%;right:8%;animation:sgPulse 7s ease-in-out infinite reverse;pointer-events:none; }
        .sg-r-orb3 { position:absolute;width:90px;height:90px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,0.07) 0%,transparent 70%);bottom:10%;left:8%;animation:sgPulse 9s ease-in-out infinite;pointer-events:none; }

        /* Icon ring */
        .sg-icon-wrap { position:relative;width:60px;height:60px; }
        .sg-icon-ring { position:absolute;inset:0;border-radius:16px;background:conic-gradient(from 0deg,#eab308,#60a5fa,#34d399,#a78bfa,#eab308);animation:sgSpin 4s linear infinite;opacity:.75; }
        .sg-icon-inner { position:absolute;inset:2.5px;border-radius:13px;background:#080808;display:flex;align-items:center;justify-content:center; }
        @keyframes sgSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }

        /* Stat cards */
        .sg-stat { padding:14px 10px;border-radius:14px;text-align:center;transition:all .25s cubic-bezier(.34,1.56,.64,1);cursor:default; }

        /* Pills */
        .sg-pill { padding:5px 12px;border-radius:8px;font-size:.68rem;font-weight:600;cursor:default;transition:all .2s cubic-bezier(.34,1.56,.64,1); }
        .sg-pill:hover { transform:scale(1.1) translateY(-2px); }

        /* Divider */
        .sg-divider { width:40px;height:2px;border-radius:999px;margin:6px auto 12px;background:linear-gradient(90deg,#eab308,#f59e0b);box-shadow:0 0 10px rgba(234,179,8,.5); }

        /* Right panel title - Space Grotesk uppercase (same style as rest of app) */
        .sg-r-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.4rem; font-weight: 800; color: #fff;
          letter-spacing: .15em; text-transform: uppercase; margin: 0;
        }
        .sg-r-title-gold { color: #eab308; text-shadow: 0 0 30px rgba(234,179,8,.4); }

        @media(max-width:768px){.sg-card{grid-template-columns:1fr;}.sg-right{display:none;}}
      `}</style>

      <div className="sg-page">
        <div className="sg-spotlight" />
        <div className="sg-noise" />
        <div className="sg-grid" />
        <div className="sg-orb1" /><div className="sg-orb2" /><div className="sg-orb3" />

        {/* Floating particles */}
        {PARTICLES.map(p => (
          <div key={p.id} className="sg-particle" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: p.size, height: p.size,
            background: p.color, boxShadow: `0 0 ${p.size*2}px ${p.color}`,
            animation: `sgParticle ${p.dur}s ${p.delay}s ease-in-out infinite`
          }} />
        ))}

        <Navbar />

        <div className="sg-wrap">
          <div className="sg-card" ref={cardRef}>

            {/* ── LEFT ── */}
            <div className="sg-left">

              <div className={`sg-in d0${visible ? ' show' : ''}`}>
                <div className="sg-badge">
                  <span className="sg-badge-dot" />&nbsp;Join TalentLens Today&nbsp;
                  <Sparkles size={10} />
                </div>
                <h1 className="sg-title">Create Account</h1>
                <p className="sg-sub">Join thousands of students &amp; recruiters on TalentLens</p>
                {/* Progress segments */}
                <div className="sg-progress">
                  {[60,30,22,16].map((w,i) => (
                    <div key={i} className="sg-prog-seg" style={{
                      width: w,
                      background: i === 0 ? '#eab308' : '#1a1a1a',
                      boxShadow: i === 0 ? '0 0 8px rgba(234,179,8,.5)' : 'none'
                    }} />
                  ))}
                </div>
              </div>

              <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

                {/* Full Name */}
                <div className={`sg-in d1${visible ? ' show' : ''} sg-field`}>
                  <label className="sg-label">Full Name</label>
                  <div className="sg-input-wrap">
                    <svg className="sg-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                    <input className="sg-input" type="text" name="fullname"
                      value={input.fullname} onChange={changeEventHandler}
                      onFocus={() => setFocused('fullname')} onBlur={() => setFocused('')}
                      placeholder="Your Name" />
                  </div>
                </div>

                {/* Email */}
                <div className={`sg-in d2${visible ? ' show' : ''} sg-field`}>
                  <label className="sg-label">Email Address</label>
                  <div className="sg-input-wrap">
                    <svg className="sg-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                    <input className="sg-input" type="email" name="email"
                      value={input.email} onChange={changeEventHandler}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                      placeholder="your.email@example.com" />
                  </div>
                </div>

                {/* Phone + Password */}
                <div className={`sg-in d3${visible ? ' show' : ''}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="sg-field">
                    <label className="sg-label">Phone</label>
                    <div className="sg-input-wrap">
                      <svg className="sg-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                      <input className="sg-input" type="text" name="phoneNumber"
                        value={input.phoneNumber} onChange={changeEventHandler}
                        placeholder={`+91 XXXX XXXX${input.phoneNumber.length > 4 ? input.phoneNumber.slice(4).replace(/./g, 'X') : 'XX'}`} />
                    </div>
                  </div>
                  <div className="sg-field">
                    <label className="sg-label">Password</label>
                    <div className="sg-input-wrap">
                      <svg className="sg-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <input className="sg-input" type="password" name="password"
                        value={input.password} onChange={changeEventHandler} placeholder="••••••••" />
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className={`sg-in d4${visible ? ' show' : ''}`}>
                  <label className="sg-label" style={{ marginBottom: 8 }}>I am a</label>
                  <RadioGroup style={{ display: 'flex', gap: 10 }}>
                    {[
                      { val: 'student',   Icon: GraduationCap, title: 'Student',   sub: 'Find jobs & internships' },
                      { val: 'recruiter', Icon: Briefcase,     title: 'Recruiter', sub: 'Scout top talent'        },
                    ].map(({ val, Icon, title, sub }) => (
                      <label key={val} className={`sg-role${input.role === val ? ' active' : ''}`}>
                        <input type="radio" name="role" value={val}
                          checked={input.role === val} onChange={changeEventHandler}
                          style={{ display: 'none' }} />
                        <div style={{
                          width: 34, height: 34, borderRadius: 9, flexShrink: 0,
                          background: input.role === val ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.05)',
                          border: `1px solid ${input.role === val ? 'rgba(234,179,8,0.4)' : 'rgba(234,179,8,0.1)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s'
                        }}>
                          <Icon size={16} style={{ color: '#eab308' }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ color: '#e0e0e0', fontSize: '.85rem', fontWeight: 600, margin: 0 }}>{title}</p>
                          <p style={{ color: '#333', fontSize: '.7rem', margin: 0 }}>{sub}</p>
                        </div>
                        <div className="sg-check">
                          {input.role === val && (
                            <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6l3 3 5-5" stroke="#060606" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                          )}
                        </div>
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                {/* Upload */}
                <div className={`sg-in d5${visible ? ' show' : ''}`}>
                  <label className="sg-label" style={{ marginBottom: 8 }}>Profile Photo</label>
                  <label className="sg-upload">
                    <div className="sg-upload-ico"><Upload size={15} style={{ color: '#eab308' }} /></div>
                    <div>
                      <p style={{ fontSize: '.83rem', color: input.file ? '#eab308' : '#2e2e2e', margin: 0, fontWeight: 500 }}>
                        {input.file ? input.file.name : 'Upload Profile Photo'}
                      </p>
                      <p style={{ fontSize: '.65rem', color: '#1e1e1e', margin: 0 }}>PNG, JPG · max 5MB</p>
                    </div>
                    <input type="file" accept="image/*" onChange={changeFileHandler} style={{ display: 'none' }} />
                  </label>
                </div>

                {/* CTA */}
                <div className={`sg-in d6${visible ? ' show' : ''}`}>
                  {loading ? (
                    <button className="sg-btn" disabled>
                      <Loader2 size={16} style={{ animation: 'sgSpin 1s linear infinite' }} />
                      Creating account...
                    </button>
                  ) : (
                    <button type="submit" className="sg-btn">
                      Sign Up <ArrowRight size={14} strokeWidth={2.5} />
                    </button>
                  )}

                  <div className="sg-trust">
                    {[
                      { I: Shield, l: 'Secure' },
                      { I: Star,   l: 'Trusted 50K+' },
                      { I: Zap,    l: 'Instant Access' },
                    ].map(({ I, l }, idx) => (
                      <div key={l} className="sg-trust-item">
                        <I size={10} style={{ color: '#282828' }} />{l}
                        {idx < 2 && <span style={{ color: '#181818', marginLeft: 5 }}>·</span>}
                      </div>
                    ))}
                  </div>

                 
                  <p style={{ color: '#444', fontSize: '.82rem', textAlign: 'center', marginTop: 8 }}>
                    Already have an account?{' '}
                    <Link to="/login" className="sg-link">Sign in →</Link>
                  </p>
                </div>

              </form>
            </div>

            {/* ── RIGHT ── */}
            <div className="sg-right">
              <div className="sg-right-grid" />
              <div className="sg-r-orb1"/><div className="sg-r-orb2"/><div className="sg-r-orb3"/>

              {/* Content — NO float on outer div, only inner elements animate */}
              <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: '100%' }}>

                {/* Spinning icon — only this floats */}
                <div className="sg-icon-wrap" style={{ margin: '0 auto 18px', animation: 'sgFloat 5s ease-in-out infinite' }}>
                  <div className="sg-icon-ring" />
                  <div className="sg-icon-inner"><Zap size={22} style={{ color: '#eab308' }} /></div>
                </div>

                <h2 className="sg-r-title">Shape Your</h2>
                <h2 className="sg-r-title sg-r-title-gold">Future.</h2>
                <div className="sg-divider" />
                <p style={{ color: '#2e2e2e', fontSize: '.75rem', marginBottom: 24 }}>
                  Top companies. Real opportunities.
                </p>

                {/* Stat cards — static, only hover effect */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
                  {STATS.map(({ num, label, icon: Icon, color, bg, border }, i) => (
                    <div key={i} className="sg-stat"
                      style={{ background: bg, border: `1px solid ${border}` }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-5px) scale(1.03)'
                        e.currentTarget.style.boxShadow = `0 12px 30px rgba(0,0,0,.5), 0 0 20px ${bg.replace('0.08','0.3').replace('0.07','0.22')}`
                        e.currentTarget.style.borderColor = color
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.borderColor = border
                      }}
                    >
                      <Icon size={15} style={{ color, display: 'block', margin: '0 auto 6px' }} />
                      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: '1.2rem', fontWeight: 800, color, margin: 0 }}>{num}</p>
                      <p style={{ fontSize: '.65rem', color: '#383838', marginTop: 3 }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, justifyContent: 'center' }}>
                  {PILLS.map(({ label, color, bg, border }, i) => (
                    <span key={i} className="sg-pill" style={{ color, background: bg, border: `1px solid ${border}` }}>
                      {label}
                    </span>
                  ))}
                </div>

              </div>

              {/* Float keyframe only for icon */}
              <style>{`@keyframes sgFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }`}</style>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Signup