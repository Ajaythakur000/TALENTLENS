import React, { useEffect, useState, useRef } from 'react'
import Navbar from '../shared/Navbar'
import { RadioGroup } from '../ui/radio-group'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2, GraduationCap, Briefcase, Code2, ShieldCheck, GitBranch, Rocket, ArrowRight, Sparkles } from 'lucide-react'

const FEATURES = [
  {
    icon: Code2, title: 'Top Tech Companies',
    desc: 'Jobs from FAANG, startups & unicorns',
    badge: 'HOT', badgeBg: 'rgba(239,68,68,0.12)', badgeBorder: 'rgba(239,68,68,0.35)', badgeColor: '#f87171',
    iconBg: 'rgba(234,179,8,0.1)', iconBorder: 'rgba(234,179,8,0.2)', iconColor: '#eab308',
    hoverBorder: 'rgba(234,179,8,0.32)', hoverShadow: 'rgba(234,179,8,0.08)',
  },
  {
    icon: ShieldCheck, title: 'Verified Recruiters',
    desc: 'Connect directly — no middlemen, no spam',
    badge: null,
    iconBg: 'rgba(52,211,153,0.1)', iconBorder: 'rgba(52,211,153,0.2)', iconColor: '#34d399',
    hoverBorder: 'rgba(52,211,153,0.28)', hoverShadow: 'rgba(52,211,153,0.07)',
  },
  {
    icon: GitBranch, title: 'Track Applications',
    desc: 'Real-time status on every application',
    badge: null,
    iconBg: 'rgba(96,165,250,0.1)', iconBorder: 'rgba(96,165,250,0.2)', iconColor: '#60a5fa',
    hoverBorder: 'rgba(96,165,250,0.28)', hoverShadow: 'rgba(96,165,250,0.07)',
  },
  {
    icon: Rocket, title: 'Launch Your Career',
    desc: '95% placement rate among active users',
    badge: 'NEW', badgeBg: 'rgba(167,139,250,0.12)', badgeBorder: 'rgba(167,139,250,0.35)', badgeColor: '#a78bfa',
    iconBg: 'rgba(167,139,250,0.1)', iconBorder: 'rgba(167,139,250,0.2)', iconColor: '#a78bfa',
    hoverBorder: 'rgba(167,139,250,0.28)', hoverShadow: 'rgba(167,139,250,0.07)',
  },
]

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  dur: Math.random() * 8 + 6,
  delay: Math.random() * 5,
  color: ['#eab308','#60a5fa','#34d399','#a78bfa'][Math.floor(Math.random()*4)]
}))

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '', role: '' })
  const [visible, setVisible] = useState(false)
  const [focused, setFocused] = useState('')
  const cardRef = useRef(null)
  const { loading, user } = useSelector(store => store.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const handleMove = (e) => {
      document.documentElement.style.setProperty('--lx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--ly', `${e.clientY}px`)
      if (cardRef.current) {
        const r = cardRef.current.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2))  / (r.width / 2)
        const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2)
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

  useEffect(() => {
    if (user) {
      if (user.role === 'recruiter') navigate('/admin/companies')
      else navigate('/')
    }
  }, [user, navigate])

  const changeEventHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

  const submitHandler = async (e) => {
    e.preventDefault()
    if (!input.role) { toast.error('Please select a role'); return }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })
      if (res.data?.data?.user) {
        dispatch(setUser(res.data.data.user))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Login failed!')
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --lx:50vw; --ly:50vh; --gold:#eab308; --gold2:#f59e0b; --gold3:#fbbf24; }

        .lg-page {
          min-height: 100vh; background: #060606;
          font-family: 'Inter', sans-serif;
          position: relative; overflow: hidden;
        }

        /* Cursor spotlight */
        .lg-spotlight {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(600px circle at var(--lx) var(--ly), rgba(234,179,8,0.055), transparent 55%);
        }

        /* Noise */
        .lg-noise {
          position: fixed; inset: 0; pointer-events: none; z-index: 1; opacity: .02;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        /* Grid */
        .lg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: linear-gradient(rgba(234,179,8,0.025) 1px,transparent 1px), linear-gradient(90deg,rgba(234,179,8,0.025) 1px,transparent 1px);
          background-size: 52px 52px;
          mask-image: radial-gradient(ellipse 90% 70% at 50% 30%,#000 20%,transparent 80%);
        }

        /* Particles */
        .lg-particle { position:fixed;border-radius:50%;pointer-events:none;z-index:0; }
        @keyframes lgParticle {
          0%  {transform:translateY(0) scale(1);opacity:0}
          20% {opacity:1}
          80% {opacity:.5}
          100%{transform:translateY(-80px) scale(0);opacity:0}
        }

        /* Orbs */
        .lg-orb1{position:fixed;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(234,179,8,0.05) 0%,transparent 65%);top:-150px;left:-150px;filter:blur(60px);pointer-events:none;z-index:0;animation:lgPulse 9s ease-in-out infinite;}
        .lg-orb2{position:fixed;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(99,102,241,0.04) 0%,transparent 65%);bottom:-120px;right:-120px;filter:blur(70px);pointer-events:none;z-index:0;animation:lgPulse 11s ease-in-out infinite reverse;}
        .lg-orb3{position:fixed;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle,rgba(52,211,153,0.03) 0%,transparent 65%);top:40%;right:5%;filter:blur(40px);pointer-events:none;z-index:0;animation:lgPulse 7s ease-in-out infinite;}
        @keyframes lgPulse{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.15);opacity:1}}

        /* Wrap */
        .lg-wrap {
          position: relative; z-index: 2;
          display: flex; align-items: center; justify-content: center;
          min-height: 90vh; padding: 32px 16px;
        }

        /* Card */
        .lg-card {
          display: grid; grid-template-columns: 1fr 1fr;
          max-width: 900px; width: 100%; border-radius: 22px; overflow: hidden;
          background: #0c0c0c; border: 1px solid #1e1e1e;
          box-shadow: 0 0 0 1px rgba(234,179,8,0.06), 0 40px 80px rgba(0,0,0,0.7);
          transition: transform .15s ease, box-shadow .15s ease;
          transform-style: preserve-3d; position: relative;
        }
        .lg-card:hover { box-shadow: 0 0 0 1px rgba(234,179,8,0.13), 0 60px 120px rgba(0,0,0,0.8), 0 0 60px rgba(234,179,8,0.06); }
        /* Animated top border */
        .lg-card::before {
          content:'';position:absolute;top:0;left:0;right:0;height:1px;z-index:10;
          background:linear-gradient(90deg,transparent,rgba(234,179,8,0) 15%,#eab308 40%,#f59e0b 50%,#eab308 60%,rgba(234,179,8,0) 85%,transparent);
          background-size:300% 100%;animation:lgBorderFlow 3.5s linear infinite;
        }
        @keyframes lgBorderFlow{0%{background-position:200% 0}100%{background-position:-200% 0}}

        /* LEFT */
        .lg-left {
          padding: 42px 38px; border-right: 1px solid #141414;
          background: linear-gradient(160deg,#0d0d0d 0%,#090909 100%);
          position: relative;
        }
        .lg-left::after {
          content:'';position:absolute;top:0;right:0;width:130px;height:130px;
          background:radial-gradient(circle at top right,rgba(234,179,8,0.055),transparent 70%);
          pointer-events:none;
        }

        /* Badge */
        .lg-badge {
          display:inline-flex;align-items:center;gap:6px;
          padding:4px 12px;border-radius:999px;margin-bottom:14px;
          background:rgba(234,179,8,0.07);border:1px solid rgba(234,179,8,0.16);
          font-size:.68rem;font-weight:600;color:var(--gold);letter-spacing:.05em;
          font-family:'Space Grotesk',sans-serif;
        }
        .lg-badge-dot{width:5px;height:5px;border-radius:50%;background:var(--gold);box-shadow:0 0 6px rgba(234,179,8,.9);animation:lgBlink 2s ease-in-out infinite;}
        @keyframes lgBlink{0%,100%{opacity:1}50%{opacity:.2}}

        /* Title */
        .lg-title {
          font-family:'Space Grotesk',sans-serif;
          font-size:1.5rem;font-weight:800;color:#f0f0f0;
          letter-spacing:.12em;text-transform:uppercase;line-height:1.1;
        }
        .lg-title::after {
          content:'';display:block;width:36px;height:3px;border-radius:2px;margin-top:10px;
          background:linear-gradient(90deg,#eab308,#f5b942);box-shadow:0 0 8px rgba(234,179,8,.45);
        }
        .lg-sub{color:#3a3a3a;font-size:.75rem;margin-top:10px;margin-bottom:26px;}

        /* Field */
        .lg-field{position:relative;}
        .lg-label{display:block;font-size:.7rem;font-weight:600;color:#555;letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px;transition:color .2s;}
        .lg-field:focus-within .lg-label{color:var(--gold);}
        .lg-input-wrap{position:relative;}
        .lg-ico{position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#282828;pointer-events:none;transition:color .2s;}
        .lg-field:focus-within .lg-ico{color:var(--gold);}

        /* Input */
        .lg-input {
          width:100%;border-radius:10px;padding:11px 14px 11px 38px;
          color:#e8e8e8;background:#080808;border:1px solid #1e1e1e;
          outline:none;font-size:.85rem;font-family:'Inter',sans-serif;
          transition:border-color .2s,box-shadow .2s,background .2s;
        }
        .lg-input::placeholder{color:#2e2e2e;}
        .lg-input:hover{border-color:#2e2e2e;background:#0a0a0a;}
        .lg-input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(234,179,8,0.1);background:#0b0800;}

        /* Role */
        .lg-role {
          display:flex;align-items:center;gap:10px;flex:1;
          padding:12px 13px;border-radius:12px;cursor:pointer;
          border:1px solid #1a1a1a;background:#080808;
          transition:all .25s cubic-bezier(.34,1.56,.64,1);position:relative;overflow:hidden;
        }
        .lg-role::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent,rgba(234,179,8,0.03));opacity:0;transition:opacity .2s;}
        .lg-role:hover{border-color:rgba(234,179,8,.3);transform:translateY(-3px) scale(1.02);box-shadow:0 8px 24px rgba(0,0,0,.5);}
        .lg-role:hover::after{opacity:1;}
        .lg-role.active{border-color:var(--gold);background:rgba(234,179,8,0.07);box-shadow:0 0 0 1px rgba(234,179,8,.12),0 8px 24px rgba(234,179,8,.08);}
        .lg-role.active::after{opacity:1;}
        .lg-check{width:16px;height:16px;border-radius:50%;border:1.5px solid #252525;display:flex;align-items:center;justify-content:center;margin-left:auto;flex-shrink:0;transition:all .2s;}
        .lg-role.active .lg-check{background:var(--gold);border-color:var(--gold);box-shadow:0 0 8px rgba(234,179,8,.5);}

        /* Button */
        .lg-btn {
          width:100%;padding:14px;border-radius:12px;border:none;
          font-weight:700;font-size:.82rem;letter-spacing:.13em;text-transform:uppercase;
          color:#060606;cursor:pointer;font-family:'Space Grotesk',sans-serif;
          background:linear-gradient(135deg,#eab308,#f59e0b 45%,#eab308);
          background-size:200% 100%;
          box-shadow:0 0 0 1px rgba(234,179,8,.28),0 4px 24px rgba(234,179,8,.28);
          position:relative;overflow:hidden;
          display:flex;align-items:center;justify-content:center;gap:8px;
          transition:transform .2s cubic-bezier(.34,1.56,.64,1),box-shadow .2s;
        }
        .lg-btn::before{content:'';position:absolute;top:-50%;left:-80%;width:40%;height:200%;background:rgba(255,255,255,.2);transform:skewX(-22deg);animation:lgShimmer 2.5s ease-in-out infinite;}
        @keyframes lgShimmer{0%{left:-80%}100%{left:160%}}
        .lg-btn::after{content:'';position:absolute;inset:0;border-radius:12px;box-shadow:0 0 30px rgba(234,179,8,.35);opacity:0;animation:lgGlow 2s ease-in-out infinite;}
        @keyframes lgGlow{0%,100%{opacity:0}50%{opacity:.7}}
        .lg-btn:hover{transform:translateY(-2px) scale(1.01);box-shadow:0 0 0 1px rgba(234,179,8,.5),0 8px 32px rgba(234,179,8,.4);}
        .lg-btn:active{transform:scale(.98);}

        /* Link */
        .lg-link{color:var(--gold);font-weight:600;text-decoration:none;transition:all .18s;}
        .lg-link:hover{color:var(--gold3);text-shadow:0 0 10px rgba(234,179,8,.5);}

        /* Stagger */
        .lg-in{opacity:0;transform:translateY(16px);transition:opacity .5s ease,transform .5s ease;}
        .lg-in.show{opacity:1;transform:translateY(0);}
        .d0{transition-delay:.04s}.d1{transition-delay:.1s}.d2{transition-delay:.16s}
        .d3{transition-delay:.22s}.d4{transition-delay:.28s}.d5{transition-delay:.34s}

        /* RIGHT */
        .lg-right{background:#080808;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:38px 28px;}
        .lg-right-grid{position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(234,179,8,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(234,179,8,0.028) 1px,transparent 1px);background-size:34px 34px;}
        .lg-r-orb1{position:absolute;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(234,179,8,0.08) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-60%);animation:lgPulse 5s ease-in-out infinite;pointer-events:none;}
        .lg-r-orb2{position:absolute;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,rgba(96,165,250,0.07) 0%,transparent 70%);bottom:18%;right:10%;animation:lgPulse 8s ease-in-out infinite reverse;pointer-events:none;}

        /* Feature row */
        .lg-feature {
          display:flex;align-items:center;gap:13px;
          padding:12px 14px;border-radius:12px;
          background:#0d0d0d;border:1px solid #1a1a1a;
          transition:all .22s ease;cursor:default;
        }
        .lg-feature:hover{background:#141208;transform:translateX(5px);}

        /* Badge pill */
        .lg-feat-badge{padding:2px 7px;border-radius:5px;font-size:.6rem;font-weight:800;letter-spacing:.07em;text-transform:uppercase;}

        /* Divider */
        .lg-divider{height:1px;background:linear-gradient(90deg,transparent,#1e1e1e,transparent);margin:0 4px;}

        /* Quote card */
        .lg-quote{margin-top:18px;padding:14px 16px;border-radius:14px;text-align:center;background:rgba(234,179,8,0.04);border:1px solid rgba(234,179,8,0.1);}

        /* Right title */
        .lg-r-title{font-family:'Space Grotesk',sans-serif;font-size:1.1rem;font-weight:800;color:#fff;letter-spacing:.15em;text-transform:uppercase;text-align:center;}
        .lg-r-divider{width:32px;height:2px;border-radius:999px;margin:8px auto 20px;background:linear-gradient(90deg,#eab308,#f59e0b);box-shadow:0 0 10px rgba(234,179,8,.5);}

        @media(max-width:768px){.lg-card{grid-template-columns:1fr;}.lg-right{display:none;}}
      `}</style>

      <div className="lg-page">
        <div className="lg-spotlight" />
        <div className="lg-noise" />
        <div className="lg-grid" />
        <div className="lg-orb1"/><div className="lg-orb2"/><div className="lg-orb3"/>

        {/* Floating particles */}
        {PARTICLES.map(p => (
          <div key={p.id} className="lg-particle" style={{
            left:`${p.x}%`, top:`${p.y}%`,
            width:p.size, height:p.size,
            background:p.color, boxShadow:`0 0 ${p.size*2}px ${p.color}`,
            animation:`lgParticle ${p.dur}s ${p.delay}s ease-in-out infinite`
          }} />
        ))}

        <Navbar />

        <div className="lg-wrap">
          <div className="lg-card" ref={cardRef}>

            {/* ── LEFT ── */}
            <div className="lg-left">

              <div className={`lg-in d0${visible ? ' show' : ''}`}>
                <div className="lg-badge">
                  <span className="lg-badge-dot" />&nbsp;Welcome Back&nbsp;
                  <Sparkles size={10} />
                </div>
                <h1 className="lg-title">Sign In</h1>
                <p className="lg-sub">Continue your journey on TalentLens</p>
              </div>

              <form onSubmit={submitHandler} style={{ display:'flex', flexDirection:'column', gap:14 }}>

                {/* Email */}
                <div className={`lg-in d1${visible ? ' show' : ''} lg-field`}>
                  <label className="lg-label">Email Address</label>
                  <div className="lg-input-wrap">
                    <svg className="lg-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/></svg>
                    <input className="lg-input" type="email" name="email"
                      value={input.email} onChange={changeEventHandler}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused('')}
                      placeholder="your.email@example.com" />
                  </div>
                </div>

                {/* Password */}
                <div className={`lg-in d2${visible ? ' show' : ''} lg-field`}>
                  <label className="lg-label">Password</label>
                  <div className="lg-input-wrap">
                    <svg className="lg-ico" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <input className="lg-input" type="password" name="password"
                      value={input.password} onChange={changeEventHandler}
                      onFocus={() => setFocused('password')} onBlur={() => setFocused('')}
                      placeholder="••••••••" />
                  </div>
                </div>

                {/* Role */}
                <div className={`lg-in d3${visible ? ' show' : ''}`}>
                  <label className="lg-label" style={{ marginBottom:8 }}>I am a</label>
                  <RadioGroup style={{ display:'flex', gap:10 }}>
                    {[
                      { val:'student',   Icon:GraduationCap, title:'Student',   sub:'Find jobs & internships' },
                      { val:'recruiter', Icon:Briefcase,     title:'Recruiter', sub:'Scout top talent'        },
                    ].map(({ val, Icon, title, sub }) => (
                      <label key={val} className={`lg-role${input.role === val ? ' active' : ''}`}>
                        <input type="radio" name="role" value={val}
                          checked={input.role === val} onChange={changeEventHandler}
                          style={{ display:'none' }} />
                        <div style={{
                          width:34, height:34, borderRadius:9, flexShrink:0,
                          background: input.role === val ? 'rgba(234,179,8,0.15)' : 'rgba(234,179,8,0.05)',
                          border:`1px solid ${input.role === val ? 'rgba(234,179,8,0.4)' : 'rgba(234,179,8,0.1)'}`,
                          display:'flex', alignItems:'center', justifyContent:'center', transition:'all .2s'
                        }}>
                          <Icon size={16} style={{ color:'#eab308' }} />
                        </div>
                        <div style={{ flex:1 }}>
                          <p style={{ color:'#e0e0e0', fontSize:'.85rem', fontWeight:600, margin:0 }}>{title}</p>
                          <p style={{ color:'#333', fontSize:'.7rem', margin:0 }}>{sub}</p>
                        </div>
                        <div className="lg-check">
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

                {/* CTA */}
                <div className={`lg-in d4${visible ? ' show' : ''}`}>
                  {loading ? (
                    <button className="lg-btn" disabled>
                      <Loader2 size={16} style={{ animation:'lgSpin 1s linear infinite' }} />
                      Please wait...
                    </button>
                  ) : (
                    <button type="submit" className="lg-btn">
                      Login <ArrowRight size={14} strokeWidth={2.5} />
                    </button>
                  )}
                  <p style={{ color:'#444', fontSize:'.82rem', textAlign:'center', marginTop:14 }}>
                    Don't have an account?{' '}
                    <Link to="/signup" className="lg-link">Sign up →</Link>
                  </p>
                </div>

              </form>
            </div>

            {/* ── RIGHT ── */}
            <div className="lg-right">
              <div className="lg-right-grid"/>
              <div className="lg-r-orb1"/><div className="lg-r-orb2"/>

              {/* Static outer, only icon floats */}
              <div style={{ position:'relative', zIndex:1, width:'100%' }}>

                {/* Title */}
                <div style={{ marginBottom:20 }}>
                  <p className="lg-r-title">Why TalentLens?</p>
                  <div className="lg-r-divider" />
                </div>

                {/* Feature list — static, no float */}
                <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                  {FEATURES.map(({ icon: Icon, title, desc, badge, badgeBg, badgeBorder, badgeColor, iconBg, iconBorder, iconColor, hoverBorder, hoverShadow }, i) => (
                    <div key={i}>
                      <div className="lg-feature"
                        onMouseEnter={e => {
                          e.currentTarget.style.borderColor = hoverBorder
                          e.currentTarget.style.boxShadow = `0 0 16px ${hoverShadow}`
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.borderColor = '#1a1a1a'
                          e.currentTarget.style.boxShadow = 'none'
                        }}
                      >
                        <div style={{
                          width:36, height:36, borderRadius:10, flexShrink:0,
                          background:iconBg, border:`1px solid ${iconBorder}`,
                          display:'flex', alignItems:'center', justifyContent:'center'
                        }}>
                          <Icon size={15} style={{ color:iconColor }} />
                        </div>
                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                            <p style={{ color:'#e0e0e0', fontSize:'.83rem', fontWeight:600, margin:0 }}>{title}</p>
                            {badge && (
                              <span className="lg-feat-badge" style={{ background:badgeBg, border:`1px solid ${badgeBorder}`, color:badgeColor }}>
                                {badge}
                              </span>
                            )}
                          </div>
                          <p style={{ color:'#383838', fontSize:'.7rem', margin:0 }}>{desc}</p>
                        </div>
                      </div>
                      {i < FEATURES.length - 1 && <div className="lg-divider" />}
                    </div>
                  ))}
                </div>

                {/* Quote */}
                <div className="lg-quote">
                  <p style={{ fontSize:'.75rem', fontStyle:'italic', lineHeight:1.65, color:'#555' }}>
                    "The best time to find your dream job was yesterday. The second best time is{' '}
                    <span style={{ color:'#eab308', fontStyle:'normal', fontWeight:600 }}>right now.</span>"
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login