const express = require('express');

const controladorUsario = require('../controllers/usuario.controller');

//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/login',controladorUsario.Login);
api.post('/agregarUsuario',controladorUsario.agregarUsuario);
api.put('/editarUsuario/:idUsuario',[md_autenticacion.Auth,md_roles.Admin],controladorUsario.editarUsuario)
api.delete('/eliminarUsuario/:idUsuario',[md_autenticacion.Auth,md_roles.Admin],controladorUsario.eliminarUsuario);

module.exports = api;

