import Curso from './curso.model.js';

export const obtenerCursosPorProfesor = async (req, res) => {
  try {
    // El id del profesor se extrae del token descifrado por tu middleware de auth
    const profesorId = req.usuario.id;

    const cursos = await Curso.findAll({
      where: { profesorId }
    });

    res.json({
      ok: true,
      cursos
    });
  } catch (error) {
    console.error('Error en obtenerCursosPorProfesor:', error);
    res.status(500).json({
      ok: false,
      msg: 'Error interno del servidor al obtener los cursos'
    });
  }
};

// Dejamos listo un creador por si en el futuro quieres añadir más desde el frontend o Postman
export const crearCurso = async (req, res) => {
  try {
    const { nombre } = req.body;
    const profesorId = req.usuario.id;

    const nuevoCurso = await Curso.create({ nombre, profesorId });

    res.status(201).json({
      ok: true,
      msg: 'Curso creado con éxito',
      curso: nuevoCurso
    });
  } catch (error) {
    console.error('Error en crearCurso:', error);
    res.status(500).json({
      ok: false,
      msg: 'Error al crear el curso'
    });
  }
};