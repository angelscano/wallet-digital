const { pool } = require('../config/database');

class UsuarioModel {
  // Crear un nuevo usuario
  static async crear(userData) {
    const { nombre, email, password, rol = 'usuario' } = userData;
    const query = `
      INSERT INTO usuarios (nombre, email, password, rol)
      VALUES ($1, $2, $3, $4)
      RETURNING id, nombre, email, rol, created_at
    `;
    const result = await pool.query(query, [nombre, email, password, rol]);
    return result.rows[0];
  }

  // Buscar usuario por email
  static async buscarPorEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
  }

  // Buscar usuario por ID
  static async buscarPorId(id) {
    const query = 'SELECT id, nombre, email, rol, created_at FROM usuarios WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  }

  // Verificar si existe un email
  static async existeEmail(email) {
    const query = 'SELECT COUNT(*) FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);
    return parseInt(result.rows[0].count) > 0;
  }
}

module.exports = UsuarioModel;
