import { create } from 'zustand'
import { login as loginAPI } from '../api/authApi'

/**
 * Auth Store - Manages authentication state and token
 * Uses localStorage for persistence
 */
export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await loginAPI(email, password)
      
      // Store token and user info
      const token = response.access_token
      const user = {
        email,
        name: email.split('@')[0],
        role: 'admin'
      }
      
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(user))
      set({ user, token, isLoading: false })
      return { success: true }
    } catch (err) {
      const errorMsg = err.message || 'Login failed'
      set({ isLoading: false, error: errorMsg })
      return { success: false, error: errorMsg }
    }
  },

  // Logout action
  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ user: null, token: null, error: null })
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('token')
    return !!token
  }
}))
