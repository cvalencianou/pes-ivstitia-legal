const express = require('express')
const router = express.Router()
const { verificarJWT } = require('../middleware/autenticacion')
const { obtenerCasos, crearCaso, filtrarCasos, actualizarCaso, eliminarCaso, obtenerCaso, agregarNota, agregarCliente,eliminarNota, eliminarCliente } = require('../controladores/casos')

router.get('/', verificarJWT, obtenerCasos)
router.get('/filtro', verificarJWT, filtrarCasos)
router.get('/:casoId', verificarJWT, obtenerCaso)
router.post('/', verificarJWT, crearCaso)
router.post('/:casoId', verificarJWT, agregarNota)
router.post('/cliente/:casoId', verificarJWT, agregarCliente)
router.put('/:casoId', verificarJWT, actualizarCaso)
router.delete('/:casoId', verificarJWT, eliminarCaso)
router.delete('/:casoId/:notaId', verificarJWT, eliminarNota)
router.delete('/cliente/:casoId/:clienteId', verificarJWT, eliminarCliente)

module.exports = router
