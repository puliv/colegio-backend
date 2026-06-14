// src/modules/auth/auth.controller.js
const Usuario = require('./auth.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. REGISTRAR PROFESOR
const registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si el email ya existe
    const existeUsuario = await Usuario.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ ok: false, msg: 'El correo ya está registrado' });
    }

    // Encriptar la contraseña (Salt de 10 rondas)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Guardar en la base de datos
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      password: passwordHash
    });

    res.status(201).json({
      ok: true,
      msg: 'Usuario registrado con éxito',
      usuario: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, email: nuevoUsuario.email }
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error en el servidor', error: error.message });
  }
};

// 2. LOGIN DE PROFESOR
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar si el usuario existe
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(400).json({ ok: false, msg: 'Credenciales incorrectas (Email)' });
    }

    // Verificar si la contraseña coincide
    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
      return res.status(400).json({ ok: false, msg: 'Credenciales incorrectas (Password)' });
    }

    // Generar el Token JWT
    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      ok: true,
      msg: 'Login exitoso',
      usuario: { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      token
    });
  } catch (error) {
    res.status(500).json({ ok: false, msg: 'Error en el servidor', error: error.message });
  }
};

module.exports = { registrar, login };