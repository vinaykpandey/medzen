import { create } from 'zustand'
import { login as loginAPI, logout as logoutAPI, getCurrentUser } from '../api/authApi'

/**
 * Auth Store - Manages authentication state using HTTP-only cookies
 * Does NOT use localStorage for tokens - cookies are handled by browser automatically
 */
export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  // Login action
  login: async (email, password) => {
    set({ isLoading: true, error: null })
    try {
      const response = await loginAPI(email, password)
      
      // Extract user info from response
      const user = response.user || {
        id: response.user?.id,
        email,
        full_name: response.user?.full_name || email.split('@')[0],
        role: response.user?.role || 'user'
      }
      
      set({ 
        user, 
        isAuthenticated: true,
        isLoading: false,
        error: null 
      })
      return { success: true }
    } catch (err) {
      const errorMsg = err.message || 'Login failed'
      set({ isLoading: false, error: errorMsg, isAuthenticated: false })
      return { success: false, error: errorMsg }
    }
  },

  // Logout action
  logout: async () => {
    set({ isLoading: true })
    try {
      await logoutAPI()
      set({ 
        user: null, 
        isAuthenticated: false,
        error: null,
        isLoading: false
      })
      return { success: true }
    } catch (err) {
      const errorMsg = err.message || 'Logout failed'
      set({ error: errorMsg, isLoading: false })
      return { success: false, error: errorMsg }
    }
  },

  // Fetch current user (for checking auth on page load)
  fetchCurrentUser: async () => {
    set({ isLoading: true })
    try {
      const user = await getCurrentUser()
      set({ 
        user, 
        isAuthenticated: true,
        isLoading: false,
        error: null 
      })
      return { success: true }
    } catch (err) {
      // User is not authenticated or session expired
      set({ 
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null  // Don't show error for this
      })
      return { success: false }
    }
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Reset state
  reset: () => set({ user: null, isAuthenticated: false, error: null, isLoading: false })
}))
