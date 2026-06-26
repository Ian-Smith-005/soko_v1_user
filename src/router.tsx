import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Splash from './pages/Splash'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Routes from './pages/Routes'
import QRPass from './pages/QRPass'
import Wallet from './pages/Wallet'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import { useAuthStore } from './store/authStore'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/auth" replace />
  return <>{children}</>
}

export const router = createBrowserRouter([
  // Splash is the true entry point — all root-level traffic lands here first
  { path: '/', element: <Splash /> },
  { path: '/splash', element: <Splash /> },
  { path: '/auth', element: <Auth /> },
  {
    path: '/app',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'routes', element: <Routes /> },
      { path: 'qr', element: <QRPass /> },
      { path: 'wallet', element: <Wallet /> },
      { path: 'profile', element: <Profile /> },
      { path: 'notifications', element: <Notifications /> },
    ],
  },
  // Anything unknown → splash
  { path: '*', element: <Navigate to="/" replace /> },
])
