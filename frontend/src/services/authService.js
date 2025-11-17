import apiClient from './api'

export const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await apiClient.post('/login', credentials)
      
      if (response.data.token) {
        // Store token and user data
        localStorage.setItem('auth_token', response.data.token)
        localStorage.setItem('user', JSON.stringify(response.data.user))
        
        // Set default authorization header
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      }
      
      return response.data
    } catch (error) {
      throw error.response?.data || error
    }
  },

  // Logout user
  async logout() {
    try {
      // Call logout endpoint
      await apiClient.post('/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Clear local storage regardless of API call success
      this.clearAuth()
    }
  },

  // Clear authentication data
  clearAuth() {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    delete apiClient.defaults.headers.common['Authorization']
  },

  // Get current user
  getCurrentUser() {
    const userStr = localStorage.getItem('user')
    return userStr ? JSON.parse(userStr) : null
  },

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('auth_token')
  },

  // Get auth token
  getToken() {
    return localStorage.getItem('auth_token')
  }
}

// Initialize auth token if exists
const token = authService.getToken()
if (token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default authService