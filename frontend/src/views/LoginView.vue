<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/components/layouts/AuthLayout.vue'

const authStore = useAuthStore()
const route = useRoute()

// Estado del formulario
const form = ref({
  email: '',
  password: ''
})

const errors = ref({})
const serverError = ref('')
const sessionExpired = ref(false)

// Verificar si la sesión expiró
onMounted(() => {
  if (route.query.expired === 'true') {
    sessionExpired.value = true
  }
  authStore.clearError()
})

// Validación del formulario
function validateForm() {
  errors.value = {}
  
  if (!form.value.email) {
    errors.value.email = 'El email es requerido'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'El formato del email no es válido'
  }
  
  if (!form.value.password) {
    errors.value.password = 'La contraseña es requerida'
  }
  
  return Object.keys(errors.value).length === 0
}

// Enviar formulario
async function handleSubmit() {
  serverError.value = ''
  sessionExpired.value = false
  
  if (!validateForm()) return
  
  try {
    await authStore.login({
      email: form.value.email,
      password: form.value.password
    })
  } catch (err) {
    serverError.value = err.message
    
    // Manejar errores de validación del servidor
    if (err.errors && Array.isArray(err.errors)) {
      err.errors.forEach(e => {
        if (e.campo) {
          errors.value[e.campo] = e.mensaje
        }
      })
    }
  }
}
</script>

<template>
  <AuthLayout>
    <div class="auth-card">
      <div class="auth-header">
        <h1 class="auth-title">Iniciar Sesión</h1>
        <p class="auth-subtitle">Ingresa a tu Wallet Digital</p>
      </div>

      <!-- Alerta de sesión expirada -->
      <div v-if="sessionExpired" class="alert alert-error">
        Tu sesión ha expirado. Por favor, inicia sesión nuevamente.
      </div>

      <!-- Error del servidor -->
      <div v-if="serverError" class="alert alert-error">
        {{ serverError }}
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Email -->
        <div class="form-group">
          <label for="email" class="form-label">Correo electrónico</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            class="form-input"
            :class="{ error: errors.email }"
            placeholder="tu@email.com"
            autocomplete="email"
          />
          <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
        </div>

        <!-- Password -->
        <div class="form-group">
          <label for="password" class="form-label">Contraseña</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-input"
            :class="{ error: errors.password }"
            placeholder="••••••••"
            autocomplete="current-password"
          />
          <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="btn btn-primary btn-full"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>
      </form>

      <div class="auth-footer">
        <p>
          ¿No tienes una cuenta?
          <RouterLink to="/register">Regístrate aquí</RouterLink>
        </p>
      </div>
    </div>
  </AuthLayout>
</template>

<style scoped>
.btn-full {
  width: 100%;
}
</style>
