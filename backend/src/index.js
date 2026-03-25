require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const { errorHandler } = require('./middlewares/errorHandler');
const { initDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: 'http://localhost:5173', // Puerto de Vite
  credentials: true
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Ruta de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Wallet Digital API funcionando' });
});

// Middleware de manejo de errores (siempre al final)
app.use(errorHandler);

// Iniciar servidor
const startServer = async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();
