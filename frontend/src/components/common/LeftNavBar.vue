<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <div class="nav-section">
        <h3 class="nav-section-title">Main</h3>
        <router-link to="/dashboard" class="nav-link">
          <span>📊</span> Dashboard
        </router-link>
      </div>

      <div class="nav-section">
        <h3 class="nav-section-title">Main</h3>
        <router-link to="/customers" class="nav-link">
          <span>👥</span> Customers
        </router-link>
      </div>

      <!-- <div class="nav-section">
        <h3 class="nav-section-title">Savings</h3>
        <router-link to="/savings" class="nav-link">
          <span>💰</span> Savings Accounts
        </router-link>
        <router-link to="/savings/transactions" class="nav-link">
          <span>📝</span> Savings Transactions
        </router-link>
      </div> -->

      <!-- <div class="nav-section">
        <h3 class="nav-section-title">Loans Management</h3>
        <router-link to="/loans" class="nav-link">
          <span>🏦</span> Loans
        </router-link>
        <router-link to="/loans/repayments" class="nav-link">
          <span>💳</span> Loan Repayments
        </router-link>
        <router-link to="/loans/settings" class="nav-link">
          <span>⚙️</span> Loan Settings
        </router-link>
      </div> -->

      <!-- <div class="nav-section">
        <h3 class="nav-section-title">Reports</h3>
        <router-link to="/reports/loan-schedule" class="nav-link">
          <span>📅</span> Loan Schedule
        </router-link>
        <router-link to="/reports/customers" class="nav-link">
          <span>👥</span> Customer Reports
        </router-link>
        <router-link to="/reports/due-loans" class="nav-link">
          <span>⏰</span> Due Loans
        </router-link>
        <router-link to="/reports/cleared-loans" class="nav-link">
          <span>✅</span> Cleared Loans
        </router-link>
      </div> -->
    </nav>
  </aside>
</template>

<script setup>
// Component logic can be added here for dynamic menu items
</script>

<style scoped>
.sidebar {
  width: 260px;
  background-color: #f8fafc;
  border-right: 1px solid #e5e7eb;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-nav {
  padding: 1rem 0;
}

.nav-section {
  margin-bottom: 1.5rem;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #6b7280;
  padding: 0 1rem 0.5rem;
  margin: 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0.75rem 1rem;
  color: #374151;
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-link:hover {
  background-color: #e5e7eb;
  color: #1f2937;
}

.nav-link.router-link-active {
  background-color: #dbeafe;
  color: #1d4ed8;
  border-left-color: #3b82f6;
}

.nav-link span {
  font-size: 1.1em;
}
</style>
