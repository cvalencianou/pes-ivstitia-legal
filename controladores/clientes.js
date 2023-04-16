const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const Cliente = require('../modelos/Cliente')

const obtenerClientes = async (req, res) => {

    const usuarioId = req.user.id
    const cliente = new Cliente()

    const resultado = await cliente.obtenerClientes(usuarioId)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `No existen clientes registrados.`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })

}

const crearCliente = async (req, res) => {

    const usuarioId = req.user.id
    const { nombre, cedula, tipoCedula, correo, telefonoMovil, telefonoFisico, direccion } = req.body

    if (!usuarioId || !nombre || !cedula || !tipoCedula || !correo || !telefonoMovil || !direccion) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar todos los datos.')
    }

    if (typeof usuarioId !== 'number' || typeof (nombre, cedula, telefonoMovil, telefonoFisico, correo, direccion) !== 'string' || isNaN(cedula, telefonoMovil, telefonoFisico)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar datos válidos.')
    }

    if (correo.length < 6 || correo.length > 45 || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar un correo válido.')
    }

    if ( nombre.length > 100 || cedula.length > 15 || telefonoMovil.length > 15 || telefonoFisico.length > 15 || direccion.length > 200){
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar datos más pequeños.')
    }

    const cliente = new Cliente()

    if ((await cliente.buscarPorCedula(usuarioId, cedula))[0].length === 1) {
        throw new httpError(StatusCodes.CONFLICT, 'Usuario ya registrado.')
    }

    if ((await cliente.crearCliente(usuarioId, nombre, cedula, correo, telefonoMovil, telefonoFisico, direccion, tipoCedula)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: `Cliente creado correctamente.`
        })
    }
}

const filtrarClientes = async (req, res) => {

    const usuarioId = req.user.id
    const datoCliente = req.query.datoCliente

    if (!usuarioId || !datoCliente) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar todos los datos.')
    }

    const cliente = new Cliente()

    const resultado = await cliente.filtrarClientes(usuarioId, datoCliente)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `${datoCliente} no coincide con ningún cliente.`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}

const actualizarCliente = async (req, res) => {
    const usuarioId = req.user.id
    const clienteId = req.params.clienteId
    const { nombre, cedula, tipoCedula, correo, telefonoMovil, telefonoFisico, direccion } = req.body

    if (!usuarioId || !clienteId || !nombre || !cedula || !tipoCedula || !correo || !telefonoMovil || !direccion) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar todos los datos.')
    }

    if (typeof usuarioId !== 'number' || typeof (nombre, cedula, telefonoMovil, telefonoFisico, correo, direccion) !== 'string' || isNaN(clienteId, cedula, telefonoMovil, telefonoFisico)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar datos válidos.')
    }

    if (correo.length < 6 || correo.length > 45 || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar un correo válido.')
    }

    if ( nombre.length > 100 || cedula.length > 15 || telefonoMovil.length > 15 || telefonoFisico.length > 15 || direccion.length > 200){
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar datos más pequeños.')
    }

    const cliente = new Cliente()

    if ((await cliente.actualizarCliente(clienteId, usuarioId, nombre, cedula, correo, telefonoMovil, telefonoFisico, direccion, tipoCedula)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: `Cliente actualizado correctamente.`
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'No se puede actualizar los datos del cliente.')
    }

}

const eliminarCliente = async (req, res) => {
    const usuarioId = req.user.id
    const clienteId = req.params.clienteId

    if (!usuarioId || !clienteId) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar todos los datos.')
    }

    if (typeof usuarioId !== 'number' || isNaN(clienteId)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar datos válidos.')
    }

    const cliente = new Cliente()

    if ((await cliente.obtenerClientePorId(clienteId, usuarioId))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'Cliente no registrado')
    }

    if ((await cliente.eliminarCliente(clienteId, usuarioId)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: `Cliente eliminado correctamente.`
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'No se puede eliminar el cliente.')
    }
}

const obtenerCliente = async (req, res) => {

    const usuarioId = req.user.id
    const clienteId = req.params.clienteId

    if (!usuarioId || !clienteId) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar todos los datos.')
    }

    if (typeof usuarioId !== 'number' || isNaN(clienteId)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar datos válidos.')
    }

    const cliente = new Cliente()

    const resultado = await cliente.obtenerClientePorId(clienteId, usuarioId)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `Cliente no registrado.`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}

const obtenerClientesPorCasoId = async (req, res) => {
    const usuarioId = req.user.id
    const casoId = req.params.casoId 

    if (!usuarioId || !casoId) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar todos los datos.')
    }

    if (typeof usuarioId !== 'number' || isNaN(casoId)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'Por favor brindar datos válidos.')
    }

    const cliente = new Cliente()

    const resultado = await cliente.obtenerClientePorCasoId(casoId, usuarioId)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `No hay clientes para agregar.`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })


}

module.exports = { obtenerClientes, obtenerCliente, filtrarClientes, obtenerClientesPorCasoId, crearCliente, actualizarCliente, eliminarCliente }
