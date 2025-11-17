<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <h2>{{ appName }}</h2>
    </div>
    <div class="navbar-actions">
      <div class="user-profile">
        <span>Welcome, {{ user?.name }}</span>
        <div class="profile-dropdown">
          <button @click="toggleDropdown" class="profile-btn">
            <div class="avatar">
              {{ getUserInitials }}
            </div>
          </button>
          <div v-if="dropdownOpen" class="dropdown-menu">
            <router-link to="/profile" class="dropdown-item" @click="dropdownOpen = false">
              👤 Profile
            </router-link>
            <button @click="handleLogout" class="dropdown-item">
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../../services/authService'

const dropdownOpen = ref(false)
const router = useRouter()

const appName = import.meta.env.VITE_APP_NAME
const user = ref(authService.getCurrentUser())

const getUserInitials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const handleLogout = async () => {
  try {
    await authService.logout()
    router.push('/login')
  } catch (error) {
    console.error('Logout error:', error)
    // Force logout even if API call fails
    authService.clearAuth()
    router.push('/login')
  }
}

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (!event.target.closest('.profile-dropdown')) {
    dropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-bottom: 1px solid #e5e7eb;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.navbar-brand h2 {
  margin: 0;
  color: #1f2937;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.profile-btn {
  border: none;
  background: none;
  cursor: pointer;
  border-radius: 50%;
  padding: 4px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 14px;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  min-width: 180px;
  z-index: 1000;
  margin-top: 8px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  text-decoration: none;
  color: #374151;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item:first-child {
  border-radius: 8px 8px 0 0;
}

.dropdown-item:last-child {
  border-radius: 0 0 8px 8px;
}
</style>