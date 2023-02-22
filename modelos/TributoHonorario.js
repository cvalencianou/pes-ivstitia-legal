const { executePreparedStatement } = require('../utilidades/baseDeDatos')

class Tributo {

    id
    registro
    agrario
    fiscal
    archivo
    abogado
    municipal
    traspaso
    honorarios
    idActo

    realizarCalculos = async (acto, montoConsulta) => {

        const tributosHonorarios = await executePreparedStatement('CALL tributos_honorarios_obtener_por_id_acto(?)', [acto])
        const honorarios = await this.calcularHonorarios(montoConsulta, tributosHonorarios[0][0].honorarios)

        return {
            registro: (montoConsulta / 1000) * tributosHonorarios[0][0].registro,
            agrario: (montoConsulta / 1000) * tributosHonorarios[0][0].agrario,
            fiscal: await this.calcularTimbreFiscal(montoConsulta, tributosHonorarios[0][0].fiscal),
            archivo: await this.calcularTimbreArchivo(montoConsulta, tributosHonorarios[0][0].archivo),
            abogado: await this.calcularTimbreAbogado(montoConsulta, tributosHonorarios[0][0].abogado),
            municipal: (montoConsulta / 1000) * tributosHonorarios[0][0].municipal,
            traspaso: (tributosHonorarios[0][0].traspaso * montoConsulta) / 100,
            honorarios: honorarios > 60500 ? honorarios : 60500
        }
    }

    calcularHonorarios = async (montoConsulta, honorarios) => {
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

    calcularTimbreFiscal = async (montoConsulta, timbreFiscal) => {

        for (let index = 0; index < timbreFiscal.length; index++) {

            if (montoConsulta <= timbreFiscal[index].hasta) {
                return timbreFiscal[index].monto
            }
            if (index === timbreFiscal.length - 1) {
                return timbreFiscal[index].monto
            }
        }
    }

    calcularTimbreArchivo = async (montoConsulta, timbreArchivo) => {

        for (let index = 0; index < timbreArchivo.length; index++) {

            if (montoConsulta <= timbreArchivo[index].hasta) {
                return timbreArchivo[index].monto
            }
            if (index === timbreArchivo.length - 1) {
                return timbreArchivo[index].monto
            }
        }
    }

    calcularTimbreAbogado = async (montoConsulta, timbreAbogado) => {

        for (let index = 0; index < timbreAbogado.length; index++) {

            if (montoConsulta <= timbreAbogado[index].hasta) {
                return timbreAbogado[index].monto
            }
            if (index === timbreAbogado.length - 1) {
                return timbreAbogado[index].monto
            }
        }
    }

}

module.exports = Tributo