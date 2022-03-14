const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuariosSchema = new Schema ({

    nombre : String, 
    apellido: String,
    username: String,
    email : String,
    password : String,
    rol : String,
    facturas: [{type: Schema.ObjectId, ref: 'facturas'}]



})

module.exports = mongoose.model('usuarios',usuariosSchema);