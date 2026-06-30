const { Router } = require("express");
const { crearAnotacion } = require("./anotaciones.controller");
const { protegerRuta } = require("../../middleware/auth.middleware");

const router = Router();

// Proteger todas las acciones de este módulo
router.use(protegerRuta);

router.post("/", crearAnotacion);

module.exports = router;
