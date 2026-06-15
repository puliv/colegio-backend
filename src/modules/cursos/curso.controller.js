const Curso = require('./curso.model');

const obtenerCursosPorProfesor = async (req, res) => {
  try {
    const profesorId = req.usuario.id;
    const cursos = await Curso.findAll({ where: { profesorId } });
    res.json({ ok: true, cursos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Error al obtener cursos' });
  }
};

const crearCurso = async (req, res) => {
  try {
    const { nombre } = req.body;
    const profesorId = req.usuario.id;
    const nuevoCurso = await Curso.create({ nombre, profesorId });
    res.status(201).json({ ok: true, msg: 'Curso creado', curso: nuevoCurso });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Error al crear curso' });
  }
};

module.exports = { obtenerCursosPorProfesor, crearCurso };