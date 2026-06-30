const Asistencia = require('./asistencia.model');
const Alumno = require('../estudiantes/estudiantes.model');

// 1. REGISTRAR O ACTUALIZAR LA ASISTENCIA DE UN ALUMNO
const registrarAsistencia = async (req, res) => {
  try {
    const { alumnoId, fecha, estado, observacion } = req.body; 

    // Verificar que el alumno realmente exista antes de pasarle lista
    const alumno = await Alumno.findByPk(alumnoId);
    if (!alumno) {
      return res.status(404).json({ ok: false, msg: 'El alumno no existe' });
    }

    // Upsert inteligente: Si ya le pasaron lista hoy, lo actualiza. Si no, lo crea.
    const [registro, creado] = await Asistencia.findOrCreate({
      where: { alumnoId, fecha },
      defaults: { estado, observacion }
    });

    if (!creado) {
      // Si ya existía un registro para este alumno en esta fecha, actualizamos el estado
      registro.estado = estado;
      registro.observacion = observacion;
      await registro.save();
    }

    res.status(200).json({
      ok: true,
      msg: creado ? 'Asistencia registrada con éxito' : 'Asistencia actualizada con éxito',
      asistencia: registro
    });
  } catch (error) {
    console.error('❌ Error al registrar asistencia:', error.message);
    res.status(500).json({ ok: false, msg: 'Error en el servidor al registrar asistencia' });
  }
};

// 2. OBTENER ASISTENCIA DE UN CURSO EN UNA FECHA ESPECÍFICA
const obtenerAsistenciaPorCurso = async (req, res) => {
  try {
    const { curso, fecha } = req.query; // Los leeremos desde la URL (?curso=4to Medio A&fecha=2026-06-14)

    if (!curso || !fecha) {
      return res.status(400).json({ ok: false, msg: 'Faltan parámetros requeridos: curso y fecha' });
    }

    // Buscamos las asistencias de esa fecha filtrando por el curso del alumno
    const lista = await Asistencia.findAll({
      where: { fecha },
      include: [{
        model: Alumno,
        as: 'alumno',
        where: { curso }, // Filtra solo los alumnos de este curso específico
        attributes: ['rut', 'nombre', 'apellido', 'curso'] // Datos limpios para el frontend
      }]
    });

    res.json({
      ok: true,
      fecha,
      curso,
      totalAlumnos: lista.length,
      reporte: lista
    });
  } catch (error) {
    console.error('❌ Error al obtener reporte de asistencia:', error.message);
    res.status(500).json({ ok: false, msg: 'Error en el servidor al obtener el reporte' });
  }
};

module.exports = { registrarAsistencia, obtenerAsistenciaPorCurso };