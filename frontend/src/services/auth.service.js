import api from './api'

export const authService = {
  // Registro de usuario
  async register(userData) {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // Inicio de sesión
  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  // Obtener perfil del usuario actual
  async getProfile() {
    const response = await api.get('/auth/me')
    return response.data
  }
}
