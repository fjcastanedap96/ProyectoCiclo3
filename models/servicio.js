const mongoose = require('mongoose');
const { Schema } = mongoose;

const mensajeShema = new Schema({
    fecha: { type: Date, default: Date.now},
    msg: { type: String, required: [true, 'Mensaje Obligatorio']},
    usuario:  { type: Schema.Types.ObjectId, ref:'usuario' }
})
 
const servicioShema = new Schema({
    asunto: {type: String, required: [true, 'Asunto Obligatorio']},
    descripcion: {type: String, required: [true, 'Descripcion Obligatorio']},    
    fechaInicio: {type: Date, default: Date.now},    
    idUsuario: { type: Schema.Types.ObjectId, ref:'usuario' },
    idEspecilista: { type: Schema.Types.ObjectId, ref:'usuario'},
    mensajes: [mensajeShema]
});



//servicioShema.plugin(require('mongoose-autopopulate'));

//convertir a modelo
const Servicio = mongoose.model('servicio', servicioShema);

module.exports = Servicio;