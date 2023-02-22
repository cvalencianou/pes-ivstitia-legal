const Registro = require('../modelos/Registro')
const Acto = require('../modelos/Acto')
const Tributo = require('../modelos/Tributo')
const Honorario = require('../modelos/Honorario')
const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

const obtenerRegistros = async (req, res) => {

    const registro = new Registro();

    const resultado = await registro.obtenerTodos()

    if (resultado[0].length > 0) {
        res.status(StatusCodes.OK).json({
            mensaje: resultado[0]
        })
    }
    else {
        res.status(StatusCodes.NOT_FOUND).json({
            mensaje: 'NO HAY REGISTROS'
        })
    }
}

const obtenerActosPorIdRegistro = async (req, res) => {

    const { id } = req.params

    if (!id || isNaN(id)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const acto = new Acto()

    const resultado = await acto.obtenerPorIdRegistro(id)

    if (resultado[0].length > 0) {
        res.status(StatusCodes.OK).json({
            mensaje: resultado[0]
        })
    }
    else {
        res.status(StatusCodes.NOT_FOUND).json({
            mensaje: 'NO HAY REGISTROS'
        })
    }
}

const realizarCalculo = async (req, res) => {

    const { acto } = req.params
    const { montoConsulta } = req.body

    const tributo = new Tributo()
    const honorario = new Honorario()

    const tributos = (await tributo.obtenerTributosPorIdActo(acto))[0][0]
    const honorarios = await calcularHonorarios(montoConsulta, (await honorario.obtenerMontos())[0])

    res.status(StatusCodes.OK).json({
        mensaje: {
            registro: (montoConsulta / 1000) * tributos.registro,
            agrario: (montoConsulta / 1000) * tributos.agrario,
            fiscal: tributos.fiscal,
            archivo: tributos.archivo,
            abogado: tributos.abogado,
            municipal: (montoConsulta / 1000) * tributos.municipal,
            traspaso: (tributos.traspaso * montoConsulta) / 100,
            honorarios: honorarios > 60500 ? honorarios : 60500
        }
    })
}

const calcularHonorarios = async (montoConsulta, honorarios) => {
    let totalHonorarios = 0
    let contador = 1

    do {
        if (contador === 1) {
            if (montoConsulta <= Number(honorarios[contador].monto)) {
                totalHonorarios = (honorarios[contador].porcentaje * montoConsulta) / 100
                break
            } else {
                totalHonorarios += (honorarios[contador].porcentaje * honorarios[contador].monto) / 100
            }
        }
        else {
            if (contador === 4) {
                totalHonorarios += honorarios[contador].porcentaje * (montoConsulta - honorarios[contador - 1].monto) / 100
                break
            }
            else if (montoConsulta > honorarios[contador].monto) {
                totalHonorarios += honorarios[contador].porcentaje * (honorarios[contador].monto - honorarios[contador - 1].monto) / 100
            } else {
                totalHonorarios += honorarios[contador].porcentaje * (montoConsulta - (honorarios[contador - 1].monto)) / 100
                break
            }
        }
        contador++
    } while (montoConsulta - honorarios[contador - 1].monto > 0)

    return totalHonorarios
}

const calcularTimbreFiscal = async () => {

}

const calcularTimbreArchivo = async () => {
    
}

const calcularTimbreAbogado = async () => {
    
}

module.exports = { obtenerRegistros, obtenerActosPorIdRegistro, realizarCalculo }