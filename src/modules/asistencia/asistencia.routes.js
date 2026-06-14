const express = require('express');
const router = express.Router();
const { registrarAsistencia, obtenerAsistenciaPorCurso } = require('./asistencia.controller');
const { protegerRuta } = require('../../middleware/auth.middleware');

// Ambas rutas quedan blindadas por el  middleware global
router.post('/', protegerRuta, registrarAsistencia);
router.get('/reporte', protegerRuta, obtenerAsistenciaPorCurso);

module.exports = router;