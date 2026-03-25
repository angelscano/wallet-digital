<script setup>
// Layout para páginas de autenticación (login, registro)
</script>

<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-brand">
        <div class="brand-logo">W</div>
        <h2 class="brand-name">Wallet Digital</h2>
        <p class="brand-tagline">Tu dinero, siempre contigo</p>
      </div>
      
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f0f4ff 0%, #e8f0fe 100%);
}

.auth-container {
  width: 100%;
  max-width: 420px;
}

.auth-brand {
  text-align: center;
  margin-bottom: 2rem;
}

.brand-logo {
  width: 64px;
  height: 64px;
  background-color: var(--color-primary);
  color: white;
  font-size: 2rem;
  font-weight: 700;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  box-shadow: var(--shadow-lg);
}

.brand-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.brand-tagline {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

/* Estilos para el card de autenticación (usado por los slots) */
:deep(.auth-card) {
  background-color: var(--color-surface);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--shadow-lg);
}

:deep(.auth-header) {
  text-align: center;
  margin-bottom: 1.5rem;
}

:deep(.auth-title) {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

:deep(.auth-subtitle) {
  font-size: 0.875rem;
  color: var(--color-text-muted);
}

:deep(.auth-form) {
  margin-top: 1.5rem;
}

:deep(.auth-footer) {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
  font-size: 0.875rem;
  color: var(--color-text-muted);
}
</style>
