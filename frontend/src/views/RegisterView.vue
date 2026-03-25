<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import AuthLayout from '@/components/layouts/AuthLayout.vue'

const authStore = useAuthStore()

// Estado del formulario
const form = ref({
  nombre: '',
  email: '',
  password: '',
  confirmarPassword: ''
})

const errors = ref({})
const serverError = ref('')

// Validación del formulario
function validateForm() {
  errors.value = {}
  
  if (!form.value.nombre) {
    errors.value.nombre = 'El nombre es requerido'
  } else if (form.value.nombre.length < 2) {
    errors.value.nombre = 'El nombre debe tener al menos 2 caracteres'
  }
  
  if (!form.value.email) {
    errors.value.email = 'El email es requerido'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'El formato del email no es válido'
  }
  
  if (!form.value.password) {
    errors.value.password = 'La contraseña es requerida'
  } else if (form.value.password.length < 8) {
    errors.value.password = 'La contraseña debe tener al menos 8 caracteres'
  } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.value.password)) {
    errors.value.password = 'Debe contener mayúscula, minúscula y número'
  }
  
  if (!form.value.confirmarPassword) {
    errors.value.confirmarPassword = 'Debes confirmar la contraseña'
  } else if (form.value.password !== form.value.confirmarPassword) {
    errors.value.confirmarPassword = 'Las contraseñas no coinciden'
  }
  
  return Object.keys(errors.value).length === 0
}

// Enviar formulario
async function handleSubmit() {
  serverError.value = ''
  
  if (!validateForm()) return
  
  try {
    await authStore.register({
      nombre: form.value.nombre,
      email: form.value.email,
      password: form.value.password,
      confirmarPassword: form.value.confirmarPassword
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
        <h1 class="auth-title">Crear Cuenta</h1>
        <p class="auth-subtitle">Únete a Wallet Digital</p>
      </div>

      <!-- Error del servidor -->
      <div v-if="serverError" class="alert alert-error">
        {{ serverError }}
      </div>

      <form @submit.prevent="handleSubmit" class="auth-form">
        <!-- Nombre -->
        <div class="form-group">
          <label for="nombre" class="form-label">Nombre completo</label>
          <input
            id="nombre"
            v-model="form.nombre"
            type="text"
            class="form-input"
            :class="{ error: errors.nombre }"
            placeholder="Tu nombre"
            autocomplete="name"
          />
          <span v-if="errors.nombre" class="form-error">{{ errors.nombre }}</span>
        </div>

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
            placeholder="Mínimo 8 caracteres"
            autocomplete="new-password"
          />
          <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
        </div>

        <!-- Confirmar Password -->
        <div class="form-group">
          <label for="confirmarPassword" class="form-label">Confirmar contraseña</label>
          <input
            id="confirmarPassword"
            v-model="form.confirmarPassword"
            type="password"
            class="form-input"
            :class="{ error: errors.confirmarPassword }"
            placeholder="Repite tu contraseña"
            autocomplete="new-password"
          />
          <span v-if="errors.confirmarPassword" class="form-error">{{ errors.confirmarPassword }}</span>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="btn btn-primary btn-full"
          :disabled="authStore.loading"
        >
          {{ authStore.loading ? 'Registrando...' : 'Crear Cuenta' }}
        </button>
      </form>

      <div class="auth-footer">
        <p>
          ¿Ya tienes una cuenta?
          <RouterLink to="/login">Inicia sesión</RouterLink>
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
