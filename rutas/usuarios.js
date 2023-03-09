const express = require('express')
const router = express.Router()
//Importa controladores para que sean manejados por endpoints
const { crearUsuario, iniciarSesion, cerrarSesion, obtenerUsuarios, actualizarUsuario, restablecerContrasena, cambiarContrasena, eliminarUsuario } = require('../controladores/usuarios')
//Importa middleware autenticación
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')

//Rutas de actos hacia controladores, sew verifica rol de administrador para algunas y en todas se valida token JWT válido
router.post('/auth', iniciarSesion)
router.get('/auth', cerrarSesion)
router.post('/auth/restablecer', restablecerContrasena)
router.put('/auth', cambiarContrasena)
router.get('/', verificarJWT, verificarAdministrador, obtenerUsuarios)
router.post('/', verificarJWT, verificarAdministrador, crearUsuario)
router.put('/:id', verificarJWT, verificarAdministrador, actualizarUsuario)
router.delete('/:id', verificarJWT, verificarAdministrador, eliminarUsuario)

module.exports = router