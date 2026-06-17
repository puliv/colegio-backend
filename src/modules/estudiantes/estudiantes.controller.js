const Alumno = require("./estudiantes.model");
const Calificacion = require("../calificaciones/calificaciones.model");

// 1. OBTENER ALUMNOS (filtrado por cursoId si se envía en query)
const obtenerAlumnos = async (req, res) => {
  try {
    const { cursoId } = req.query;

    const where = cursoId ? { cursoId: Number(cursoId) } : {};

    const alumnos = await Alumno.findAll({
      where,
      include: [
        {
          model: Calificacion,
          as: "calificaciones",
          attributes: ["id", "nota", "fecha", "descripcion"],
        },
      ],
      order: [["apellido", "ASC"]],
    });

    res.json({ ok: true, alumnos });
  } catch (error) {
    console.error("❌ Error al obtener alumnos:", error.message);
    res
      .status(500)
      .json({ ok: false, msg: "Error en el servidor al obtener los alumnos" });
  }
};

// 2. CREAR UN NUEVO ALUMNO
const crearAlumno = async (req, res) => {
  try {
    const { rut, nombre, apellido, cursoId } = req.body;

    const existeAlumno = await Alumno.findOne({ where: { rut } });
    if (existeAlumno) {
      return res
        .status(400)
        .json({ ok: false, msg: "El RUT de este alumno ya está registrado" });
    }

    const nuevoAlumno = await Alumno.create({ rut, nombre, apellido, cursoId });

    res.status(201).json({
      ok: true,
      msg: "Alumno registrado con éxito",
      alumno: nuevoAlumno,
    });
  } catch (error) {
    console.error("❌ Error al crear alumno:", error.message);
    res
      .status(500)
      .json({ ok: false, msg: "Error en el servidor al registrar el alumno" });
  }
};

module.exports = { obtenerAlumnos, crearAlumno };
