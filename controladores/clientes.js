const Error = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const Cliente = require('../modelos/Cliente')
const cliente = new Cliente()

const obtenerClientes = async (req, res) => {
    const usuarioId = req.user.id
    const resultado = await cliente.obtenerClientes(usuarioId)

    if (resultado[0].length === 0) {
        throw new Error(StatusCodes.NOT_FOUND, `No existe ningún cliente!`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })

}

const filtro = async (req, res) => {
    const usuarioId = req.user.id
    const datoCliente = req.query.datoCliente
    const resultado = await cliente.filtro(usuarioId, datoCliente)

    if (!usuarioId || !datoCliente) {
        throw new Error(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS VALORES!')
    }

    if (resultado[0].length === 0) {
        throw new Error(StatusCodes.NOT_FOUND, `${datoCliente} no coincide con ningún cliente!`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}

const crearCliente = async (req, res) => {
    const usuarioId = req.user.id
    const nombre = req.body.nombre
    const cedula = req.body.cedula
    const tipoCedula = req.body.tipoCedula
    const correo = req.body.correo
    const numeroFisico = req.body.numeroFisico
    const numeroMovil = req.body.numeroMovil
    const direccion = req.body.numeroMovil
    
    const resultado = await  cliente.crearCliente(usuarioId, nombre, cedula, correo, numeroFisico, numeroMovil, direccion, tipoCedula)

    if (!usuarioId || !nombre || !cedula || !tipoCedula || !correo || !numeroMovil || !direccion) {
        throw new Error(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS VALORES!')
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}

const actualizarCliente = async (req, res) => {
    const usuarioId = req.user.id
    //const clienteId = req.
    const nombre = req.body.nombre
    const cedula = req.body.identificacion
    const tipoCedula = req.body.tipoCedula
    const correo = req.body.correo
    const numeroFisico = req.body.numeroFisico
    const numeroMovil = req.body.numeroMovil
    const direccion = req.body.numeroMovil

    const resultado = await cliente.actualizarCliente(/*clienteId,*/ usuarioId, nombre, identificacion, tipoCedula, correo, numeroFisico, numeroMovil, direccion)

    if (!usuarioId || !nombre || !identificacion || !tipoCedula || !correo || !numeroFisico || !numeroMovil || !direccion) {
        throw new Error(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS VALORES!')
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}


module.exports = { obtenerClientes, filtro, crearCliente, actualizarCliente }