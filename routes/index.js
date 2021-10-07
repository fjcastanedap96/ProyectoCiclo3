const router = require('express').Router();

const usuarioRouter = require('./usuario');
const especialidadRouter = require('./especialidad');
const servicioRouter = require('./servicio');

router.use('/usuario', usuarioRouter);
router.use('/especialidad', especialidadRouter);
router.use('/servicio', servicioRouter);

module.exports = router;