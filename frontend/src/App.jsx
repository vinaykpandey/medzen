import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'
import LoginSecure from './pages/LoginSecure'
import ProfileSecure from './pages/ProfileSecure'
import ProtectedRouteSecure from './routes/ProtectedRouteSecure'
import { LoginPage } from './pages/Login'
import { DashboardPage } from './pages/Dashboard'
import { ProtectedRoute } from './routes/ProtectedRoute'

/**
 * App Component - Main application router with secure authentication
 * Uses HTTP-only cookies for session management
 */
function App() {
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser)

  // Check if user is already logged in on app load
  useEffect(() => {
    fetchCurrentUser()
  }, [fetchCurrentUser])

  return (
    <BrowserRouter>
      <Routes>
        {/* Secure Authentication Routes (HTTP-only Cookie based) */}
        <Route path="/login" element={<LoginSecure />} />
        
        <Route
          path="/profile"
          element={
            <ProtectedRouteSecure>
              <ProfileSecure />
            </ProtectedRouteSecure>
          }
        />

        {/* Original Routes (for reference/backward compatibility) */}
        <Route path="/login-old" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Redirect root to profile (secure auth) or login */}
        <Route path="/" element={<Navigate to="/profile" replace />} />

        {/* 404 fallback */}
        <Route path="*" element={<Navigate to="/profile" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
