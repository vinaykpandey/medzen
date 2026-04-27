import axios from 'axios'

/**
 * API Service - Central layer for all API calls
 * Handles authentication headers and error handling
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle errors
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

/**
 * Appointments API
 */
export const appointmentsAPI = {
  // Get all appointments (with mock data)
  getAll: async () => {
    // Mock implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: '1',
              patientName: 'John Doe',
              doctorName: 'Dr. Sarah Smith',
              timeSlot: '09:00 AM - 09:30 AM',
              status: 'upcoming',
              date: new Date().toISOString().split('T')[0]
            },
            {
              id: '2',
              patientName: 'Jane Smith',
              doctorName: 'Dr. Michael Brown',
              timeSlot: '10:00 AM - 10:30 AM',
              status: 'upcoming',
              date: new Date().toISOString().split('T')[0]
            },
            {
              id: '3',
              patientName: 'Robert Johnson',
              doctorName: 'Dr. Emily Davis',
              timeSlot: '02:00 PM - 02:30 PM',
              status: 'completed',
              date: new Date(Date.now() - 86400000).toISOString().split('T')[0]
            },
            {
              id: '4',
              patientName: 'Maria Garcia',
              doctorName: 'Dr. James Wilson',
              timeSlot: '11:00 AM - 11:30 AM',
              status: 'cancelled',
              date: new Date().toISOString().split('T')[0]
            },
            {
              id: '5',
              patientName: 'David Miller',
              doctorName: 'Dr. Jessica Lee',
              timeSlot: '03:00 PM - 03:30 PM',
              status: 'upcoming',
              date: new Date().toISOString().split('T')[0]
            }
          ]
        })
      }, 500)
    })
  },

  // Get appointment summary stats
  getSummary: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            totalToday: 5,
            upcoming: 3,
            completed: 1,
            cancelled: 1
          }
        })
      }, 300)
    })
  }
}

export default apiClient
