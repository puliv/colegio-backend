const express = require('express');
const router = express.Router();
const { obtenerAlumnos, crearAlumno } = require('./estudiantes.controller');
const { protegerRuta } = require('../../middleware/auth.middleware');

// 💡 Todas estas rutas pasan primero por el validador de JWT
router.get('/', protegerRuta, obtenerAlumnos);
router.post('/', protegerRuta, crearAlumno);

module.exports = router;