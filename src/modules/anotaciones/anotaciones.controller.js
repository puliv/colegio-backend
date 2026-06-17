const Anotacion = require("./anotaciones.model");

const crearAnotacion = async (req, res) => {
  try {
    const { alumnoId, tipo, descripcion, fecha } = req.body;

    if (!alumnoId || !tipo || !descripcion || !fecha) {
      return res.status(400).json({
        ok: false,
        msg: "Todos los campos son obligatorios (alumnoId, tipo, descripcion, fecha).",
      });
    }

    const nuevaAnotacion = await Anotacion.create({
      alumnoId,
      tipo,
      descripcion,
      fecha,
    });

    res.status(201).json({
      ok: true,
      msg: "Observación registrada con éxito en la Hoja de Vida.",
      anotacion: nuevaAnotacion,
    });
  } catch (error) {
    console.error("❌ Error al crear anotación:", error.message);
    res.status(500).json({
      ok: false,
      msg: "Error interno en el servidor al registrar la anotación.",
    });
  }
};

module.exports = { crearAnotacion };
