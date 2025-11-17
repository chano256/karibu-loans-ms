<template>
  <div class="loan-list">
    <div class="page-header">
      <h1>Loans</h1>
      <Button @click="$router.push('/loans/create')" variant="primary">
        ➕ New Loan Application
      </Button>
    </div>
    
    <div class="card">
      <p>Loans management interface will be implemented here.</p>
    </div>
  </div>
</template>

<script setup>
import Button from '../../components/common/Button.vue'
</script>
