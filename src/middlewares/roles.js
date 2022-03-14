exports.Admin = function(req, res, next){
    if (req.user.rol !== 'ADMIN') return res.status(403).send({mensaje:'Solo el admin puede hacerlo'})
    next();
} 

exports.Cliente = function(req, res, next){
    if(req.user.rol !=='ROL_CLIENTE') return res.status(403).send({mensaje:'la accion solo la puede hacer un cliente'})

    next();

}