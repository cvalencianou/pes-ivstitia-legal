const express = require('express')
const router = express.Router()
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')
const { obtenerRegistros, obtenerActos } = require('../controladores/calculos')

router.get('/registros', verificarJWT, obtenerRegistros)
router.get('/actos', verificarJWT, obtenerActos)

module.exports = router