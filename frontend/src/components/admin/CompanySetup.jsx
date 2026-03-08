import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { ArrowLeft, Loader2, Building2, FileText, Globe, MapPin, Upload, X } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
  const params = useParams()
  useGetCompanyById(params.id)
  const { singleCompany } = useSelector(store => store.company)
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [logoPreview, setLogoPreview] = useState(null)
  const [logoName, setLogoName] = useState('')
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  const [input, setInput] = useState({
    name: '', description: '', website: '', location: '', file: null
  })

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    setInput({
      name: singleCompany?.name || '',
      description: singleCompany?.description || '',
      website: singleCompany?.website || '',
      location: singleCompany?.location || '',
      file: null
    })
    if (singleCompany?.logo) setLogoPreview(singleCompany.logo)
  }, [singleCompany])

  const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

  const handleFile = (file) => {
    if (!file) return
    setInput({ ...input, file })
    setLogoName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => setLogoPreview(e.target.result)
    reader.readAsDataURL(file)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', input.name)
    formData.append('description', input.description)
    formData.append('website', input.website)
    formData.append('location', input.location)
    if (input.file) formData.append('file', input.file)
    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
      if (res.status === 200) {
        toast.success(res.data.message)
        navigate('/admin/companies')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { id: 'name',        label: 'Company Name', icon: Building2, placeholder: 'Microsoft, Acme Corp...',  type: 'text' },
    { id: 'description', label: 'Description',  icon: FileText,  placeholder: 'What does your company do?', type: 'text' },
    { id: 'website',     label: 'Website',      icon: Globe,     placeholder: 'https://yourcompany.com',  type: 'text' },
    { id: 'location',    label: 'Location',     icon: MapPin,    placeholder: 'Mumbai, India',            type: 'text' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .cs-root {
          min-height: 100vh;
          background: #060606;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        /* Grid */
        .cs-grid {
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(234,179,8,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(234,179,8,0.02) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none; z-index: 0;
          mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 30%, transparent 100%);
        }

        /* Orbs */
        .cs-orb1 {
          position: fixed; top: -100px; left: -80px;
          width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none; z-index: 0;
        }
        .cs-orb2 {
          position: fixed; bottom: -80px; right: -60px;
          width: 320px; height: 320px; border-radius: 50%;
          background: radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%);
          filter: blur(60px); pointer-events: none; z-index: 0;
        }

        .cs-page {
          position: relative; z-index: 1;
          max-width: 680px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 6rem;
        }

        /* ── TOPBAR ── */
        .cs-topbar {
          display: flex; align-items: center; gap: 1.2rem;
          margin-bottom: 2.5rem;
          opacity: 0; transform: translateY(14px);
          transition: opacity .5s ease, transform .5s ease;
        }
        .cs-topbar.show { opacity: 1; transform: translateY(0); }

        .cs-back {
          display: flex; align-items: center; gap: .5rem;
          padding: .55rem 1rem;
          background: transparent; border: 1px solid #1e1e1e; border-radius: 10px;
          color: #555; font-size: .78rem; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: all .22s; white-space: nowrap;
        }
        .cs-back:hover { border-color: #2a2a2a; color: #888; background: #0e0e0e; }
        .cs-back-line {
          width: 22px; height: 1.5px; background: currentColor;
          transition: width .25s;
        }
        .cs-back:hover .cs-back-line { width: 32px; }

        .cs-topbar-text {}
        .cs-eyebrow {
          font-size: .58rem; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #eab308;
          display: flex; align-items: center; gap: .4rem; margin-bottom: .25rem;
        }
        .cs-eyebrow-dot {
          width: 4px; height: 4px; border-radius: 50%;
          background: #eab308; box-shadow: 0 0 6px #eab308;
          animation: csDot 2s ease-in-out infinite;
        }
        @keyframes csDot { 0%,100%{opacity:1} 50%{opacity:.25} }
        .cs-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.4rem; font-weight: 700; color: #fff;
          letter-spacing: -.02em; margin: 0;
        }
        .cs-title span { color: #eab308; }

        /* ── MAIN CARD ── */
        .cs-card {
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          opacity: 0; transform: translateY(20px);
          transition: opacity .5s ease .1s, transform .5s ease .1s;
        }
        .cs-card.show { opacity: 1; transform: translateY(0); }

        .cs-card::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg,
            transparent, #eab308 40%, #f59e0b 50%, #eab308 60%, transparent);
          background-size: 200% 100%;
          animation: csBorder 3s linear infinite;
          z-index: 1;
        }
        @keyframes csBorder {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Logo section */
        .cs-logo-section {
          padding: 2rem 2.2rem 1.5rem;
          border-bottom: 1px solid #111;
          display: flex; align-items: center; gap: 1.5rem;
        }

        .cs-logo-preview {
          width: 64px; height: 64px; border-radius: 14px;
          background: #141414; border: 1px solid #222;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; flex-shrink: 0;
          transition: all .25s;
        }
        .cs-logo-preview img {
          width: 100%; height: 100%; object-fit: cover; border-radius: 13px;
        }
        .cs-logo-placeholder { color: #333; }

        .cs-logo-right {}
        .cs-logo-label {
          font-size: .6rem; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #383838; margin-bottom: .5rem;
          display: flex; align-items: center; gap: .5rem;
        }
        .cs-logo-label::after { content: ''; flex: 1; height: 1px; background: #141414; }

        .cs-logo-drop {
          display: flex; align-items: center; gap: .75rem;
          padding: .65rem 1rem;
          border: 1.5px dashed #1e1e1e; border-radius: 11px;
          background: #0e0e0e; cursor: pointer;
          transition: all .25s; position: relative; overflow: hidden;
        }
        .cs-logo-drop input[type=file] {
          position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 2;
        }
        .cs-logo-drop:hover, .cs-logo-drop.drag {
          border-color: rgba(234,179,8,.3);
          background: rgba(234,179,8,.03);
        }
        .cs-logo-drop-ico {
          width: 28px; height: 28px; border-radius: 8px;
          background: rgba(234,179,8,.07); border: 1px solid rgba(234,179,8,.15);
          display: flex; align-items: center; justify-content: center;
          color: #eab308; flex-shrink: 0; transition: all .25s;
        }
        .cs-logo-drop:hover .cs-logo-drop-ico { background: rgba(234,179,8,.12); }
        .cs-logo-drop-text {}
        .cs-logo-drop-main {
          font-size: .78rem; font-weight: 500; color: #777;
        }
        .cs-logo-drop-main span { color: #eab308; font-weight: 600; }
        .cs-logo-drop-sub { font-size: .65rem; color: #2e2e2e; }
        .cs-logo-filename { font-size: .7rem; color: #eab308; margin-top: .15rem; }

        /* Fields grid */
        .cs-fields {
          padding: 1.8rem 2.2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }

        .cs-field { display: flex; flex-direction: column; gap: .45rem; }

        .cs-field-label {
          font-size: .6rem; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: #383838;
          display: flex; align-items: center; gap: .45rem;
        }
        .cs-field-label-ico { color: #282828; transition: color .25s; }

        .cs-input-wrap { position: relative; }
        .cs-input-ico {
          position: absolute; left: .8rem; top: 50%; transform: translateY(-50%);
          color: #252525; pointer-events: none; transition: color .25s;
        }
        .cs-input-wrap:focus-within .cs-input-ico { color: #eab308; }
        .cs-input-wrap:focus-within + .cs-field-label .cs-field-label-ico { color: #eab308; }

        .cs-input {
          width: 100%;
          background: #0e0e0e; border: 1px solid #1e1e1e; border-radius: 11px;
          padding: .72rem 1rem .72rem 2.5rem;
          font-size: .85rem; font-weight: 400; color: #d0d0d0;
          font-family: 'Inter', sans-serif; outline: none;
          transition: all .25s; caret-color: #eab308;
        }
        .cs-input::placeholder { color: #222; }
        .cs-input:focus {
          border-color: rgba(234,179,8,.35);
          background: #111;
          box-shadow: 0 0 0 3px rgba(234,179,8,.06), 0 0 24px rgba(234,179,8,.06);
        }
        .cs-input:hover:not(:focus) { border-color: #2a2a2a; }

        /* Footer */
        .cs-footer {
          padding: 1.2rem 2.2rem 2rem;
          border-top: 1px solid #111;
          display: flex; gap: .75rem;
        }

        .cs-cancel {
          flex: 1; padding: .82rem;
          background: transparent; border: 1px solid #1e1e1e; border-radius: 12px;
          color: #555; font-size: .83rem; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: all .22s;
        }
        .cs-cancel:hover { border-color: #2a2a2a; color: #888; background: #0e0e0e; }

        .cs-save {
          flex: 2; padding: .82rem;
          background: linear-gradient(135deg, #eab308, #f59e0b 50%, #d97706);
          border: none; border-radius: 12px;
          color: #000; font-size: .88rem; font-weight: 700;
          font-family: 'Space Grotesk', sans-serif; letter-spacing: .04em;
          cursor: pointer; position: relative; overflow: hidden;
          transition: all .35s cubic-bezier(.34,1.56,.64,1);
          box-shadow: 0 4px 22px rgba(234,179,8,.28), inset 0 1px 0 rgba(255,255,255,.2);
          display: flex; align-items: center; justify-content: center; gap: .5rem;
        }
        .cs-save:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(234,179,8,.45);
        }
        .cs-save:disabled { opacity: .65; cursor: not-allowed; transform: none; }
        .cs-save::before {
          content: '';
          position: absolute; top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: rgba(255,255,255,.22);
          transform: skewX(-22deg);
          animation: csShine 3s ease-in-out infinite;
        }
        @keyframes csShine { 0%{left:-60%} 100%{left:160%} }

        .cs-spin { animation: spin .7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }

        @media (max-width: 580px) {
          .cs-fields { grid-template-columns: 1fr; }
          .cs-logo-section { flex-direction: column; align-items: flex-start; }
          .cs-footer { flex-direction: column; }
        }
      `}</style>

      <div className="cs-root">
        <div className="cs-grid" />
        <div className="cs-orb1" />
        <div className="cs-orb2" />

        <Navbar />

        <div className="cs-page">

          {/* ── TOPBAR ── */}
          <div className={`cs-topbar${visible ? ' show' : ''}`}>
            <button className="cs-back" onClick={() => navigate('/admin/companies')}>
              <div className="cs-back-line" />
              Back
            </button>
            <div className="cs-topbar-text">
              <div className="cs-eyebrow">
                <span className="cs-eyebrow-dot" />
                Admin · Edit Company
              </div>
              <h1 className="cs-title">Company <span>Setup</span></h1>
            </div>
          </div>

          {/* ── CARD ── */}
          <div className={`cs-card${visible ? ' show' : ''}`}>
            <form onSubmit={submitHandler}>

              {/* Logo section */}
              <div className="cs-logo-section">
                <div className="cs-logo-preview">
                  {logoPreview
                    ? <img src={logoPreview} alt="logo" />
                    : <Building2 size={24} className="cs-logo-placeholder" />
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div className="cs-logo-label">Company Logo</div>
                  <div
                    className={`cs-logo-drop${dragOver ? ' drag' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]) }}
                  >
                    <input
                      type="file" accept="image/*"
                      onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                    <div className="cs-logo-drop-ico"><Upload size={13} /></div>
                    <div className="cs-logo-drop-text">
                      <div className="cs-logo-drop-main">
                        <span>Click to upload</span> or drag & drop
                      </div>
                      <div className="cs-logo-drop-sub">PNG, JPG, SVG · Max 2MB</div>
                      {logoName && <div className="cs-logo-filename">📎 {logoName}</div>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="cs-fields">
                {fields.map(({ id, label, icon: Icon, placeholder, type }) => (
                  <div key={id} className="cs-field">
                    <div className="cs-field-label">
                      <Icon size={10} className="cs-field-label-ico" />
                      {label}
                    </div>
                    <div className="cs-input-wrap">
                      <Icon size={13} className="cs-input-ico" />
                      <input
                        className="cs-input"
                        id={id} name={id} type={type}
                        value={input[id]}
                        onChange={changeHandler}
                        placeholder={placeholder}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="cs-footer">
                <button
                  type="button"
                  className="cs-cancel"
                  onClick={() => navigate('/admin/companies')}
                >
                  Cancel
                </button>
                <button type="submit" className="cs-save" disabled={loading}>
                  {loading
                    ? <><Loader2 size={15} className="cs-spin" /> Saving...</>
                    : '⚡ Save Changes'
                  }
                </button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </>
  )
}

export default CompanySetup