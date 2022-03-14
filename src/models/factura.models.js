const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const facturaSchema = new Schema ({

    nombre: String,
    productos: [{ type: Schema.Types.ObjectId, ref: 'productos'}]
})

module.exports = mongoose.model('facturas',facturaSchema);