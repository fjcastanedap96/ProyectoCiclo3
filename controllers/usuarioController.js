const models = require('../models');
const bcrypt = require('bcryptjs');
var token = require('../services/token');

module.exports = {

    // POST - Agregar una usuario
    nuevo: async (req, res, next) => {
        if (!req.body.correo || !req.body.password) {
            res.json({ success: false, msg: "Please pass username and password." });
        } else {
            const body = req.body;
            try {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                const usuarioBD = await models.Usuario.create(body);
                res.status(200).json(usuarioBD);
            } catch (e) {
                res.status(500).send({
                    mensaje: 'Ocurrio un error' + e
                });
                next(e);
            }
        }
    },

    // POST - Loging usuario
    login: async(req, res, next) => {
        try {            
            let user = await models.Usuario.findOne( 
                { 
                    correo : req.body.correo,                   
                    activo: 1
                 } 
            );
            if (user) {
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match) {
                    console.log(user.rol);
                    let tokenReturn = await token.encode(user);                    
                    console.log(tokenReturn);
                    res.status(200).json({ user, tokenReturn });
                } else {
                    res.status(401).send({
                        message: 'Password Incorrecto'
                    });
                }
            } else {
                res.status(404).send({
                    message: 'No existe el user'
                });
            }
        } catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    },

    // GET - Obtener una usuario
    ver: async (req, res, next) => {
        const _id = req.params.id;
        try {
            const usuarioBD = await models.Usuario.findOne({ _id });
            res.status(200).json(usuarioBD);
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
            const usuarioBD = await models.Usuario.find();
            res.status(200).json(usuarioBD);
        } catch (e) {
            res.status(400).send({
                mensaje: 'Ocurrio un error'
            });
            next(e);
        }
    },

    //PUT Actualizar
    actualizar: async (req, res, next) => {
        const _id = req.params.id;
        const body = req.body;
        try {
            let passwd = req.body.password;
            const reg0 = await models.Usuario.findOne({_id:req.body._id});
            if (passwd!=reg0.password){
                req.body.password = await bcrypt.hash(req.body.password,10); 
            } 
            const usuarioBD = await models.Usuario.findByIdAndUpdate(
                _id,
                body,
                { new: true });
            res.status(200).json(usuarioBD);
        } catch (e) {
            return res.status(400).send({
                mensaje: 'Ocurrio un error'
            });
            next(e);
        }
    }
/*
//SERIA MEJOR INACTIVAR
// DELETE - Eliminar una usuario
router.delete('/usuario/:id', async(req, res) => {
    const _id = req.params.id;
    try {
        const usuarioDB = await Usuario.findByIdAndDelete({_id});
        if (!usuarioDB) {
            return res.status(400).json({
                mensaje: 'No se encontro el id indicado',
                error
            })
        }
        res.json(usuarioDB);
    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error',
            error
        })
    }
});
*/
}