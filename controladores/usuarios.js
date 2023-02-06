const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')
const Usuario = require('../modelos/Usuario')
const { crearJWT } = require('../middleware/autenticacion')

const crearUsuario = async (req, res) => {

    const { correo, contrasena } = req.body

    const usuario = new Usuario()

    if ((await usuario.buscarPorCorreo(correo))[0].length === 1) {
        throw new httpError(StatusCodes.CONFLICT, 'YA EXISTE USUARIO')
    }

    if ((await usuario.registrar(correo, await bcrypt.hash(contrasena, Number(process.env.BCRYPT_SALT_ROUNDS)))).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mesanje: `USUARIO CREADO`
        })
    }
}

const iniciarSesion = async (req, res) => {

    const { correo, contrasena } = req.body

    if (!correo || !contrasena || correo.length < 4 || correo.length > 45 || contrasena.length < 8
        || contrasena.length > 60 || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const usuario = new Usuario()

    const resultado = await usuario.iniciarSesion(correo)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.CONFLICT, 'NO EXISTE USUARIO')
    }

    if (await bcrypt.compare(contrasena, resultado[0][0].contrasena)) {
        res.cookie('jwt',
            await crearJWT({
                id: resultado[0][0].id,
                administrador: resultado[0][0].administrador
            }),
            {
                httpOnly: true,
                secure: true,
                sameSite: true,
                signed: true
            })

        res.status(StatusCodes.OK).json({
            mensaje: 'CREDENCIALES CORRECTAS',
            administrador: resultado[0][0].administrador
        })
    }
    else {
        throw new httpError(StatusCodes.UNAUTHORIZED, 'CREDENCIALES INCORRECTAS')
    }
}

module.exports = { crearUsuario, iniciarSesion }