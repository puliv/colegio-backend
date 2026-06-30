const jwt = require('jsonwebtoken');

const protegerRuta = (req, res, next) => {
  try {
    // 1. Obtener el token que viene en la cabecera 'Authorization'
    const authHeader = req.headers.authorization;

    // El formato estándar es "Bearer <TOKEN>"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ ok: false, msg: 'No hay token, autorización denegada' });
    }

    // Separamos el string para quedarnos solo con el token puro
    const token = authHeader.split(' ')[1];

    // 2. Verificar que el token sea válido y no haya expirado
    const cifrado = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Inyectar los datos del usuario en la petición para que las rutas los conozcan
    req.usuario = cifrado;

    // Pasamos al siguiente controlador (la ruta real)
    next();
  } catch (error) {
    console.error('❌ Error de autenticación JWT:', error.message);

    return res.status(401).json({ ok: false, msg: 'Token no válido o expirado' });
  }
};

module.exports = { protegerRuta };