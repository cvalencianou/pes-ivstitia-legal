const express = require('express')
const router = express.Router()
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')
const { obtenerRegistros, obtenerActosPorIdRegistro, realizarCalculo } = require('../controladores/calculos')

router.get('/registros', verificarJWT, obtenerRegistros)
router.get('/actos/registro/:id', obtenerActosPorIdRegistro)
router.post('/:acto', realizarCalculo)

module.exports = router