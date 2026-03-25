const AuthService = require('../services/auth.service');

class AuthController {
  // POST /api/auth/register
  static async registrar(req, res, next) {
    try {
      const { nombre, email, password } = req.body;
      
      const resultado = await AuthService.registrar({ nombre, email, password });

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: {
          usuario: resultado.usuario,
          token: resultado.token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/auth/login
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
      const resultado = await AuthService.login(email, password);

      res.status(200).json({
        success: true,
        message: 'Inicio de sesión exitoso',
        data: {
          usuario: resultado.usuario,
          token: resultado.token
        }
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/auth/me - Obtener usuario actual
  static async obtenerPerfil(req, res, next) {
    try {
      res.status(200).json({
        success: true,
        data: {
          usuario: req.usuario
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
