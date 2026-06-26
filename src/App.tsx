import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'

export default function App() {
  const { isDarkMode } = useAuthStore()

  useEffect(() => {
    const root = document.getElementById('root')
    const body = document.body
    if (!isDarkMode) {
      root?.classList.add('light-mode')
      body.classList.add('light-mode')
    } else {
      root?.classList.remove('light-mode')
      body.classList.remove('light-mode')
    }
  }, [isDarkMode])

  return <RouterProvider router={router} />
}
