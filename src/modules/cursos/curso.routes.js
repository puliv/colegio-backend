const { Router } = require('express');
const { obtenerCursosPorProfesor, crearCurso } = require('./curso.controller');
//const validarJWT = require('../../middleware/auth.middleware'); 

const router = Router();

//router.use(validarJWT);
router.get('/', obtenerCursosPorProfesor);
router.post('/', crearCurso);

module.exports = router;