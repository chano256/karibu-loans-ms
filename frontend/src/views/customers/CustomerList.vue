<template>
  <div class="customer-list">
    <div class="page-header">
      <h1>Customers</h1>
      <Button @click="goToCreate" variant="primary">
        ➕ Add Customer
      </Button>
    </div>

    <div class="card">
      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.id">
              <td>{{ customer.id }}</td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.phone }}</td>
              <td>{{ customer.email }}</td>
              <td>
                <span :class="['status', customer.status]">
                  {{ customer.status }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <Button @click="viewCustomer(customer.id)" size="small" variant="secondary">
                    View
                  </Button>
                  <Button @click="editCustomer(customer.id)" size="small" variant="primary">
                    Edit
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { customerService } from '../../services/customerService'
import Button from '../../components/common/Button.vue'

const router = useRouter()
const customers = ref([])
const loading = ref(false)

onMounted(() => {
  loadCustomers()
})

const loadCustomers = async () => {
  loading.value = true
  try {
    const response = await customerService.getCustomers()
    customers.value = response.data
  } catch (error) {
    console.error('Error loading customers:', error)
  } finally {
    loading.value = false
  }
}

const goToCreate = () => {
  router.push('/customers/create')
}

const viewCustomer = (id) => {
  router.push(`/customers/${id}`)
}

const editCustomer = (id) => {
  router.push(`/customers/${id}/edit`)
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  color: #1f2937;
  font-size: 1.875rem;
  font-weight: 600;
}

.table-container {
  overflow-x: auto;
}

.status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.status.active {
  background-color: #d1fae5;
  color: #065f46;
}

.status.inactive {
  background-color: #fef3c7;
  color: #92400e;
}

.action-buttons {
  display: flex;
  gap: 8px;
}
</style>
