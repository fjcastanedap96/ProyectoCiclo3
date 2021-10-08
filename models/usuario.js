const mongoose = require('mongoose');
const { Schema } = mongoose;

const usuarioShema = new Schema({
    nombres: {type: String, required: [true, 'Nombre Obligatorio']},
    apellidos: {type: String, required: [true, 'Apellido Obligatorio']},
    correo: {type: String, required: [true, 'Correo Obligatorio']},
    telefono: Number,    
    direccion: String,    
    password: {type: String, required: [true, 'Contreseña requerida']},
    idEspecialidad: { type: Schema.Types.ObjectId, ref:'especialidad'},//{type: Number, default: null},
    activo: {type: Boolean, default: true}
});

//convertir a modelo
const Usuario = mongoose.model('usuario', usuarioShema);

module.exports = Usuario;