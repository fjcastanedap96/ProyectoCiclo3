const mongoose = require('mongoose');
const { Schema } = mongoose;

const servicioShema = new Schema({
    nombre: {type: String, required: [true, 'Asunto Obligatorio']},
    descripcion: {type: String, required: [true, 'Descripcion Obligatorio']},    
    fechaInicio: {type: Date, default: Date.now},    
    idUsuario: { type: Schema.Types.ObjectId, ref:'usuario' },
    idEspecilista: { type: Schema.Types.ObjectId, ref:'usuario'},
    mensajes: [{
                fecha: Date,
                msg: { type: String, required: [true, 'Mensaje Obligatorio']},
                usuario:  { type: Schema.Types.ObjectId, ref:'usuario' }
            }]
});

//servicioShema.plugin(require('mongoose-autopopulate'));

//convertir a modelo
const Servicio = mongoose.model('servicio', servicioShema);

module.exports = Servicio;