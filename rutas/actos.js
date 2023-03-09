const express = require('express')
const router = express.Router()
//Importa middleware autenticación
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')
//Importa controladores para que sean manejados por endpoints
const { crearActo, obtenerActosPorIdRegistro, calcularActo, actualizarActo, eliminarActo, obtenerPorId } = require('../controladores/actos')

//Rutas de actos hacia controladores, sew verifica rol de administrador para algunas y en todas se valida token JWT válido
router.post('/calculo/:id', calcularActo)
router.post('/', verificarJWT, verificarAdministrador, crearActo)
router.get('/:id', verificarJWT, obtenerPorId)
router.get('/registro/:idRegistro', verificarJWT, obtenerActosPorIdRegistro)
router.put('/:id', verificarJWT, verificarAdministrador, actualizarActo)
router.delete('/:id', verificarJWT, verificarAdministrador, eliminarActo)

module.exports = router