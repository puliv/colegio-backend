// src/modules/auth/auth.controller.js

// Registrar un nuevo usuario (Profesor)
const registrar = async (req, res) => {
  try {
    res.status(201).json({
      ok: true,
      msg: 'Ruta de registro simulada (Controlador funcionando)'
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

// Login de usuario
const login = async (req, res) => {
  try {
    res.json({
      ok: true,
      msg: 'Ruta de login simulada (Controlador funcionando)',
      token: 'JWT_TOKEN_MOCK_DUOC'
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: error.message });
  }
};

module.exports = { registrar, login };