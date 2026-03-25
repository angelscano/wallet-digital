const express = require('express');
const AuthController = require('../controllers/auth.controller');
const { verificarAuth } = require('../middlewares/auth.middleware');
const { validar, registroSchema, loginSchema } = require('../validators/auth.validator');

const router = express.Router();

// POST /api/auth/register - Registro de usuario
router.post('/register', validar(registroSchema), AuthController.registrar);

// POST /api/auth/login - Inicio de sesión
router.post('/login', validar(loginSchema), AuthController.login);

// GET /api/auth/me - Obtener perfil del usuario autenticado
router.get('/me', verificarAuth, AuthController.obtenerPerfil);

module.exports = router;
