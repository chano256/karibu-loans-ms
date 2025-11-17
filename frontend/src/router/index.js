import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/Login.vue'),
    meta: { requiresAuth: false, hideLayout: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  // Customer routes
  {
    path: '/customers',
    name: 'Customers',
    component: () => import('../views/customers/CustomerList.vue')
  },
  {
    path: '/customers/create',
    name: 'CreateCustomer',
    component: () => import('../views/customers/CustomerForm.vue')
  },
  {
    path: '/customers/:id/edit',
    name: 'EditCustomer',
    component: () => import('../views/customers/CustomerForm.vue')
  },
  {
    path: '/customers/:id',
    name: 'CustomerDetail',
    component: () => import('../views/customers/CustomerDetail.vue')
  },
  // Savings routes
  {
    path: '/savings',
    name: 'Savings',
    component: () => import('../views/savings/SavingsList.vue')
  },
  // Loans routes
  {
    path: '/loans',
    name: 'Loans',
    component: () => import('../views/loans/LoanList.vue')
  },
  {
    path: '/loans/create',
    name: 'CreateLoan',
    component: () => import('../views/loans/LoanForm.vue')
  },
  {
    path: '/loans/:id',
    name: 'LoanDetail',
    component: () => import('../views/loans/LoanDetail.vue')
  },
  // Repayment routes
  {
    path: '/loans/repayments',
    name: 'LoanRepayments',
    component: () => import('../views/repayments/RepaymentList.vue')
  },
  // Settings routes
  {
    path: '/loans/settings',
    name: 'LoanSettings',
    component: () => import('../views/settings/LoanSettings.vue')
  },
  // Reports routes
  // {
  //   path: '/reports/loan-schedule',
  //   name: 'LoanScheduleReport',
  //   component: () => import('../views/reports/LoanScheduleReport.vue')
  // },
  // {
  //   path: '/reports/customers',
  //   name: 'CustomerReport',
  //   component: () => import('../views/reports/CustomerReport.vue')
  // },
  // {
  //   path: '/reports/due-loans',
  //   name: 'DueLoansReport',
  //   component: () => import('../views/reports/DueLoansReport.vue')
  // },
  // {
  //   path: '/reports/cleared-loans',
  //   name: 'ClearedLoansReport',
  //   component: () => import('../views/reports/ClearedLoansReport.vue')
  // },
  // Profile route
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/profile/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Auth middleware
router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuth()
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.name === 'Login' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

// Check if user is authenticated
function checkAuth() {
  const token = localStorage.getItem('auth_token')
  const user = localStorage.getItem('user')
  return !!(token && user)
}

export default router
