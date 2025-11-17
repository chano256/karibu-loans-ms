<template>
  <div class="customer-form">
    <div class="page-header">
      <h1>{{ isEdit ? 'Edit Customer' : 'Create Customer' }}</h1>
    </div>

    <div class="card">
      <form @submit.prevent="submitForm" class="form">
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input v-model="form.name" type="text" class="form-input" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="form.email" type="email" class="form-input" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input v-model="form.phone" type="tel" class="form-input" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">ID Number</label>
            <input v-model="form.idNumber" type="text" class="form-input" required>
          </div>
        </div>
        
        <div class="form-actions">
          <Button type="button" @click="$router.back()" variant="secondary">
            Cancel
          </Button>
          <Button type="submit" :loading="loading" variant="primary">
            {{ isEdit ? 'Update' : 'Create' }} Customer
          </Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { customerService } from '../../services/customerService'
import Button from '../../components/common/Button.vue'

const route = useRoute()
const router = useRouter()
const loading = ref(false)

const isEdit = computed(() => route.name === 'EditCustomer')

const form = ref({
  name: '',
  email: '',
  phone: '',
  idNumber: ''
})

onMounted(() => {
  if (isEdit.value) {
    loadCustomer()
  }
})

const loadCustomer = async () => {
  try {
    const response = await customerService.getCustomerById(route.params.id)
    form.value = response.data
  } catch (error) {
    console.error('Error loading customer:', error)
  }
}

const submitForm = async () => {
  loading.value = true
  try {
    if (isEdit.value) {
      await customerService.updateCustomer(route.params.id, form.value)
    } else {
      await customerService.createCustomer(form.value)
    }
    router.push('/customers')
  } catch (error) {
    console.error('Error saving customer:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}
</style>
