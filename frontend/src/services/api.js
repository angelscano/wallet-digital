import axios from 'axios'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'

// Crear instancia de Axios
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor de Request - Adjuntar JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor de Response - Manejar errores globalmente
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const { response } = error
    
    // Token expirado o inválido
    if (response?.status === 401) {
      const authStore = useAuthStore()
      authStore.logout()
      router.push({ name: 'login', query: { expired: 'true' } })
    }
    
    // Formatear error para uso consistente
    const errorMessage = response?.data?.message || 'Error de conexión con el servidor'
    const errorData = response?.data?.errors || []
    
    return Promise.reject({
      message: errorMessage,
      errors: errorData,
      status: response?.status
    })
  }
)

export default api
