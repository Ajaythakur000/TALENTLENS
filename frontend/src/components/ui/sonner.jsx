import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500&display=swap');

        /* ── Base toast ── */
        [data-sonner-toaster] [data-sonner-toast] {
          font-family: 'Inter', sans-serif !important;
          font-size: 0.82rem !important;
          font-weight: 500 !important;
          background: #0e0e0e !important;
          border: 1px solid #222 !important;
          border-radius: 14px !important;
          color: #d0d0d0 !important;
          box-shadow:
            0 0 0 1px rgba(234,179,8,0.06),
            0 8px 32px rgba(0,0,0,0.7),
            0 2px 8px rgba(0,0,0,0.5) !important;
          padding: 12px 16px !important;
          gap: 10px !important;
          backdrop-filter: blur(12px) !important;
          position: relative !important;
          overflow: hidden !important;
          animation: toastSlideIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) !important;
        }

        /* ── Slide in from bottom ── */
        @keyframes toastSlideIn {
          from {
            opacity: 0;
            transform: translateY(14px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* ── Animated gold top border on every toast ── */
        [data-sonner-toaster] [data-sonner-toast]::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1.5px;
          background: linear-gradient(
            90deg,
            transparent,
            #eab308 35%,
            #f59e0b 50%,
            #eab308 65%,
            transparent
          );
          background-size: 300% 100%;
          animation: borderSweep 2.5s linear infinite;
          z-index: 10;
        }
        @keyframes borderSweep {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Subtle shimmer overlay ── */
        [data-sonner-toaster] [data-sonner-toast]::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 35%,
            rgba(234,179,8,0.03) 50%,
            transparent 65%
          );
          background-size: 300% 100%;
          animation: toastShimmer 3s ease-in-out infinite;
          pointer-events: none;
          border-radius: 14px;
        }
        @keyframes toastShimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ── Toast title ── */
        [data-sonner-toaster] [data-sonner-toast] [data-title] {
          font-family: 'Space Grotesk', sans-serif !important;
          font-weight: 600 !important;
          font-size: 0.84rem !important;
          color: #f0f0f0 !important;
          letter-spacing: -0.01em !important;
        }

        /* ── Toast description ── */
        [data-sonner-toaster] [data-sonner-toast] [data-description] {
          font-size: 0.74rem !important;
          color: #666 !important;
          margin-top: 2px !important;
        }

        /* ── SUCCESS ── green left border + icon */
        [data-sonner-toaster] [data-sonner-toast][data-type="success"] {
          border-left: 2.5px solid #22c55e !important;
        }
        [data-sonner-toaster] [data-sonner-toast][data-type="success"] [data-icon] svg {
          color: #22c55e !important;
          filter: drop-shadow(0 0 6px rgba(34,197,94,0.5));
        }

        /* ── ERROR ── red left border + icon */
        [data-sonner-toaster] [data-sonner-toast][data-type="error"] {
          border-left: 2.5px solid #f87171 !important;
        }
        [data-sonner-toaster] [data-sonner-toast][data-type="error"] [data-icon] svg {
          color: #f87171 !important;
          filter: drop-shadow(0 0 6px rgba(248,113,113,0.5));
        }

        /* ── WARNING ── amber left border + icon */
        [data-sonner-toaster] [data-sonner-toast][data-type="warning"] {
          border-left: 2.5px solid #f59e0b !important;
        }
        [data-sonner-toaster] [data-sonner-toast][data-type="warning"] [data-icon] svg {
          color: #f59e0b !important;
          filter: drop-shadow(0 0 6px rgba(245,158,11,0.5));
        }

        /* ── INFO ── blue left border + icon */
        [data-sonner-toaster] [data-sonner-toast][data-type="info"] {
          border-left: 2.5px solid #60a5fa !important;
        }
        [data-sonner-toaster] [data-sonner-toast][data-type="info"] [data-icon] svg {
          color: #60a5fa !important;
          filter: drop-shadow(0 0 6px rgba(96,165,250,0.5));
        }

        /* ── LOADING ── gold spinner */
        [data-sonner-toaster] [data-sonner-toast][data-type="loading"] [data-icon] svg {
          color: #eab308 !important;
          filter: drop-shadow(0 0 5px rgba(234,179,8,0.6));
        }

        /* ── Close button ── */
        [data-sonner-toaster] [data-sonner-toast] [data-close-button] {
          background: transparent !important;
          border: 1px solid #2a2a2a !important;
          border-radius: 7px !important;
          color: #555 !important;
          transition: all 0.2s !important;
          top: 10px !important;
          right: 10px !important;
        }
        [data-sonner-toaster] [data-sonner-toast] [data-close-button]:hover {
          background: #1a1a1a !important;
          border-color: #eab308 !important;
          color: #eab308 !important;
        }

        /* ── Action button ── */
        [data-sonner-toaster] [data-sonner-toast] [data-button] {
          background: rgba(234,179,8,0.1) !important;
          border: 1px solid rgba(234,179,8,0.25) !important;
          color: #eab308 !important;
          border-radius: 8px !important;
          font-family: 'Space Grotesk', sans-serif !important;
          font-weight: 600 !important;
          font-size: 0.72rem !important;
          transition: all 0.2s !important;
        }
        [data-sonner-toaster] [data-sonner-toast] [data-button]:hover {
          background: rgba(234,179,8,0.18) !important;
          border-color: rgba(234,179,8,0.5) !important;
        }

        /* ── Cancel button ── */
        [data-sonner-toaster] [data-sonner-toast] [data-cancel] {
          background: transparent !important;
          color: #555 !important;
          font-size: 0.72rem !important;
          transition: color 0.2s !important;
        }
        [data-sonner-toaster] [data-sonner-toast] [data-cancel]:hover {
          color: #888 !important;
        }
      `}</style>

      <Sonner
        theme={theme}
        className="toaster group"
        position="bottom-right"
        toastOptions={{
          duration: 3500,
        }}
        icons={{
          success: <CircleCheckIcon className="size-4" />,
          info: <InfoIcon className="size-4" />,
          warning: <TriangleAlertIcon className="size-4" />,
          error: <OctagonXIcon className="size-4" />,
          loading: <Loader2Icon className="size-4 animate-spin" />,
        }}
        style={{
          "--normal-bg": "#0e0e0e",
          "--normal-text": "#d0d0d0",
          "--normal-border": "#222222",
          "--success-bg": "#0e0e0e",
          "--success-text": "#d0d0d0",
          "--success-border": "#1a3a1a",
          "--error-bg": "#0e0e0e",
          "--error-text": "#d0d0d0",
          "--error-border": "#3a1a1a",
          "--warning-bg": "#0e0e0e",
          "--warning-text": "#d0d0d0",
          "--warning-border": "#3a2a0a",
          "--border-radius": "14px",
          "--font": "'Inter', sans-serif",
          "--width": "340px",
          "--offset": "20px",
        }}
        {...props}
      />
    </>
  )
}

export { Toaster }