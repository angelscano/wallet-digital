<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
}
</script>

<template>
  <div class="dashboard">
    <header class="dashboard-header">
      <div class="header-content">
        <h1 class="logo">Wallet Digital</h1>
        <div class="user-menu">
          <span class="user-name">{{ authStore.nombreUsuario }}</span>
          <span class="user-role">{{ authStore.rolUsuario }}</span>
          <button @click="handleLogout" class="btn btn-secondary btn-sm">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>

    <main class="dashboard-main">
      <div class="welcome-card">
        <h2>Bienvenido, {{ authStore.nombreUsuario }}</h2>
        <p>Has iniciado sesión exitosamente en tu Wallet Digital.</p>
        
        <div class="user-info">
          <div class="info-item">
            <span class="info-label">Email:</span>
            <span class="info-value">{{ authStore.usuario?.email }}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Rol:</span>
            <span class="info-value role-badge" :class="authStore.rolUsuario">
              {{ authStore.rolUsuario }}
            </span>
          </div>
        </div>

        <div class="next-steps">
          
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: var(--color-background);
}

.dashboard-header {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 2rem;
  box-shadow: var(--shadow-sm);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.user-menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-name {
  font-weight: 600;
  color: var(--color-text);
}

.user-role {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background-color: var(--color-background);
  border-radius: 4px;
  color: var(--color-text-muted);
  text-transform: capitalize;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
}

.dashboard-main {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.welcome-card {
  background-color: var(--color-surface);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.welcome-card h2 {
  color: var(--color-text);
  margin-bottom: 0.5rem;
}

.welcome-card > p {
  color: var(--color-text-muted);
  margin-bottom: 2rem;
}

.user-info {
  background-color: var(--color-background);
  border-radius: var(--radius);
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid var(--color-border);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 500;
  color: var(--color-text-muted);
}

.info-value {
  color: var(--color-text);
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.role-badge.admin {
  background-color: #fef3c7;
  color: #d97706;
}

.role-badge.usuario {
  background-color: #dbeafe;
  color: #2563eb;
}

.next-steps {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.next-steps h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--color-text);
}

.next-steps p {
  font-size: 0.875rem;
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.next-steps ul {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.next-steps li {
  font-size: 0.875rem;
  color: var(--color-secondary);
  padding-left: 1.5rem;
  position: relative;
}

.next-steps li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--color-primary);
}
</style>
