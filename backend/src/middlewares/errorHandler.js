// Clase personalizada para errores de la aplicación
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Middleware global de manejo de errores
const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Error interno del servidor';

  // Log del error (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', err);
  }

  // Errores de PostgreSQL
  if (err.code === '23505') {
    statusCode = 409;
    message = 'El registro ya existe';
  }

  if (err.code === '23503') {
    statusCode = 400;
    message = 'Referencia inválida';
  }

  // Error de JWT
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Token inválido';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expirado';
  }

  // Respuesta de error segura (no exponer detalles en producción)
  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { 
      stack: err.stack,
      error: err 
    })
  });
};

module.exports = { AppError, errorHandler };
