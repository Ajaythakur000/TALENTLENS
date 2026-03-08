import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .tl-footer {
          position: relative;
          background: #070707;
          border-top: 1px solid rgba(255,255,255,0.04);
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* Animated gold top line */
        .tl-footer::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg,
            transparent, #eab308 40%, #f59e0b 50%, #eab308 60%, transparent);
          background-size: 200% 100%;
          animation: ftBorder 4s linear infinite;
        }
        @keyframes ftBorder {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Bottom orb */
        .tl-footer-orb {
          position: absolute; bottom: -80px; left: 50%;
          transform: translateX(-50%);
          width: 600px; height: 200px; border-radius: 999px;
          background: radial-gradient(ellipse, rgba(234,179,8,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .tl-footer-inner {
          position: relative; z-index: 1;
          max-width: 1200px; margin: 0 auto;
          padding: 52px 28px 28px;
        }

        /* ── TOP ROW ── */
        .tl-footer-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 2rem; flex-wrap: wrap;
          padding-bottom: 36px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }

        /* Brand */
        .tl-footer-brand {}

        .tl-foot-logo {
          display: inline-flex; align-items: center; gap: 9px;
          text-decoration: none; margin-bottom: 14px;
        }
        .tl-foot-logo-box {
          width: 30px; height: 30px; border-radius: 8px;
          background: linear-gradient(135deg, #eab308, #f59e0b);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 900; color: #000;
          font-family: 'Space Grotesk', sans-serif;
          box-shadow: 0 0 16px rgba(234,179,8,0.35);
          letter-spacing: .04em;
        }
        .tl-foot-logo-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem; font-weight: 800;
          color: #e0e0e0; letter-spacing: .06em;
        }
        .tl-foot-logo-name span { color: #eab308; }

        .tl-foot-tagline {
          font-size: .8rem; color: #383838; line-height: 1.7;
          max-width: 300px; margin: 0;
        }

        /* Socials */
        .tl-socials {
          display: flex; gap: .6rem; flex-wrap: wrap; padding-top: .2rem;
        }

        .tl-social-btn {
          width: 38px; height: 38px; border-radius: 11px;
          display: flex; align-items: center; justify-content: center;
          background: #0e0e0e; border: 1px solid #1e1e1e;
          color: #383838; text-decoration: none;
          transition: all .22s; flex-shrink: 0;
        }
        .tl-social-btn:hover {
          border-color: rgba(234,179,8,0.4);
          color: #eab308;
          background: rgba(234,179,8,0.07);
          box-shadow: 0 0 16px rgba(234,179,8,0.15);
          transform: translateY(-2px);
        }

        /* ── BOTTOM BAR ── */
        .tl-footer-bottom {
          display: flex; align-items: center;
          justify-content: space-between;
          padding-top: 22px; gap: 1rem; flex-wrap: wrap;
        }

        .tl-foot-copy {
          font-size: .72rem; color: #2e2e2e; margin: 0;
          font-family: 'Inter', sans-serif;
        }
        .tl-foot-copy span { color: #eab308; font-weight: 600; }

        /* Live badge */
        .tl-foot-badge {
          display: inline-flex; align-items: center; gap: .45rem;
          padding: .3rem .85rem; border-radius: 999px;
          background: rgba(234,179,8,0.06);
          border: 1px solid rgba(234,179,8,0.16);
          font-size: .68rem; color: #666; font-weight: 600;
          letter-spacing: .04em;
        }
        .tl-foot-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #eab308;
          box-shadow: 0 0 7px rgba(234,179,8,0.8);
          animation: ftBlink 2s ease-in-out infinite;
        }
        @keyframes ftBlink { 0%,100%{opacity:1} 50%{opacity:.3} }

        /* Legal links */
        .tl-foot-legal { display: flex; gap: 1.2rem; }
        .tl-foot-legal a {
          font-size: .72rem; color: #2e2e2e;
          text-decoration: none; transition: color .18s;
          font-family: 'Inter', sans-serif;
        }
        .tl-foot-legal a:hover { color: #eab308; }

        @media (max-width: 600px) {
          .tl-footer-top { flex-direction: column; }
          .tl-footer-bottom { flex-direction: column; align-items: flex-start; gap: .75rem; }
        }
      `}</style>

      <footer className="tl-footer">
        <div className="tl-footer-orb" />

        <div className="tl-footer-inner">

          {/* ── TOP ROW ── */}
          <div className="tl-footer-top">

            {/* Brand */}
            <div className="tl-footer-brand">
              <Link to="/" className="tl-foot-logo">
                <div className="tl-foot-logo-box">TL</div>
                <span className="tl-foot-logo-name">TALENT<span>LENS</span></span>
              </Link>
              <p className="tl-foot-tagline">
                Connecting top tech talent with the best companies.<br />
                Your next opportunity is one click away.
              </p>
            </div>

            {/* Socials */}
            <div className="tl-socials">

              {/* Instagram */}
              <a href="https://www.instagram.com/ajayyfication?igsh=MXBpa2ZhYmExNHZ0Zg==" target="_blank" rel="noopener noreferrer" className="tl-social-btn" aria-label="Instagram">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>

              {/* Threads */}
              <a href="https://www.threads.com/@ajayyfication" target="_blank" rel="noopener noreferrer" className="tl-social-btn" aria-label="Threads">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 192 192">
                  <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.15 170.038 114.868 172.182 95.5802 172.182C80.0598 172.182 64.3312 169.539 49.6953 164.444L44.0604 179.805C59.7289 185.251 77.2913 188.188 95.5802 188.188C118.91 188.188 139.734 185.045 153.861 170.936C170.52 154.296 170.838 132.618 165.756 120.781C160.897 109.462 153.153 101.442 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/ajayy-thakkurr?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="tl-social-btn" aria-label="LinkedIn">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 0H1.771C.791 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451c.979 0 1.771-.774 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z"/>
                </svg>
              </a>

              {/* GitHub */}
              <a href="https://github.com/Ajaythakur000" target="_blank" rel="noopener noreferrer" className="tl-social-btn" aria-label="GitHub">
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

            </div>
          </div>

          {/* ── BOTTOM BAR ── */}
          <div className="tl-footer-bottom">
            <p className="tl-foot-copy">© 2026 <span>TalentLens</span>. All rights reserved.</p>

            <div className="tl-foot-badge">
              <div className="tl-foot-badge-dot" />
              Live &amp; Active
            </div>

            <div className="tl-foot-legal">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>

        </div>
      </footer>
    </>
  );
};

export default Footer;