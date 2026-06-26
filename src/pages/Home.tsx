import { useNavigate } from 'react-router-dom'
import { Bell, CreditCard, QrCode, MapPin, Clock, Star, Bus, Zap } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { usePassStore } from '../store/passStore'
import { useWalletStore } from '../store/walletStore'
import { getGreeting } from '../utils/mockData'

export default function Home() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { activePass } = usePassStore()
  const { balance, loyaltyPoints } = useWalletStore()

  const progressPercent = activePass
    ? Math.round((activePass.tripsLeft / activePass.totalTrips) * 100)
    : 0

  const quickActions = [
    { label: 'Buy Pass', Icon: CreditCard, color: 'bg-green-50', iconColor: 'text-[#22C55E]', path: '/routes' },
    { label: 'My QR', Icon: QrCode, color: 'bg-blue-50', iconColor: 'text-blue-500', path: '/qr' },
    { label: 'Routes', Icon: MapPin, color: 'bg-orange-50', iconColor: 'text-orange-500', path: '/routes' },
    { label: 'Trips', Icon: Clock, color: 'bg-purple-50', iconColor: 'text-purple-500', path: '/wallet' },
  ]

  return (
    <div className="min-h-dvh bg-[#F3F4F6]">
      {/* Top Bar */}
      <div className="bg-white px-5 pt-4 pb-4 flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{getGreeting()}</p>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            {user?.name ?? 'Guest'} 👋
          </h1>
        </div>
        <button
          className="w-11 h-11 bg-[#121212] rounded-xl flex items-center justify-center shadow-md"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-white" />
        </button>
      </div>

      <div className="px-4 pt-4 space-y-4">
        {/* Active Pass Card */}
        {activePass ? (
          <div
            className="rounded-2xl p-5 cursor-pointer active:scale-[0.98] transition-transform"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f2010 100%)',
            }}
            onClick={() => navigate('/qr')}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-[#22C55E]/20 rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-[#22C55E]" />
              </div>
              <div>
                <p className="text-[#9CA3AF] text-xs">
                  {activePass.plan} Pass
                </p>
                <p className="text-white font-bold text-sm">{activePass.route}</p>
              </div>
            </div>

            <div className="mb-3">
              <span className="text-[#22C55E] text-4xl font-bold">{activePass.tripsLeft}</span>
              <p className="text-[#9CA3AF] text-xs mt-0.5">trips left</p>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="text-transparent text-xs">.</span>
              <span className="text-[#9CA3AF] text-xs">Valid until {activePass.validUntil}</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#22C55E] rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        ) : (
          <div
            className="rounded-2xl p-5 bg-[#1F1F1F] flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform"
            onClick={() => navigate('/routes')}
          >
            <div>
              <p className="text-[#9CA3AF] text-sm">No active pass</p>
              <p className="text-white font-semibold mt-1">Get a pass to start riding</p>
            </div>
            <div className="w-10 h-10 bg-[#22C55E] rounded-xl flex items-center justify-center">
              <CreditCard size={18} className="text-white" />
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(({ label, Icon, color, iconColor, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center shadow-sm active:scale-95 transition-transform`}>
                <Icon size={22} className={iconColor} />
              </div>
              <span className="text-xs text-gray-600 font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Wallet Card */}
        <div className="bg-[#1F1F1F] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-[#9CA3AF]" />
              <span className="text-[#9CA3AF] text-sm">Wallet Balance</span>
            </div>
            <button
              onClick={() => navigate('/wallet')}
              className="flex items-center gap-1 text-[#22C55E] text-sm font-semibold"
            >
              + Top Up
            </button>
          </div>
          <p className="text-white text-2xl font-bold">
            KES {balance.toLocaleString()}
          </p>
          <div className="flex items-center gap-1.5 mt-2">
            <Star size={14} className="text-[#FACC15]" fill="#FACC15" />
            <span className="text-[#9CA3AF] text-sm">{loyaltyPoints} loyalty points</span>
          </div>
        </div>

        {/* Recent Trips */}
        <div>
          <h2 className="text-gray-900 font-bold text-base mb-3">Recent Trips</h2>
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <MapPin size={24} className="text-gray-400" />
            </div>
            <p className="text-gray-700 font-medium">No trips yet</p>
            <p className="text-gray-400 text-sm text-center mt-1">Your trip history will appear here</p>
          </div>
        </div>

        {/* Operator Login */}
        <button className="w-full py-3.5 bg-white rounded-2xl flex items-center justify-center gap-2 text-gray-500 text-sm font-medium border border-gray-200">
          <Bus size={16} />
          Operator / Conductor Login
        </button>

        <div className="h-4" />
      </div>
    </div>
  )
}
