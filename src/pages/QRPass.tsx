import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { Copy, Share2, Zap } from 'lucide-react'
import TopBar from '../components/TopBar'
import { usePassStore } from '../store/passStore'

export default function QRPass() {
  const { activePass } = usePassStore()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!activePass || !canvasRef.current) return
    QRCode.toCanvas(canvasRef.current, activePass.passCode, {
      width: 220,
      margin: 2,
      color: { dark: '#000000', light: '#FFFFFF' },
    })
  }, [activePass])

  const handleCopy = async () => {
    if (!activePass) return
    await navigator.clipboard.writeText(activePass.passCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShare = async () => {
    if (!activePass) return
    if (navigator.share) {
      await navigator.share({
        title: 'My Soko Transit Pass',
        text: `Pass Code: ${activePass.passCode}`,
      })
    }
  }

  if (!activePass) {
    return (
      <div className="min-h-dvh bg-[#F3F4F6] flex flex-col">
        <TopBar title="QR Pass" showBack />
        <div className="flex-1 flex items-center justify-center flex-col gap-3 px-6 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
            <Zap size={28} className="text-gray-300" />
          </div>
          <p className="text-gray-700 font-semibold">No active pass</p>
          <p className="text-gray-400 text-sm">Purchase a pass to get your QR code</p>
        </div>
      </div>
    )
  }

  const tripsPercent = Math.round((activePass.tripsLeft / activePass.totalTrips) * 100)

  return (
    <div className="min-h-dvh bg-[#F3F4F6] flex flex-col">
      <TopBar title="QR Pass" showBack />

      <div className="px-4 pt-6 flex flex-col items-center">
        <h2 className="text-xl font-bold text-gray-900 mb-1">My QR Pass</h2>
        <p className="text-gray-500 text-sm mb-6">Show this to the conductor</p>

        {/* QR Card */}
        <div className="w-full bg-[#1F1F1F] rounded-2xl overflow-hidden shadow-card-lg">
          {/* QR Section */}
          <div className="p-6 flex flex-col items-center">
            <div className="bg-white rounded-2xl p-4 relative">
              <canvas ref={canvasRef} className="block" />
              {/* Center logo overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow">
                  <Zap size={20} className="text-[#22C55E]" fill="#22C55E" />
                </div>
              </div>
            </div>

            <p className="text-[#6B7280] text-xs mt-4 font-mono tracking-wider">
              {activePass.passCode}
            </p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2A2A2A] text-white text-sm font-medium rounded-xl active:scale-95 transition-transform"
              >
                <Copy size={15} />
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2A2A2A] text-white text-sm font-medium rounded-xl active:scale-95 transition-transform"
              >
                <Share2 size={15} /> Share
              </button>
            </div>
          </div>

          {/* Tear line */}
          <div className="flex items-center px-2">
            <div className="w-5 h-5 rounded-full bg-[#F3F4F6]" />
            <div className="flex-1 border-t-2 border-dashed border-[#3A3A3A]" />
            <div className="w-5 h-5 rounded-full bg-[#F3F4F6]" />
          </div>

          {/* Pass details */}
          <div className="px-6 py-5 space-y-3.5">
            {[
              { label: 'Route', value: activePass.route, valueClass: 'text-white' },
              { label: 'Plan', value: activePass.plan, valueClass: 'text-white' },
              {
                label: 'Trips Left',
                value: `${activePass.tripsLeft} / ${activePass.totalTrips}`,
                valueClass: 'text-[#22C55E] font-bold',
              },
              { label: 'Valid Until', value: activePass.validUntil, valueClass: 'text-white' },
            ].map(({ label, value, valueClass }) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-[#6B7280] text-sm">{label}</span>
                <span className={`text-sm ${valueClass}`}>{value}</span>
              </div>
            ))}

            {/* Progress bar */}
            <div className="pt-1">
              <div className="w-full h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#22C55E] rounded-full"
                  style={{ width: `${tripsPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="h-8" />
      </div>
    </div>
  )
}
