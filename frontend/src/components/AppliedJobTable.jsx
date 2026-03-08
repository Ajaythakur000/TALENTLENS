import React from 'react'
import { useSelector } from 'react-redux'

const STATUS = {
  pending:  { label: 'Pending',  color: '#f59e0b', bg: 'rgba(245,158,11,0.1)',  border: 'rgba(245,158,11,0.22)', glow: 'rgba(245,158,11,0.15)',  pulse: true  },
  accepted: { label: 'Accepted', color: '#22c55e', bg: 'rgba(34,197,94,0.1)',   border: 'rgba(34,197,94,0.22)',  glow: 'rgba(34,197,94,0.15)',   pulse: false },
  rejected: { label: 'Rejected', color: '#f43f5e', bg: 'rgba(244,63,94,0.1)',   border: 'rgba(244,63,94,0.22)',  glow: 'rgba(244,63,94,0.15)',   pulse: false },
}

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector(store => store.job)

  const handleRowMove = (e) => {
    const row = e.currentTarget
    const rect = row.getBoundingClientRect()
    row.style.setProperty('--rx', `${e.clientX - rect.left}px`)
    row.style.setProperty('--ry', `${e.clientY - rect.top}px`)
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

        .ajt-root { width: 100%; }

        /* ── Empty ── */
        .ajt-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 5rem 2rem; text-align: center; gap: 1.2rem;
        }
        .ajt-empty-box {
          width: 72px; height: 72px; border-radius: 20px;
          background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.12);
          display: flex; align-items: center; justify-content: center; font-size: 2rem;
          box-shadow: 0 0 50px rgba(234,179,8,0.07);
          animation: emptyFloat 3s ease-in-out infinite;
        }
        @keyframes emptyFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .ajt-empty h3 {
          font-family: 'Inter', sans-serif;
          font-size: 1rem; font-weight: 600; color: #444; margin: 0;
        }
        .ajt-empty p { font-size: .78rem; color: #282828; margin: 0; max-width: 220px; line-height: 1.6; }

        /* ── Table wrapper ── */
        .ajt-table-wrap { overflow-x: auto; }

        table.ajt {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 4px;
          font-family: 'Inter', sans-serif;
        }

        /* Head */
        table.ajt thead th {
          padding: 0 1.4rem 1rem;
          font-size: .6rem; font-weight: 600; letter-spacing: .15em;
          text-transform: uppercase; color: #272727;
          text-align: left; white-space: nowrap;
          border-bottom: 1px solid #111;
        }
        table.ajt thead th:last-child { text-align: right; }

        /* Rows */
        .ajt-tr {
          position: relative;
          cursor: default;
          --rx: 50%; --ry: 50%;
          transition: background .2s;
        }

        .ajt-tr td {
          padding: 1rem 1.4rem;
          background: #0d0d0d;
          transition: background .2s;
          vertical-align: middle;
          position: relative;
        }
        .ajt-tr td:first-child {
          border-radius: 12px 0 0 12px;
          border-left: 2px solid transparent;
          transition: border-color .25s, background .2s;
        }
        .ajt-tr td:last-child  { border-radius: 0 12px 12px 0; text-align: right; }

        /* Hover: row highlight + left accent + mouse glow */
        .ajt-tr:hover td { background: #111; }
        .ajt-tr:hover td:first-child { border-left-color: #eab308; }

        /* Mouse-follow glow per row */
        .ajt-tr td:first-child::after {
          content: '';
          position: absolute;
          width: 220px; height: 220px;
          left: var(--rx); top: var(--ry);
          transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(234,179,8,0.06) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
          opacity: 0; transition: opacity .2s, left .05s, top .05s;
          z-index: 0;
        }
        .ajt-tr:hover td:first-child::after { opacity: 1; }

        /* Index */
        .ajt-idx {
          font-family: 'JetBrains Mono', monospace;
          font-size: .68rem; font-weight: 500; color: #252525;
          min-width: 28px; display: inline-block; text-align: center;
          position: relative; z-index: 1;
        }

        /* Date */
        .ajt-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: .72rem; color: #383838; white-space: nowrap;
        }

        /* Role */
        .ajt-role { font-size: .9rem; font-weight: 600; color: #d0d0d0; white-space: nowrap; }

        /* Company */
        .ajt-co { display: flex; align-items: center; gap: .6rem; }
        .ajt-co-av {
          width: 28px; height: 28px; border-radius: 8px;
          background: #141414; border: 1px solid #1e1e1e;
          display: flex; align-items: center; justify-content: center;
          font-size: .72rem; font-weight: 700; color: #eab308;
          font-family: 'Inter', sans-serif; flex-shrink: 0;
          transition: all .25s;
        }
        .ajt-tr:hover .ajt-co-av {
          background: rgba(234,179,8,0.08);
          border-color: rgba(234,179,8,0.2);
        }
        .ajt-co-name { font-size: .82rem; font-weight: 500; color: #666; }

        /* Status badge */
        .ajt-badge {
          display: inline-flex; align-items: center; gap: .4rem;
          padding: .3rem .9rem;
          border-radius: 100px;
          font-size: .68rem; font-weight: 700;
          letter-spacing: .08em; text-transform: uppercase;
          border: 1px solid;
          font-family: 'Inter', sans-serif;
          transition: all .25s;
          white-space: nowrap;
        }
        .ajt-tr:hover .ajt-badge { transform: translateY(-1px); }

        .ajt-badge-dot {
          width: 5px; height: 5px; border-radius: 50%; flex-shrink: 0;
        }
        .ajt-badge-dot.pulse {
          animation: bdPulse 1.6s ease-in-out infinite;
        }
        @keyframes bdPulse {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.3; transform:scale(.65); }
        }

        /* Footer */
        .ajt-footer {
          text-align: center; padding: 1.5rem 0 0;
          font-size: .65rem; color: #222; letter-spacing: .1em; text-transform: uppercase;
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="ajt-root">
        {!allAppliedJobs || allAppliedJobs.length === 0 ? (
          <div className="ajt-empty">
            <div className="ajt-empty-box">📭</div>
            <h3>No applications yet</h3>
            <p>Start applying to jobs and track everything right here.</p>
          </div>
        ) : (
          <>
            <div className="ajt-table-wrap">
              <table className="ajt">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Job Role</th>
                    <th>Company</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {allAppliedJobs.map((job, i) => {
                    const status = job?.status?.toLowerCase() || 'pending'
                    const cfg = STATUS[status] || STATUS.pending
                    const company = job?.job?.company?.name || '?'

                    return (
                      <tr
                        key={job._id}
                        className="ajt-tr"
                        onMouseMove={handleRowMove}
                      >
                        <td>
                          <span className="ajt-idx">{String(i + 1).padStart(2, '0')}</span>
                        </td>
                        <td>
                          <span className="ajt-date">{job?.createdAt?.split('T')[0]}</span>
                        </td>
                        <td>
                          <span className="ajt-role">{job?.job?.title}</span>
                        </td>
                        <td>
                          <div className="ajt-co">
                            <div className="ajt-co-av">{company.charAt(0).toUpperCase()}</div>
                            <span className="ajt-co-name">{company}</span>
                          </div>
                        </td>
                        <td>
                          <span
                            className="ajt-badge"
                            style={{
                              color: cfg.color,
                              background: cfg.bg,
                              borderColor: cfg.border,
                              boxShadow: `0 0 18px ${cfg.glow}`,
                            }}
                          >
                            <span
                              className={`ajt-badge-dot${cfg.pulse ? ' pulse' : ''}`}
                              style={{ background: cfg.color }}
                            />
                            {cfg.label}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <div className="ajt-footer">
              {allAppliedJobs.length} application{allAppliedJobs.length !== 1 ? 's' : ''} total
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AppliedJobTable