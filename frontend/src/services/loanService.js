import apiClient from './api'

export const loanService = {
  // Get all loans
  getLoans(params = {}) {
    return apiClient.get('/loans', { params })
  },

  // Get loan by ID
  getLoanById(id) {
    return apiClient.get(`/loans/${id}`)
  },

  // Create new loan
  createLoan(loanData) {
    return apiClient.post('/loans', loanData)
  },

  // Update loan
  updateLoan(id, loanData) {
    return apiClient.put(`/loans/${id}`, loanData)
  },

  // Get loan repayments
  getLoanRepayments(loanId) {
    return apiClient.get(`/loans/${loanId}/repayments`)
  },

  // Make loan repayment
  makeRepayment(loanId, repaymentData) {
    return apiClient.post(`/loans/${loanId}/repayments`, repaymentData)
  },

  // Get loan schedule
  getLoanSchedule(loanId) {
    return apiClient.get(`/loans/${loanId}/schedule`)
  }
}
