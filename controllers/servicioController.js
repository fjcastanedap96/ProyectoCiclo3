const models = require('../models');

module.exports = {
    // POST - Agregar una servicio
    nuevo: async (req, res, next) => {
        const body = req.body;
        try {
            const servicioBD = await models.Servicio.create(body);
            res.status(200).json(servicioBD);
        } catch (e) {
            res.status(500).send({
                mensaje: 'Ocurrio un error'
            });
            next(e);
        }
    },

    // GET - Obtener una servicio
    ver: async (req, res, next) => {
        const _id = req.params.id;
        try {
            const servicioBD = await models.Servicio.findOne({ _id }).populate('idUsuario', { nombres: 1, apellidos: 1, _id: 0 })
                                                                    .populate('idEspecilista', { nombres: 1, apellidos: 1, _id: 0 });
            res.status(200).json(servicioBD);
        } catch (e) {
            res.status(400).send({
                mensaje: 'Ocurrio un error'
            });
            next(e);
        }
    },

    // GET - Obtener todos los documentos
    lista: async (req, res, next) => {
        try {
            const servicioBD = await models.Servicio.find().populate('idUsuario', { nombres: 1, apellidos: 1, _id: 0 });
            res.status(200).json(servicioBD);
        } catch (e) {
            return res.status(400).json({
                mensaje: 'Ocurrio un error'
            });
            next(e);
        }
    },

    //PUT Asignar servicioa especialista
    asignar: async (req, res, next) => {
        const _id = req.params.id;
        const body = req.body;
        try {
            const servicioBD = await models.Servicio.findByIdAndUpdate(
                _id,
                { idEspecilista: req.params.idEspecialista },
                { new: true });
            res.status(200).json(servicioBD);
        } catch (e) {
            res.status(400).send({
                mensaje: 'Ocurrio un error'
            });
            next(e);
        }
    }
}

/*
//PUT Guardar mensajes de los servicios
router.put('/servicio/mensaje/:id/', async(req, res) => {
    const _id = req.params.id;
    const body = req.body;
    const _fecha = req.body.fecha;
    const _msg = req.body.msg;
    const _usuario = req.body.usuario;
    console.log(req.body.fecha);

    try {
        const servicioBD = await models.Servicio.findByIdAndUpdate(
            _id,
            {
                idEspecilista: req.params.idEspecialista,
                mensajes : [{fecha: _fecha, msg: _msg, usuario: _usuario }]
            },
            {new: true});
        res.json(servicioBD);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});
*/