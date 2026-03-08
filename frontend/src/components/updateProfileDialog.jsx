import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'
import { Loader2, User, Mail, Phone, FileText, Sparkles, Upload, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState('')
  const { user } = useSelector(store => store.auth)
  const dispatch = useDispatch()

  // Fix: restore body scroll when dialog closes
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      document.body.style.pointerEvents = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.pointerEvents = ''
    }
  }, [open])

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    file: user?.profile?.resume || ''
  })

  useEffect(() => {
    if (open) {
      setInput({
        fullname: user?.fullname || '',
        email: user?.email || '',
        phoneNumber: user?.phoneNumber || '',
        bio: user?.profile?.bio || '',
        skills: user?.profile?.skills?.join(', ') || '',
        file: user?.profile?.resume || ''
      })
      setFileName(user?.profile?.resumeOriginalName || '')
    }
  }, [open, user])

  const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0]
    if (file) { setInput({ ...input, file }); setFileName(file.name) }
  }

  const handleDrop = (e) => {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file && file.type === 'application/pdf') {
      setInput({ ...input, file }); setFileName(file.name)
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('bio', input.bio)
    formData.append('skills', input.skills)
    if (input.file) formData.append('file', input.file)
    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      })
      if (res.status === 200) {
        dispatch(setUser(res.data.data))
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
      handleClose()
    }
  }

  const handleClose = () => {
    document.body.style.overflow = ''
    document.body.style.pointerEvents = ''
    setOpen(false)
  }

  const fields = [
    { id: 'fullname',    label: 'Full Name',    icon: User,     type: 'text',  placeholder: 'John Doe' },
    { id: 'email',       label: 'Email',        icon: Mail,     type: 'email', placeholder: 'you@example.com' },
    { id: 'phoneNumber', label: 'Phone',        icon: Phone,    type: 'text',  placeholder: '+91 98765 43210' },
    { id: 'bio',         label: 'Bio',          icon: Sparkles, type: 'text',  placeholder: 'Tell companies about yourself...' },
    { id: 'skills',      label: 'Skills',       icon: FileText, type: 'text',  placeholder: 'React, Node.js, Python...' },
  ]

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

        /* ── Override shadcn dialog overlay ── */
        [data-radix-dialog-overlay] {
          background: rgba(0,0,0,0.85) !important;
          backdrop-filter: blur(8px) !important;
        }

        /* ── Fix Radix scroll lock ── */
        body[data-scroll-locked] {
          overflow: auto !important;
          margin-right: 0 !important;
        }

        /* ── Dialog box ── */
        .upd-dialog {
          background: #0a0a0a !important;
          border: 1px solid #1e1e1e !important;
          border-radius: 24px !important;
          padding: 0 !important;
          max-width: 480px !important;
          width: 95vw !important;
          max-height: 88vh !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          box-shadow: 0 0 0 1px #111, 0 40px 100px rgba(0,0,0,0.8) !important;
          font-family: 'Inter', sans-serif !important;
          scrollbar-width: none !important;
        }
        .upd-dialog::-webkit-scrollbar { display: none !important; }

        /* Animated gold top border */
        .upd-dialog::before {
          content: '';
          position: absolute; top: 0; left: 0; right: 0; height: 1.5px;
          background: linear-gradient(90deg,
            transparent 0%, #eab308 40%, #f59e0b 50%, #eab308 60%, transparent 100%);
          background-size: 200% 100%;
          animation: uBorderFlow 3s linear infinite;
          z-index: 10;
        }
        @keyframes uBorderFlow {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Header ── */
        .upd-header {
          padding: 2rem 2.2rem 1.5rem;
          border-bottom: 1px solid #111;
          position: relative;
          overflow: hidden;
        }
        .upd-header::after {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .upd-eyebrow {
          font-size: 0.6rem; font-weight: 600; letter-spacing: 0.16em;
          text-transform: uppercase; color: #eab308;
          display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;
        }
        .upd-eyebrow-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #eab308; box-shadow: 0 0 8px #eab308;
          animation: edot 2s ease-in-out infinite;
        }
        @keyframes edot { 0%,100%{opacity:1}50%{opacity:.25} }

        .upd-title {
          font-family: 'Syne', sans-serif;
          font-size: 1.5rem; font-weight: 800; color: #fff;
          letter-spacing: -0.02em; margin: 0;
        }
        .upd-title span { color: #eab308; }

        .upd-close {
          position: absolute; top: 1.5rem; right: 1.5rem;
          width: 32px; height: 32px; border-radius: 9px;
          background: #141414; border: 1px solid #222;
          display: flex; align-items: center; justify-content: center;
          color: #555; cursor: pointer; transition: all .22s;
        }
        .upd-close:hover { background: #1a1a1a; color: #ccc; border-color: #333; }

        /* Visually Hidden Utility for Accessibility */
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        /* ── Form body ── */
        .upd-body { padding: 1.5rem 2.2rem; display: flex; flex-direction: column; gap: 1rem; }

        /* Field */
        .upd-field { display: flex; flex-direction: column; gap: 0.45rem; }
        .upd-label {
          font-size: 0.65rem; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: #333;
          display: flex; align-items: center; gap: 0.4rem;
        }
        .upd-label-ico { color: #2e2e2e; }

        .upd-input-wrap { position: relative; }
        .upd-input {
          width: 100%;
          background: #0e0e0e;
          border: 1px solid #1e1e1e;
          border-radius: 11px;
          padding: 0.72rem 1rem 0.72rem 2.8rem;
          font-size: 0.85rem; font-weight: 400; color: #d0d0d0;
          font-family: 'Inter', sans-serif;
          outline: none;
          transition: all .25s;
          caret-color: #eab308;
          position: relative; z-index: 1;
        }
        .upd-input::placeholder { color: #2e2e2e; }
        .upd-input:focus {
          border-color: rgba(234,179,8,0.4);
          background: #111;
          box-shadow: 0 0 0 3px rgba(234,179,8,0.07), 0 0 24px rgba(234,179,8,0.08);
        }
        .upd-input:hover:not(:focus) { border-color: #2a2a2a; }

        .upd-ico {
          position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%);
          color: #2e2e2e; z-index: 2; pointer-events: none;
          transition: color .25s;
        }
        .upd-input-wrap:focus-within .upd-ico { color: #eab308; }

        /* ── Resume drop zone ── */
        .upd-drop {
          border: 1.5px dashed #1e1e1e;
          border-radius: 14px;
          padding: 1.4rem;
          display: flex; align-items: center; gap: 1rem;
          cursor: pointer; transition: all .25s;
          position: relative; overflow: hidden;
          background: #0e0e0e;
        }
        .upd-drop:hover, .upd-drop.drag {
          border-color: rgba(234,179,8,0.35);
          background: rgba(234,179,8,0.03);
          box-shadow: 0 0 28px rgba(234,179,8,0.07);
        }
        .upd-drop input[type=file] {
          position: absolute; inset: 0; opacity: 0; cursor: pointer; z-index: 2;
        }
        .upd-drop-ico {
          width: 40px; height: 40px; border-radius: 11px; flex-shrink: 0;
          background: rgba(234,179,8,0.07); border: 1px solid rgba(234,179,8,0.15);
          display: flex; align-items: center; justify-content: center;
          color: #eab308; transition: all .25s;
        }
        .upd-drop:hover .upd-drop-ico, .upd-drop.drag .upd-drop-ico {
          background: rgba(234,179,8,0.12);
          box-shadow: 0 0 20px rgba(234,179,8,0.15);
        }
        .upd-drop-text { flex: 1; }
        .upd-drop-main { font-size: .83rem; font-weight: 500; color: #888; margin-bottom: .15rem; }
        .upd-drop-main span { color: #eab308; font-weight: 600; }
        .upd-drop-sub { font-size: .7rem; color: #2e2e2e; }
        .upd-drop-file { font-size: .75rem; color: #eab308; font-weight: 500; margin-top: .2rem; }

        /* ── Footer ── */
        .upd-footer { padding: 1rem 2.2rem 2rem; display: flex; gap: .75rem; }

        .upd-cancel {
          flex: 1; padding: .78rem;
          background: transparent; border: 1px solid #1e1e1e; border-radius: 12px;
          color: #444; font-size: .82rem; font-weight: 600;
          font-family: 'Inter', sans-serif; cursor: pointer;
          transition: all .22s;
        }
        .upd-cancel:hover { border-color: #2e2e2e; color: #777; background: #0e0e0e; }

        .upd-submit {
          flex: 2; padding: .78rem;
          background: linear-gradient(135deg, #eab308, #f59e0b 50%, #d97706);
          border: none; border-radius: 12px;
          color: #000; font-size: .85rem; font-weight: 700;
          font-family: 'Syne', sans-serif; letter-spacing: .06em; text-transform: uppercase;
          cursor: pointer; position: relative; overflow: hidden;
          transition: all .35s cubic-bezier(.34,1.56,.64,1);
          box-shadow: 0 4px 24px rgba(234,179,8,0.28), inset 0 1px 0 rgba(255,255,255,.2);
          display: flex; align-items: center; justify-content: center; gap: .5rem;
        }
        .upd-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(234,179,8,0.45);
        }
        .upd-submit:disabled { opacity: .7; cursor: not-allowed; transform: none; }
        .upd-submit::before {
          content: '';
          position: absolute; top: -50%; left: -60%;
          width: 40%; height: 200%;
          background: rgba(255,255,255,0.25);
          transform: skewX(-22deg);
          animation: subShine 3s ease-in-out infinite;
        }
        @keyframes subShine { 0%{left:-60%} 100%{left:160%} }

        .upd-spin { animation: spin .8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="upd-dialog" onInteractOutside={handleClose}>

          {/* Header */}
          <div className="upd-header">
            <div className="upd-eyebrow">
              <span className="upd-eyebrow-dot" />
              TalentLens
            </div>
            {/* Added Accessible DialogTitle and visually hidden Description */}
            <DialogTitle className="upd-title">Update <span>Profile</span></DialogTitle>
            <DialogDescription className="sr-only">
              Fill out this form to update your TalentLens profile details and upload your resume.
            </DialogDescription>
            <button className="upd-close" onClick={handleClose}>
              <X size={14} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler}>
            <div className="upd-body">
              {fields.map(({ id, label, icon: Icon, type, placeholder }) => (
                <div key={id} className="upd-field">
                  <label className="upd-label" htmlFor={id}>
                    <Icon size={11} className="upd-label-ico" />
                    {label}
                  </label>
                  <div className="upd-input-wrap">
                    <Icon size={14} className="upd-ico" />
                    <input
                      id={id}
                      name={id}
                      type={type}
                      value={input[id]}
                      onChange={changeHandler}
                      placeholder={placeholder}
                      className="upd-input"
                    />
                  </div>
                </div>
              ))}

              {/* Resume drop */}
              <div className="upd-field">
                <label className="upd-label">
                  <Upload size={11} className="upd-label-ico" />
                  Resume
                </label>
                <div
                  className={`upd-drop${dragOver ? ' drag' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                >
                  <input type="file" accept="application/pdf" onChange={fileChangeHandler} />
                  <div className="upd-drop-ico"><Upload size={16} /></div>
                  <div className="upd-drop-text">
                    <div className="upd-drop-main">
                      <span>Click to upload</span> or drag & drop
                    </div>
                    <div className="upd-drop-sub">PDF only · Max 5MB</div>
                    {fileName && <div className="upd-drop-file">📄 {fileName}</div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="upd-footer">
              <button type="button" className="upd-cancel" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="upd-submit" disabled={loading}>
                {loading
                  ? <><Loader2 size={15} className="upd-spin" /> Saving...</>
                  : '⚡ Save Changes'
                }
              </button>
            </div>
          </form>

        </DialogContent>
      </Dialog>
    </>
  )
}

export default UpdateProfileDialog