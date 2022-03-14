const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema ({

    nombre: String,
    productos : [{ type: Schema.Types.ObjectId, ref: 'productos'}]

});

module.exports = mongoose.model('categorias',categoriaSchema);