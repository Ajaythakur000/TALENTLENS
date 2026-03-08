import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { MapPin, Layers, DollarSign, SlidersHorizontal, Check } from 'lucide-react'

const filterData = [
  {
    filterType: "Location", icon: MapPin, color: '#60a5fa',
    activeBg: 'rgba(96,165,250,0.1)', activeBorder: 'rgba(96,165,250,0.4)',
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry", icon: Layers, color: '#a78bfa',
    activeBg: 'rgba(167,139,250,0.1)', activeBorder: 'rgba(167,139,250,0.4)',
    array: [
      "Backend Engineer", "MERN Stack Engineer",
      "Software Development Engineer", "Generative AI Developer",
      "Machine Learning Engineer", "Data Scientist",
    ]
  },
  {
    filterType: "Salary", icon: DollarSign, color: '#34d399',
    activeBg: 'rgba(52,211,153,0.1)', activeBorder: 'rgba(52,211,153,0.4)',
    array: ["8-15 LPA", "15-25 LPA", "25-40 LPA", "40-60 LPA", "60+ LPA"]
  },
]

const STYLES = `
  .tl-filter { width: 100%; background: transparent; display: flex; flex-direction: column; max-height: 85vh; }
  .tl-filter-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px; border-bottom: 1px solid #181818;
  }
  .tl-filter-title {
    display: flex; align-items: center; gap: 8px;
    font-size: 13px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: #d0d0d0;
  }
  .tl-filter-icon-box {
    width: 28px; height: 28px; border-radius: 8px;
    background: rgba(232,160,32,0.1); border: 1px solid rgba(232,160,32,0.2);
    display: flex; align-items: center; justify-content: center;
  }
  .tl-filter-clear {
    font-size: 12px; color: #888; cursor: pointer; background: none; border: none; transition: color 0.2s;
  }
  .tl-filter-clear:hover { color: #f87171; text-decoration: underline; }

  .tl-filter-body {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; padding: 20px; overflow-y: auto;
  }
  @media (max-width: 768px) { .tl-filter-body { grid-template-columns: 1fr; } }

  .tl-filter-section-head {
    display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700;
    letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 12px;
  }

  .tl-filter-item {
    display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 8px;
    cursor: pointer; margin-bottom: 4px; border: 1px solid transparent; transition: all 0.18s;
  }
  .tl-filter-item:hover { background: rgba(255,255,255,0.025); border-color: #1e1e1e; }
  .tl-filter-item label { font-size: 13px; color: #777; cursor: pointer; flex: 1; transition: color 0.18s; }
  .tl-filter-item:hover label { color: #aaa; }

  /* Custom Checkbox */
  .tl-checkbox-box {
    width: 16px; height: 16px; border-radius: 4px; border: 1.5px solid #444;
    display: flex; align-items: center; justify-content: center; transition: all 0.2s; flex-shrink: 0;
  }
  .tl-checkbox-box svg { opacity: 0; transition: opacity 0.2s; }

  /* Footer Actions */
  .tl-filter-footer {
    padding: 16px 20px; border-top: 1px solid #181818; background: #0c0c0c;
    display: flex; justify-content: flex-end; gap: 12px;
  }
  .tl-btn-cancel {
    padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 600;
    color: #888; background: transparent; border: 1px solid #222; cursor: pointer; transition: all 0.2s;
  }
  .tl-btn-cancel:hover { background: #1a1a1a; color: #fff; }
  
  .tl-btn-apply {
    padding: 8px 20px; border-radius: 8px; font-size: 13px; font-weight: 700;
    color: #000; background: #e8a020; border: none; cursor: pointer; transition: all 0.2s;
    box-shadow: 0 4px 12px rgba(232,160,32,0.2);
  }
  .tl-btn-apply:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(232,160,32,0.35); }
`

const FilterCard = ({ onClose }) => {
  const dispatch = useDispatch()
  const { searchedQuery } = useSelector(store => store.job)
  
  // Local state taaki apply button dabne tak update na ho
  const [localFilters, setLocalFilters] = useState([])

  // Load existing filters when modal opens
  useEffect(() => {
    if (Array.isArray(searchedQuery)) {
      setLocalFilters(searchedQuery)
    } else if (typeof searchedQuery === 'string' && searchedQuery.trim() !== '') {
      setLocalFilters([searchedQuery])
    } else {
      setLocalFilters([])
    }
  }, [searchedQuery])

  const toggleFilter = (item) => {
    setLocalFilters(prev => 
      prev.includes(item) 
        ? prev.filter(f => f !== item) 
        : [...prev, item]
    )
  }

  const applyFilters = () => {
    dispatch(setSearchedQuery(localFilters))
    if (onClose) onClose()
  }

  const clearAll = () => {
    setLocalFilters([])
  }

  return (
    <div className="tl-filter">
      <style>{STYLES}</style>

      <div className="tl-filter-header">
        <div className="tl-filter-title">
          <div className="tl-filter-icon-box">
            <SlidersHorizontal size={14} color="#e8a020" />
          </div>
          Filter Options
        </div>
        {localFilters.length > 0 && (
          <button className="tl-filter-clear" onClick={clearAll}>
            Clear All
          </button>
        )}
      </div>

      <div className="tl-filter-body">
        {filterData.map((data, index) => {
          const Icon = data.icon
          return (
            <div key={index} className="tl-filter-section">
              <div className="tl-filter-section-head" style={{ color: data.color }}>
                <Icon size={12} /> {data.filterType}
              </div>
              <div>
                {data.array.map((item, idx) => {
                  const isSelected = localFilters.includes(item)
                  return (
                    <div
                      key={idx}
                      className="tl-filter-item"
                      style={isSelected ? { background: data.activeBg, borderColor: data.activeBorder } : {}}
                      onClick={() => toggleFilter(item)}
                    >
                      <div
                        className="tl-checkbox-box"
                        style={isSelected ? { borderColor: data.color, background: data.color, boxShadow: `0 0 8px ${data.color}66` } : {}}
                      >
                        <Check size={10} color="#000" style={isSelected ? { opacity: 1, strokeWidth: 4 } : {}} />
                      </div>
                      <label style={isSelected ? { color: data.color, fontWeight: 600 } : {}}>
                        {item}
                      </label>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="tl-filter-footer">
        <button className="tl-btn-cancel" onClick={onClose}>Cancel</button>
        <button className="tl-btn-apply" onClick={applyFilters}>
          Apply {localFilters.length > 0 ? `(${localFilters.length})` : ''}
        </button>
      </div>
    </div>
  )
}

export default FilterCard