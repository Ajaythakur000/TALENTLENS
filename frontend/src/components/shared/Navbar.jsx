import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, ChevronRight } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 25)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true })
      if (res.status === 200) {
        dispatch(setUser(null))
        navigate('/')
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
  }

  const isActive = (path) => location.pathname === path

  const studentLinks   = [{ to: '/', label: 'Home' }, { to: '/jobs', label: 'Jobs' }, { to: '/browse', label: 'Browse' }]
  const recruiterLinks = [{ to: '/admin/companies', label: 'Companies' }, { to: '/admin/jobs', label: 'Jobs' }]
  const links = user?.role === 'recruiter' ? recruiterLinks : studentLinks

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        /* ── Wrapper ── */
        .tl-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 0 24px;
          background: #0d0b04;
          border-bottom: 1px solid rgba(234,179,8,0.08);
          transition: all .4s cubic-bezier(.4,0,.2,1);
          font-family: 'Inter', sans-serif;
        }

        /* ── Scrolled: floating pill ── */
        .tl-nav.scrolled {
          padding: 10px 40px;
          background: #0d0b04;
          border-bottom-color: transparent;
        }
        .tl-nav-inner {
          max-width: 1200px; margin: 0 auto;
          height: 64px; padding: 0 4px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all .4s cubic-bezier(.4,0,.2,1);
        }
        .tl-nav.scrolled .tl-nav-inner {
          height: 52px;
          max-width: 900px;
          border-radius: 999px;
          background: rgba(18,14,4,0.92);
          backdrop-filter: blur(28px) saturate(180%);
          -webkit-backdrop-filter: blur(28px) saturate(180%);
          border: 1px solid rgba(234,179,8,0.12);
          box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(234,179,8,0.07), inset 0 1px 0 rgba(234,179,8,0.04);
          padding: 0 22px;
        }

        /* ── Animated gold border on scrolled pill ── */
        .tl-nav.scrolled .tl-nav-inner::before {
          content: '';
          position: absolute; top: 0; left: 10%; right: 10%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(234,179,8,0.4) 40%, rgba(245,158,11,0.5) 50%, rgba(234,179,8,0.4) 60%, transparent);
          background-size: 200% 100%;
          animation: nbBorder 3s linear infinite;
          border-radius: 999px;
        }
        @keyframes nbBorder { 0%{background-position:200% 0} 100%{background-position:-200% 0} }

        /* ── Logo ── */
        .tl-logo {
          font-size: 1rem; font-weight: 800; letter-spacing: .05em;
          text-decoration: none; display: flex; align-items: center; gap: 8px; flex-shrink: 0;
          font-family: 'Space Grotesk', sans-serif;
        }
        .tl-logo-box {
          width: 30px; height: 30px; border-radius: 8px;
          background: linear-gradient(135deg, #eab308, #f5c842);
          display: flex; align-items: center; justify-content: center;
          font-size: .7rem; font-weight: 900; color: #080808; flex-shrink: 0;
          box-shadow: 0 0 14px rgba(234,179,8,0.45);
          letter-spacing: 0;
        }
        .tl-logo-talent { color: #e0e0e0; }
        .tl-logo-lens   { color: #eab308; }

        /* ── Nav links ── */
        .tl-links {
          display: flex; align-items: center; gap: 2px;
          list-style: none; margin: 0; padding: 0;
        }
        .tl-sep {
          width: 3px; height: 3px; border-radius: 50%;
          background: #282828; flex-shrink: 0; margin: 0 2px;
        }
        .tl-nav-link {
          position: relative; font-size: .83rem; font-weight: 500;
          color: #666; text-decoration: none;
          padding: 6px 13px; border-radius: 8px;
          border: 1px solid transparent;
          transition: color .2s, background .2s, border-color .2s;
          display: flex; align-items: center;
        }
        .tl-nav-link:hover {
          color: #eab308; background: rgba(234,179,8,0.07);
          border-color: rgba(234,179,8,0.22);
        }
        .tl-nav-link.active { color: #eab308; }
        .tl-nav-link.active::after {
          content: '';
          position: absolute; bottom: 2px; left: 50%;
          transform: translateX(-50%);
          width: 18px; height: 2px; border-radius: 999px;
          background: #eab308; box-shadow: 0 0 8px rgba(234,179,8,.8);
        }

        /* ── Actions ── */
        .tl-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }

        /* Login */
        .tl-login-btn {
          padding: 7px 18px; border-radius: 9px;
          border: 1px solid #222; background: transparent;
          color: #666; font-size: .8rem; font-weight: 500;
          cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center;
          transition: all .2s; letter-spacing: .02em;
          font-family: 'Inter', sans-serif;
        }
        .tl-login-btn:hover {
          border-color: rgba(234,179,8,0.4); color: #eab308;
          background: rgba(234,179,8,0.06);
        }

        /* Get Started */
        .tl-cta-btn {
          padding: 8px 20px; border-radius: 999px; border: none;
          background: linear-gradient(135deg, #eab308, #f5c040);
          color: #080808; font-size: .8rem; font-weight: 700;
          cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 5px;
          box-shadow: 0 0 20px rgba(234,179,8,.35), 0 4px 12px rgba(0,0,0,.3);
          position: relative; overflow: hidden;
          transition: transform .18s, box-shadow .18s;
          letter-spacing: .03em; font-family: 'Space Grotesk', sans-serif;
        }
        .tl-cta-btn::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 55%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,.28), transparent);
          transition: left .42s ease;
        }
        .tl-cta-btn:hover::before { left: 160%; }
        .tl-cta-btn:hover {
          transform: scale(1.05) translateY(-1px);
          box-shadow: 0 0 30px rgba(234,179,8,.55), 0 6px 20px rgba(0,0,0,.4);
        }

        /* Avatar */
        .tl-avatar-wrap {
          border-radius: 999px; border: 2px solid rgba(234,179,8,.3);
          cursor: pointer; display: flex;
          transition: border-color .2s, box-shadow .2s;
        }
        .tl-avatar-wrap:hover {
          border-color: #eab308; box-shadow: 0 0 14px rgba(234,179,8,.3);
        }

        /* Popover */
        .tl-pop {
          background: #0e0e0e !important;
          border: 1px solid #1e1e1e !important;
          border-radius: 16px !important;
          padding: 14px !important;
          box-shadow: 0 16px 50px rgba(0,0,0,.7), 0 0 0 1px rgba(234,179,8,.05) !important;
          backdrop-filter: blur(20px) !important;
          position: relative; overflow: hidden;
        }
        /* Gold top border on popover */
        .tl-pop::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg, transparent, #eab308 40%, #f59e0b 60%, transparent);
        }

        .tl-pop-user {
          display: flex; gap: 10px; align-items: center;
          padding-bottom: 12px; margin-bottom: 8px;
          border-bottom: 1px solid #151515;
        }
        .tl-pop-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          border: 1.5px solid rgba(234,179,8,.35); flex-shrink: 0;
        }
        .tl-pop-name { color: #e0e0e0; font-weight: 600; font-size: .83rem; }
        .tl-pop-bio  { color: #383838; font-size: .7rem; margin-top: 2px; }

        .tl-pop-actions { display: flex; flex-direction: column; gap: 2px; }
        .tl-pop-item {
          display: flex; align-items: center; gap: 9px;
          padding: 9px 11px; border-radius: 9px;
          color: #555; font-size: .8rem; font-weight: 500;
          cursor: pointer; transition: all .18s;
          text-decoration: none; border: none; background: none;
          width: 100%; text-align: left; font-family: 'Inter', sans-serif;
        }
        .tl-pop-item:hover { background: rgba(234,179,8,.07); color: #eab308; }

        /* Spacer */
        .tl-spacer { height: 64px; }
      `}</style>

      <nav className={`tl-nav${scrolled ? ' scrolled' : ''}`}>
        <div className="tl-nav-inner" style={{ position: 'relative' }}>

          {/* LOGO */}
          <Link to="/" className="tl-logo">
            <div className="tl-logo-box">TL</div>
            <span className="tl-logo-talent">TALENT</span>
            <span className="tl-logo-lens">LENS</span>
          </Link>

          {/* LINKS */}
          <ul className="tl-links">
            {links.map((link, i) => (
              <React.Fragment key={link.to}>
                {i > 0 && <li><span className="tl-sep" /></li>}
                <li>
                  <Link
                    to={link.to}
                    className={`tl-nav-link${isActive(link.to) ? ' active' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              </React.Fragment>
            ))}
          </ul>

          {/* RIGHT */}
          <div className="tl-actions">
            {!user ? (
              <>
                <Link to="/login" className="tl-login-btn">Login</Link>
                <Link to="/signup" className="tl-cta-btn">
                  Get Started <ChevronRight size={14} strokeWidth={2.5} />
                </Link>
              </>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <div className="tl-avatar-wrap">
                    <Avatar>
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                    </Avatar>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="tl-pop w-60" align="end">

                  {/* User info */}
                  <div className="tl-pop-user">
                    <Avatar className="tl-pop-avatar">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@user" />
                    </Avatar>
                    <div>
                      <p className="tl-pop-name">{user?.fullname}</p>
                      {user?.role === 'student' && (
                        <p className="tl-pop-bio">{user?.profile?.bio || 'No bio yet'}</p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="tl-pop-actions">
                    {user.role === 'student' && (
                      <Link to="/profile" className="tl-pop-item">
                        <User2 size={14} /> View Profile
                      </Link>
                    )}
                    <button onClick={logoutHandler} className="tl-pop-item">
                      <LogOut size={14} /> Logout
                    </button>
                  </div>

                </PopoverContent>
              </Popover>
            )}
          </div>

        </div>
      </nav>

      <div className="tl-spacer" />
    </>
  )
}

export default Navbar