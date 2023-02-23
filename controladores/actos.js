const Acto = require('../modelos/Acto')
const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

const crearActo = async (req, res) => {

    const { nombre, registro, tributosHonorarios } = req.body

    if (!nombre || !registro || isNaN(registro) || !tributosHonorarios) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const objetoTributosHonorarios = JSON.parse(tributosHonorarios)

    if (!objetoTributosHonorarios) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    new Acto().crear(nombre, registro, JSON.stringify(objetoTributosHonorarios))

    res.status(StatusCodes.CREATED).json({
        mensaje: 'ACTO CREADO'
    })
}

const obtenerActosPorIdRegistro = async (req, res) => {

    const { id } = req.params

    if (!id || isNaN(id)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const resultado = await new Acto().obtenerTodosPorIdRegistro(id)

    if (resultado[0].length > 0) {
        res.status(StatusCodes.OK).json({
            mensaje: resultado[0]
        })
    }
    else {
        res.status(StatusCodes.NOT_FOUND).json({
            mensaje: 'NO HAY ACTOS'
        })
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
        res.status(StatusCodes.NOT_FOUND).json({
            mensaje: 'NO EXISTE ACTO'
        })
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

const actualizarActo = async (req, res) => {

    const { id } = req.params
    const { nombre, tributosGeneral } = req.body

    if (!id || !nombre || !tributosGeneral) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const acto = new Acto()

    if ((await acto.actualizarPorId(id, nombre, tributosGeneral)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'ACTO ACTUALIZADO'
        })
    }
    else {
        res.status(StatusCodes.OK).json({
            mensaje: 'ACTO NO ACTUALIZADO'
        })
    }


}

const eliminarActo = async (req, res) => {

    const { id } = req.params

    const acto = new Acto()

    if ((await acto.eliminarPorId(id)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'ACTO ELIMINADO'
        })
    }
}

module.exports = { crearActo, obtenerActosPorIdRegistro, obtenerPorId, calcularActo, actualizarActo, eliminarActo }