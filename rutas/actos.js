const express = require('express')
const router = express.Router()
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')
const { crearActo, obtenerActosPorIdRegistro, calcularActo, actualizarActo, eliminarActo, obtenerPorId } = require('../controladores/actos')

router.post('/calculo/:id', calcularActo)
router.post('/', verificarJWT, verificarAdministrador, crearActo)
router.get('/:id', verificarJWT, obtenerPorId)
router.get('/registro/:id', verificarJWT, obtenerActosPorIdRegistro)
router.put('/:id', verificarJWT, verificarAdministrador, actualizarActo)
router.delete('/:id', verificarJWT, verificarAdministrador, eliminarActo)

module.exports = router