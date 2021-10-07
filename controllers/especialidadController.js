const models = require('../models'); 

module.exports = {
    // POST - Agregar una Especialidad
    nuevo: async (req, res, next) => {        
        try {
            const especialidadBD = await models.Especialidad.create(req.body);
            res.status(200).json(especialidadBD);
        } catch (e) {
            res.status(500).send({
                mensaje: 'Ocurrio un error'                
            });
            next(e);
        }
    },

    // GET - Obtener todos las especialidades
    lista: async (req, res,next) => {
        try {
            const especialidadBD = await models.Especialidad.find({activo: 'true'});
            res.status(200).json(especialidadBD);
        } catch (e) {
            res.status(400).send({
                mensaje: 'Ocurrio un error'                
            });
            next(e);
        }
    },

    // DELETE - Eliminar una especialidad
    eliminar: async (req, res, next) => {
        const _id = req.params.id;
        try {
            const especilidadDB = await models.Especialidad.findByIdAndDelete({ _id });
            if (!especilidadDB) {
                return res.status(400).json({
                    mensaje: 'No se encontro el id indicado',
                    error
                })
            }
            res.status(200).json(especilidadDB);
        } catch (e) {
            res.status(400).json({
                mensaje: 'Ocurrio un error',
            });
            next(e);
        }
    }
}

