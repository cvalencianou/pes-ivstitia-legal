const express = require('express')
const router = express.Router()
const { verificarJWT } = require('../middleware/autenticacion')
const { obtenerClientes, filtrarClientes, crearCliente, actualizarCliente, eliminarCliente } = require('../controladores/clientes')

router.get('/', verificarJWT, obtenerClientes)
router.get('/filtro', verificarJWT, filtrarClientes)
router.post('/', verificarJWT, crearCliente)
router.put('/', verificarJWT, actualizarCliente)
router.delete('/', verificarJWT, eliminarCliente)


module.exports = router
