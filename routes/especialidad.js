const router = require('express').Router();
const especialidadController = require('../controllers/especialidadController');

router.post('/nuevo', especialidadController.nuevo);
router.get('/lista', especialidadController.lista);
router.delete('/eliminar/:id', especialidadController.eliminar);

module.exports = router;