import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

/**
 * Protected Route Component
 * Guards routes that require authentication
 * Redirects to login if user is not authenticated
 */
export default function ProtectedRouteSecure({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const fetchCurrentUser = useAuthStore((state) => state.fetchCurrentUser)
  const isLoading = useAuthStore((state) => state.isLoading)

  useEffect(() => {
    // Check if user is authenticated on component mount
    // This handles page refresh - verifies token from cookie with backend
    if (!isAuthenticated && !isLoading) {
      fetchCurrentUser()
    }
  }, [])

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Render protected content
  return children
}
