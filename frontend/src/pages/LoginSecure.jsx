import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

/**
 * Secure Login Component
 * Authenticates user with email and password
 * JWT token is automatically stored in HTTP-only cookie by backend
 */
export default function LoginSecure() {
  const [email, setEmail] = useState('admin@medzen.com')  // Pre-filled for demo
  const [password, setPassword] = useState('admin123')    // Pre-filled for demo
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const error = useAuthStore((state) => state.error)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const result = await login(email, password)

    if (result.success) {
      // Redirect to dashboard on successful login
      navigate('/dashboard')
    }
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">MedZen</h1>
          <p className="text-gray-600">Hospital Management System</p>
          <p className="text-sm text-gray-500 mt-2">Secure Authentication with HTTP-Only Cookies</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            <p className="font-semibold">Login Failed</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@medzen.com"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-gray-700 mb-2">Demo Credentials:</p>
          <p className="text-xs text-gray-600">
            <strong>Email:</strong> admin@medzen.com
          </p>
          <p className="text-xs text-gray-600">
            <strong>Password:</strong> admin123
          </p>
        </div>

        {/* Security Info */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            🔒 This authentication system uses <strong>HTTP-only cookies</strong> for secure token storage.
            The JWT token is never exposed to JavaScript or localStorage.
          </p>
        </div>
      </div>
    </div>
  )
}
