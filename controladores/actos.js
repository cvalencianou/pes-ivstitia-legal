const Acto = require('../modelos/Acto')
const Registro = require('../modelos/Registro')
const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

const crearActo = async (req, res) => {

    const { nombre, idRegistro, tributosHonorarios } = req.body

    if (!nombre || nombre.length < 1 || nombre.length > 45 || !idRegistro || isNaN(idRegistro)
        || !tributosHonorarios) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    try {
        JSON.parse(tributosHonorarios)
    } catch (error) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    if ((await new Registro().buscarPorId(idRegistro))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'ID REGISTRO NO EXISTE')
    }

    const acto = new Acto()

    if ((await acto.buscarPorNombreIdRegistro(nombre, idRegistro))[0].length > 0) {
        throw new httpError(StatusCodes.CONFLICT, 'ACTO YA EXISTE PARA REGISTRO')
    }

    if ((await acto.crear(nombre, idRegistro, tributosHonorarios)).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: 'ACTO CREADO'
        })
    } else {
        throw new httpError(StatusCodes.CONFLICT, 'ACTO NO CREADO')
    }
}

const obtenerActosPorIdRegistro = async (req, res) => {

    const { idRegistro } = req.params

    if (!idRegistro || isNaN(idRegistro)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const resultado = await new Acto().obtenerTodosPorIdRegistro(idRegistro)

    if (resultado[0].length > 0) {
        res.status(StatusCodes.OK).json({
            mensaje: resultado[0]
        })
    }
    else {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTEN ACTOS PARA REGISTRO')
    }
}

const obtenerPorId = async (req, res) => {

    const { id } = req.params

    if (!id || isNaN(id)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const resultado = await new Acto().obtenerPorId(id)

    if (resultado[0].length > 0) {
        res.status(StatusCodes.OK).json({
            mensaje: resultado[0]
        })
    }
    else {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE ACTO')
    }
}

const actualizarActo = async (req, res) => {

    const { id } = req.params
    const { nombre, tributosHonorarios } = req.body

    if (!id || isNaN(id) || !nombre || nombre.length < 1 || nombre.length > 45 || !tributosHonorarios) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const acto = new Acto()

    const resultado = (await acto.obtenerPorId(id))[0]

    if (resultado.length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'ACTO NO EXISTE')
    }

    const resultadoNombre = (await acto.buscarPorNombreIdRegistro(nombre, resultado[0]['id_registro']))[0]

    if (resultadoNombre.length === 1 && resultado[0].id !== resultadoNombre[0].id) {
        throw new httpError(StatusCodes.CONFLICT, 'NOMBRE ACTO PARA REGISTRO YA EXISTE')
    }

    if ((await acto.actualizarPorId(id, nombre, tributosHonorarios)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'ACTO ACTUALIZADO'
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'ACTO NO ACTUALIZADO')
    }
}

const eliminarActo = async (req, res) => {

    const { id } = req.params

    if (!id || isNaN(id)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const acto = new Acto()

    if ((await acto.obtenerPorId(id))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'ACTO NO EXISTE')
    }

    if ((await acto.eliminarPorId(id)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'ACTO ELIMINADO'
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'ACTO NO ELIMINADO')
    }
}

const calcularActo = async (req, res) => {

    const { id } = req.params
    const { montoConsulta } = req.body

    if (!id || isNaN(id) || !montoConsulta || isNaN(montoConsulta)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    res.status(StatusCodes.OK).json({
        mensaje: await new Acto().realizarCalculo(id, montoConsulta)
    })

}

module.exports = { crearActo, obtenerActosPorIdRegistro, obtenerPorId, calcularActo, actualizarActo, eliminarActo }