# Wallet Digital - Módulo de Autenticación

Sistema de autenticación completo para una Wallet Digital desarrollado con Vue.js 3 y Node.js.

## Estructura del Proyecto

```
wallet-digital/
├── backend/                    # API REST con Node.js + Express
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js     # Configuración PostgreSQL
│   │   ├── controllers/
│   │   │   └── auth.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js    # Verificación JWT y roles
│   │   │   └── errorHandler.js       # Manejo global de errores
│   │   ├── models/
│   │   │   └── usuario.model.js
│   │   ├── routes/
│   │   │   └── auth.routes.js
│   │   ├── services/
│   │   │   └── auth.service.js       # Lógica de negocio (JWT, bcrypt)
│   │   ├── validators/
│   │   │   └── auth.validator.js     # Validación con Zod
│   │   └── index.js
│   ├── .env.example
│   └── package.json
│
└── frontend/                   # SPA con Vue 3 + Pinia
    ├── src/
    │   ├── assets/
    │   │   └── styles/
    │   │       └── main.css
    │   ├── components/
    │   │   └── layouts/
    │   │       └── AuthLayout.vue
    │   ├── router/
    │   │   └── index.js              # Navigation Guards
    │   ├── services/
    │   │   ├── api.js                # Axios + Interceptores
    │   │   └── auth.service.js
    │   ├── stores/
    │   │   └── auth.js               # Pinia store
    │   ├── views/
    │   │   ├── LoginView.vue
    │   │   ├── RegisterView.vue
    │   │   └── DashboardView.vue
    │   ├── App.vue
    │   └── main.js
    ├── index.html
    ├── vite.config.js
    └── package.json
```

## Tecnologías Utilizadas

### Backend
- **Node.js** + **Express** - Servidor y API REST
- **PostgreSQL** - Base de datos relacional
- **JWT (jsonwebtoken)** - Autenticación basada en tokens
- **bcrypt** - Cifrado de contraseñas (salt rounds: 12)
- **Zod** - Validación de datos
- **CORS** - Configuración de seguridad

### Frontend
- **Vue.js 3** - Framework reactivo con Composition API
- **Pinia** - Manejo de estado global
- **Vue Router 4** - Enrutamiento con Navigation Guards
- **Axios** - Cliente HTTP con interceptores
- **Vite** - Build tool

## Instalación y Ejecución

### 1. Base de Datos (PostgreSQL)

```bash
# Crear la base de datos
psql -U postgres
CREATE DATABASE wallet_digital;
```

### 2. Backend

```bash
cd wallet-digital/backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Ejecutar en desarrollo
npm run dev

# El servidor estará en http://localhost:3000
```

### 3. Frontend

```bash
cd wallet-digital/frontend

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# La aplicación estará en http://localhost:5173
```

## Endpoints API

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Registro de usuario | No |
| POST | `/api/auth/login` | Inicio de sesión | No |
| GET | `/api/auth/me` | Obtener perfil | Sí |
| GET | `/api/health` | Health check | No |

## Características de Seguridad

1. **Contraseñas cifradas** con bcrypt (12 salt rounds)
2. **JWT** con expiración configurable (default: 24h)
3. **Validación de datos** con Zod (email, contraseña fuerte)
4. **Manejo de errores seguro** (no expone datos sensibles en producción)
5. **Interceptores Axios** para adjuntar JWT automáticamente
6. **Navigation Guards** para proteger rutas
7. **Preparado para roles** (admin, usuario)

## Validaciones de Contraseña

- Mínimo 8 caracteres
- Al menos una mayúscula
- Al menos una minúscula
- Al menos un número

## Modelo de Usuario

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(20) DEFAULT 'usuario' CHECK (rol IN ('admin', 'usuario')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Variables de Entorno

```env
# Backend (.env)
PORT=3000
NODE_ENV=development

# PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_NAME=wallet_digital
DB_USER=postgres
DB_PASSWORD=tu_password

# JWT
JWT_SECRET=clave_secreta_min_32_caracteres
JWT_EXPIRES_IN=24h
```

## Próximas Implementaciones

- [ ] Gestión de saldo
- [ ] Transferencias entre usuarios
- [ ] Historial de transacciones
- [ ] Límites de gasto
- [ ] Panel de administración
- [ ] Recuperación de contraseña
