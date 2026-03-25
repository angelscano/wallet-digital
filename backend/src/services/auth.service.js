const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../models/usuario.model');
const { AppError } = require('../middlewares/errorHandler');

class AuthService {
  // Registrar nuevo usuario
  static async registrar(userData) {
    const { nombre, email, password } = userData;

    // Verificar si el email ya existe
    const existeEmail = await UsuarioModel.existeEmail(email);
    if (existeEmail) {
      throw new AppError('El email ya está registrado', 409);
    }

    // Encriptar contraseña con bcrypt
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Crear usuario
    const nuevoUsuario = await UsuarioModel.crear({
      nombre,
      email,
      password: passwordHash,
      rol: 'usuario'
    });

    // Generar token JWT
    const token = this.generarToken(nuevoUsuario);

    return {
      usuario: nuevoUsuario,
      token
    };
  }

  // Iniciar sesión
  static async login(email, password) {
    // Buscar usuario por email
    const usuario = await UsuarioModel.buscarPorEmail(email);
    if (!usuario) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Verificar contraseña con bcrypt
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Generar token JWT
    const token = this.generarToken(usuario);

    // Retornar usuario sin password
    const { password: _, ...usuarioSinPassword } = usuario;

    return {
      usuario: usuarioSinPassword,
      token
    };
  }

  // Generar token JWT
  static generarToken(usuario) {
    const payload = {
      id: usuario.id,
      email: usuario.email,
      rol: usuario.rol
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    });
  }

  // Verificar token JWT
  static verificarToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new AppError('Token inválido o expirado', 401);
    }
  }
}

module.exports = AuthService;
