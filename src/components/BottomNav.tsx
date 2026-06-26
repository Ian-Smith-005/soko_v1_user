import { NavLink } from 'react-router-dom'
import { Home, MapPin, QrCode, Wallet, User } from 'lucide-react'

const tabs = [
  { path: '/', label: 'Home', Icon: Home },
  { path: '/routes', label: 'Routes', Icon: MapPin },
  { path: '/qr', label: 'QR Pass', Icon: QrCode },
  { path: '/wallet', label: 'Wallet', Icon: Wallet },
  { path: '/profile', label: 'Profile', Icon: User },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#121212] border-t border-[#2A2A2A] z-50">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {tabs.map(({ path, label, Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[48px] ${
                isActive ? 'text-[#22C55E]' : 'text-[#6B7280]'
              }`
            }
            aria-label={label}
          >
            {({ isActive }) => (
              <>
                {path === '/qr' ? (
                  <span
                    className={`p-1.5 rounded-xl transition-all duration-200 ${
                      isActive ? 'bg-[#22C55E]' : ''
                    }`}
                  >
                    <Icon size={20} className={isActive ? 'text-white' : 'text-[#6B7280]'} />
                  </span>
                ) : (
                  <Icon size={20} />
                )}
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
