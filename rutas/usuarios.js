const express = require('express')
const router = express.Router()
const { crearUsuario, iniciarSesion, cerrarSesion, obtenerUsuarios, actualizarUsuario, restablecerContrasena, cambiarContrasena, eliminarUsuario } = require('../controladores/usuarios')
const { verificarJWT, verificarAdministrador } = require('../middleware/autenticacion')

//RUTAS USUARIO AUTH
router.post('/auth', iniciarSesion)
router.get('/auth', cerrarSesion)
router.post('/auth/restablecer', restablecerContrasena)
router.put('/auth', cambiarContrasena)
//RUTAS SOLO ADMINISTRADOR
router.get('/', verificarJWT, verificarAdministrador, obtenerUsuarios)
router.post('/', verificarJWT, verificarAdministrador, crearUsuario)
router.put('/:id', verificarJWT, verificarAdministrador, actualizarUsuario)
router.delete('/:id', verificarJWT, verificarAdministrador, eliminarUsuario)

module.exports = router