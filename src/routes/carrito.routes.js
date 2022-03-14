const express = require('express');
const controladorCarrito = require('../controllers/carrito.controller');

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();


api.put('/agregarCarrito/:productoId',[md_autenticacion.Auth,md_roles.Cliente],controladorCarrito.agregarCarrito);

module.exports = api;