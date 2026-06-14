const Calificacion = require('./calificaciones.model');
const Alumno = require('../estudiantes/estudiantes.model');

// 1. INGRESAR UNA CALIFICACIÓN A UN ALUMNO
const ingresarCalificacion = async (req, res) => {
  try {
    const { alumnoId, nota, fecha, descripcion } = req.body; // fecha esperada: "2026-06-14"

    // Verificar existencia del alumno
    const alumno = await Alumno.findByPk(alumnoId);
    if (!alumno) {
      return res.status(404).json({ ok: false, msg: 'El alumno no existe' });
    }

    const nuevaNota = await Calificacion.create({
      alumnoId,
      nota,
      fecha,
      descripcion
    });

    res.status(201).json({
      ok: true,
      msg: 'Nota ingresada con éxito',
      calificacion: nuevaNota
    });
  } catch (error) {
    console.error('❌ Error al ingresar calificación:', error.message);
    res.status(500).json({ ok: false, msg: 'Error en el servidor al registrar la nota' });
  }
};

// 2. OBTENER TODAS LAS NOTAS DE UN ALUMNO ESPECÍFICO
const obtenerNotasPorAlumno = async (req, res) => {
  try {
    const { alumnoId } = req.params;

    const alumnoConNotas = await Alumno.findByPk(alumnoId, {
      include: [{
        model: Calificacion,
        as: 'calificaciones',
        attributes: ['id', 'nota', 'fecha', 'descripcion', 'createdAt']
      }],
      order: [[{ model: Calificacion, as: 'calificaciones' }, 'fecha', 'ASC']] // 💡 Ordenadas cronológicamente
    });

    if (!alumnoConNotas) {
      return res.status(404).json({ ok: false, msg: 'Alumno no encontrado' });
    }

    res.json({
      ok: true,
      alumno: {
        rut: alumnoConNotas.rut,
        nombre: alumnoConNotas.nombre,
        apellido: alumnoConNotas.apellido,
        curso: alumnoConNotas.curso
      },
      calificaciones: alumnoConNotas.calificaciones
    });
  } catch (error) {
    console.error('❌ Error al obtener notas del alumno:', error.message);
    res.status(500).json({ ok: false, msg: 'Error en el servidor al obtener las notas' });
  }
};

module.exports = { ingresarCalificacion, obtenerNotasPorAlumno };

