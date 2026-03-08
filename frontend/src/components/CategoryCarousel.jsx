import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const category = [
  'Backend Engineer',
  'MERN Stack Engineer',
  'Software Development Engineer',
  'Generative AI Developer',
  'Machine Learning Engineer',
  'Data Scientist',
]

const CategoryCarousel = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query))
    navigate('/browse')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .cc-section {
          position: relative; background: #060606;
          padding: 16px 20px 52px; overflow: hidden;
          font-family: 'Inter', sans-serif;
        }
        .cc-orb {
          position: absolute; pointer-events: none;
          width: 600px; height: 200px; border-radius: 999px;
          background: radial-gradient(ellipse, rgba(234,179,8,0.05) 0%, transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%,-50%);
        }

        /* Label */
        .cc-label-wrap { text-align: center; margin-bottom: 24px; }
        .cc-label {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: .62rem; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #eab308;
        }
        .cc-label::before, .cc-label::after {
          content: ''; display: inline-block;
          width: 28px; height: 1.5px; border-radius: 2px;
        }
        .cc-label::before { background: linear-gradient(90deg, transparent, #eab308); }
        .cc-label::after  { background: linear-gradient(90deg, #eab308, transparent); }

        /* Wrap */
        .cc-wrap {
          position: relative; max-width: 800px; margin: 0 auto; z-index: 1;
        }

        /* Fade edges */
        .cc-fade-l, .cc-fade-r {
          position: absolute; top: 0; bottom: 0; width: 70px; z-index: 2; pointer-events: none;
        }
        .cc-fade-l { left:  0; background: linear-gradient(90deg,  #060606, transparent); }
        .cc-fade-r { right: 0; background: linear-gradient(-90deg, #060606, transparent); }

        /* Category button */
        .cc-btn {
          display: inline-flex; align-items: center; gap: 9px;
          width: 100%; padding: 12px 18px;
          border-radius: 12px; border: 1px solid #1e1e1e;
          background: #0e0e0e; color: #666;
          font-size: .82rem; font-weight: 500;
          cursor: pointer; white-space: nowrap;
          font-family: 'Inter', sans-serif;
          transition: all .22s; position: relative; overflow: hidden;
        }
        .cc-btn::before {
          content: ''; position: absolute; top: 0; left: -100%;
          width: 50%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.03), transparent);
          transition: left .4s ease;
        }
        .cc-btn:hover::before { left: 160%; }
        .cc-btn:hover {
          border-color: rgba(234,179,8,0.4);
          background: rgba(234,179,8,0.06);
          color: #eab308;
          transform: translateY(-2px);
          box-shadow: 0 0 18px rgba(234,179,8,0.1), 0 4px 14px rgba(0,0,0,0.3);
        }

        .cc-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #222; flex-shrink: 0; transition: all .2s;
        }
        .cc-btn:hover .cc-dot { background: #eab308; box-shadow: 0 0 7px rgba(234,179,8,0.8); }

        /* Arrow overrides */
        .cc-wrap .cc-arrow {
          position: absolute; top: 50%; z-index: 10;
          transform: translateY(-50%);
          width: 36px; height: 36px; border-radius: 10px;
          background: #0e0e0e; border: 1px solid #222;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #444; transition: all .2s;
        }
        .cc-arrow:hover {
          border-color: rgba(234,179,8,0.45);
          color: #eab308; background: rgba(234,179,8,0.07);
          box-shadow: 0 0 14px rgba(234,179,8,0.15);
        }
        .cc-arrow.prev { left: -48px; }
        .cc-arrow.next { right: -48px; }
        @media (max-width: 900px) {
          .cc-arrow.prev { left: -10px; }
          .cc-arrow.next { right: -10px; }
        }
      `}</style>

      <div className="cc-section">
        <div className="cc-orb" />

        <div className="cc-label-wrap">
          <span className="cc-label">Explore by Role</span>
        </div>

        <div className="cc-wrap">
          <Carousel className="w-full">
            <div className="cc-fade-l" />
            <div className="cc-fade-r" />

            <CarouselContent className="-ml-3" style={{ alignItems: 'center' }}>
              {category.map((cat, i) => (
                <CarouselItem key={i} className="pl-3 md:basis-1/2 lg:basis-1/3">
                  <button className="cc-btn" onClick={() => searchJobHandler(cat)}>
                    <span className="cc-dot" />
                    {cat}
                  </button>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="cc-arrow prev">
              <ChevronLeft size={16} />
            </CarouselPrevious>
            <CarouselNext className="cc-arrow next">
              <ChevronRight size={16} />
            </CarouselNext>
          </Carousel>
        </div>
      </div>
    </>
  )
}

export default CategoryCarousel