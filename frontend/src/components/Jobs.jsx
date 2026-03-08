import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { Briefcase, SearchX, SlidersHorizontal, X } from 'lucide-react'
import { setSearchedQuery } from '@/redux/jobSlice'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from './ui/dialog'

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector(store => store.job)
  const dispatch = useDispatch()
  const [filterJobs, setFilterJobs] = useState(allJobs || [])
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Clean Redux state strictly as an Array for easy mapping
  const activeFilters = Array.isArray(searchedQuery) ? searchedQuery : (searchedQuery ? [searchedQuery] : [])

  useEffect(() => {
    const handleMove = (e) => {
      document.documentElement.style.setProperty('--jx', `${e.clientX}px`)
      document.documentElement.style.setProperty('--jy', `${e.clientY}px`)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  // Clear filters on unmount/mount
  useEffect(() => {
    dispatch(setSearchedQuery([]))
  }, [dispatch])

  // Advanced Filtering Logic
  useEffect(() => {
    if (activeFilters.length > 0) {
      const filteredJobs = allJobs?.filter((job) => {
        // Job must match ALL selected filters (AND logic across selections)
        return activeFilters.every(q => {
          const query = q.toLowerCase()
          let matchesText =
            job?.title?.toLowerCase().includes(query) ||
            job?.description?.toLowerCase().includes(query) ||
            job?.location?.toLowerCase().includes(query)

          let matchesSalary = false
          if (query.includes('lpa') && job?.salary) {
            const salaryStr = query.replace('lpa', '').trim()
            if (salaryStr.includes('-')) {
              const [min, max] = salaryStr.split('-').map(Number)
              if (job.salary >= min && job.salary <= max) matchesSalary = true
            } else if (salaryStr.includes('+')) {
              const min = Number(salaryStr.replace('+', ''))
              if (job.salary >= min) matchesSalary = true
            }
          }
          return matchesText || matchesSalary
        })
      })
      setFilterJobs(filteredJobs)
    } else {
      setFilterJobs(allJobs || [])
    }
  }, [allJobs, searchedQuery])

  const removeFilter = (filterToRemove) => {
    const newFilters = activeFilters.filter(f => f !== filterToRemove)
    dispatch(setSearchedQuery(newFilters))
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        :root { --jx: 50vw; --jy: 50vh; }

        .tl-jobs-page {
          min-height: 100vh; background: #060606; font-family: 'Inter', sans-serif; position: relative; overflow-x: hidden;
        }

        .tl-jobs-spotlight {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background: radial-gradient(700px circle at var(--jx) var(--jy), rgba(234,179,8,0.04), transparent 60%);
        }
        .tl-jobs-grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image: linear-gradient(rgba(234,179,8,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,0.02) 1px, transparent 1px);
          background-size: 64px 64px; mask-image: radial-gradient(ellipse 80% 50% at 50% 0%, #000 30%, transparent 100%);
        }
        .tl-jobs-orb {
          position: fixed; top: -100px; right: -80px; width: 400px; height: 400px; border-radius: 50%;
          background: radial-gradient(circle, rgba(234,179,8,0.05) 0%, transparent 70%); filter: blur(60px); pointer-events: none; z-index: 0;
        }

        .tl-jobs-inner {
          position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; padding: 28px 24px 60px;
        }

        .tl-jobs-header {
          display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; padding-bottom: 16px;
          border-bottom: 1px solid #1a1a1a; flex-wrap: wrap; gap: 16px;
        }

        .tl-jobs-count { display: flex; align-items: center; gap: 8px; font-size: .88rem; color: #555; font-weight: 500; }
        .tl-jobs-count-num { font-family: 'Space Grotesk', sans-serif; font-size: 1.1rem; font-weight: 800; color: #eab308; }

        .tl-filter-btn {
          display: flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #eab308, #d97706);
          color: #000; font-size: .82rem; font-weight: 700; padding: .65rem 1.4rem; border-radius: 10px; border: none;
          cursor: pointer; font-family: 'Space Grotesk', sans-serif; letter-spacing: .03em;
          box-shadow: 0 4px 18px rgba(234,179,8,0.28); position: relative; overflow: hidden; transition: all .3s;
        }
        .tl-filter-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(234,179,8,0.42); }

        /* MULTIPLE ACTIVE BADGES */
        .tl-active-filters-row { margin-bottom: 24px; display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .tl-filter-label-text { font-size: 13px; color: #777; font-weight: 500; margin-right: 4px; }
        .tl-jobs-query {
          display: inline-flex; align-items: center; gap: 6px; padding: 5px 10px 5px 12px; border-radius: 8px;
          background: rgba(234,179,8,0.08); border: 1px solid rgba(234,179,8,0.2);
          color: #eab308; font-size: .78rem; font-weight: 600;
        }
        .tl-query-close {
          cursor: pointer; color: #a17015; transition: all .2s; display: flex; align-items: center; justify-content: center;
          background: rgba(234,179,8,0.15); border-radius: 4px; padding: 2px;
        }
        .tl-query-close:hover { color: #fff; background: #ef4444; }
        
        .tl-clear-all-btn {
          font-size: 12px; color: #888; background: none; border: none; cursor: pointer; text-decoration: underline; padding: 0 8px;
        }
        .tl-clear-all-btn:hover { color: #fff; }

        .tl-jobs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        @media (max-width: 900px) { .tl-jobs-grid { grid-template-columns: repeat(2,1fr); } }
        @media (max-width: 600px) { .tl-jobs-grid { grid-template-columns: 1fr; } }

        .filter-dialog-content {
          background: #0a0a0a !important; border: 1px solid #1a1a1a !important; max-width: 850px !important;
          padding: 0 !important; border-radius: 16px !important; overflow: hidden;
        }

        .tl-jobs-empty {
          display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 100px 20px; text-align: center;
        }
        .tl-jobs-empty-ring {
          width: 72px; height: 72px; border-radius: 20px; background: rgba(234,179,8,0.06); border: 1px solid rgba(234,179,8,0.15);
          display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: #eab308;
        }
        .tl-jobs-empty-title { font-family: 'Space Grotesk', sans-serif; color: #d0d0d0; font-weight: 700; font-size: 1.1rem; margin-bottom: 8px; }
        .tl-jobs-empty-sub { color: #444; font-size: .85rem; }
      `}</style>

      <div className="tl-jobs-page">
        <div className="tl-jobs-spotlight" />
        <div className="tl-jobs-grid-bg" />
        <div className="tl-jobs-orb" />

        <Navbar />

        <div className="tl-jobs-inner">
          <div className="tl-jobs-header">
            <div className="tl-jobs-count">
              <Briefcase size={16} color="#eab308" />
              <span>
                <span className="tl-jobs-count-num">{filterJobs?.length || 0}</span>
                {' '}job{filterJobs?.length !== 1 ? 's' : ''} found
              </span>
            </div>

            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <button className="tl-filter-btn">
                  <SlidersHorizontal size={15} /> Filters
                </button>
              </DialogTrigger>
              <DialogContent className="filter-dialog-content">
                <DialogTitle className="sr-only">Filter Jobs</DialogTitle>
                <FilterCard onClose={() => setIsFilterOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Multiple Active Filter Badges */}
          {activeFilters.length > 0 && (
            <div className="tl-active-filters-row">
              <span className="tl-filter-label-text">Active Filters:</span>
              {activeFilters.map(query => (
                <div key={query} className="tl-jobs-query">
                  <span style={{ color: '#fff' }}>{query}</span>
                  <div className="tl-query-close" onClick={() => removeFilter(query)} title="Remove Filter">
                    <X size={12} strokeWidth={3} />
                  </div>
                </div>
              ))}
              {activeFilters.length > 1 && (
                <button className="tl-clear-all-btn" onClick={() => dispatch(setSearchedQuery([]))}>
                  Clear All
                </button>
              )}
            </div>
          )}

          {filterJobs?.length <= 0 ? (
            <div className="tl-jobs-empty">
              <div className="tl-jobs-empty-ring"><SearchX size={30} /></div>
              <p className="tl-jobs-empty-title">No jobs found</p>
              <p className="tl-jobs-empty-sub">Try removing some filters to see more opportunities.</p>
            </div>
          ) : (
            <div className="tl-jobs-grid">
              <AnimatePresence>
                {filterJobs.map((job, i) => (
                  <motion.div
                    key={job?._id}
                    initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.22, delay: i * 0.03 }}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Jobs