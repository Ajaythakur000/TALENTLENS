import React, { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(store => store.company)
  const [filterCompany, setFilterCompany] = useState(companies || [])
  const navigate = useNavigate()

  useEffect(() => {
    const filtered = companies?.filter(c => {
      if (!searchCompanyByText) return true
      return c?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase())
    })
    setFilterCompany(filtered || [])
  }, [companies, searchCompanyByText])

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

        .ct-wrap { width: 100%; overflow-x: auto; }

        /* ── Empty ── */
        .ct-empty {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center; padding: 5rem 2rem; text-align: center; gap: 1.2rem;
        }
        .ct-empty-box {
          width: 72px; height: 72px; border-radius: 20px;
          background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.12);
          display: flex; align-items: center; justify-content: center;
          color: #eab308;
          box-shadow: 0 0 50px rgba(234,179,8,0.07);
          animation: ctFloat 3s ease-in-out infinite;
        }
        @keyframes ctFloat {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-8px); }
        }
        .ct-empty h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem; font-weight: 700; color: #444; margin: 0;
        }
        .ct-empty p { font-size: .78rem; color: #282828; margin: 0; line-height: 1.6; }

        /* ── Table ── */
        .ct-table-wrap { overflow-x: auto; }

        table.ct {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0 3px;
          font-family: 'Inter', sans-serif;
          padding: 1rem 1.2rem;
        }

        /* Head */
        table.ct thead th {
          padding: .6rem 1.2rem 1rem;
          font-size: .6rem; font-weight: 700; letter-spacing: .15em;
          text-transform: uppercase; color: #555;
          text-align: left; white-space: nowrap;
          border-bottom: 1px solid #1e1e1e;
        }
        table.ct thead th:last-child { text-align: right; }

        /* Row */
        .ct-tr {
          cursor: default;
          --rx: 50%; --ry: 50%;
        }
        .ct-tr td {
          padding: .95rem 1.2rem;
          background: #0d0d0d;
          transition: background .2s;
          vertical-align: middle;
        }
        .ct-tr td:first-child {
          border-radius: 12px 0 0 12px;
          border-left: 2px solid transparent;
          transition: border-color .25s, background .2s;
          position: relative;
        }
        .ct-tr td:last-child { border-radius: 0 12px 12px 0; text-align: right; }

        .ct-tr:hover td { background: #111; }
        .ct-tr:hover td:first-child { border-left-color: #eab308; }

        /* Mouse-follow glow per row */
        .ct-tr td:first-child::after {
          content: '';
          position: absolute;
          width: 240px; height: 240px;
          left: var(--rx); top: var(--ry);
          transform: translate(-50%,-50%);
          background: radial-gradient(circle, rgba(234,179,8,0.055) 0%, transparent 70%);
          border-radius: 50%; pointer-events: none;
          opacity: 0; transition: opacity .2s, left .05s, top .05s;
        }
        .ct-tr:hover td:first-child::after { opacity: 1; }

        /* Logo cell */
        .ct-logo-wrap {
          width: 38px; height: 38px; border-radius: 10px;
          background: #141414; border: 1px solid #222;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
          transition: all .25s;
        }
        .ct-tr:hover .ct-logo-wrap {
          border-color: rgba(234,179,8,0.2);
          background: rgba(234,179,8,0.06);
        }
        .ct-logo-wrap img {
          width: 100%; height: 100%; object-fit: cover; border-radius: 9px;
        }
        .ct-logo-placeholder { color: #333; }

        /* Name */
        .ct-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: .92rem; font-weight: 600; color: #d0d0d0;
        }

        /* Date */
        .ct-date {
          font-family: 'JetBrains Mono', monospace;
          font-size: .75rem; color: #666;
        }

        /* Index */
        .ct-idx {
          font-family: 'JetBrains Mono', monospace;
          font-size: .68rem; font-weight: 500; color: #444;
          min-width: 24px; display: inline-block; text-align: center;
        }

        /* Action popover trigger */
        .ct-action-btn {
          width: 32px; height: 32px; border-radius: 9px;
          background: transparent; border: 1px solid #1e1e1e;
          display: inline-flex; align-items: center; justify-content: center;
          color: #444; cursor: pointer; transition: all .22s;
          margin-left: auto;
        }
        .ct-action-btn:hover {
          background: #161616; border-color: #2a2a2a; color: #888;
        }

        /* Popover content override */
        .ct-pop {
          background: #0f0f0f !important;
          border: 1px solid #1e1e1e !important;
          border-radius: 12px !important;
          padding: .5rem !important;
          box-shadow: 0 16px 50px rgba(0,0,0,0.6) !important;
          min-width: 130px !important;
        }
        .ct-pop-item {
          display: flex; align-items: center; gap: .6rem;
          padding: .55rem .8rem;
          border-radius: 8px;
          font-size: .8rem; font-weight: 500; color: #888;
          cursor: pointer; transition: all .2s;
          font-family: 'Inter', sans-serif;
        }
        .ct-pop-item:hover {
          background: rgba(234,179,8,0.07);
          color: #eab308;
        }

        /* Footer */
        .ct-footer {
          text-align: center; padding: 1.2rem 0 .5rem;
          font-size: .62rem; color: #383838; letter-spacing: .1em;
          text-transform: uppercase; font-family: 'Inter', sans-serif;
        }
      `}</style>

      <div className="ct-wrap">
        {!filterCompany || filterCompany.length === 0 ? (
          <div className="ct-empty">
            <div className="ct-empty-box">
              <Building2 size={28} />
            </div>
            <h3>No companies found</h3>
            <p>Register your first company to get started.</p>
          </div>
        ) : (
          <>
            <div className="ct-table-wrap">
              <table className="ct">
                <thead>
                  <tr>
                    <th style={{ width: 32 }}>#</th>
                    <th>Logo</th>
                    <th>Company Name</th>
                    <th>Registered On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filterCompany.map((company, i) => (
                    <tr
                      key={company._id}
                      className="ct-tr"
                      onMouseMove={handleRowMove}
                    >
                      {/* Index */}
                      <td>
                        <span className="ct-idx">{String(i + 1).padStart(2, '0')}</span>
                      </td>

                      {/* Logo */}
                      <td>
                        <div className="ct-logo-wrap">
                          {company?.logo
                            ? <img src={company.logo} alt={company.name} />
                            : <Building2 size={16} className="ct-logo-placeholder" />
                          }
                        </div>
                      </td>

                      {/* Name */}
                      <td>
                        <span className="ct-name">{company?.name}</span>
                      </td>

                      {/* Date */}
                      <td>
                        <span className="ct-date">{company?.createdAt?.split('T')[0]}</span>
                      </td>

                      {/* Action */}
                      <td>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="ct-action-btn">
                              <MoreHorizontal size={15} />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent className="ct-pop" align="end">
                            <div
                              className="ct-pop-item"
                              onClick={() => navigate(`/admin/companies/${company._id}`)}
                            >
                              <Edit2 size={13} />
                              Edit Company
                            </div>
                          </PopoverContent>
                        </Popover>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ct-footer">
              {filterCompany.length} compan{filterCompany.length !== 1 ? 'ies' : 'y'} registered
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default CompaniesTable