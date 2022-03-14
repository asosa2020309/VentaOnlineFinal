var Product = require("../models/producto.models");
var Carrito = require("../models/carrito.models");

function agregarCarrito(req,res){
    var productId = req.params.productoId;
    var params = req.body;
    var userId = req.user.sub;

    if(params.stock){
        Product.findById(productId,(err,productFind)=>{
            if(err){
                return res.status(500)

                    .send({message: "no se pudo añadir ningun produco"});
            }else if(productFind){
                if(params.stock > productFind.stock){
                    return res.status(403)

                    .send({message: "La cantidad añadida es superior a la capacidad del carro"});
                }else{
                    Carrito.findOneAndUpdate({usuarios: userId},{$push:{productos:productFind._id,stock:params.stock}},{new:true},(err,cartUpdated)=>{
                        if(err){
                            return res.status(500)

                             .send({message: "Error no s epudo agregar ningun producto al carro"});
                        }else if(cartUpdated){
                            return res
                                .send({message: "Producto agregado correctamente al carro"});
                        }else{
                            return res.status(404)

                                .send({message: "No se agregó al carrito (No se encontró su carro)"});
                        }
                    })
                }
            }else{
                return res.status(403)

                                .send({message: "Producto inexistente"});
            }
        })
    }else{
        return res.status(403)
                                .send({message: "Ingrese la cantidad de productos a llevar"});
    }
}


module.exports ={
    agregarCarrito
}