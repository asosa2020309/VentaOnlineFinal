const Categoria = require('../models/categoria.models');




//en esta función es creada la categoria que se mostrara por defecto
function CategoriaBase(){
    var categoriamodel = new Categoria();
    var nombre = 'Default'
    

    Categoria.findOne({nombre: nombre},(err,categoriaEn)=>{

            if(err) return res.status(500)
            .send({message:'error en la peticion'})
            if(!categoriaEn){
                categoriamodel.nombre ='Default';
                categoriamodel.save((err,categoriaG)=>{
                    if(err) return console.log('error en la peticion');
                    if(!categoriaG) return console.log('error al crear una categoria por defecto')

                        return console.log('se creo una categoria por defecto ')
                })
            }else{

                return console.log('ya se encuentra creada una categoria por defecto');
            }
    })

}


//esta sera la funcion para agregar una nueva categoria a la base de datos aparte de la creada pro defecto
function nuevaCtegoria (req,res){
    var parametros = req.body;
    var categoriaModel = new Categoria();
    
   

    Categoria.findOne({nombre: parametros.nombre},(err,categoriaEn)=>{
        if(err) return res.status(500)

                .send({message:'error en la peticion'});
        if(!categoriaEn){

            categoriaModel.nombre= parametros.nombre;
            categoriaModel.save((err,categoriaG)=>{
                if(err)return res.status(500)

                .send({message:'error en la peticion'});
                if(!categoriaG) return res.status(500)

                .send({message:'error al guardar la caegoria '});
                return res.status(200)

                .send({ categoria :categoriaG});

            })
        }else{

            return  res.status(500)

                .send({message:'ya se encuentra creada una categoria'})
            
        }

    })

}


// esta simplemente nos dejara editar algunas de las categorias 
function actualizarCategoria (req,res){
    var categoria = req.params.idCategoria;
    var parametros = req.body;

    
            Categoria.findByIdAndUpdate(categoria,parametros,{new:true},(err,categoriaG)=>{
                if(err) return res.status(500)

                .send({message:'error en la peticion'});
                if(!categoriaG) return res.status(500)

                .send({message:'error al actualizar esta Categoria'});
                 return res.status(200)

                 .send({categorias:categoriaG});
                
        
            })

 }
// esta funcino solamente buscara la categoria
function buscarCategoria(req,res){
    var parametros = req.body;

    if(parametros.busqueda){
        Categoria.find({busqueda: parametros.busqueda},(err,categorioEncontrada)=>{
            if(err)return res.status(500)

            .send({message: "Error en la peticion"});
            if(categorioEncontrada){
                if(!categorioEncontrada){
                    return res.status(404)

                    .send({message: "la categoria No existe"});
                }else{
                    return res.send({categoria:categorioEncontrada});

                    
                }
            }else{
                return res.status(404)

                .send({message: "No se encontro ninguna categoria con ese nombre"});
            }
        })
    }else if(parametros.busqueda == ""){
        Category.find({}).exec((err,categories)=>{
            if(err) return res.status(500)

                .send({message: "Error al obtener los datos"});
            if(categories){
                return res.send({message: "Categorías:",categories});
            }else{
                return res.status(403)

                .send({message: "No tiene datos"});
            }
        })
    }else{
        return res.status(403)
        
                .send({message: "Ingresar Busqueda"});
    }
}

// estar funcion buscara y obtendra la categoria que se pida
function ObtenerCategorias(req,res){
    Categoria.find({}).populate("productos").exec((err, categoriasEn)=>{
        if(err) return res.status(500)

        .send({message: "Error al obtener satos"});
         if(categoriasEn){
            return res.send({message: " Todas las categorias:", categoriasEn});
        }else{
            return res.status(403)
            
            .send({message: "no existe categoria"});
        }
    })
}


// esta funcion eliminara cualquier categoria mencionada
function borrarCategoria(req,res){
    const idCategoria = req.parametros.idCategoria;
    

    Categoria.findOne({_id : idCategoria}, (err, categoriaEn)=>{
        if(err){
            return res.status(500)

                    .send({message: "error en la petion"});
        }else if(categoriaEn){
            var productos = categoriaEn.productos;
            Categoria.findOneAndUpdate({busqueda: "Default"},{$push:{productos: productos}}, {new: true},(err, categoriaActualizada)=>{
                if(err){
                    return res.status(500)

                    .send({message: "no se puede actualizara a Base"});
                }else if(categoriaActualizada){
                   
                    Categoria.findOne({_id : idCategoria},(err, categoriaEn)=>{
                        if(err){
                            return res.status(500)

                            .send({message: "error en la categoria "});
                        }else if(categoriaEn){
                            Categoria.findByIdAndRemove(idCategoria,(err, categoriaEliminada)=>{
                                if(err){
                                    return res.status(500)

                                    .send({message: "error al eliminar esta categoria"});
                                }else if(categoriaEliminada){
                                    return res.send({categoria: categoriaEliminada});
                                }else{
                                    return res.status(404)

                                    .send({message: "error al eliminar esta categoriar"});
                                }
                            })
                        }else{
                            return res.status(403)

                            .send({message: 'esta categoria no existe'});
                        }
                    })
                }else{
                    return res.status(404)

                            .send({message: "error al actualizar"});
                }
            })
        }else{
            return res.status(403)

                            .send({message: " la categoria no existe"});
        }
    })
}




module.exports={
    CategoriaBase,
    nuevaCtegoria,
    actualizarCategoria,
    borrarCategoria,
    ObtenerCategorias,
    buscarCategoria
}
