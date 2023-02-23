const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const Cliente = require('../modelos/Cliente')

const crearCliente = async (req, res) => {
    const usuarioId = req.user.id
    const { nombre, cedula, tipoCedula, correo, telefonoMovil, telefonoFisico, direccion } = req.body

    if (!usuarioId || !nombre || !cedula || !tipoCedula || !correo || !telefonoMovil || !direccion) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (typeof usuarioId !== 'number' || typeof nombre !== 'string' || typeof cedula !== 'string' || typeof telefonoFisico !== 'string' || typeof correo !== 'string' || typeof telefonoMovil !== 'string' || typeof direccion !== 'string') {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS 1!')
    }

    if (isNaN(cedula) || isNaN(telefonoFisico) || isNaN(telefonoMovil)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS numeros!')
    }

    if (correo.length < 6 || correo.length > 45 || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR UN CORREO VÁLIDO')
    }
    const cliente = new Cliente()

    if ((await cliente.buscarPorCedula(usuarioId,cedula))[0].length === 1) {
        throw new httpError(StatusCodes.CONFLICT, 'YA EXISTE USUARIO')
    }

    if ((await cliente.crearCliente(usuarioId, nombre, cedula, correo, telefonoMovil, telefonoFisico, direccion, tipoCedula)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: `CLIENTE CREADO`
        })
    }
}

const obtenerClientes = async (req, res) => {
    const usuarioId = req.user.id
    const cliente = new Cliente()

    const resultado = await cliente.obtenerClientes(usuarioId)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `No existe ningún cliente!`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })

}

const filtrarClientes = async (req, res) => {
    const usuarioId = req.user.id
    const datoCliente = req.query.datoCliente

    const cliente = new Cliente()

    const resultado = await cliente.filtrarClientes(usuarioId, datoCliente)

    if (!usuarioId || !datoCliente) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS VALORES!')
    }

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `${datoCliente} no coincide con ningún cliente!`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}

const actualizarCliente = async (req, res) => {
    const usuarioId = req.user.id
    //const clienteId = req.
    const { nombre, cedula, tipoCedula, correo, numeroFisico, numeroMovil, direccion } = req.body

    if (!usuarioId || !nombre || !cedula || !tipoCedula || !correo || !numeroMovil || !direccion) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (typeof usuarioId !== 'number' || typeof nombre !== 'string' || typeof cedula !== 'string' || typeof numeroFisico !== 'string' /*typeof tipoCedula !== ''*/ || typeof correo !== 'string' || typeof numeroMovil !== 'string' || typeof direccion !== 'string') {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS 1!')
    }

    if (isNaN(cedula) || isNaN(numeroFisico) || isNaN(numeroMovil)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS numeros!')
    }

    if (correo.length < 7 || correo.length > 45 || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR UN CORREO VÁLIDO')
    }
    if ((await cliente.crearCliente(usuarioId, nombre, cedula, correo, numeroFisico, numeroMovil, direccion, tipoCedula)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mesanje: `CLIENTE ACTUALIZADO`
        })
    }
}

module.exports = { obtenerClientes, filtrarClientes, crearCliente, actualizarCliente }
