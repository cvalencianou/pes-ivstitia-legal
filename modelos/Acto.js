const { executePreparedStatement } = require('../utilidades/baseDeDatos')
const TributosHonorarios = require('./TributosHonorarios')

//Clase de acto con atributos y métodos identicos a tablas y procedimientos en SQL
class Acto {

    id
    nombre
    idRegistro

    crear = async (nombre, idRegistro, tributosHonorarios) => {
        //Crea el acto
        const acto = (await executePreparedStatement('CALL actos_crear(?,?)',
            [nombre, idRegistro]))[0][0]
        //Crea tributos y honorarios con el ID del acto creado
        return await new TributosHonorarios()
            .crearPorIdActo(acto['LAST_INSERT_ID()'], tributosHonorarios)
    }

    obtenerTodosPorIdRegistro = async (idRegistro) => {
        return await executePreparedStatement('CALL actos_obtener_por_id_registro(?)', [idRegistro])
    }

    obtenerPorId = async (id) => {

        const tributosHonorarios = (await new TributosHonorarios().obtenerPorIdActo(id))[0][0]
        const acto = (await executePreparedStatement('CALL actos_obtener_por_id(?)', [id]))[0][0]
        //Agrega objeto de tributos y honorarios al objeto de actos
        acto['tributosHonorarios'] = tributosHonorarios

        return acto
    }

    actualizarPorId = async (id, nombre, tributosHonorarios) => {
        //Actualiza montos de tributos y honorarios
        await new TributosHonorarios().actualizarPorIdActo(id, tributosHonorarios)
        //Actualiza datos de acto en tabla
        return await executePreparedStatement('CALL actos_actualizar_por_id(?,?)', [id, nombre])
    }

    eliminarPorId = async (id) => {
        //Elimina tributos y honorarios
        await new TributosHonorarios().eliminarPorIdActo(id)
        //Elimina acto sin ningún constraint
        return await executePreparedStatement('CALL actos_eliminar_por_id(?)', [id])
    }

    buscarPorNombreIdRegistro = async (nombre, idRegistro) => {
        return await executePreparedStatement('CALL actos_buscar_por_nombre_id_registro(?,?)', [nombre, idRegistro])
    }

    //Método para realizar cálculo
    realizarCalculo = async (id, montoConsulta) => {

        const tributosHonorarios = (await new TributosHonorarios().obtenerPorIdActo(id))[0][0]

        let respuesta = {}

        //Se obtienen montos de tributos y honorarios para realizar cálculos de montos
        respuesta['registro'] = Number(await this.calcularRegistro(montoConsulta, tributosHonorarios.registro))
        respuesta['agrario'] = Number(await this.calcularAgrario(montoConsulta, tributosHonorarios.agrario))
        respuesta['fiscal'] = Number(await this.calcularFiscal(montoConsulta, tributosHonorarios.fiscal))
        respuesta['archivo'] = Number(await this.calcularArchivo(montoConsulta, tributosHonorarios.archivo))
        respuesta['abogado'] = Number(await this.calcularAbogado(montoConsulta, tributosHonorarios.abogado))
        respuesta['municipal'] = Number(await this.calcularMunicipal(montoConsulta, tributosHonorarios.municipal))
        respuesta['parquesNacionales'] = Number(await this.calcularParquesNacionales(tributosHonorarios['parques_nacionales']))
        respuesta['faunaSilvestre'] = Number(await this.calcularFaunaSilvestre(tributosHonorarios['fauna_silvestre']))
        respuesta['cruzRoja'] = Number(await this.calcularCruzRoja(tributosHonorarios['cruz_roja']))
        respuesta['traspaso'] = Number(await this.calcularTraspaso(montoConsulta, tributosHonorarios.traspaso))
        respuesta['honorarios'] = Number(await this.calcularHonorarios(montoConsulta, tributosHonorarios.honorarios))
        respuesta['adicionalPlacas'] = Number(await this.calcularAdicionalPlacas(tributosHonorarios['adicional_placas']))

        respuesta['totalTributos'] = Number(((respuesta['registro'] || 0) + (respuesta['fiscal'] || 0)
            + (respuesta['archivo'] || 0) + (respuesta['abogado'] || 0) + (respuesta['municipal'] || 0)
            + (respuesta['parquesNacionales'] || 0) + (respuesta['faunaSilvestre'] || 0) + (respuesta['cruzRoja'] || 0)
            + (respuesta['adicionalPlacas'] || 0) + (respuesta['agrario'] || 0) + (respuesta['traspaso'] || 0)))

        respuesta['totalHonorarios'] = Number(respuesta['honorarios'])
        respuesta['totalHonorariosConIVA'] = (respuesta['honorarios'] * 1.13)

        respuesta['total'] = respuesta['totalTributos'] + respuesta['totalHonorariosConIVA']

        //Eliminar tributos u honorarios si montos son 0 o nulos
        for (const valor in respuesta) {
            if (!respuesta[valor]) {
                delete respuesta[valor]
            }
        }

        return respuesta
    }

