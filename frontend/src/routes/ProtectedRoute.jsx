import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

/**
 * ProtectedRoute Component - Guards dashboard routes
 * Redirects to login if not authenticated
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}
