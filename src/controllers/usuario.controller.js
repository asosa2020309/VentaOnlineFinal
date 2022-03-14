const Usuario = require('../models/usarios.models');
const Carrito = require('../models/carrito.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ username: parametros.username }, (err, usuarioEn) => {
        if (err) return res.status(500)
        .send({ mensaje: 'Error en la peticion' });
        if (usuarioEn) {
            bcrypt.compare(parametros.password, usuarioEn.password,
                (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        if (parametros.obtenerToken === 'true') {
                            usuarioEn.password = undefined;
                            return res.status(200)
                                .send({ usuario: usuarioEn })

                        } else {

                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEn) })
                        }
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide' });
                    }
                })
        } else {
            return res.status(500)
                .send({ mensaje: 'ningun corrreo se encuentra registrado.' })
        }
    })
}

function eliminarUsuario(req, res){
    var idUser = req.params.idUsuario;
    
        Usuario.findOne({iduser: idUser},(err, usuarioEn)=>{
  
            if(err) return res.status(500)
                  .send({message:'error en la peticion'});
            if(idUser !== req.user.sub){
                return res.status(500)
                  .send({message:'no se elimino el usuario seleccionado'});
      
      
          }else{
            Usuario.findByIdAndDelete(req.user.sub,
                (err, usuarioBorrado) => {
                    if (err) return res.status(500)
                        .send({ mensaje: 'Error en la peticion' });
                    if (!usuarioBorrado) return res.status(500)
                        .send({ mensaje: 'Error al eliminar un Usuario' });
                    return res.status(200).send({ usuarios: usuarioBorrado })
                })
          }
        
            
            
          })
    
        
        
        
        
        
        
    }
    
  


  function agregarUsuario(req,res){
    var usuarioModel =  new Usuario();
    var parametros = req.body;
 
  
 
         usuarioModel.nombre = parametros.nombre;
         usuarioModel.apellido = parametros.apellido;
         usuarioModel.username = parametros.username;
         usuarioModel.email = parametros.email;
         usuarioModel.rol = 'ROL_CLIENTE';
     
 
     Usuario.find({username : parametros.username},(err,usuarioEn)=>{
         if(err) return res.status(500).send({message:'error en la peticion'})
         if(usuarioEn.length == 0){
 
             bcrypt.hash(parametros.password,null,null,(err,passwordEncriptada)=>{
 
                 usuarioModel.password = passwordEncriptada;
 
                 usuarioModel.save((err,usuarioNuevo)=>{
                     if(err) return res.status(500).send({message:'error en la peticion'});
 
                     if(!usuarioEn) return res.status(500).send({message:'error al agregar algun usuario'});
                     crearCarrito(usuarioEn);
 
                     return res.status(200).send({usuario: usuarioNuevo});
 
 
                 })
 
             })
         }else{
             return res.status(500)
             .send({message:'no hay usuario disponible Intente con otro '})
         }
 
 
     })
 
 
 
 }


function RegistrarAdminDefault(){
    var usuarioModel =  new Usuario();
    usuarioModel.nombre = 'ADMIN';
    usuarioModel.apellido = 'ADMIN';
    usuarioModel.email = 'ADMIN';
    usuarioModel.username = 'ADMIN';
    usuarioModel.password = '123456';
    usuarioModel.rol= 'ADMIN';



    Usuario.find({username:'ADMIN'},(err,usuarioEn)=>{
        if(usuarioEn.length==0){
            bcrypt.hash('123456',null,null,(err,passwordEncriptada)=>{
                usuarioModel.password = passwordEncriptada;
                usuarioModel.save((err, usuarioGuardado)=>{

                    if(err) return console.log('error en la peticion')
                    if(!usuarioEn) return console.log('error en agregar un admin')
                    return console.log('admin defaul'+' '+ usuarioEn);
                });


            })

        }else{
            return console.log('ya se encuentra registrado el admin');
        }

    })




}


function editarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;

    if (idUser !== req.user.sub ) return res.status(500)
        .send({ mensaje: 'No cuenta con permiso para editar ' }),console.log(idUser+'   '+req.user.sub);

    Usuario.findByIdAndUpdate(req.user.sub, parametros, { new: true },
        (err, usuarioEditado) => {
            if (err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if (!usuarioEditado) return res.status(500)
                .send({ mensaje: 'Error al editar un Usuario' });
            return res.status(200)
            .send({ usuario: usuarioEditado })
        })
}
function crearCarrito(usuariosGuardados) {
    var carrito = new Carrito();

    carrito.compra = false;
    carrito.dueño = usuariosGuardados._id;
    carrito.save((err, carritoGuardado) => {
        if (err) return console.log(err);
        if (!carritoGuardado) return console.log('Error al crear Carrito');
        return console.log('Carrito creado', carritoGuardado);
    })
}



module.exports = {
   Login,
   RegistrarAdminDefault,
   agregarUsuario,
   editarUsuario,
   eliminarUsuario
   
}
