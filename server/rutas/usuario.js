const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const _ = require('underscore');
const Usuario = require('../modelos/usuario')
const { verificaToken, verificaAdmin_Role } = require('../middlewares/auteticacion')
const app = express();
let times = bcrypt.genSaltSync(10);

//Lectura de registros
app.get('/usuarios', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    Usuario.find({ estado: true }, 'nombre mail role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })
            });
        });
});

//Creacion de registo
app.post('/usuarios', [verificaToken, verificaAdmin_Role], function(req, res) {
    let body = req.body;

    //Modelo para usuario
    let usuario = new Usuario({
        nombre: body.nombre,
        mail: body.mail,
        password: bcrypt.hashSync(body.password, times),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

//Actualizacion de registros
app.put('/usuarios/:id', [verificaToken, verificaAdmin_Role], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'mail', 'img, role', 'estado']);



    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            id,
            usuario: usuarioDB
        });
    })
});

//Eliminacion de registros
app.delete('/usuarios/:id', [verificaToken, verificaAdmin_Role], function(req, res) {
    let id = req.params.id;
    let cambiaEStado = {
        estado: false
    };
    Usuario.findByIdAndUpdate(id, cambiaEStado, { new: true }, (err, usuarioEliminado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (usuarioEliminado == null) {
            return res.status(400).json({
                ok: false,
                error: 'Usuario no encontrado'
            });
        }
        res.json({
            ok: true,
            usuario: usuarioEliminado
        })
    });
});

module.exports = app;