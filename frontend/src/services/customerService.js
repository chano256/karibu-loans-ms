import apiClient from './api'

export const customerService = {
  // Get all customers
  getCustomers(params = {}) {
    return apiClient.get('/customers', { params })
  },

  // Get customer by ID
  getCustomerById(id) {
    return apiClient.get(`/customers/${id}`)
  },

  // Create new customer
  createCustomer(customerData) {
    return apiClient.post('/customers', customerData)
  },

  // Update customer
  updateCustomer(id, customerData) {
    return apiClient.put(`/customers/${id}`, customerData)
  },

  // Delete customer
  deleteCustomer(id) {
    return apiClient.delete(`/customers/${id}`)
  },

  // Get customer savings
  getCustomerSavings(customerId) {
    return apiClient.get(`/customers/${customerId}/savings`)
  },

  // Get customer loans
  getCustomerLoans(customerId) {
    return apiClient.get(`/customers/${customerId}/loans`)
  }
}
