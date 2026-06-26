import { Bell, ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface TopBarProps {
  title?: string
  showBack?: boolean
  showNotification?: boolean
}

export default function TopBar({ title, showBack = false, showNotification = false }: TopBarProps) {
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[#22C55E] font-medium text-sm min-h-[48px] pr-2"
            aria-label="Go back"
          >
            <ChevronLeft size={18} />
            Back
          </button>
        )}
        {title && <h1 className="text-base font-semibold text-gray-900">{title}</h1>}
      </div>

      {showNotification && (
        <button
          className="w-10 h-10 bg-[#121212] rounded-xl flex items-center justify-center"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-white" />
        </button>
      )}
    </div>
  )
}
