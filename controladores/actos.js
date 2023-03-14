const Acto = require('../modelos/Acto')
const Registro = require('../modelos/Registro')
const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')

//Función para crear un nuevo acto
const crearActo = async (req, res) => {

    const { nombre, idRegistro, tributosHonorarios } = req.body

    if (!nombre || nombre.length < 1 || nombre.length > 45 || !idRegistro || isNaN(idRegistro)
        || !tributosHonorarios) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    //Valida que tributos y honorarios vengan en formato JSON válido
    try {
        const json = JSON.parse(tributosHonorarios)
        console.log("2")
        if (Object.keys(json).length > 12 || Object.keys(json).length < 2) {
            throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
        }
    } catch (error) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    //Valida que id de registro para acto exista
    if ((await new Registro().buscarPorId(idRegistro))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'ID REGISTRO NO EXISTE')
    }

    const acto = new Acto()

    //Valida que nombre de acto no exista dentro de los acto para ese registro
    if ((await acto.buscarPorNombreIdRegistro(nombre, idRegistro))[0].length > 0) {
        throw new httpError(StatusCodes.CONFLICT, 'ACTO YA EXISTE PARA REGISTRO')
    }

    const resultado = await acto.crear(nombre, idRegistro, JSON.parse(tributosHonorarios))

    if ((resultado).affectedRows === 1) {
        res.status(StatusCodes.CREATED).json({
            mensaje: 'ACTO CREADO'
        })
    } else {
        throw new httpError(StatusCodes.CONFLICT, 'ACTO NO CREADO')
    }
}

//Función para obtener los actos de un registro en específico
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

//Función para obtener información de un acto en específico
const obtenerPorId = async (req, res) => {

    const { id } = req.params

    if (!id || isNaN(id)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const resultado = await new Acto().obtenerPorId(id)

    if (resultado) {
        res.status(StatusCodes.OK).json({
            mensaje: resultado
        })
    }
    else {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE ACTO')
    }
}

//Función para actualizar un acto
const actualizarActo = async (req, res) => {

    const { id } = req.params
    const { nombre, tributosHonorarios } = req.body

    if (!id || isNaN(id) || !nombre || nombre.length < 1 || nombre.length > 45 || !tributosHonorarios) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    //Valida que tributos y honorarios vengan en formato JSON válido
    try {
        const json = JSON.parse(tributosHonorarios)

        if (Object.keys(json).length > 12 || Object.keys(json).length < 2) {
            throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
        }
    } catch (error) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const acto = new Acto()

    const resultado = (await acto.obtenerPorId(id))

    if (!resultado) {
        throw new httpError(StatusCodes.NOT_FOUND, 'ACTO NO EXISTE')
    }

    const resultadoNombre = (await acto.buscarPorNombreIdRegistro(nombre, resultado['id_registro']))[0]

    //Valida que nombre de acto no exista dentro de los acto para ese registro
    if (resultadoNombre.length === 1 && resultado.id !== resultadoNombre[0].id) {
        throw new httpError(StatusCodes.CONFLICT, 'NOMBRE ACTO PARA REGISTRO YA EXISTE')
    }

    if ((await acto.actualizarPorId(id, nombre, JSON.parse(tributosHonorarios))).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'ACTO ACTUALIZADO'
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'ACTO NO ACTUALIZADO')
    }
}

//Función para eliminar un acto en específico
const eliminarActo = async (req, res) => {

    const { id } = req.params

    if (!id || isNaN(id)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const acto = new Acto()

    //Valida que el id de acto exista
    if (!(await acto.obtenerPorId(id))) {
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

//Función para realizar el cálculo de un acto específico
const calcularActo = async (req, res) => {

    const { id } = req.params
    const { montoConsulta } = req.body

    if (!id || isNaN(id) || !montoConsulta || isNaN(montoConsulta)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const acto = new Acto()

    //Valida que acto exista
    if (!await acto.obtenerPorId(id)) {
        throw new httpError(StatusCodes.NOT_FOUND, 'ACTO NO EXISTE')
    }

    res.status(StatusCodes.OK).json({
        mensaje: await acto.realizarCalculo(id, montoConsulta)
    })

}

module.exports = { crearActo, obtenerActosPorIdRegistro, obtenerPorId, calcularActo, actualizarActo, eliminarActo }