import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Loader, AlertCircle } from 'lucide-react'
import { useAuthStore } from '../store/authStore'

/**
 * Login Page Component
 * Handles user authentication with email and password
 */
export const LoginPage = () => {
  const navigate = useNavigate()
  const { login, isLoading, error, clearError } = useAuthStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [touched, setTouched] = useState({})

  // Validation logic
  const validateEmail = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(value)
  }

  const errors = {
    email:
      touched.email && !email
        ? 'Email is required'
        : touched.email && !validateEmail(email)
          ? 'Please enter a valid email'
          : '',
    password:
      touched.password && !password
        ? 'Password is required'
        : touched.password && password.length < 6
          ? 'Password must be at least 6 characters'
          : '',
  }

  const isFormValid = validateEmail(email) && password.length >= 6

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isFormValid) {
      setTouched({ email: true, password: true })
      return
    }

    const result = await login(email, password)
    if (result.success) {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-white">M</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-dark mb-2">MedZen</h1>
          <p className="text-gray-600">Hospital Management System</p>
        </div>

        {/* Login card */}
        <div className="card shadow-lg">
          <h2 className="text-2xl font-bold text-dark mb-1">Welcome Back</h2>
          <p className="text-gray-500 text-sm mb-6">Sign in to your account</p>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-danger mt-0.5 flex-shrink-0" size={18} />
              <div>
                <p className="text-sm font-medium text-danger">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email field */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                placeholder="your@example.com"
                className={`input-field ${
                  errors.email ? 'border-danger focus:ring-danger' : ''
                }`}
              />
              {errors.email && (
                <p className="text-sm text-danger mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label className="block text-sm font-medium text-dark mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => handleBlur('password')}
                  placeholder="Enter your password"
                  className={`input-field pr-10 ${
                    errors.password ? 'border-danger focus:ring-danger' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-dark transition-smooth"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-danger mt-1">{errors.password}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline font-medium">
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-xs font-medium text-blue-900 mb-2">Demo Credentials:</p>
            <p className="text-xs text-blue-800">Email: <code className="font-mono">admin@medzen.com</code></p>
            <p className="text-xs text-blue-800">Password: <code className="font-mono">admin123</code></p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          © 2026 MedZen. All rights reserved.
        </p>
      </div>
    </div>
  )
}
