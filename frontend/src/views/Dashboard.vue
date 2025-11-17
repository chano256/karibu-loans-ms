<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Customers</h3>
        <p class="stat-number">1,234</p>
      </div>
      <div class="stat-card">
        <h3>Active Loans</h3>
        <p class="stat-number">567</p>
      </div>
      <div class="stat-card">
        <h3>Total Savings</h3>
        <p class="stat-number">KES 12.5M</p>
      </div>
      <div class="stat-card">
        <h3>Due Repayments</h3>
        <p class="stat-number">89</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// Dashboard logic here
</script>

<style scoped>
.dashboard h1 {
  margin-bottom: 2rem;
  color: #1f2937;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid #e5e7eb;
}

.stat-card h3 {
  color: #6b7280;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}
</style>
