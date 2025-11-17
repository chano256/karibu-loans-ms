<template>
  <div class="login-container">
    <div class="login-background">
      <div class="login-card">
        <div class="login-header">
          <div class="logo">
            <h1>🏦 {{ appName }}</h1>
          </div>
          <p class="welcome-text">Welcome back! Please sign in to your account.</p>
        </div>

        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="email" class="form-label">Email Address</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              class="form-input"
              :class="{ 'error': errors.email }"
              placeholder="Enter your email"
              required
            />
            <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
          </div>

          <div class="form-group">
            <div class="password-header">
              <label for="password" class="form-label">Password</label>
              <a href="#" class="forgot-password">Forgot password?</a>
            </div>
            <input
              id="password"
              v-model="form.password"
              type="password"
              class="form-input"
              :class="{ 'error': errors.password }"
              placeholder="Enter your password"
              required
            />
            <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
          </div>

          <div class="form-group">
            <label class="checkbox-label">
              <input type="checkbox" v-model="form.rememberMe" />
              <span class="checkmark"></span>
              Remember me for 30 days
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="large"
            :loading="loading"
            class="login-button"
          >
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </Button>
        </form>

        <div v-if="errorMessage" class="error-banner">
          ⚠️ {{ errorMessage }}
        </div>

        <div class="login-footer">
          <p>© 2024 {{ appName }}. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../../services/authService'
import Button from '../../components/common/Button.vue'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')

const appName = import.meta.env.VITE_APP_NAME

const form = reactive({
  email: '',
  password: '',
  rememberMe: false
})

const errors = reactive({
  email: '',
  password: ''
})

// Redirect if already authenticated
onMounted(() => {
  if (authService.isAuthenticated()) {
    router.push('/dashboard')
  }
})

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  errors.email = ''
  errors.password = ''

  // Email validation
  if (!form.email) {
    errors.email = 'Email is required'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = 'Email is invalid'
    isValid = false
  }

  // Password validation
  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  loading.value = true
  errorMessage.value = ''

  try {
    await authService.login({
      email: form.email,
      password: form.password
    })

    // Redirect to dashboard on successful login
    router.push('/dashboard')
    
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.message || 'Invalid email or password. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-background {
  width: 100%;
  max-width: 440px;
}

.login-card {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo h1 {
  margin: 0 0 16px 0;
  color: #1f2937;
  font-size: 2rem;
  font-weight: 700;
}

.welcome-text {
  color: #6b7280;
  margin: 0;
  font-size: 0.95rem;
}

.login-form {
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #374151;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: #f9fafb;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: white;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-input.error {
  border-color: #ef4444;
  background-color: #fef2f2;
}

.password-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-password {
  color: #3b82f6;
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 500;
}

.forgot-password:hover {
  text-decoration: underline;
}

.error-message {
  display: block;
  color: #ef4444;
  font-size: 0.8rem;
  margin-top: 4px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #374151;
  font-size: 0.9rem;
}

.checkbox-label input {
  display: none;
}

.checkmark {
  width: 18px;
  height: 18px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  transition: all 0.2s ease;
}

.checkbox-label input:checked + .checkmark {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.checkbox-label input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.login-button {
  width: 100%;
  margin-top: 8px;
  font-weight: 600;
}

.error-banner {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.9rem;
  text-align: center;
}

.login-footer {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.login-footer p {
  margin: 0;
  color: #6b7280;
  font-size: 0.8rem;
}

/* Responsive design */
@media (max-width: 480px) {
  .login-card {
    padding: 24px;
    margin: 10px;
  }

  .logo h1 {
    font-size: 1.5rem;
  }
}
</style>