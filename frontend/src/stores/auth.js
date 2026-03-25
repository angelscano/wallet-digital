import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService } from '@/services/auth.service'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  // Estado
  const usuario = ref(null)
  const token = ref(localStorage.getItem('token') || null)
  const loading = ref(false)
  const error = ref(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value)
  const nombreUsuario = computed(() => usuario.value?.nombre || '')
  const rolUsuario = computed(() => usuario.value?.rol || '')
  const isAdmin = computed(() => usuario.value?.rol === 'admin')

  // Acciones
  async function register(userData) {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.register(userData)
      
      // Guardar token y usuario
      token.value = response.data.token
      usuario.value = response.data.usuario
      localStorage.setItem('token', response.data.token)
      
      // Redireccionar al dashboard
      router.push({ name: 'dashboard' })
      
      return response
    } catch (err) {
      error.value = err.message || 'Error al registrar usuario'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function login(credentials) {
    loading.value = true
    error.value = null
    
    try {
      const response = await authService.login(credentials)
      
      // Guardar token y usuario
      token.value = response.data.token
      usuario.value = response.data.usuario
      localStorage.setItem('token', response.data.token)
      
      // Redireccionar al dashboard o a la ruta original
      const redirect = router.currentRoute.value.query.redirect
      router.push(redirect || { name: 'dashboard' })
      
      return response
    } catch (err) {
      error.value = err.message || 'Error al iniciar sesión'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function fetchProfile() {
    if (!token.value) return
    
    loading.value = true
    
    try {
      const response = await authService.getProfile()
      usuario.value = response.data.usuario
    } catch (err) {
      // Si el token es inválido, hacer logout
      logout()
    } finally {
      loading.value = false
    }
  }

  function logout() {
    token.value = null
    usuario.value = null
    localStorage.removeItem('token')
    router.push({ name: 'login' })
  }

  function clearError() {
    error.value = null
  }

  // Inicializar - cargar perfil si hay token
  if (token.value) {
    fetchProfile()
  }

  return {
    // Estado
    usuario,
    token,
    loading,
    error,
    // Getters
    isAuthenticated,
    nombreUsuario,
    rolUsuario,
    isAdmin,
    // Acciones
    register,
    login,
    logout,
    fetchProfile,
    clearError
  }
})
