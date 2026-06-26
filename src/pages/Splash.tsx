import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

export default function Splash() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(isAuthenticated ? '/' : '/auth', { replace: true })
    }, 2200)
    return () => clearTimeout(timer)
  }, [navigate, isAuthenticated])

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] flex flex-col items-center justify-center z-50">
      {/* Gold ring logo */}
      <div className="relative mb-8">
        <div className="w-28 h-28 rounded-full border-4 border-[#D4AF37] flex items-center justify-center bg-[#121212] shadow-[0_0_40px_rgba(212,175,55,0.3)]">
          <div className="w-20 h-20 rounded-full bg-[#22C55E]/10 flex items-center justify-center">
            <Zap size={40} className="text-[#22C55E]" fill="#22C55E" />
          </div>
        </div>
        {/* Pulse rings */}
        <div className="absolute inset-0 rounded-full border-2 border-[#D4AF37]/30 animate-ping" />
      </div>

      <h1 className="text-3xl font-bold text-white font-heading tracking-widest mb-1">
        SOKO TRANSIT
      </h1>
      <p className="text-[#9CA3AF] text-sm tracking-wider">Move Smarter.</p>

      {/* Loading bar */}
      <div className="mt-16 w-48 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
        <div className="h-full bg-[#D4AF37] rounded-full animate-[loading_2s_ease-in-out_forwards]" />
      </div>

      <style>{`
        @keyframes loading {
          from { width: 0% }
          to { width: 100% }
        }
      `}</style>
    </div>
  )
}
