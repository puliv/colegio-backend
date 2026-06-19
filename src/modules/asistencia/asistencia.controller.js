const Asistencia = require("./asistencia.model");
const Alumno = require("../estudiantes/estudiantes.model");

// 1. REGISTRAR ASISTENCIA MASIVA DE UN CURSO
const registrarAsistencia = async (req, res) => {
  try {
    const { cursoId, fecha, registros } = req.body;

    if (
      !cursoId ||
      !fecha ||
      !Array.isArray(registros) ||
      registros.length === 0
    ) {
      return res
        .status(400)
        .json({
          ok: false,
          msg: "Faltan campos obligatorios: cursoId, fecha, registros",
        });
    }

    // Procesar cada registro del arreglo que envía el frontend
    const resultados = await Promise.all(
      registros.map(async (item) => {
        // Convertir presente (boolean) → estado (ENUM)
        let estado;
        if (item.presente) {
          estado = "PRESENTE";
        } else if (item.justificacion?.trim()) {
          estado = "JUSTIFICADO";
        } else {
          estado = "AUSENTE";
        }

        const justificacion =
          estado === "JUSTIFICADO" ? item.justificacion.trim() : null;

        // Upsert: crea o actualiza el registro de ese alumno en esa fecha
        const [registro, creado] = await Asistencia.findOrCreate({
          where: { alumnoId: item.estudianteId, fecha },
          defaults: { estado, justificacion },
        });

        if (!creado) {
          registro.estado = estado;
          registro.justificacion = justificacion;
          await registro.save();
        }

        return registro;
      })
    );

    res.status(200).json({
      ok: true,
      msg: `Asistencia registrada para ${resultados.length} alumnos.`,
      registros: resultados,
    });
  } catch (error) {
    console.error("❌ Error al registrar asistencia:", error.message);
    res
      .status(500)
      .json({ ok: false, msg: "Error en el servidor al registrar asistencia" });
  }
};

// 2. OBTENER ASISTENCIA DE UN CURSO EN UNA FECHA ESPECÍFICA
const obtenerAsistenciaPorCurso = async (req, res) => {
  try {
    const { cursoId, fecha } = req.query;

    if (!cursoId || !fecha) {
      return res
        .status(400)
        .json({
          ok: false,
          msg: "Faltan parámetros requeridos: cursoId y fecha",
        });
    }

    const lista = await Asistencia.findAll({
      where: { fecha },
      include: [
        {
          model: Alumno,
          as: "alumno",
          where: { cursoId: Number(cursoId) },
          attributes: ["id", "rut", "nombre", "apellido"],
        },
      ],
      order: [[{ model: Alumno, as: "alumno" }, "apellido", "ASC"]],
    });

    res.json({
      ok: true,
      fecha,
      cursoId: Number(cursoId),
      totalAlumnos: lista.length,
      reporte: lista,
    });
  } catch (error) {
    console.error("❌ Error al obtener reporte de asistencia:", error.message);
    res
      .status(500)
      .json({ ok: false, msg: "Error en el servidor al obtener el reporte" });
  }
};

module.exports = { registrarAsistencia, obtenerAsistenciaPorCurso };
