var Productos = require('../models/producto.models');
var Categoria = require('../models/categoria.models');

// Esta funcio nos permitira crear un nuevo producto para las categorais
function NuevoProducto (req, res){

    var categoriaId = req.params.idCategoria;
    var parametros = req.body;
    var modelProductos = new Productos();
    

    if(parametros.nombre && parametros.precio && parametros.stock){
        Categoria.findById(categoriaId,(err,categoriaEn)=>{

            if(err) return res.status(500)

                    .send({message:'error en la peticion'});
            if(categoriaEn){
                Productos.findOne({nombre: parametros.nombre},(err, productoEn)=>{

                    if(err) return res.status(500)

                    .send({message:'error en la peticion del producto'});
                    if(productoEn){
                        return res.status(500)

                        .send({message:'este producto ya esta registrado'})
                        

                    }else{
                        modelProductos.nombre= parametros.nombre;
                        modelProductos.precio = parametros.precio;
                        modelProductos.stock = parametros.stock;
                        
                        modelProductos.save((err,productoG)=>{
                        if(err) return res.status(500)

                                    .send({message:'erro en la peticion'});
                        if(productoG){
                            Categoria.findByIdAndUpdate(categoriaId,{$push:{producto:productoG._id }},{new: true},(err,categoriaAct)=>{
                              if(err) return res.status(500)

                                    .send({message:'error al peticion'});
                              if(!productoG)return res.status(500)

                                    .send({message:'error al agregar a la categoria'});

                             



                            })
                        }
                        return res.status(200).send({producto:productoG})
                        


                        })

                    }
                    
                })

                 
            }
        })

    }else{

        return res.status(500)

            .send({message:'llene los campos obligatorios'})
    }

}


// esta funcion permite crear un nuevo prodyucto para una categoria
function borrarProducto(req, res){
    var categoriaId = req.params.idCategoria;
    var productosId = req.params.idPructos;

    Categoria.findOneAndUpdate({_id:categoriaId,productos: productosId},{$pull:{productos:productosId}},{new: true},(err,categoriaAct)=>{

     if(err) return res.status(500)

     .send({message:'error en la peticion '})
       if(!categoriaAct){
           Productos.findByIdAndRemove(productosId,(err,pruductoBo)=>{
              if(err) return res.status(500)

              .send({message:'erro al eliminar el prosucto'});
              if(!pruductoBo){
                   return res.status(500)

                   .send({message:'no se elimino el producto'})
              }else{
                  return res.status(200)

                  .send({productos:pruductoBo})
              }

           })

       }else{
           return res.status(500).send({message:'el producto no existe'})
       }
    })
}
//esta funcion nos avisara cuando ya no se encuentren productos en una categoria por eso se llama productos agotados uwu
function ProductosAgotados(req,res){
    Productos.find({stock: 0},(err, productosAgo)=>{
        if(err) return res.status(500)

                .send({message: "No hay productos agotados"});
         if(productosAgo){
            if(productosAgo != ""){
                return res.send({message: "Productos agotados: ", productosAgo});
            }else{
                return res.status(404)

                .send({message: "no se encuentran productos agotados actualmente"});
            }
        }else{
            return res.status(404)

            .send({message: "Por el momento no existen productos agotados"});
        }
    })
}


// nos permite encontrar un producto dentro de una categhoria
function hallarProducto(req,res){
    var parametros = req.body;

    if(parametros.busqueda){
        Productos.find({nombre: parametros.busqueda},(err, productosAgo)=>{
            if(err) return res.status(500)

                .send({message: "Hubo error en la busqueda"});
            if(productosAgo){
                return res.send({producto: productosAgo});
            }else{
                return res.status(403)

                .send({message: "No hubo ningun tipo de coincidencia"});
            }
        })
    }else if(parametros.busqueda == ""){
        Productos.find({}).exec((err, productos)=>{
            if(err) return res.status(500)

            .send({message: "Error al buscar"});
            if(productos){
                return res.send({message: "Productos: ",productos});
            }else{
                return res.status(403)

                .send({message: "No se hallo ningun producto}"});
            }
        })
    }else{
        return res.status(403)

        .send({message: "Busqueda aqui"});
    }
}


// etsa funcion permite el editar los productos de una categoria
function cambiarProducto(req, res){

    var categoriaId = req.params.idCategoria;
    var productosId = req.params.idPructos;
    var parametros = req.body;
    
    if(parametros.stock){
        Productos.findById(productosId,(err,productosEnc)=>{
           if(err) return res.status(500)

                        .send({message:'error en la peticion'})
           if(productosEnc){
             Categoria.findOne({_id:categoriaId,productosId: productosId},(err,categoriaEn)=>{
                 if(err) return res.status(500)

                        .send({message:'error en categoria'});
                 if(categoriaEn){
                     Productos.findByIdAndUpdate(productosId,parametros,{new: true},(err,productoAct)=>{
                        if(err) return res.status(500).send({message:''})
                        if(!productoAct){
                            return res.status(500)
                            .send({message:'no se actualizó el producto'});
                        }else{
                            return res.status(200)

                            .send({producto:productoAct})
                        }
                     })
                 }

             })
           }else{
               return res.status(500)
                            .send({message:'no existe ningun producto para editar'})


           }
           
        })


    }else{
        return res.status(500)
                            .send({message:'ingrese los parametros obligatorios'});
    }
}


//permiete el encontrar algun producto de una categoria mediante el find
function conseguirProducto(req,res){
    Productos.find({}).exec((err, productosEnc)=>{
        if(err) return res.status(500)

                    .send({message: "no se logro encontrar ningun producto"});
         if(!productosEnc){
            return res.status(500)
            
                    .send({message: "No se consiguio ningun producto"});
           
        }else{
            return res.send({message: "Productos: ", productosEnc});
           
        }
    })
}

module.exports = {

    NuevoProducto,
    cambiarProducto,
    borrarProducto,
    hallarProducto,
    conseguirProducto,
    ProductosAgotados
}