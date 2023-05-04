const express = require('express')
const router = express.Router()
const { verificarJWT } = require('../middleware/autenticacion')
const { obtenerClientes, obtenerCliente, filtrarClientes, crearCliente, actualizarCliente, eliminarCliente, obtenerClientesPorCasoId } = require('../controladores/clientes')

router.get('/', verificarJWT, obtenerClientes)
router.get('/filtro', verificarJWT, filtrarClientes)
router.get('/:clienteId', verificarJWT, obtenerCliente)
router.get('/caso/:casoId', verificarJWT, obtenerClientesPorCasoId)
router.post('/', verificarJWT, crearCliente)
router.put('/:clienteId', verificarJWT, actualizarCliente)
router.delete('/:clienteId', verificarJWT, eliminarCliente)


module.exports = router
