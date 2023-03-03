const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Acto {

    id
    nombre

    crear = async (nombre, id, objetoTributosHonorarios) => {
        return await executePreparedStatement('CALL actos_crear(?,?,?)', [nombre, id, objetoTributosHonorarios])
    }

    obtenerTodosPorIdRegistro = async (id) => {
        return await executePreparedStatement('CALL actos_obtener_por_id_registro(?)', [id])
    }

    obtenerPorId = async (id) => {
        return await executePreparedStatement('CALL actos_obtener_por_id(?)', [id])
    }

    actualizarPorId = async (id, nombre, tributosGeneral) => {
        return await executePreparedStatement('CALL actos_actualizar_por_id(?,?,?)', [id, nombre, tributosGeneral])
    }

    eliminarPorId = async (id) => {
        return await executePreparedStatement('CALL actos_eliminar_por_id(?)', [id])
    }

    buscarPorNombreIdRegistro = async (nombre, idRegistro) => {
        return await executePreparedStatement('CALL actos_buscar_por_nombre_id_registro(?,?)', [nombre, idRegistro])
    }

    realizarCalculo = async (acto, montoConsulta) => {

        const tributosHonorarios = (await executePreparedStatement('CALL actos_obtener_tributos(?)', [acto]))[0][0]['tributos_general']

        let respuesta = {}

        respuesta['registro'] = Number(await this.calcularRegistro(montoConsulta, tributosHonorarios.registro))
        respuesta['agrario'] = Number(await this.calcularAgrario(montoConsulta, tributosHonorarios.agrario))
        respuesta['fiscal'] = Number(await this.calcularFiscal(montoConsulta, tributosHonorarios.fiscal))
        respuesta['archivo'] = Number(await this.calcularArchivo(montoConsulta, tributosHonorarios.archivo))
        respuesta['abogado'] = Number(await this.calcularAbogado(montoConsulta, tributosHonorarios.abogado))
        respuesta['municipal'] = Number(await this.calcularMunicipal(montoConsulta, tributosHonorarios.municipal))
        respuesta['parquesNacionales'] = Number(await this.calcularParquesNacionales(montoConsulta, tributosHonorarios.parquesNacionales))
        respuesta['faunaSilvestre'] = Number(await this.calcularFaunaSilvestre(montoConsulta, tributosHonorarios.faunaSilvestre))
        respuesta['cruzRoja'] = Number(await this.calcularCruzRoja(montoConsulta, tributosHonorarios.cruzRoja))
        respuesta['traspaso'] = Number(await this.calcularTraspaso(montoConsulta, tributosHonorarios.traspaso))
        respuesta['honorarios'] = Number(await this.calcularHonorarios(montoConsulta, tributosHonorarios.honorarios))
        respuesta['adicionalPlacas'] = Number(await this.calcularAdicionalPlacas(montoConsulta, tributosHonorarios.adicionalPlacas))

        respuesta['timbresSinDescuento'] = Number(((respuesta['registro'] || 0) + (respuesta['fiscal'] || 0)
            + (respuesta['archivo'] || 0) + (respuesta['abogado'] || 0) + (respuesta['municipal'] || 0)
            + (respuesta['parquesNacionales'] || 0) + (respuesta['faunaSilvestre'] || 0) + (respuesta['cruzRoja'] || 0)
            + (respuesta['adicionalPlacas'] || 0) + (respuesta['agrario'] || 0)))

        respuesta['timbresConDescuento'] = Number(((respuesta['registro'] || 0) + (respuesta['fiscal'] || 0)
            + (respuesta['archivo'] || 0) + (respuesta['abogado'] || 0) + (respuesta['municipal'] || 0)
            + (respuesta['parquesNacionales'] || 0) + (respuesta['faunaSilvestre'] || 0) + (respuesta['cruzRoja'] || 0)
            + (respuesta['adicionalPlacas'] || 0)))

        respuesta['totalTributos'] = Number((respuesta['timbresSinDescuento'] + (respuesta['traspaso'] || 0)))

        respuesta['totalTributosConDescuento'] = Number((respuesta['timbresSinDescuento'] -
            (respuesta['timbresConDescuento'] * 0.06) + (respuesta['traspaso'] || 0)))

        respuesta['totalHonorarios'] = Number(respuesta['honorarios'])
        respuesta['totalHonorariosConIVA'] = (respuesta['honorarios'] * 1.13)

        for (const valor in respuesta) {
            if (!respuesta[valor]) {
                delete respuesta[valor]
            }
        }

        return respuesta
    }

    calcularRegistro = async (montoConsulta, timbre) => {

        const monto = (montoConsulta / 1000) * timbre

        if (monto < 2000) {
            return 2000
        }
        else {
            return (montoConsulta / 1000) * timbre
        }
    }

    calcularAgrario = async (montoConsulta, timbre) => {

        return (montoConsulta / 1000) * timbre
    }

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

    calcularMunicipal = async (montoConsulta, timbre) => {
        return (montoConsulta / 1000) * timbre
    }

    calcularParquesNacionales = async (montoConsulta, timbre) => {
        return timbre
    }

    calcularFaunaSilvestre = async (montoConsulta, timbre) => {
        return timbre
    }

    calcularCruzRoja = async (montoConsulta, timbre) => {
        return timbre
    }

    calcularTraspaso = async (montoConsulta, porcentaje) => {
        return (porcentaje * montoConsulta) / 100
    }

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

    calcularAdicionalPlacas = async (montoConsulta, monto) => {
        return monto
    }
}

module.exports = Acto