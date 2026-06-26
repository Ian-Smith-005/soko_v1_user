import { useState } from 'react'
import { CreditCard, Star, Phone, ArrowUpRight, ArrowDownLeft, X } from 'lucide-react'
import TopBar from '../components/TopBar'
import { useWalletStore } from '../store/walletStore'

export default function Wallet() {
  const { balance, loyaltyPoints, transactions, topUp } = useWalletStore()
  const [showTopUp, setShowTopUp] = useState(false)
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)

  const presets = [100, 500, 1000, 2000]

  const handleTopUp = async () => {
    const value = parseInt(amount)
    if (!value || value < 50) return
    setLoading(true)
    // POST /api/wallet/topup  { amount, method: 'mpesa' }
    await new Promise((r) => setTimeout(r, 1200))
    topUp(value)
    setLoading(false)
    setShowTopUp(false)
    setAmount('')
  }

  return (
    <div className="min-h-dvh bg-[#F3F4F6] flex flex-col">
      <TopBar title="Wallet" showBack />

      <div className="px-4 pt-5 space-y-4">
        {/* Balance Card */}
        <div
          className="rounded-2xl p-5 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #0f2010 100%)' }}
        >
          {/* Decorative circle */}
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#22C55E]/10" />

          <div className="flex items-center gap-2 mb-2">
            <CreditCard size={15} className="text-[#9CA3AF]" />
            <span className="text-[#9CA3AF] text-sm">Wallet Balance</span>
          </div>

          <p className="text-white text-3xl font-bold mb-1">
            KES {balance.toLocaleString()}
          </p>

          <div className="flex items-center gap-1.5 mb-5">
            <Star size={14} className="text-[#FACC15]" fill="#FACC15" />
            <span className="text-[#9CA3AF] text-sm">{loyaltyPoints} points</span>
          </div>

          <button
            onClick={() => setShowTopUp(true)}
            className="flex items-center gap-2 bg-[#22C55E] text-white font-semibold px-5 py-3 rounded-xl text-sm active:scale-95 transition-transform"
          >
            <Phone size={16} />
            M-Pesa Top Up
          </button>
        </div>

        {/* Transactions */}
        <div>
          <h3 className="text-gray-900 font-bold text-base mb-3">Transactions</h3>

          {transactions.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center">
              <CreditCard size={28} className="text-gray-300 mb-2" />
              <p className="text-gray-500 text-sm">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div key={tx.id} className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-sm">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    tx.type === 'credit' ? 'bg-green-50' : 'bg-orange-50'
                  }`}>
                    {tx.type === 'credit' ? (
                      <ArrowDownLeft size={18} className="text-[#22C55E]" />
                    ) : (
                      <ArrowUpRight size={18} className="text-orange-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 text-sm font-medium truncate">{tx.description}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{tx.date}</p>
                  </div>
                  <p className={`text-sm font-bold flex-shrink-0 ${
                    tx.type === 'credit' ? 'text-[#22C55E]' : 'text-gray-700'
                  }`}>
                    {tx.type === 'debit' ? '-' : '+'}KES {tx.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Up Modal */}
      {showTopUp && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end" onClick={() => setShowTopUp(false)}>
          <div
            className="w-full max-w-[430px] mx-auto bg-white rounded-t-3xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">Top Up Wallet</h3>
              <button onClick={() => setShowTopUp(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <X size={16} />
              </button>
            </div>

            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (KES)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 500"
              className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-[#22C55E] mb-4"
            />

            <div className="grid grid-cols-4 gap-2 mb-6">
              {presets.map((p) => (
                <button
                  key={p}
                  onClick={() => setAmount(String(p))}
                  className={`py-2.5 rounded-xl text-sm font-medium border transition-colors ${
                    amount === String(p)
                      ? 'border-[#22C55E] text-[#22C55E] bg-[#22C55E]/5'
                      : 'border-gray-200 text-gray-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={handleTopUp}
              disabled={loading || !amount || parseInt(amount) < 50}
              className="w-full py-4 bg-[#22C55E] text-white font-semibold rounded-xl disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              {loading ? 'Processing...' : 'Pay with M-Pesa'}
            </button>
            <p className="text-center text-gray-400 text-xs mt-3">You'll receive an M-Pesa prompt on your phone</p>
          </div>
        </div>
      )}
    </div>
  )
}
