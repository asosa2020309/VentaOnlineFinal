const express = require('express');

const controladorProducto = require('../controllers/producto.controller');

//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.put('/nuevoProducto/:idCategoria',[md_autenticacion.Auth,md_roles.Admin],controladorProducto.NuevoProducto);
api.put('/cambiarProducto/:idCategoria/:idPructos',[md_autenticacion.Auth,md_roles.Admin],controladorProducto.cambiarProducto);
api.delete('/borrarProducto/:idCategoria/:idPructos',[md_autenticacion.Auth,md_roles.Admin],controladorProducto.borrarProducto);
api.get('/conseguirProducto',[md_autenticacion.Auth,md_roles.Admin],controladorProducto.hallarProducto);
api.get('/obtenerProductos',[md_autenticacion.Auth,md_roles.Admin],controladorProducto.conseguirProducto);
api.get('/productosAgotados',[md_autenticacion.Auth,md_roles.Admin],controladorProducto.ProductosAgotados);

module.exports = api;
