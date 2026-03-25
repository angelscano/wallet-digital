const AuthService = require('../services/auth.service');
const UsuarioModel = require('../models/usuario.model');
const { AppError } = require('./errorHandler');

// Middleware para verificar autenticación
const verificarAuth = async (req, res, next) => {
  try {
    // Obtener token del header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No se proporcionó token de autenticación', 401);
    }

    const token = authHeader.split(' ')[1];

    // Verificar token
    const decoded = AuthService.verificarToken(token);

    // Buscar usuario
    const usuario = await UsuarioModel.buscarPorId(decoded.id);
    
    if (!usuario) {
      throw new AppError('Usuario no encontrado', 401);
    }

    // Agregar usuario a la request
    req.usuario = usuario;
    next();
  } catch (error) {
    next(error);
  }
};

// Middleware para verificar roles
const verificarRol = (...rolesPermitidos) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return next(new AppError('No autenticado', 401));
    }

    if (!rolesPermitidos.includes(req.usuario.rol)) {
      return next(new AppError('No tiene permisos para realizar esta acción', 403));
    }

    next();
  };
};

module.exports = { verificarAuth, verificarRol };
