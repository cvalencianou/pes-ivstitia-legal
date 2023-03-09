const express = require('express')
const router = express.Router()
//Importa middleware autenticación
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')
//Importa controladores para que sean manejados por endpoints
const { crearRegistro, obtenerRegistros, actualizarRegistro, eliminarRegistro } = require('../controladores/registros')

//Rutas de actos hacia controladores, sew verifica rol de administrador para algunas y en todas se valida token JWT válido
router.post('/', verificarJWT, verificarAdministrador, crearRegistro)
router.get('/', verificarJWT, obtenerRegistros)
router.put('/:id', verificarJWT, verificarAdministrador, actualizarRegistro)
router.delete('/:id', verificarJWT, verificarAdministrador, eliminarRegistro)

module.exports = router