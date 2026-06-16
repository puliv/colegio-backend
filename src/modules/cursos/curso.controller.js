const Curso = require('./curso.model');

const obtenerCursosPorProfesor = async (req, res) => {
  try {
    const profesorId = req.usuario?.id;

    if (!profesorId) {
      return res.status(401).json({
        ok: false,
        msg: 'No autorizado: El token no contiene un id de profesor válido.',
        debugData: req.usuario 
      });
    }

    const cursos = await Curso.findAll({ where: { profesorId } });
    res.json({ ok: true, cursos });

  } catch (error) {
    console.error("Error en obtenerCursosPorProfesor:", error);
    res.status(500).json({ ok: false, msg: 'Error al obtener cursos' });
  }
};

const crearCurso = async (req, res) => {
  try {
    // 💡 Modificación: Si viene en req.usuario (por token) lo usa, de lo contrario lo saca del req.body
    const { nombre, profesorId } = req.body;
    const idDelProfesor = req.usuario?.id || profesorId;

    if (!idDelProfesor) {
      return res.status(400).json({
        ok: false,
        msg: 'Falta el id del profesor (profesorId)'
      });
    }

    const nuevoCurso = await Curso.create({
      nombre,
      profesorId: idDelProfesor
    });

    res.status(201).json({
      ok: true,
      msg: 'Curso creado de manera exitosa',
      curso: nuevoCurso
    });
  } catch (error) {
    console.error("Error en crearCurso:", error);
    res.status(500).json({
      ok: false,
      msg: 'Error al crear curso'
    });
  }
};

module.exports = { obtenerCursosPorProfesor, crearCurso };

