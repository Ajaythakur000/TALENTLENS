import React, { useState, useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router-dom'
import useGetJobById from '@/hooks/useGetJobById'
import {
  Loader2, Type, FileText, ListChecks,
  IndianRupee, MapPin, Briefcase, Star, Users
} from 'lucide-react'

const EditJob = () => {
  const params = useParams()
  const jobId = params.id
  
  // 1. Hook call kiya jo backend se data layega aur Redux mein daalega
  useGetJobById(jobId)

  // 2. Redux se fetched job data nikaal liya
  const { singleJob } = useSelector(store => store.job)

  const [input, setInput] = useState({
    title: '', description: '', requirements: '',
    salary: '', location: '', jobType: '',
    experienceLevel: '', position: 0 // Note: backend model expects experienceLevel
  })
  
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()

  // Animation ke liye
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60)
    return () => clearTimeout(t)
  }, [])

  // 3. Jaise hi singleJob load ho, Form ki state (input) ko fill kar do
  useEffect(() => {
    if (singleJob && singleJob._id === jobId) {
      setInput({
        title: singleJob.title || '',
        description: singleJob.description || '',
        requirements: singleJob.requirements?.join(', ') || '', // Array to string
        salary: singleJob.salary || '',
        location: singleJob.location || '',
        jobType: singleJob.jobType || '',
        experienceLevel: singleJob.experienceLevel || '',
        position: singleJob.position || 0,
      })
    }
  }, [singleJob, jobId])

  const changeHandler = (e) => setInput({ ...input, [e.target.name]: e.target.value })

  // 4. Update Handler
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      // Requirements string ko wapas array mein convert karke bhejna hai
      const updateData = {
        ...input,
        requirements: input.requirements.split(',').map(req => req.trim())
      }

      const res = await axios.put(`${JOB_API_END_POINT}/update/${jobId}`, updateData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })

      if (res.data.success || res.status === 200) {
        toast.success(res.data.message || 'Job Updated Successfully')
        navigate('/admin/jobs')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fields = [
    { id: 'title',       label: 'Job Title',        icon: Type,         type: 'text',   placeholder: 'e.g. Senior React Developer',   span: 1 },
    { id: 'description', label: 'Description',      icon: FileText,     type: 'text',   placeholder: 'Brief about the role...',        span: 1 },
    { id: 'requirements',label: 'Requirements',     icon: ListChecks,   type: 'text',   placeholder: 'React, Node.js, MongoDB...',     span: 2 },
    { id: 'salary',      label: 'Salary (LPA)',     icon: IndianRupee,  type: 'text',   placeholder: 'e.g. 12',                        span: 1 },
    { id: 'location',    label: 'Location',         icon: MapPin,       type: 'text',   placeholder: 'Mumbai, Remote...',              span: 1 },
    { id: 'jobType',     label: 'Job Type',         icon: Briefcase,    type: 'text',   placeholder: 'Full Time, Part Time...',        span: 1 },
    { id: 'experienceLevel',  label: 'Experience Level', icon: Star,         type: 'text',   placeholder: '0-1 years, 2-4 years...',        span: 1 }, // Changed id to experienceLevel
    { id: 'position',    label: 'No. of Positions', icon: Users,        type: 'number', placeholder: '1',                              span: 1 },
  ]

  return (
    <>
      <style>{`
        /* SAME CSS AS YOUR POSTJOB */
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .pj-root { min-height: 100vh; background: #060606; font-family: 'Inter', sans-serif; overflow-x: hidden; position: relative; }
        .pj-grid { position: fixed; inset: 0; background-image: linear-gradient(rgba(234,179,8,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.02) 1px, transparent 1px); background-size: 64px 64px; pointer-events: none; z-index: 0; mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 30%, transparent 100%); }
        .pj-orb1 { position: fixed; top: -100px; right: -80px; width: 400px; height: 400px; border-radius: 50%; background: radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%); filter: blur(60px); pointer-events: none; z-index: 0; }
        .pj-orb2 { position: fixed; bottom: -80px; left: -60px; width: 320px; height: 320px; border-radius: 50%; background: radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%); filter: blur(60px); pointer-events: none; z-index: 0; }
        .pj-page { position: relative; z-index: 1; max-width: 780px; margin: 0 auto; padding: 2.5rem 1.5rem 6rem; }
        .pj-topbar { display: flex; align-items: center; gap: 1.2rem; margin-bottom: 2.2rem; opacity: 0; transform: translateY(14px); transition: opacity .5s ease, transform .5s ease; }
        .pj-topbar.show { opacity: 1; transform: translateY(0); }
        .pj-back { display: flex; align-items: center; gap: .5rem; padding: .55rem 1rem; background: transparent; border: 1px solid #1e1e1e; border-radius: 10px; color: #555; font-size: .78rem; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all .22s; white-space: nowrap; }
        .pj-back:hover { border-color: #2a2a2a; color: #888; background: #0e0e0e; }
        .pj-back-line { width: 22px; height: 1.5px; background: currentColor; transition: width .25s; }
        .pj-back:hover .pj-back-line { width: 32px; }
        .pj-eyebrow { font-size: .6rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #eab308; display: flex; align-items: center; gap: .45rem; margin-bottom: .3rem; }
        .pj-eyebrow-dot { width: 5px; height: 5px; border-radius: 50%; background: #eab308; box-shadow: 0 0 7px #eab308; animation: pjDot 2s ease-in-out infinite; }
        @keyframes pjDot { 0%,100%{opacity:1} 50%{opacity:.25} }
        .pj-title { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; color: #fff; letter-spacing: -.02em; margin: 0; }
        .pj-title span { color: #eab308; }
        .pj-card { background: #0a0a0a; border: 1px solid #1a1a1a; border-radius: 22px; overflow: hidden; position: relative; opacity: 0; transform: translateY(20px); transition: opacity .5s ease .1s, transform .5s ease .1s; }
        .pj-card.show { opacity: 1; transform: translateY(0); }
        .pj-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1.5px; background: linear-gradient(90deg, transparent, #eab308 40%, #f59e0b 50%, #eab308 60%, transparent); background-size: 200% 100%; animation: pjBorder 3s linear infinite; z-index: 1; }
        @keyframes pjBorder { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .pj-fields { padding: 2rem 2.2rem 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; }
        .pj-field { display: flex; flex-direction: column; gap: .45rem; }
        .pj-field.span2 { grid-column: span 2; }
        .pj-field-label { font-size: .6rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: #404040; display: flex; align-items: center; gap: .45rem; }
        .pj-input-wrap { position: relative; }
        .pj-input-ico { position: absolute; left: .82rem; top: 50%; transform: translateY(-50%); color: #252525; pointer-events: none; transition: color .25s; }
        .pj-input-wrap:focus-within .pj-input-ico { color: #eab308; }
        .pj-input { width: 100%; background: #0e0e0e; border: 1px solid #1e1e1e; border-radius: 11px; padding: .72rem 1rem .72rem 2.5rem; font-size: .85rem; font-weight: 400; color: #d0d0d0; font-family: 'Inter', sans-serif; outline: none; transition: all .25s; caret-color: #eab308; }
        .pj-input::placeholder { color: #222; }
        .pj-input:focus { border-color: rgba(234,179,8,.35); background: #111; box-shadow: 0 0 0 3px rgba(234,179,8,.06); }
        .pj-input:hover:not(:focus) { border-color: #2a2a2a; }
        .pj-footer { padding: 1.2rem 2.2rem 2rem; border-top: 1px solid #111; display: flex; gap: .75rem; }
        .pj-cancel { flex: 1; padding: .82rem; background: transparent; border: 1px solid #1e1e1e; border-radius: 12px; color: #555; font-size: .83rem; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all .22s; }
        .pj-cancel:hover { border-color: #2a2a2a; color: #888; background: #0e0e0e; }
        .pj-submit { flex: 2; padding: .82rem; background: linear-gradient(135deg, #eab308, #f59e0b 50%, #d97706); border: none; border-radius: 12px; color: #000; font-size: .88rem; font-weight: 700; font-family: 'Space Grotesk', sans-serif; letter-spacing: .04em; cursor: pointer; position: relative; overflow: hidden; transition: all .35s cubic-bezier(.34,1.56,.64,1); box-shadow: 0 4px 22px rgba(234,179,8,.28), inset 0 1px 0 rgba(255,255,255,.2); display: flex; align-items: center; justify-content: center; gap: .5rem; }
        .pj-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(234,179,8,.45); }
        .pj-submit:disabled { opacity: .6; cursor: not-allowed; transform: none; }
        .pj-submit::before { content: ''; position: absolute; top: -50%; left: -60%; width: 40%; height: 200%; background: rgba(255,255,255,.22); transform: skewX(-22deg); animation: pjShine 3s ease-in-out infinite; }
        @keyframes pjShine { 0%{left:-60%} 100%{left:160%} }
        .pj-spin { animation: spin .7s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 580px) { .pj-fields { grid-template-columns: 1fr; } .pj-field.span2 { grid-column: span 1; } .pj-footer { flex-direction: column; } }
      `}</style>

      <div className="pj-root">
        <div className="pj-grid" />
        <div className="pj-orb1" />
        <div className="pj-orb2" />

        <Navbar />

        <div className="pj-page">

          {/* ── TOPBAR ── */}
          <div className={`pj-topbar${visible ? ' show' : ''}`}>
            <button className="pj-back" type="button" onClick={() => navigate('/admin/jobs')}>
              <div className="pj-back-line" />
              Back
            </button>
            <div>
              <div className="pj-eyebrow">
                <span className="pj-eyebrow-dot" />
                Admin · Edit Job
              </div>
              <h1 className="pj-title">Update <span>Details</span></h1>
            </div>
          </div>

          {/* ── CARD ── */}
          <div className={`pj-card${visible ? ' show' : ''}`}>
            <form onSubmit={submitHandler}>

              {/* Fields */}
              <div className="pj-fields">
                {fields.map(({ id, label, icon: Icon, type, placeholder, span }) => (
                  <div key={id} className={`pj-field${span === 2 ? ' span2' : ''}`}>
                    <div className="pj-field-label">
                      <Icon size={10} />
                      {label}
                    </div>
                    <div className="pj-input-wrap">
                      <Icon size={13} className="pj-input-ico" />
                      <input
                        className="pj-input"
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
              <div className="pj-footer">
                <button type="button" className="pj-cancel" onClick={() => navigate('/admin/jobs')}>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="pj-submit"
                  disabled={loading || !singleJob}
                >
                  {loading
                    ? <><Loader2 size={15} className="pj-spin" /> Saving...</>
                    : '⚡ Update Job Opening'
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

export default EditJob