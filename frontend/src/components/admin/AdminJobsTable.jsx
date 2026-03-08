import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Briefcase } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector(store => store.job)
  const [filterJobs, setFilterJobs] = useState(allAdminJobs || [])
  const navigate = useNavigate()

  useEffect(() => {
    const filtered = allAdminJobs?.filter(job => {
      if (!searchJobByText) return true
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
      )
    })
    setFilterJobs(filtered || [])
  }, [allAdminJobs, searchJobByText])

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

        .ajt-wrap { width: 100%; }

        /* ── Empty ── */
        .ajt-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 5rem 2rem; text-align: center; gap: 1.2rem;
        }
        .ajt-empty-box {
          width: 72px; height: 72px; border-radius: 20px;
          background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.12);
          display: flex; align-items: center; justify-content: center; color: #eab308;
          box-shadow: 0 0 50px rgba(234,179,8,0.07);
          animation: ajtFloat 3s ease-in-out infinite;
        }
        @keyframes ajtFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .ajt-empty h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem; font-weight: 700; color: #444; margin: 0;
        }
        .ajt-empty p { font-size: .78rem; color: #282828; margin: 0; line-height: 1.6; }

        /* ── Table ── */
        .ajt-table-wrap { overflow-x: auto; }

        table.ajt {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 3px;
          font-family: 'Inter', sans-serif;
          padding: 1rem 1.2rem;
        }

        /* Head */
        table.ajt thead th {
          padding: .6rem 1.2rem 1rem;
          font-size: .6rem; font-weight: 700; letter-spacing: .15em;
          text-transform: uppercase; color: #555;
          text-align: left; white-space: nowrap;
          border-bottom: 1px solid #1a1a1a;
        }
        table.ajt thead th:last-child { text-align: right; }

        /* Row */
        .ajt-tr {
          cursor: default;
          --rx: 50%; --ry: 50%;
        }
        .ajt-tr td {
          padding: .95rem 1.2rem;
          background: #0d0d0d;
          transition: background .2s;
          vertical-align: middle;
        }
        .ajt-tr td:first-child {
          border-radius: 12px 0 0 12px;
          border-left: 2px solid transparent;
          transition: border-color .25s, background .2s;
          position: relative;
        }
        .ajt-tr td:last-child { border-radius: 0 12px 12px 0; text-align: right; }

        .ajt-tr:hover td { background: #111; }
        .ajt-tr:hover td:first-child { border-left-color: #eab308; }

        /* Mouse follow glow */
        .ajt-tr td:first-child::after {
          content: '';
          position: absolute;
          width: 240px; height: 240px;
          left: var(--rx); top: var(--ry);
          transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(234,179,8,0.055) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
          opacity: 0; transition: opacity .2s, left .05s, top .05s;
        }
        .ajt-tr:hover td:first-child::after { opacity: 1; }

        /* Index */
        .ajt-idx {
          font-family: 'JetBrains Mono', monospace;
          font-size: .68rem; font-weight: 500; color: #444;
          min-width: 24px; display: inline-block; text-align: center;
        }

        /* Company cell */
        .ajt-company { display: flex; align-items: center; gap: .65rem; }
        .ajt-co-av {
          width: 30px; height: 30px; border-radius: 9px;
          background: #141414; border: 1px solid #1e1e1e;
          display: flex; align-items: center; justify-content: center;
          font-size: .7rem; font-weight: 700; color: #eab308;
          font-family: 'Space Grotesk', sans-serif; flex-shrink: 0;
          transition: all .25s;
        }
        .ajt-tr:hover .ajt-co-av {
          background: rgba(234,179,8,0.08); border-color: rgba(234,179,8,0.2);
        }
        .ajt-co-name { font-size: .82rem; font-weight: 500; color: #666; }

        /* Role */
        .ajt-role {
          font-family: 'Space Grotesk', sans-serif;
          font-size: .9rem; font-weight: 600; color: #d0d0d0;
        }

        /* Date */
        .ajt-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: .72rem; color: #666;
        }

        /* Action btn */
        .ajt-action-btn {
          width: 32px; height: 32px; border-radius: 9px;
          background: transparent; border: 1px solid #1e1e1e;
          display: inline-flex; align-items: center; justify-content: center;
          color: #444; cursor: pointer; transition: all .22s;
          margin-left: auto;
        }
        .ajt-action-btn:hover { background: #161616; border-color: #2a2a2a; color: #888; }

        /* Popover */
        .ajt-pop {
          background: #0f0f0f !important;
          border: 1px solid #1e1e1e !important;
          border-radius: 12px !important;
          padding: .5rem !important;
          box-shadow: 0 16px 50px rgba(0,0,0,0.6) !important;
          min-width: 140px !important;
        }
        .ajt-pop-item {
          display: flex; align-items: center; gap: .6rem;
          padding: .55rem .8rem; border-radius: 8px;
          font-size: .8rem; font-weight: 500; color: #888;
          cursor: pointer; transition: all .2s;
          font-family: 'Inter', sans-serif;
        }
        .ajt-pop-item:hover { background: rgba(234,179,8,0.07); color: #eab308; }
        .ajt-pop-divider { height: 1px; background: #141414; margin: .3rem 0; }

        /* Footer */
        .ajt-footer {
          text-align: center; padding: 1.2rem 0 .5rem;
          font-size: .62rem; color: #383838; letter-spacing: .1em;
          text-transform: uppercase; font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="ajt-wrap">
        {!filterJobs || filterJobs.length === 0 ? (
          <div className="ajt-empty">
            <div className="ajt-empty-box"><Briefcase size={28} /></div>
            <h3>No job openings found</h3>
            <p>Post your first job opening to start receiving applications.</p>
          </div>
        ) : (
          <>
            <div className="ajt-table-wrap">
              <table className="ajt">
                <thead>
                  <tr>
                    <th style={{ width: 32 }}>#</th>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Posted On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterJobs.map((job, i) => (
                    <tr key={job._id} className="ajt-tr" onMouseMove={handleRowMove}>

                      {/* Index */}
                      <td><span className="ajt-idx">{String(i + 1).padStart(2, '0')}</span></td>

                      {/* Company */}
                      <td>
                        <div className="ajt-company">
                          <div className="ajt-co-av">
                            {job?.company?.name?.charAt(0).toUpperCase()}
                          </div>
                          <span className="ajt-co-name">{job?.company?.name}</span>
                        </div>
                      </td>

                      {/* Role */}
                      <td><span className="ajt-role">{job?.title}</span></td>

                      {/* Date */}
                      <td><span className="ajt-date">{job?.createdAt?.split('T')[0]}</span></td>

                      {/* Action */}
                      <td>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="ajt-action-btn">
                              <MoreHorizontal size={15} />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="ajt-pop" align="end">
                            <div
                              className="ajt-pop-item"
                              onClick={() => navigate(`/admin/jobs/${job._id}`)}
                            >
                              <Edit2 size={13} /> Edit Job
                            </div>
                            <div className="ajt-pop-divider" />
                            <div
                              className="ajt-pop-item"
                              onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                            >
                              <Eye size={13} /> View Applicants
                            </div>
                          </PopoverContent>
                        </Popover>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ajt-footer">
              {filterJobs.length} job{filterJobs.length !== 1 ? 's' : ''} posted
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AdminJobsTable