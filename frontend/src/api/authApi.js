/**
 * Auth API Module
 * Handles authentication API calls with HTTP-only cookie support
 * Uses credentials: "include" to automatically send cookies
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1'

/**
 * Login user with email and password
 * Cookie is set automatically by backend, no need to handle in frontend
 * 
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} API response with user info
 */
export const login = async (email, password) => {
  const response = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',  // Include cookies
    body: JSON.stringify({ email, password })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Login failed')
  }

  return await response.json()
}

/**
 * Get current user profile
 * Uses cookie automatically for authentication
 * 
 * @returns {Promise} API response with user info
 */
export const getCurrentUser = async () => {
  const response = await fetch(`${API_BASE}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',  // Include cookies
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to fetch user')
  }

  return await response.json()
}

/**
 * Logout user
 * Clears the authentication cookie
 * 
 * @returns {Promise} API response
 */
export const logout = async () => {
  const response = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',  // Include cookies
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Logout failed')
  }

  return await response.json()
}
