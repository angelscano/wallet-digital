const { z } = require('zod');

// Esquema de validación para registro
const registroSchema = z.object({
  nombre: z
    .string({ required_error: 'El nombre es requerido' })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .trim(),
  email: z
    .string({ required_error: 'El email es requerido' })
    .email('El formato del email no es válido')
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'La contraseña debe contener al menos una mayúscula, una minúscula y un número'
    ),
  confirmarPassword: z.string({ required_error: 'Debe confirmar la contraseña' })
}).refine((data) => data.password === data.confirmarPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmarPassword']
});

// Esquema de validación para login
const loginSchema = z.object({
  email: z
    .string({ required_error: 'El email es requerido' })
    .email('El formato del email no es válido')
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(1, 'La contraseña es requerida')
});

// Función para validar datos
const validar = (schema) => {
  return (req, res, next) => {
    try {
      const resultado = schema.parse(req.body);
      req.body = resultado; // Reemplaza con datos sanitizados
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errores = error.errors.map(err => ({
          campo: err.path.join('.'),
          mensaje: err.message
        }));
        return res.status(400).json({
          success: false,
          message: 'Error de validación',
          errors: errores
        });
      }
      next(error);
    }
  };
};

module.exports = {
  registroSchema,
  loginSchema,
  validar
};
