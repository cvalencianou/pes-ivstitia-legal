const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')
const Usuario = require('../modelos/Usuario')
const { crearJWT } = require('../middleware/autenticacion')
const generator = require('generate-password')
const { enviarCorreo } = require('../utilidades/nodeMailer')

const crearUsuario = async (req, res) => {

    const { correo } = req.body

    if (!correo || correo.length < 4 || correo.length > 45
        || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const usuario = new Usuario()

    if ((await usuario.buscarPorCorreo(correo))[0].length === 1) {
        throw new httpError(StatusCodes.CONFLICT, 'YA EXISTE USUARIO')
    }

    const contrasena = generator.generate({
        length: 10,
        numbers: true
    })

    if ((await usuario.registrar(correo, await bcrypt.hash(contrasena, Number(process.env.BCRYPT_SALT_ROUNDS)))).affectedRows === 1) {

        res.status(StatusCodes.CREATED).json({
            mesanje: `USUARIO CREADO`
        })

        enviarCorreo({
            from: 'IvstitiaLegal <cristian.valenciano@ulatina.net>',
            to: `Nuevo Usuario <${correo}>`,
            subject: 'Nuevo Usuario IvstitiaLegal',
            text: `Bienvenido a la aplicacion IvstitiaLegal \n
            Sus credenciales son: \n
            Correo electrónico: ${correo} \n
            Contraseña: ${contrasena} \n
            Ingrese a través del siguiente enlace ${process.env.APP_LINK}`
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
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE USUARIO')
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

const cerrarSesion = async (req, res) => {
    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: true,
        signed: true
    })
    res.status(StatusCodes.OK).json({
        mensaje: 'CERRÓ SESIÓN'
    })
}

const obtenerUsuarios = async (req, res) => {

    const usuario = new Usuario()

    const resultado = await usuario.obtenerUsuarios()

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}

const actualizarUsuario = async (req, res) => {

    const id = req.params.id
    const { correo, administrador } = req.body

    if (!id || !correo || administrador < 0 || administrador > 1 || correo.length < 4 || correo.length > 45
        || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/) || isNaN(id) || isNaN(administrador)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const usuario = new Usuario()

    if ((await usuario.buscarPorId(id))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE USUARIO')
    }

    const resultado = await usuario.buscarPorCorreo(correo)

    if (resultado[0].length === 1 && resultado[0][0].id !== Number(id)) {
        throw new httpError(StatusCodes.CONFLICT, 'CORREO YA ESTÁ EN USO')
    }


    if ((await usuario.actualizar(id, correo, administrador)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: "USUARIO ACTUALIZADO"
        })
    }
}

module.exports = { crearUsuario, iniciarSesion, cerrarSesion, obtenerUsuarios, actualizarUsuario }