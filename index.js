const mongoose = require('mongoose');
const app = require('./app');
const { RegistrarAdminDefault } = require('./src/controllers/usuario.controller');
const {CategoriaBase} = require('./src/controllers/categoria.controller');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/VentaOnline-2020309' , {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
    console.log("Se conecto correctamente a la base de datos");
    
    app.listen(3001,function(){

        console.log('corriendo correctamente en el puerto 3001');

    })


}).catch(err => console.log(err));

RegistrarAdminDefault();
CategoriaBase();