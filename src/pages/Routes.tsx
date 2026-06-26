import { useState, useMemo } from 'react'
import { List, Map as MapIcon, Search, MapPin, Clock } from 'lucide-react'
import TopBar from '../components/TopBar'
import { ROUTES, BUS_POSITIONS } from '../utils/mockData'
import type { Route } from '../types'

type View = 'list' | 'map'

export default function Routes() {
  const [view, setView] = useState<View>('list')
  const [query, setQuery] = useState('')

  const filtered = useMemo(
    () =>
      ROUTES.filter(
        (r) =>
          r.name.toLowerCase().includes(query.toLowerCase()) ||
          r.from.toLowerCase().includes(query.toLowerCase()) ||
          r.to.toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  )

  return (
    <div className="min-h-dvh bg-[#F3F4F6] flex flex-col">
      <TopBar title="Routes" showBack />

      <div className="px-4 pt-5 pb-4">
        {/* Header + toggle */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Routes</h2>
            <p className="text-gray-500 text-sm">Find your daily route</p>
          </div>
          <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                view === 'list' ? 'bg-[#121212] text-white' : 'text-gray-500'
              }`}
            >
              <List size={15} /> List
            </button>
            <button
              onClick={() => setView('map')}
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors ${
                view === 'map' ? 'bg-[#121212] text-white' : 'text-gray-500'
              }`}
            >
              <MapIcon size={15} /> Map
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by route, area or destination..."
            className="w-full pl-10 pr-4 py-3.5 bg-[#1F1F1F] text-white placeholder-[#6B7280] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#22C55E]"
          />
        </div>

        {/* Content */}
        {view === 'list' ? (
          <RouteList routes={filtered} />
        ) : (
          <RouteMap />
        )}
      </div>
    </div>
  )
}

function RouteList({ routes }: { routes: Route[] }) {
  return (
    <div className="space-y-3">
      {routes.map((route) => (
        <div key={route.id} className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 bg-[#22C55E]/10 rounded-xl flex items-center justify-center mt-0.5 flex-shrink-0">
                <MapPin size={17} className="text-[#22C55E]" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{route.name}</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  {route.from} → {route.to}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock size={11} className="text-gray-400" />
                  <span className="text-gray-400 text-xs">
                    {route.duration} · {route.distance}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#22C55E] font-bold text-base">KES {route.price}</p>
              <p className="text-gray-400 text-xs">per trip</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 bg-[#121212] text-white text-xs font-medium px-3 py-2 rounded-lg">
              <MapIcon size={12} /> View on Map
            </button>
            <button className="flex-1 text-[#22C55E] text-xs font-semibold py-2 rounded-lg border border-[#22C55E]/30 bg-[#22C55E]/5">
              Get Pass →
            </button>
          </div>
        </div>
      ))}

      {routes.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <MapPin size={32} className="mx-auto mb-2 opacity-40" />
          <p>No routes found</p>
        </div>
      )}
    </div>
  )
}

function RouteMap() {
  // Dynamically import Leaflet only when map view is active
  const [MapComponent, setMapComponent] = useState<React.ComponentType | null>(null)

  useState(() => {
    import('./RoutesMap').then((m) => setMapComponent(() => m.default))
  })

  if (!MapComponent) {
    return (
      <div className="h-[480px] bg-[#1F1F1F] rounded-2xl flex items-center justify-center">
        <p className="text-[#9CA3AF] text-sm">Loading map...</p>
      </div>
    )
  }

  return <MapComponent />
}
