import { Router } from 'express';
import { obtenerCursosPorProfesor, crearCurso } from './curso.controller.js';
import { validarJWT } from '../../middleware/validar-jwt.js'; // Ajusta la ruta a tu middleware real de JWT

const router = Router();

// Todas las sub-rutas de este módulo requerirán un token válido
router.use(validarJWT);

router.get('/', obtenerCursosPorProfesor);
router.post('/', crearCurso);

export default router;