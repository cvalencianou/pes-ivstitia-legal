const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')
const Usuario = require('../modelos/Usuario')

const crearUsuario = async (req, res) => {
    const { correo, contrasena } = req.body

    const usuario = new Usuario()

    if ((await usuario.buscarPorCorreo(correo))[0].length === 1) {
        throw new httpError(StatusCodes.CONFLICT, 'YA EXISTE USUARIO')
    }

    if ((await usuario.registrar(correo, await bcrypt.hash(contrasena, Number(process.env.BCRYPT_SALT_ROUNDS)))).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mesanje: `USUARIO CREADO POR ${req.user.id}`
        })
    }

}

const iniciarSesion = async (req, res) => {

    const { correo, contrasena } = req.body

    if (!correo || !contrasena || correo < 4 || correo > 45 || contrasena < 8 || contrasena > 60 || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const usuario = new Usuario()

    if ((await usuario.buscarPorCorreo(correo))[0].length === 0) {
        throw new httpError(StatusCodes.CONFLICT, 'NO EXISTE USUARIO')
    }

    if ((await usuario.iniciarSesion(correo))[0][0].contrasena === contrasena) {
        res.status(StatusCodes.OK).json({
            mensaje: 'CREDENCIALES CORRECTAS'
        })
    }
    else {
        throw new httpError(StatusCodes.UNAUTHORIZED, 'CREDENCIALES INCORRECTAS')
    }
}

module.exports = { crearUsuario, iniciarSesion }