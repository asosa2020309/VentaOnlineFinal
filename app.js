const express = require('express');
const cors = require('cors');
var app = express();


//importaciones
const usuarios = require('./src/routes/usuario.routes');
const categoria = require('./src/routes/categoria.routes');
const productos = require('./src/routes/producto.routes');
const carrito = require('./src/routes/carrito.routes');


app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.use(cors());

app.use('/api',usuarios,categoria,productos,carrito);


module.exports = app;
