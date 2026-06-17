const Calificacion = require('./calificaciones.model');
const Alumno = require('../estudiantes/estudiantes.model');

// POST /api/v1/calificaciones
// Recibe un payload masivo y registra todas las notas de una evaluación
const ingresarCalificacion = async (req, res) => {
  try {
    const { nombreEvaluacion, calificaciones } = req.body;

    // Validaciones de entrada
    if (!nombreEvaluacion?.trim()) {
      return res.status(400).json({ ok: false, msg: 'El nombre de la evaluación es obligatorio.' });
    }

    if (!calificaciones || !Array.isArray(calificaciones) || calificaciones.length === 0) {
      return res.status(400).json({ ok: false, msg: 'No se enviaron calificaciones para registrar.' });
    }

    // Validar que cada nota esté en rango 1.0 – 7.0
    const notaInvalida = calificaciones.find(
      (item) => Number.isNaN(item.nota) || item.nota < 1 || item.nota > 7
    );
    if (notaInvalida) {
      return res.status(400).json({
        ok: false,
        msg: `Nota inválida para el estudiante ${notaInvalida.estudianteId}. El rango permitido es 1.0 – 7.0.`,
      });
    }

    // Fecha actual del sistema (YYYY-MM-DD)
    const fechaActual = new Date().toISOString().split('T')[0];

    // Mapear al formato que espera el modelo Calificacion
    const registrosAAgregar = calificaciones.map((item) => ({
      alumnoId: item.estudianteId,
      nota: Number.parseFloat(item.nota),
      fecha: fechaActual,
      descripcion: nombreEvaluacion.trim(),
    }));

    // Inserción masiva con Sequelize
    await Calificacion.bulkCreate(registrosAAgregar);

    res.status(201).json({
      ok: true,
      msg: `Se registraron exitosamente ${registrosAAgregar.length} notas para la evaluación "${nombreEvaluacion.trim()}".`,
    });
  } catch (error) {
    console.error('❌ Error al ingresar calificaciones masivas:', error.message);
    res.status(500).json({ ok: false, msg: 'Error en el servidor al registrar las notas.' });
  }
};

// GET /api/v1/calificaciones/alumno/:alumnoId
// Retorna todas las notas de un alumno específico
const obtenerNotasPorAlumno = async (req, res) => {
  try {
    const { alumnoId } = req.params;

    const alumnoConNotas = await Alumno.findByPk(alumnoId, {
      include: [
        {
          model: Calificacion,
          as: 'calificaciones',
          attributes: ['id', 'nota', 'fecha', 'descripcion', 'createdAt'],
        },
      ],
      order: [[{ model: Calificacion, as: 'calificaciones' }, 'fecha', 'ASC']],
    });

    if (!alumnoConNotas) {
      return res.status(404).json({ ok: false, msg: 'Alumno no encontrado.' });
    }

    res.json({
      ok: true,
      alumno: {
        id: alumnoConNotas.id,
        rut: alumnoConNotas.rut,
        nombre: alumnoConNotas.nombre,
        apellido: alumnoConNotas.apellido,
        curso: alumnoConNotas.curso,
      },
      calificaciones: alumnoConNotas.calificaciones,
    });
  } catch (error) {
    console.error('❌ Error al obtener notas del alumno:', error.message);
    res.status(500).json({ ok: false, msg: 'Error en el servidor al obtener las notas.' });
  }
};

// GET /api/v1/calificaciones/curso/:cursoId
// Retorna todas las notas agrupadas por evaluación para un curso
const obtenerNotasPorCurso = async (req, res) => {
  try {
    const { cursoId } = req.params;

    const alumnos = await Alumno.findAll({
      where: { cursoId },
      include: [
        {
          model: Calificacion,
          as: 'calificaciones',
          attributes: ['id', 'nota', 'fecha', 'descripcion', 'createdAt'],
        },
      ],
      order: [
        ['apellido', 'ASC'],
        [{ model: Calificacion, as: 'calificaciones' }, 'fecha', 'ASC'],
      ],
    });

    if (!alumnos || alumnos.length === 0) {
      return res.status(404).json({ ok: false, msg: 'No se encontraron alumnos para este curso.' });
    }

    res.json({ ok: true, alumnos });
  } catch (error) {
    console.error('❌ Error al obtener notas del curso:', error.message);
    res.status(500).json({ ok: false, msg: 'Error en el servidor al obtener las notas del curso.' });
  }
};

module.exports = { ingresarCalificacion, obtenerNotasPorAlumno, obtenerNotasPorCurso };