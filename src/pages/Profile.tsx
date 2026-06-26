import { useState } from 'react'
import { User, Star, MapPin, Phone, Shield, LogOut, Trash2, ChevronRight } from 'lucide-react'
import TopBar from '../components/TopBar'
import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, updateUser, logout } = useAuthStore()
  const navigate = useNavigate()
  const [mpesa, setMpesa] = useState(user?.mpesaNumber ?? '')
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    // PATCH /api/users/me  { mpesaNumber: mpesa }
    updateUser({ mpesaNumber: mpesa })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleLogout = () => {
    logout()
    navigate('/auth', { replace: true })
  }

  return (
    <div className="min-h-dvh bg-[#F3F4F6] flex flex-col">
      <TopBar title="Profile" showBack />

      <div className="px-4 pt-6 space-y-4">
        {/* Avatar + info */}
        <div className="flex flex-col items-center pb-2">
          <div className="w-20 h-20 bg-[#22C55E]/10 rounded-full flex items-center justify-center mb-3">
            <User size={36} className="text-[#22C55E]" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">{user?.name ?? 'Guest'}</h2>
          <p className="text-gray-500 text-sm mt-0.5">{user?.email}</p>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5">
              <Star size={14} className="text-[#FACC15]" fill="#FACC15" />
              <span className="text-gray-600 text-sm">{user?.loyaltyPoints ?? 0} pts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-[#22C55E]" />
              <span className="text-gray-600 text-sm">{user?.totalTrips ?? 0} trips</span>
            </div>
          </div>
        </div>

        {/* M-Pesa */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Phone size={16} className="text-gray-600" />
            <h3 className="font-semibold text-gray-900">M-Pesa Number</h3>
          </div>
          <input
            type="tel"
            value={mpesa}
            onChange={(e) => setMpesa(e.target.value)}
            placeholder="e.g. 0712345678"
            className="w-full px-4 py-3.5 bg-[#1F1F1F] text-white placeholder-[#6B7280] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E] mb-3"
          />
          <button
            onClick={handleSave}
            className="w-full py-3.5 bg-[#22C55E] text-white font-semibold rounded-xl active:scale-[0.98] transition-transform"
          >
            {saved ? 'Saved ✓' : 'Save'}
          </button>
        </div>

        {/* Account Security */}
        <button className="w-full bg-white rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm active:bg-gray-50">
          <div className="w-10 h-10 bg-[#121212] rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-gray-900 font-medium text-sm">Account Security</p>
            <p className="text-gray-400 text-xs">Password & verification</p>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full bg-white border border-red-100 rounded-2xl py-4 flex items-center justify-center gap-2 text-red-500 font-semibold text-sm active:bg-red-50 transition-colors shadow-sm"
        >
          <LogOut size={16} />
          Log Out
        </button>

        {/* Delete Account */}
        <button className="w-full flex items-center justify-center gap-2 text-gray-400 text-sm py-2">
          <Trash2 size={15} />
          Delete Account
        </button>

        <p className="text-center text-gray-400 text-xs pb-4">
          Soko Transit v1.0 · "Move Smarter."
        </p>
      </div>
    </div>
  )
}
