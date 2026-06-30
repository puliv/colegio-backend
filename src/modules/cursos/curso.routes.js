const { Router } = require('express');
const { obtenerCursosPorProfesor, crearCurso } = require('./curso.controller');
const { protegerRuta } = require('../../middleware/auth.middleware'); 

const router = Router();

router.use(protegerRuta); 
router.get('/', obtenerCursosPorProfesor);
router.post('/', crearCurso);

module.exports = router;