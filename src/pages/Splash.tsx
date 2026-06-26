import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function Splash() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
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

    return () => clearTimeout(timer)
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
        /* Fallback splash if video fails */
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src="/src/assets/soko-logo.jpeg"
            alt="Soko Transit"
            className="w-32 h-32 rounded-full border-4 border-[#D4AF37] gold-glow mb-8 object-cover"
          />
          <h1 className="text-3xl font-bold text-white font-heading tracking-widest mb-1">SOKO TRANSIT</h1>
          <p className="text-[#9CA3AF] text-sm tracking-wider mb-16">Move Smarter.</p>
          <div className="w-48 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
            <div className="h-full bg-[#D4AF37] rounded-full loading-bar" />
          </div>
        </div>
      )}
    </div>
  )
}
