const router = require('express').Router();
//const router = express.Router();//borra para ver si funciona

const usuarioController = require('../controllers/usuarioController');

const auth = require('../middlewares/auth')

router.post('/nuevo', usuarioController.nuevo);
router.get('/ver', usuarioController.ver);
router.get('/lista', usuarioController.lista);
router.get('/actualizar', usuarioController.actualizar);
//router.delete('/eliminar/:id', usuarioController.eliminar);
router.post('/login', usuarioController.login);

module.exports = router;
