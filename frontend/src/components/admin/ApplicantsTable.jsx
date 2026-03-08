import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal, UserX, CheckCircle, XCircle, FileText, Clock } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

const shortlistingStatus = ["Accepted", "Rejected"]

const statusConfig = {
  Accepted: {
    icon: CheckCircle,
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.07)',
    border: 'rgba(34,197,94,0.2)',
    hoverBg: 'rgba(34,197,94,0.12)',
  },
  Rejected: {
    icon: XCircle,
    color: '#f87171',
    bg: 'rgba(248,113,113,0.07)',
    border: 'rgba(248,113,113,0.2)',
    hoverBg: 'rgba(248,113,113,0.12)',
  },
  pending: {
    icon: Clock,
    color: '#666',
    bg: 'rgba(100,100,100,0.07)',
    border: 'rgba(100,100,100,0.18)',
  }
}

const ApplicantsTable = () => {
  const { applicants } = useSelector(store => store.application)
  const dispatch = useDispatch()

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status })
      if (res.status === 200) {
        // Update Redux store immediately so UI reflects change
        const updatedApplications = applicants.applications.map(app =>
          app._id === id ? { ...app, status: status.toLowerCase() } : app
        )
        dispatch(setAllApplicants({ ...applicants, applications: updatedApplications }))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    }
  }

  const handleRowMove = (e) => {
    const row = e.currentTarget
    const rect = row.getBoundingClientRect()
    row.style.setProperty('--rx', `${e.clientX - rect.left}px`)
    row.style.setProperty('--ry', `${e.clientY - rect.top}px`)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap');

        .apt-wrap { width: 100%; }

        /* Empty */
        .apt-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 5rem 2rem; text-align: center; gap: 1.2rem;
        }
        .apt-empty-box {
          width: 72px; height: 72px; border-radius: 20px;
          background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.12);
          display: flex; align-items: center; justify-content: center; color: #eab308;
          animation: aptFloat 3s ease-in-out infinite;
        }
        @keyframes aptFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .apt-empty h3 { font-family:'Space Grotesk',sans-serif; font-size:1rem; font-weight:700; color:#444; margin:0; }
        .apt-empty p  { font-size:.78rem; color:#282828; margin:0; line-height:1.6; }

        /* Table */
        .apt-table-wrap { overflow-x: auto; }

        table.apt {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 3px;
          font-family: 'Inter', sans-serif;
          padding: 1rem 1.2rem;
        }

        table.apt thead th {
          padding: .6rem 1.2rem 1rem;
          font-size: .6rem; font-weight: 700; letter-spacing: .15em;
          text-transform: uppercase; color: #555;
          text-align: left; white-space: nowrap;
          border-bottom: 1px solid #1a1a1a;
        }
        table.apt thead th:last-child { text-align: right; }

        /* Row */
        .apt-tr { --rx: 50%; --ry: 50%; cursor: default; }
        .apt-tr td {
          padding: .95rem 1.2rem;
          background: #0d0d0d;
          transition: background .2s;
          vertical-align: middle;
        }
        .apt-tr td:first-child {
          border-radius: 12px 0 0 12px;
          border-left: 2px solid transparent;
          transition: border-color .25s, background .2s;
          position: relative;
        }
        .apt-tr td:last-child { border-radius: 0 12px 12px 0; text-align: right; }
        .apt-tr:hover td { background: #111; }
        .apt-tr:hover td:first-child { border-left-color: #eab308; }

        /* Mouse glow */
        .apt-tr td:first-child::after {
          content: '';
          position: absolute; width: 240px; height: 240px;
          left: var(--rx); top: var(--ry);
          transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
          opacity: 0; transition: opacity .2s;
        }
        .apt-tr:hover td:first-child::after { opacity: 1; }

        /* Index */
        .apt-idx {
          font-family: 'JetBrains Mono', monospace;
          font-size: .68rem; font-weight: 500; color: #444;
          min-width: 24px; display: inline-block; text-align: center;
        }

        /* Avatar */
        .apt-avatar-wrap { display: flex; align-items: center; gap: .7rem; }
        .apt-avatar {
          width: 32px; height: 32px; border-radius: 50%;
          background: linear-gradient(135deg, #1a1a1a, #222);
          border: 1px solid #2a2a2a;
          display: flex; align-items: center; justify-content: center;
          font-size: .72rem; font-weight: 700; color: #eab308;
          font-family: 'Space Grotesk', sans-serif; flex-shrink: 0;
          transition: all .25s;
        }
        .apt-tr:hover .apt-avatar {
          background: rgba(234,179,8,0.1); border-color: rgba(234,179,8,0.25);
        }
        .apt-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: .88rem; font-weight: 600; color: #d0d0d0;
        }

        /* Email / phone */
        .apt-email { font-size: .8rem; color: #555; }
        .apt-phone {
          font-family: 'JetBrains Mono', monospace;
          font-size: .75rem; color: #555;
        }

        /* Resume link */
        .apt-resume {
          display: inline-flex; align-items: center; gap: .35rem;
          font-size: .75rem; color: #6366f1; font-weight: 500;
          text-decoration: none; transition: color .2s;
        }
        .apt-resume:hover { color: #818cf8; }
        .apt-na { font-size: .75rem; color: #2e2e2e; }

        /* Date */
        .apt-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: .72rem; color: #666;
        }

        /* Action button */
        .apt-action-btn {
          width: 32px; height: 32px; border-radius: 9px;
          background: transparent; border: 1px solid #1e1e1e;
          display: inline-flex; align-items: center; justify-content: center;
          color: #444; cursor: pointer; transition: all .22s;
          margin-left: auto;
        }
        .apt-action-btn:hover { background: #161616; border-color: #2a2a2a; color: #888; }

        /* Popover */
        .apt-pop {
          background: #0f0f0f !important;
          border: 1px solid #1e1e1e !important;
          border-radius: 14px !important;
          padding: .55rem !important;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7) !important;
          min-width: 160px !important;
        }
        .apt-pop-title {
          font-size: .55rem; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #333;
          padding: .3rem .7rem .5rem;
          font-family: 'Inter', sans-serif;
        }
        .apt-pop-item {
          display: flex; align-items: center; gap: .65rem;
          padding: .6rem .8rem; border-radius: 9px;
          font-size: .82rem; font-weight: 600; cursor: pointer;
          transition: all .18s; font-family: 'Space Grotesk', sans-serif;
          border: 1px solid transparent; margin-bottom: .2rem;
        }

        /* Footer */
        .apt-footer {
          text-align: center; padding: 1.2rem 0 .5rem;
          font-size: .62rem; color: #383838; letter-spacing: .1em;
          text-transform: uppercase; font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="apt-wrap">
        {!applicants?.applications || applicants.applications.length === 0 ? (
          <div className="apt-empty">
            <div className="apt-empty-box"><UserX size={28} /></div>
            <h3>No applicants yet</h3>
            <p>Applications for this job opening will appear here.</p>
          </div>
        ) : (
          <>
            <div className="apt-table-wrap">
              <table className="apt">
                <thead>
                  <tr>
                    <th style={{ width: 32 }}>#</th>
                    <th>Applicant</th>
                    <th>Email</th>
                    <th>Contact</th>
                    <th>Resume</th>
                    <th>Applied On</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applicants.applications.map((item, i) => (
                    <tr key={item._id} className="apt-tr" onMouseMove={handleRowMove}>

                      {/* Index */}
                      <td><span className="apt-idx">{String(i + 1).padStart(2, '0')}</span></td>

                      {/* Name */}
                      <td>
                        <div className="apt-avatar-wrap">
                          <div className="apt-avatar">
                            {item?.applicant?.fullname?.charAt(0).toUpperCase()}
                          </div>
                          <span className="apt-name">{item?.applicant?.fullname}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td><span className="apt-email">{item?.applicant?.email}</span></td>

                      {/* Phone */}
                      <td><span className="apt-phone">{item?.applicant?.phoneNumber}</span></td>

                      {/* Resume */}
                      <td>
                        {item?.applicant?.profile?.resume ? (
                          <a
                            className="apt-resume"
                            href={item.applicant.profile.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileText size={12} />
                            {item.applicant.profile.resumeOriginalName}
                          </a>
                        ) : (
                          <span className="apt-na">—</span>
                        )}
                      </td>

                      {/* Date */}
                      <td><span className="apt-date">{item?.applicant?.createdAt?.split('T')[0]}</span></td>

                      {/* Current Status */}
                      <td>
                        {(() => {
                          const s = item?.status || 'pending'
                          const key = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
                          const cfg = statusConfig[s] || statusConfig['pending']
                          const Icon = cfg.icon
                          return (
                            <span style={{
                              display: 'inline-flex', alignItems: 'center', gap: 5,
                              padding: '4px 10px', borderRadius: 8,
                              background: cfg.bg, border: `1px solid ${cfg.border}`,
                              color: cfg.color, fontSize: '.7rem', fontWeight: 600,
                              fontFamily: "'Space Grotesk', sans-serif",
                              textTransform: 'capitalize', whiteSpace: 'nowrap'
                            }}>
                              <Icon size={11} />
                              {key}
                            </span>
                          )
                        })()}
                      </td>

                      {/* Action */}
                      <td>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="apt-action-btn">
                              <MoreHorizontal size={15} />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="apt-pop" align="end">
                            <div className="apt-pop-title">Update Status</div>
                            {shortlistingStatus.map((status) => {
                              const cfg = statusConfig[status]
                              const Icon = cfg.icon
                              const isCurrent = item?.status?.toLowerCase() === status.toLowerCase()
                              return (
                                <div
                                  key={status}
                                  className="apt-pop-item"
                                  style={{
                                    color: cfg.color,
                                    background: isCurrent ? cfg.hoverBg : cfg.bg,
                                    borderColor: isCurrent ? cfg.color : cfg.border,
                                    opacity: isCurrent ? 1 : 0.85,
                                  }}
                                  onMouseEnter={e => e.currentTarget.style.background = cfg.hoverBg}
                                  onMouseLeave={e => e.currentTarget.style.background = isCurrent ? cfg.hoverBg : cfg.bg}
                                  onClick={() => statusHandler(status, item._id)}
                                >
                                  <Icon size={14} />
                                  {status}
                                  {isCurrent && (
                                    <span style={{ marginLeft: 'auto', fontSize: '.6rem', opacity: .7 }}>✓ Current</span>
                                  )}
                                </div>
                              )
                            })}
                          </PopoverContent>
                        </Popover>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="apt-footer">
              {applicants.applications.length} application{applicants.applications.length !== 1 ? 's' : ''} received
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default ApplicantsTable