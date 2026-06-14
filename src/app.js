const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

const express = require('express');
const sequelize = require('./config/db');
const authRoutes = require('./modules/auth/auth.routes');
const studentRoutes = require('./modules/estudiantes/estudiantes.routes');
const asistenciaRoutes = require('./modules/asistencia/asistencia.routes');
const calificacionesRoutes = require('./modules/calificaciones/calificaciones.routes');


const app = express();

app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/estudiantes', studentRoutes);
app.use('/api/v1/asistencia', asistenciaRoutes);
app.use('/api/v1/calificaciones', calificacionesRoutes);


app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '¡Backend del Libro de Clases Modular funcionando perfectamente!'
  });
});

// Función para conectar la BD y arrancar el servidor
async function startServer() {
  try {
    // Verificar conexión
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida correctamente.');

    // Sincronizar modelos (creará tablas automáticamente si no existen)
    await sequelize.sync({ force: true });
    console.log('📦 Modelos sincronizados con la Base de Datos.');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo con éxito en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
}

startServer();

