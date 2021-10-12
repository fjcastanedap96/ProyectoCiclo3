const mongoose = require('mongoose');
const { Schema } = mongoose;

const especialidadShema = new Schema({
    nombre: {type: String, required: [true, 'Nombre Obligatorio']},
    descripcion: String,
    imagen: String,    
    activo: {type: Boolean, default: true}
});

//convertir a modelo
const Especialidad = mongoose.model('especialidad', especialidadShema);

module.exports = Especialidad;
