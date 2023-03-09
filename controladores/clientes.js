const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const Cliente = require('../modelos/Cliente')

const crearCliente = async (req, res) => {

    const usuarioId = req.user.id
    const { nombre, cedula, tipoCedula, correo, telefonoMovil, telefonoFisico, direccion } = req.body

    if (!usuarioId || !nombre || !cedula || !tipoCedula || !correo || !telefonoMovil || !direccion) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (typeof usuarioId !== 'number' || typeof (nombre, cedula, telefonoMovil, telefonoFisico, correo, direccion) !== 'string' || isNaN(cedula, telefonoMovil, telefonoFisico)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS!')
    }

    if (correo.length < 6 || correo.length > 45 || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR UN CORREO VÁLIDO')
    }
    const cliente = new Cliente()

    if ((await cliente.buscarPorCedula(usuarioId, cedula))[0].length === 1) {
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

    if (!usuarioId || !datoCliente) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS VALORES!')
    }

    const cliente = new Cliente()

    const resultado = await cliente.filtrarClientes(usuarioId, datoCliente)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `${datoCliente} no coincide con ningún cliente!`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}

const actualizarCliente = async (req, res) => {
    const usuarioId = req.user.id
    const { clienteId, nombre, cedula, tipoCedula, correo, telefonoMovil, telefonoFisico, direccion } = req.body

    if (!usuarioId || !clienteId || !nombre || !cedula || !tipoCedula || !correo || !telefonoMovil || !direccion) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (typeof usuarioId !== 'number' || typeof (nombre, cedula, telefonoMovil, telefonoFisico, correo, direccion) !== 'string' || isNaN(clienteId, cedula, telefonoMovil, telefonoFisico)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS  !')
    }

    if (correo.length < 6 || correo.length > 45 || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR UN CORREO VÁLIDO')
    }

    const cliente = new Cliente()

    if ((await cliente.buscarPorId(usuarioId, clienteId))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE CLIENTE')
    }

    if ((await cliente.actualizarCliente(clienteId, usuarioId, nombre, cedula, correo, telefonoMovil, telefonoFisico, direccion, tipoCedula)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: `CLIENTE ACTUALIZADO!`
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'CLIENTE NO ACTUALIZADO')
    }

}

const eliminarCliente = async (req, res) => {
    const usuarioId = req.user.id
    const clienteId = req.query.clienteId

    if (!usuarioId || !clienteId ) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (typeof usuarioId !== 'number' || isNaN(clienteId)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS  !')
    }

    const cliente = new Cliente()

    if ((await cliente.buscarPorId(usuarioId, clienteId))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE CLIENTE')
    }

    if ((await cliente.eliminarCliente(clienteId, usuarioId)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: `CLIENTE ELIMINADO!`
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'CLIENTE NO ELIMINADO')
    }



}

module.exports = { obtenerClientes, filtrarClientes, crearCliente, actualizarCliente, eliminarCliente }
