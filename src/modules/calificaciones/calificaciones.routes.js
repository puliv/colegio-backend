const express = require('express');
const router = express.Router();
const { ingresarCalificacion, obtenerNotasPorAlumno } = require('./calificaciones.controller');
const { protegerRuta } = require('../../middleware/auth.middleware');

// Endpoints blindados con JWT
router.post('/', protegerRuta, ingresarCalificacion);
router.get('/alumno/:alumnoId', protegerRuta, obtenerNotasPorAlumno);

module.exports = router;