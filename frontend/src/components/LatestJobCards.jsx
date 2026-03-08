import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Briefcase, IndianRupee, Users, ArrowUpRight } from 'lucide-react'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate()
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    card.style.setProperty('--cx', `${e.clientX - rect.left}px`)
    card.style.setProperty('--cy', `${e.clientY - rect.top}px`)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        .jc-card {
          --cx: 50%; --cy: 50%;
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 16px; padding: 20px;
          cursor: pointer; position: relative; overflow: hidden;
          transition: all .28s ease;
          font-family: 'Inter', sans-serif;
        }
        .jc-card:hover {
          border-color: rgba(234,179,8,0.3);
          transform: translateY(-4px);
          box-shadow: 0 0 30px rgba(234,179,8,0.1), 0 12px 28px rgba(0,0,0,0.5);
        }

        /* Mouse follow glow */
        .jc-card::after {
          content: '';
          position: absolute;
          width: 280px; height: 280px;
          left: var(--cx); top: var(--cy);
          transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
          opacity: 0; transition: opacity .2s;
        }
        .jc-card:hover::after { opacity: 1; }

        /* Top gold line */
        .jc-top-line {
          position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg, transparent, #eab308 40%, #f59e0b 60%, transparent);
          opacity: 0; transition: opacity .28s;
        }
        .jc-card:hover .jc-top-line { opacity: 1; }

        /* Arrow */
        .jc-arrow {
          position: absolute; top: 14px; right: 14px;
          width: 28px; height: 28px; border-radius: 8px;
          background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.22);
          display: flex; align-items: center; justify-content: center;
          opacity: 0; transform: scale(.8);
          transition: opacity .2s, transform .2s;
        }
        .jc-card:hover .jc-arrow { opacity: 1; transform: scale(1); }

        /* Company row */
        .jc-co-row { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
        .jc-co-av {
          width: 38px; height: 38px; border-radius: 10px;
          background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.15);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Space Grotesk', sans-serif;
          font-size: .85rem; font-weight: 800; color: #eab308; flex-shrink: 0;
          transition: all .25s;
        }
        .jc-card:hover .jc-co-av { background: rgba(234,179,8,0.14); }
        .jc-co-name {
          font-family: 'Space Grotesk', sans-serif;
          color: #d0d0d0; font-weight: 600; font-size: .88rem; line-height: 1.2;
        }
        .jc-co-loc {
          color: #333; font-size: .7rem;
          display: flex; align-items: center; gap: 3px; margin-top: 2px;
        }

        /* Divider */
        .jc-divider {
          height: 1px; background: linear-gradient(90deg, #1a1a1a, transparent);
          margin-bottom: 14px;
        }

        /* Title */
        .jc-title {
          font-family: 'Space Grotesk', sans-serif;
          color: #e0e0e0; font-weight: 700; font-size: .95rem;
          margin-bottom: 7px; line-height: 1.3;
        }

        /* Desc */
        .jc-desc {
          color: #383838; font-size: .78rem; line-height: 1.65;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
          margin-bottom: 16px;
        }

        /* Badges */
        .jc-badges { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .jc-badge {
          display: inline-flex; align-items: center; gap: 4px;
          padding: 4px 10px; border-radius: 7px;
          font-size: .68rem; font-weight: 600; border: 1px solid;
        }
      `}</style>

      <div
        ref={cardRef}
        className="jc-card"
        onClick={() => navigate(`/description/${job?._id}`)}
        onMouseMove={handleMouseMove}
      >
        <div className="jc-top-line" />
        <div className="jc-arrow"><ArrowUpRight size={14} color="#eab308" /></div>

        {/* Company */}
        <div className="jc-co-row">
          <div className="jc-co-av">{job?.company?.name?.charAt(0)?.toUpperCase() || '?'}</div>
          <div>
            <div className="jc-co-name">{job?.company?.name}</div>
            <div className="jc-co-loc"><MapPin size={10} /> India</div>
          </div>
        </div>

        <div className="jc-divider" />

        <h2 className="jc-title">{job?.title}</h2>
        <p className="jc-desc">{job?.description}</p>

        <div className="jc-badges">
          <span className="jc-badge" style={{ background:'rgba(96,165,250,0.08)', borderColor:'rgba(96,165,250,0.2)', color:'#60a5fa' }}>
            <Users size={10} /> {job?.position} Positions
          </span>
          <span className="jc-badge" style={{ background:'rgba(52,211,153,0.08)', borderColor:'rgba(52,211,153,0.2)', color:'#34d399' }}>
            <Briefcase size={10} /> {job?.jobType}
          </span>
          <span className="jc-badge" style={{ background:'rgba(234,179,8,0.08)', borderColor:'rgba(234,179,8,0.2)', color:'#eab308' }}>
            <IndianRupee size={10} /> {job?.salary} LPA
          </span>
        </div>
      </div>
    </>
  )
}

export default LatestJobCards