const Alumno = require('./estudiantes.model');

// 1. OBTENER TODOS LOS ALUMNOS
const obtenerAlumnos = async (req, res) => {
  try {
    const alumnos = await Alumno.findAll();
    res.json({ ok: true, alumnos });
  } catch (error) {
    console.error('❌ Error al obtener alumnos:', error.message);
    res.status(500).json({ ok: false, msg: 'Error en el servidor al obtener los alumnos' });
  }
};

// 2. CREAR UN NUEVO ALUMNO
const crearAlumno = async (req, res) => {
  try {
    const { rut, nombre, apellido, curso } = req.body;

    // Verificar si el RUT ya existe
    const existeAlumno = await Alumno.findOne({ where: { rut } });
    if (existeAlumno) {
      return res.status(400).json({ ok: false, msg: 'El RUT de este alumno ya está registrado' });
    }

    const nuevoAlumno = await Alumno.create({ rut, nombre, apellido, curso });

    res.status(201).json({
      ok: true,
      msg: 'Alumno registrado con éxito',
      alumno: nuevoAlumno
    });
  } catch (error) {
    console.error('❌ Error al crear alumno:', error.message);
    res.status(500).json({ ok: false, msg: 'Error en el servidor al registrar el alumno' });
  }
};

module.exports = { obtenerAlumnos, crearAlumno };