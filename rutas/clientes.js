const express = require('express')
const router = express.Router()
const { verificarJWT } = require('../middleware/autenticacion')
const { obtenerClientes, obtenerCliente, filtrarClientes, crearCliente, actualizarCliente, eliminarCliente } = require('../controladores/clientes')

router.get('/', verificarJWT, obtenerClientes)
router.get('/:clienteId', verificarJWT, obtenerCliente)
router.get('/filtro', verificarJWT, filtrarClientes)
router.post('/', verificarJWT, crearCliente)
router.put('/:clienteId', verificarJWT, actualizarCliente)
router.delete('/:clienteId', verificarJWT, eliminarCliente)


module.exports = router
