const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carritoSchema = new Schema ({

    compra: Boolean,
    usuario : {  type: Schema.Types.ObjectId, ref: 'usuarios'},
    productos: [{ type: Schema.Types.ObjectId, ref: 'productos'}],
    stock :[Number]


})

module.exports = mongoose.model('carritos',carritoSchema);