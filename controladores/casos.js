const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const Caso = require('../modelos/Caso')
const Cliente = require('../modelos/Cliente')
const NotaCaso = require('../modelos/NotaCaso')

const obtenerCasos = async (req, res) => {
    const usuarioId = req.user.id
    const caso = new Caso()

    const resultado = await caso.obtenerCasos(usuarioId)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `No existe ningún caso!`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })

}

const crearCaso = async (req, res) => {
    const usuarioId = req.user.id
    const { nombre, despacho, descripcion, estado, tipoProceso } = req.body

    if (!usuarioId || !nombre || !despacho || !descripcion || !estado || !tipoProceso) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (typeof (usuarioId) !== 'number' || typeof (nombre, despacho, descripcion) !== 'string' || isNaN(estado, tipoProceso)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS!')
    }

    const caso = new Caso()

    if ((await caso.buscarPorNombre(usuarioId, nombre))[0].length === 1) {
        throw new httpError(StatusCodes.CONFLICT, 'YA EXISTE CASO')
    }

    if ((await caso.crearCaso(usuarioId, nombre, despacho, descripcion, estado, tipoProceso)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: `CASO CREADO`
        })
    }
}

const filtrarCasos = async (req, res) => {

    const usuarioId = req.user.id
    const datoCaso = req.query.datoCaso

    if (!usuarioId || !datoCaso) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS VALORES!')
    }

    const caso = new Caso()

    const resultado = await caso.filtrarCasos(usuarioId, datoCaso)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `${datoCaso} no coincide con ningún caso!`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0]
    })
}

const actualizarCaso = async (req, res) => {
    const usuarioId = req.user.id
    const { casoId, nombre, despacho, descripcion, estado, tipoProceso } = req.body

    if (!usuarioId || !casoId || !nombre || !despacho || !descripcion || !estado || !tipoProceso) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (typeof (usuarioId) !== 'number' || typeof (nombre, despacho, descripcion) !== 'string' || isNaN(estado, tipoProceso, casoId)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS!')
    }

    const caso = new Caso()

    if ((await caso.buscarPorIdCaso(casoId, usuarioId))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE CASO')
    }

    if ((await caso.actualizarCaso(casoId, usuarioId, nombre, despacho, descripcion, estado, tipoProceso)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: `CASO ACTUALIZADO`
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'CASO NO ACTUALIZADO')
    }

}

const eliminarCaso = async (req, res) => {

    const usuarioId = req.user.id
    const casoId = req.params.casoId

    if (!usuarioId || !casoId) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (typeof usuarioId !== 'number' || isNaN(casoId)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS  !')
    }

    const caso = new Caso()

    if ((await caso.buscarPorIdCaso(casoId, usuarioId))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE CASO')
    }

    if ((await caso.eliminarCaso(casoId, usuarioId)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: `CASO ELIMINADO!`
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'CASO NO ELIMINADO')
    }
}

const obtenerCaso = async (req, res) => {
    
    const usuarioId = req.user.id
    const casoId = req.params.casoId

    if (!usuarioId || !casoId) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS VALORES!')
    }

    if (typeof usuarioId !== 'number' || isNaN(casoId)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS!')
    }

    const caso = new Caso()

    const notas = await new NotaCaso().obtenerNotasPorIdCaso(casoId)
    
    const clientes = await new Cliente().obtenerClientesPorIdCaso(casoId)

    const resultado = await caso.obtenerCaso(casoId, usuarioId)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, `No coincide ningún caso!`)
    }

    res.status(StatusCodes.OK).json({
        mensaje: resultado[0], 
        notas: notas[0],
        clientes: clientes[0]

    })
}

const agregarNota = async (req, res) => {

    const usuarioId = req.user.id
    const casoId = req.params.casoId
    const {nota} = req.body

    if (!casoId || !nota) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (typeof (nota) !== 'string' || isNaN(casoId)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS!')
    }

    const caso = new Caso()
    const notaCaso = new NotaCaso()

    if ((await caso.buscarPorIdCaso(casoId, usuarioId))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE CASO')
    }

    if ((await notaCaso.agregarNota(casoId, nota)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: `Nota agregada`
        })
    }

}

const agregarCliente = async (req, res) => {

    const usuarioId = req.user.id
    const casoId = req.params.casoId
    const { clienteId } = req.body

    if (!casoId || !clienteId) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (isNaN(casoId, clienteId)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS!')
    }

    const caso = new Caso()
    const cliente = new Cliente()    

    if ((await caso.buscarPorIdCaso(casoId, usuarioId))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE CASO')
    }

    if ((await cliente.agregarClientePorCasoId(casoId, clienteId)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: `Cliente agregado`
        })
    }

}

const eliminarNota = async (req, res) => {

    const usuarioId = req.user.id
    const casoId = req.params.casoId
    const notaId = req.params.notaId

    if (!casoId || !notaId) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (typeof usuarioId !== 'number' || isNaN(casoId, notaId)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS!')
    }

    const caso = new Caso()
    const notaCaso = new NotaCaso()

    if ((await caso.buscarPorIdCaso(casoId, usuarioId))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE CASO')
    }

    if ((await notaCaso.eliminarNota(casoId, notaId)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: `Nota eliminada!`
        })
    }

    else {
        throw new httpError(StatusCodes.CONFLICT, 'Nota no eliminada')
    }
}

const eliminarCliente = async (req, res) => {

    const usuarioId = req.user.id
    const casoId = req.params.casoId
    const clienteId = req.params.clienteId

    if (!casoId || !clienteId) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR TODOS LOS DATOS!')
    }

    if (isNaN(casoId, clienteId)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR DATOS VALIDOS!')
    }

    const caso = new Caso()
    const cliente = new Cliente()

    if ((await caso.buscarPorIdCaso(casoId, usuarioId))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE CASO')
    }

    if ((await cliente.eliminarClientePorCasoId(casoId, clienteId)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: `Cliente eliminado!`
        })
    }

    else {
        throw new httpError(StatusCodes.CONFLICT, 'Cliente no eliminado')
    }

}

module.exports = { obtenerCasos, crearCaso, filtrarCasos, actualizarCaso, eliminarCaso, obtenerCaso, agregarNota, agregarCliente, eliminarNota, eliminarCliente }