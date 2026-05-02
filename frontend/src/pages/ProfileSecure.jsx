import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

/**
 * Secure Profile Component
 * Displays current user information
 * Protected route - only accessible after authentication with valid JWT cookie
 */
export default function ProfileSecure() {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  useEffect(() => {
    // If user is not authenticated, redirect to login
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate])

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      navigate('/login')
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">MedZen Dashboard</h1>
            <p className="text-blue-100 mt-1">User Profile</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">User Profile</h2>
              <p className="text-gray-600">Your account information</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user.full_name?.charAt(0) || 'U'}
            </div>
          </div>

          {/* User Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Email */}
              <div className="pb-6 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Email Address</p>
                <p className="text-lg text-gray-800 break-all">{user.email}</p>
              </div>

              {/* Full Name */}
              <div className="pb-6 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Full Name</p>
                <p className="text-lg text-gray-800">{user.full_name || 'Not specified'}</p>
              </div>

              {/* Role */}
              <div className="pb-6">
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">Role</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold text-sm">
                  {user.role || 'User'}
                </span>
              </div>
            </div>

            {/* Right Column - Security Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">🔒 Security Information</h3>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <p className="font-semibold text-gray-800">Authentication Method</p>
                  <p>HTTP-Only Cookie (JWT)</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Token Storage</p>
                  <p>Browser HttpOnly Cookie (not accessible to JavaScript)</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Session Duration</p>
                  <p>30 minutes</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Protection Level</p>
                  <p>
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold mr-1">
                      HttpOnly
                    </span>
                    <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-semibold mr-1">
                      SameSite=Lax
                    </span>
                    <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-semibold">
                      Secure
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">How Secure Authentication Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full font-bold text-lg mb-4">
                1
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Login</h4>
              <p className="text-sm text-gray-600">
                User enters credentials (email & password) on the login page
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-500 text-white rounded-full font-bold text-lg mb-4">
                2
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Token Generation</h4>
              <p className="text-sm text-gray-600">
                Backend validates credentials and creates a JWT token with expiration
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-500 text-white rounded-full font-bold text-lg mb-4">
                3
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Secure Cookie</h4>
              <p className="text-sm text-gray-600">
                Backend sets JWT in HTTP-only cookie (inaccessible to JavaScript)
              </p>
            </div>
          </div>

          {/* Additional Steps */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-indigo-500 text-white rounded-full font-bold text-lg">
                  4
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Automatic Transmission</h4>
                <p className="text-sm text-gray-600">
                  Browser automatically sends cookie with each request (credentials: 'include')
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-pink-500 text-white rounded-full font-bold text-lg">
                  5
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Protected Routes</h4>
                <p className="text-sm text-gray-600">
                  Backend verifies token from cookie and grants access to protected endpoints
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* API Testing Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Testing the API</h3>
          <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm overflow-x-auto">
            <p className="mb-4"># This profile was fetched from: GET /api/v1/auth/me</p>
            <p className="mb-4"># The JWT token from the cookie was automatically used</p>
            <p className="mb-4"># Try these endpoints with credentials:</p>
            <p className="mb-2">
              <span className="text-yellow-400">POST</span> /api/v1/auth/login
            </p>
            <p className="mb-2">
              <span className="text-yellow-400">GET</span> /api/v1/auth/me
            </p>
            <p>
              <span className="text-yellow-400">POST</span> /api/v1/auth/logout
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
