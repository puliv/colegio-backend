const { Router } = require('express');
const { registrar, login } = require('./auth.controller');

const router = Router();

// URL: http://localhost:3000/api/v1/auth/test
router.get('/test', (req, res) => {
  res.json({
    ok: true,
    msg: '¡El enrutador del módulo Auth está respondiendo correctamente!'
  });
});

router.post('/register', registrar);

router.post('/login', login);

module.exports = router;