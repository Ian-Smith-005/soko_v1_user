import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Splash() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const FALLBACK_DURATION = 3000
    const timer = setTimeout(() => {
      navigate(isAuthenticated ? '/' : '/auth', { replace: true })
    }, 10000)

    const video = videoRef.current
    if (video) {
      video.play().catch(() => setVideoError(true))
      video.addEventListener('ended', () => {
        navigate(isAuthenticated ? '/' : '/auth', { replace: true })
      })
    }

    // Animate progress bar on fallback
    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / FALLBACK_DURATION) * 100, 100)
      setProgress(pct)
      if (pct >= 100) {
        clearInterval(interval)
        navigate(isAuthenticated ? '/' : '/auth', { replace: true })
      }
    }, 30)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [navigate, isAuthenticated])

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] z-50 overflow-hidden">
      {!videoError ? (
        <video
          ref={videoRef}
          src="/loading.mp4"
          className="w-full h-full object-cover"
          muted
          playsInline
          onError={() => setVideoError(true)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full px-8">
          {/* Logo with gold ring */}
          <div className="relative mb-8">
            <div className="w-36 h-36 rounded-full border-4 border-[#D4AF37] overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.35)]">
              <img
                src="/soko-logo.jpeg"
                alt="Soko Transit"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Pulse ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/40 animate-ping"
              style={{ animationDuration: '2s' }}
            />
          </div>

          <h1 className="text-3xl font-bold text-white font-heading tracking-widest mb-2">
            SOKO TRANSIT
          </h1>
          <p className="text-[#9CA3AF] text-sm tracking-widest mb-16">
            Move Smarter.
          </p>

          {/* Progress bar */}
          <div className="w-52 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] rounded-full transition-none"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-[#6B7280] text-xs mt-4 tracking-wider">
            Loading…
          </p>
        </div>
      )}
    </div>
  )
}
