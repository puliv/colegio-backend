const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Rutas
const authRoutes = require('./modules/auth/auth.routes');
const studentRoutes = require('./modules/estudiantes/estudiantes.routes');
const asistenciaRoutes = require('./modules/asistencia/asistencia.routes');
const calificacionesRoutes = require('./modules/calificaciones/calificaciones.routes');
const cursoRoutes = require('./modules/cursos/curso.routes');

const app = express();
app.disable('x-powered-by');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/estudiantes', studentRoutes);
app.use('/api/v1/asistencia', asistenciaRoutes);
app.use('/api/v1/calificaciones', calificacionesRoutes);
app.use('/api/v1/cursos', cursoRoutes);

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: '¡Backend del Libro de Clases Modular funcionando perfectamente!',
  });
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a MySQL establecida correctamente.');

    // Carga todos los modelos y registra todas las asociaciones en un solo lugar
    require('./config/associations');
    console.log('🔗 Asociaciones entre modelos cargadas.');

    await sequelize.sync({ alter: true });
    console.log('📦 Modelos y relaciones sincronizados con la Base de Datos.');

    app.listen(PORT, () => {
      console.log(
        `🚀 Servidor corriendo con éxito en http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error('❌ No se pudo conectar a la base de datos:', error);
  }
}

startServer();
