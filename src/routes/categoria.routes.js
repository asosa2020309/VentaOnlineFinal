const express = require('express');

const controladorCategoria = require('../controllers/categoria.controller');

//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/nuevaCategoria',[md_autenticacion.Auth,md_roles.Admin],controladorCategoria.nuevaCtegoria);
api.put('/actualizarCategoria/:idCategoria',[md_autenticacion.Auth,md_roles.Admin],controladorCategoria.actualizarCategoria);
api.delete('/borrarCategoria/:idCategoria',[md_autenticacion.Auth,md_roles.Admin],controladorCategoria.borrarCategoria);
api.get('/obtenerCategorias',[md_autenticacion.Auth,md_roles.Admin],controladorCategoria.ObtenerCategorias);
api.get('/buscarCategoria',[md_autenticacion.Auth,md_roles.Admin],controladorCategoria.buscarCategoria)

module.exports = api;