    //Método para calcular timbre de registro
    calcularRegistro = async (montoConsulta, timbre) => {
        if (!timbre) {
            return 0
        }

        const monto = (montoConsulta / 1000) * timbre

        if (monto < 2000) {
            return 2000
        }
        else {
            return (montoConsulta / 1000) * timbre
        }
    }

    //Método para calcular timbre agrario
    calcularAgrario = async (montoConsulta, timbre) => {

        return (montoConsulta / 1000) * timbre
    }

    //Método para calcular timbre fiscal
    calcularFiscal = async (montoConsulta, timbre) => {

        if (!timbre) {
            return 0
        }

        for (let index = 0; index < timbre.length; index++) {

            if (montoConsulta <= timbre[index].hasta) {
                return timbre[index].monto
            }
            if (index === timbre.length - 1) {
                return timbre[index].monto
            }
        }
    }

    //Método para calcular timbre de archivo
    calcularArchivo = async (montoConsulta, timbre) => {

        if (!timbre) {
            return 0
        }

        for (let index = 0; index < timbre.length; index++) {

            if (montoConsulta <= timbre[index].hasta) {
                return timbre[index].monto
            }
            if (index === timbre.length - 1) {
                return timbre[index].monto
            }
        }
    }

    //Método para calcular timbre de abogado
    calcularAbogado = async (montoConsulta, timbre) => {

        if (!timbre) {
            return 0
        }

        for (let index = 0; index < timbre.length; index++) {

            if (montoConsulta <= timbre[index].hasta) {
                return timbre[index].monto
            }
            if (index === timbre.length - 1) {
                return timbre[index].monto
            }
        }
    }

    //Método para calcular timbre municipal
    calcularMunicipal = async (montoConsulta, timbre) => {
        return (montoConsulta / 1000) * timbre
    }

    //Método para calcular timbre de parques nacionales
    calcularParquesNacionales = async (timbre) => {
        return timbre
    }

    //Método para calcular timbre de fauna silvestre
    calcularFaunaSilvestre = async (timbre) => {
        return timbre
    }

    //Método para calcular timbre de cruz roja
    calcularCruzRoja = async (timbre) => {
        return timbre
    }

    //Método para calcular impuesto de traspaso
    calcularTraspaso = async (montoConsulta, porcentaje) => {
        return (porcentaje * montoConsulta) / 100
    }

    //Método para calcular honorarios
    calcularHonorarios = async (montoConsulta, honorario) => {

        if (!honorario) {
            return 0
        }

        let totalHonorarios = 0
        let contador = 1

        do {
            if (contador === 1) {
                if (montoConsulta <= Number(honorario[contador].monto)) {
                    totalHonorarios = (honorario[contador].porcentaje * montoConsulta) / 100
                    break
                } else {
                    totalHonorarios += (honorario[contador].porcentaje * honorario[contador].monto) / 100
                }
            }
            else {
                if (contador === 4) {
                    totalHonorarios += honorario[contador].porcentaje * (montoConsulta - honorario[contador - 1].monto) / 100
                    break
                }
                else if (montoConsulta > honorario[contador].monto) {
                    totalHonorarios += honorario[contador].porcentaje * (honorario[contador].monto - honorario[contador - 1].monto) / 100
                } else {
                    totalHonorarios += honorario[contador].porcentaje * (montoConsulta - (honorario[contador - 1].monto)) / 100
                    break
                }
            }
            contador++
        } while (montoConsulta - honorario[contador - 1].monto > 0)

        if (honorario[5]) {

            const cancelacion = (totalHonorarios * honorario[5].porcentaje)

            return cancelacion > 60500 ? cancelacion : 60500
        }

        return totalHonorarios > 60500 ? totalHonorarios : 60500
    }

    //Método para calcular adicional placas
    calcularAdicionalPlacas = async (monto) => {
        return monto
    }
}

module.exports = Acto