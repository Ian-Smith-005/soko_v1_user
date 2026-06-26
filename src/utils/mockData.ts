import type { Route } from '../types'

export const ROUTES: Route[] = [
  { id: '1', name: 'CBD - JKIA', from: 'Nairobi CBD', to: 'JKIA Airport', duration: '35 min', distance: '18 km', price: 250, coordinates: [[-1.2921, 36.8219], [-1.3192, 36.9275]] },
  { id: '2', name: 'Westlands - CBD', from: 'Westlands', to: 'Nairobi CBD', duration: '15 min', distance: '5 km', price: 50, coordinates: [[-1.2676, 36.8030], [-1.2921, 36.8219]] },
  { id: '3', name: 'Nairobi - Limuru', from: 'Nairobi CBD', to: 'Limuru', duration: '55 min', distance: '33 km', price: 180, coordinates: [[-1.2921, 36.8219], [-1.1139, 36.6427]] },
  { id: '4', name: 'Nairobi - Kiambu', from: 'Nairobi CBD', to: 'Kiambu', duration: '30 min', distance: '16 km', price: 100, coordinates: [[-1.2921, 36.8219], [-1.1714, 36.8355]] },
  { id: '5', name: 'Nairobi - Juja', from: 'Nairobi CBD', to: 'Juja', duration: '45 min', distance: '36 km', price: 150, coordinates: [[-1.2921, 36.8219], [-1.1036, 37.0144]] },
  { id: '6', name: 'Nairobi - Rongai', from: 'Nairobi CBD', to: 'Rongai', duration: '40 min', distance: '22 km', price: 120, coordinates: [[-1.2921, 36.8219], [-1.4332, 36.7440]] },
  { id: '7', name: 'Nairobi - Kitengela', from: 'Nairobi CBD', to: 'Kitengela', duration: '50 min', distance: '30 km', price: 170, coordinates: [[-1.2921, 36.8219], [-1.4738, 36.9607]] },
  { id: '8', name: 'Nairobi - Thika', from: 'Nairobi CBD', to: 'Thika', duration: '1 hr', distance: '45 km', price: 200, coordinates: [[-1.2921, 36.8219], [-1.0332, 37.0693]] },
]

export const BUS_POSITIONS: [number, number][] = [
  [-1.2676, 36.8030],
  [-1.2921, 36.8219],
  [-1.3192, 36.9275],
  [-1.1714, 36.8355],
  [-1.1036, 37.0144],
  [-1.4332, 36.7440],
  [-1.1139, 36.6427],
]

export const getGreeting = (): string => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}
