import React, { useState } from 'react'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { MapPin, Briefcase, DollarSign, Users, ArrowUpRight, Star, Share2, Clock } from 'lucide-react'

const Job = ({ job }) => {
    const navigate = useNavigate()

    const [isStarred, setIsStarred] = useState(() => {
        const savedJobs = JSON.parse(localStorage.getItem("starredJobs")) || []
        return savedJobs.includes(job?._id)
    })

    const toggleStar = (e) => {
        e.stopPropagation()
        const savedJobs = JSON.parse(localStorage.getItem("starredJobs")) || []
        if (savedJobs.includes(job?._id)) {
            localStorage.setItem("starredJobs", JSON.stringify(savedJobs.filter(id => id !== job?._id)))
            setIsStarred(false)
        } else {
            savedJobs.push(job?._id)
            localStorage.setItem("starredJobs", JSON.stringify(savedJobs))
            setIsStarred(true)
        }
    }

    const daysAgo = (() => {
        if (!job?.createdAt) return 0
        return Math.floor((new Date() - new Date(job.createdAt)) / (1000 * 24 * 60 * 60))
    })()

    const shareJobHandler = (e) => {
        e.stopPropagation()
        try {
            navigator.clipboard.writeText(`${window.location.origin}/description/${job?._id}`)
            toast.success("Job link copied!")
        } catch {
            toast.error("Unable to copy link")
        }
    }

    return (
        <div
            style={{
                background: '#0f0f0f',
                border: '1px solid #1e1e1e',
                borderRadius: '14px',
                padding: '18px',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.25s ease',
                display: 'flex',
                flexDirection: 'column',
            }}
            onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(232,160,32,0.4)'
                e.currentTarget.style.background = '#131208'
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = '0 0 24px rgba(232,160,32,0.1), 0 8px 24px rgba(0,0,0,0.4)'
                e.currentTarget.querySelector('.jc-glow').style.opacity = '1'
            }}
            onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#1e1e1e'
                e.currentTarget.style.background = '#0f0f0f'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.querySelector('.jc-glow').style.opacity = '0'
            }}
            onClick={() => navigate(`/description/${job?._id}`)}
        >
            {/* Top amber glow line */}
            <div className="jc-glow" style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: 'linear-gradient(90deg, transparent, #e8a020, transparent)',
                opacity: 0, transition: 'opacity 0.25s',
                boxShadow: '0 0 10px rgba(232,160,32,0.5)',
            }} />

            {/* Row 1 — time + actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#3a3a3a', fontWeight: 500 }}>
                    <Clock size={10} />
                    {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                    <button
                        onClick={toggleStar}
                        style={{
                            width: 28, height: 28, borderRadius: 8,
                            border: `1px solid ${isStarred ? 'rgba(251,191,36,0.45)' : '#1e1e1e'}`,
                            background: isStarred ? 'rgba(251,191,36,0.1)' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.18s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(251,191,36,0.5)'; e.currentTarget.style.background = 'rgba(251,191,36,0.1)' }}
                        onMouseLeave={e => {
                            if (!isStarred) { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.background = 'transparent' }
                        }}
                    >
                        <Star size={13} color={isStarred ? '#fbbf24' : '#444'} fill={isStarred ? '#fbbf24' : 'none'} />
                    </button>
                    <button
                        onClick={shareJobHandler}
                        style={{
                            width: 28, height: 28, borderRadius: 8,
                            border: '1px solid #1e1e1e', background: 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer', transition: 'all 0.18s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.4)'; e.currentTarget.style.background = 'rgba(96,165,250,0.08)' }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.background = 'transparent' }}
                    >
                        <Share2 size={12} color="#444" />
                    </button>
                </div>
            </div>

            {/* Row 2 — Company */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div style={{
                    width: 38, height: 38, borderRadius: 9, overflow: 'hidden',
                    background: 'rgba(232,160,32,0.08)',
                    border: '1px solid rgba(232,160,32,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                }}>
                    {job?.company?.logo
                        ? <Avatar style={{ width: '100%', height: '100%' }}><AvatarImage src={job?.company?.logo} /></Avatar>
                        : <span style={{ fontSize: 13, fontWeight: 800, color: '#e8a020' }}>
                            {job?.company?.name?.charAt(0)?.toUpperCase() || '?'}
                          </span>
                    }
                </div>
                <div>
                    <p style={{ color: '#f0f0f0', fontWeight: 600, fontSize: 13, lineHeight: 1.2 }}>
                        {job?.company?.name}
                    </p>
                    <p style={{ color: '#424242', fontSize: 11, display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}>
                        <MapPin size={10} /> India
                    </p>
                </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, #1e1e1e, transparent)', marginBottom: 12 }} />

            {/* Row 3 — Title + desc */}
            <h2 style={{ color: '#e0e0e0', fontWeight: 700, fontSize: 14, marginBottom: 6, lineHeight: 1.3 }}>
                {job?.title}
            </h2>
            <p style={{
                color: '#3e3e3e', fontSize: 12, lineHeight: 1.65,
                display: '-webkit-box', WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical', overflow: 'hidden',
                marginBottom: 14, flex: 1,
            }}>
                {job?.description}
            </p>

            {/* Row 4 — Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 9px', borderRadius: 6,
                    background: 'rgba(96,165,250,0.08)', border: '1px solid rgba(96,165,250,0.2)',
                    color: '#60a5fa', fontSize: 11, fontWeight: 600,
                }}>
                    <Users size={10} /> {job?.position} Positions
                </span>
                <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 9px', borderRadius: 6,
                    background: 'rgba(52,211,153,0.08)', border: '1px solid rgba(52,211,153,0.2)',
                    color: '#34d399', fontSize: 11, fontWeight: 600,
                }}>
                    <Briefcase size={10} /> {job?.jobType}
                </span>
                <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '3px 9px', borderRadius: 6,
                    background: 'rgba(232,160,32,0.08)', border: '1px solid rgba(232,160,32,0.2)',
                    color: '#e8a020', fontSize: 11, fontWeight: 600,
                }}>
                    <DollarSign size={10} /> {job?.salary} LPA
                </span>
            </div>

            {/* Row 5 — Buttons */}
            <div style={{ display: 'flex', gap: 8 }}>
                <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/description/${job?._id}`) }}
                    style={{
                        flex: 1, padding: '8px 0', borderRadius: 9,
                        border: '1px solid #242424', background: '#111',
                        color: '#888', fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: 5, transition: 'all 0.18s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(232,160,32,0.4)'; e.currentTarget.style.color = '#e8a020'; e.currentTarget.style.background = 'rgba(232,160,32,0.07)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#242424'; e.currentTarget.style.color = '#888'; e.currentTarget.style.background = '#111' }}
                >
                    Details <ArrowUpRight size={12} />
                </button>
                <button
                    onClick={shareJobHandler}
                    style={{
                        flex: 1, padding: '8px 0', borderRadius: 9,
                        border: '1px solid rgba(96,165,250,0.2)',
                        background: 'rgba(96,165,250,0.06)',
                        color: '#60a5fa', fontSize: 12, fontWeight: 600,
                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: 5, transition: 'all 0.18s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.5)'; e.currentTarget.style.background = 'rgba(96,165,250,0.12)'; e.currentTarget.style.boxShadow = '0 0 12px rgba(96,165,250,0.15)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(96,165,250,0.2)'; e.currentTarget.style.background = 'rgba(96,165,250,0.06)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                    <Share2 size={12} /> Share
                </button>
            </div>
        </div>
    )
}

export default Job