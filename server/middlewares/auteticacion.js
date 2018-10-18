const jwt = require('jsonwebtoken');

// ===============
// VERIFICAR TOKEN
//================
let verificaToken = (req, resp, next) => {
    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return resp.status(401).json({
                ok: false,
                err: {
                    message: 'Token no valido'
                }
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
    console.log(token);
};

// ===============
// VERIFICAR ADMINROLE
//================

let verificaAdmin_Role = (req, resp, next) => {
    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        console.log(usuario.role);
    } else {
        return resp.json({
            ok: false,
            message: `El usuario ${usuario.nombre} no es administradore.`
        });
    }
}

module.exports = {
    verificaToken,
    verificaAdmin_Role
}