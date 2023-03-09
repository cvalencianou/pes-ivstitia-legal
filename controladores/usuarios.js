const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const bcrypt = require('bcrypt')
const Usuario = require('../modelos/Usuario')
const { crearJWT } = require('../middleware/autenticacion')
const generator = require('generate-password')
const { enviarCorreo } = require('../utilidades/nodeMailer')

//Función para crear un nuevo usuario
const crearUsuario = async (req, res) => {

    const { correo } = req.body

    if (!correo || correo.length < 4 || correo.length > 45
        || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const usuario = new Usuario()
    //Se valida que correo electrónico no esté en uso
    if ((await usuario.buscarPorCorreo(correo))[0].length === 1) {
        throw new httpError(StatusCodes.CONFLICT, 'USUARIO YA EXISTE')
    }

    const contrasena = generator.generate({
        length: 10,
        numbers: true
    })
    
    //Registra usuario con contraseña autogenerada y la encripta
    if ((await usuario.registrar(correo, await bcrypt.hash(contrasena, Number(process.env.BCRYPT_SALT_ROUNDS)))).affectedRows === 1) {

        res.status(StatusCodes.CREATED).json({
            mensaje: `USUARIO CREADO`
        })

        //Envío de correo con nuevas credenciales de usuario
        enviarCorreo({
            from: `IvstitiaLegal <${process.env.EMAIL_USER}>`,
            to: `Nuevo Usuario <${correo}>`,
            subject: 'Nuevo Usuario IvstitiaLegal',
            html:
                `
            <h1>Bienvenido a IvstitiaLegal</h1>
            <p>Sus credenciales son:</p>
            <p>Correo electrónico: <b>${correo}</b></p>
            <p>Contraseña temporal: <b>${contrasena}</b></p>
            <p>Ingrese a través del siguiente enlace: <a href="${process.env.APP_LINK}">Ir a IvstitiaLegal</a></p>
            `
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'USUARIO NO CREADO')
    }
}

//Función para el inicio de sesión
const iniciarSesion = async (req, res) => {

    const { correo, contrasena } = req.body

    if (!correo || !contrasena || correo.length < 4 || correo.length > 45 || contrasena.length < 8
        || contrasena.length > 60 || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const usuario = new Usuario()

    //Se llama función de modelo para validar credenciales
    const resultado = await usuario.validarCredenciales(correo)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE USUARIO')
    }
    
    //Se compara contraseña almacenada con contraseña brindada
    if (!await bcrypt.compare(contrasena, resultado[0][0]['contrasena'])) {
        throw new httpError(StatusCodes.UNAUTHORIZED, 'CREDENCIALES INCORRECTAS')
    }

    if (resultado[0][0]['contrasena_configurada'] === 0) {
        return res.status(StatusCodes.TEMPORARY_REDIRECT).json({
            mensaje: 'DEBE CAMBIAR CONTRASEÑA'
        })
    }
    else {
        // Se genera cookie segura con token JWT dentro
        res.cookie('jwt',
            await crearJWT({
                id: resultado[0][0].id,
                administrador: resultado[0][0]['administrador']
            }),
            {
                httpOnly: true,
                secure: true,
                sameSite: true,
                signed: true
            })

        res.status(StatusCodes.OK).json({
            mensaje: 'CREDENCIALES CORRECTAS',
            autenticado: true,
            administrador: resultado[0][0]['administrador']
        })
    }
}

//Función para cerrar sesión y limpiar cookie lado del cliente
const cerrarSesion = async (req, res) => {

    res.clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: true,
        signed: true
    })

    res.status(StatusCodes.OK).json({
        mensaje: 'CERRÓ SESIÓN'
    })
}

//Función para obtener lista de usuarios por administradores
const obtenerUsuarios = async (req, res) => {

    const resultado = await new Usuario().obtenerTodos()

    if (resultado[0].length > 0) {
        res.status(StatusCodes.OK).json({
            mensaje: resultado[0]
        })
    } else {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO HAY USUARIOS')
    }
}

//Función para actualizar un usuario por administradores
const actualizarUsuario = async (req, res) => {

    const id = req.params.id
    const { correo, administrador } = req.body

    if (!id || !correo || administrador < 0 || administrador > 1 || correo.length < 4 || correo.length > 45
        || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/) || isNaN(id) || isNaN(administrador)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const usuario = new Usuario()

    //Valida que usuario exista antes de actualizar
    if ((await usuario.buscarPorId(id))[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE USUARIO')
    }

    const resultado = await usuario.buscarPorCorreo(correo)

    //Valida que correo actualizado no esté utilizado
    if (resultado[0].length === 1 && resultado[0][0]['id'] !== Number(id)) {
        throw new httpError(StatusCodes.CONFLICT, 'CORREO YA ESTÁ EN USO')
    }


    if ((await usuario.actualizar(id, correo, administrador)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: "USUARIO ACTUALIZADO"
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'USUARIO NO ACTUALIZADO')
    }
}

//Función para solicitud de restablecimiento de contraseña
const restablecerContrasena = async (req, res) => {

    const { correo } = req.body

    if (!correo || correo.length < 4 || correo.length > 45 || !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const usuario = new Usuario()

    const resultado = await usuario.buscarPorCorreo(correo)
    //Valida que usuario exista
    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE USUARIO')
    }

    const contrasena = generator.generate({
        length: 10,
        numbers: true
    })
    //Establece un nueva contraseña temporal encriptada para el usuario
    if ((await usuario.restablecerContrasena(resultado[0][0]['id'], await bcrypt.hash(contrasena, Number(process.env.BCRYPT_SALT_ROUNDS)))).affectedRows === 1) {

        res.status(StatusCodes.OK).json({
            mensaje: `CREDENCIALES RECUPERADAS`
        })
        //Envía correo con credenciales temporales
        enviarCorreo({
            from: `IvstitiaLegal <${process.env.EMAIL_USER}>`,
            to: `Usuario <${correo}>`,
            subject: 'Recuperación de Credenciales IvstitiaLegal',
            html:
                `
            <h1>Sus credenciales han sido recuperadas</h1>
            <p>Sus credenciales son:</p>
            <p>Correo electrónico: <b>${correo}</b></p>
            <p>Contraseña temporal: <b>${contrasena}</b></p>
            <p>Ingrese a través del siguiente enlace: <a href="${process.env.APP_LINK}">Ir a IvstitiaLegal</a></p>
            `
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'CREDENCIALES NO RECUPERADAS')
    }
}

//Función para cambiar a una contraseña nueva después de haberla restablecido para recuperación
const cambiarContrasena = async (req, res) => {

    const { correo, contrasenaActual, contrasenaNueva } = req.body

    if (!correo || !contrasenaActual || !contrasenaNueva || correo.length < 4 || correo.length > 45 ||
        !correo.match(/[^\s@]+@[^\s@]+\.[^\s@]+/) || contrasenaActual.length < 8 || contrasenaActual.length > 60
        || contrasenaNueva.length < 8 || contrasenaNueva > 60) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const usuario = new Usuario()

    const resultado = await usuario.validarCredenciales(correo)

    if (resultado[0].length === 0) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE USUARIO')
    }
    //Valida que contraseña temporal almacenada sea correcta
    if (!await bcrypt.compare(contrasenaActual, resultado[0][0]['contrasena'])) {
        throw new httpError(StatusCodes.UNAUTHORIZED, 'CREDENCIALES INCORRECTAS')
    }

    //Cambia a la contraseña nueva y la encripta
    if ((await usuario.cambiarContrasena(resultado[0][0]['id'], await bcrypt.hash(contrasenaNueva, Number(process.env.BCRYPT_SALT_ROUNDS)))).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'CONTRASEÑA CAMBIADA'
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'CONTRASEÑA NO CAMBIADA')
    }
}

//Función para eliminar un usuario
const eliminarUsuario = async (req, res) => {

    const { id } = req.params

    if (!id || isNaN(id)) {
        throw new httpError(StatusCodes.BAD_REQUEST, 'POR FAVOR BRINDAR VALORES VÁLIDOS')
    }

    const usuario = new Usuario()
    
    //Valida que el id de usuario a eliminar exista
    if ((await usuario.buscarPorId(id))[0].length !== 1) {
        throw new httpError(StatusCodes.NOT_FOUND, 'NO EXISTE USUARIO')
    }

    if ((await usuario.eliminarPorId(id)).affectedRows === 1) {
        res.status(StatusCodes.OK).json({
            mensaje: 'USUARIO ELIMINADO'
        })
    }
    else {
        throw new httpError(StatusCodes.CONFLICT, 'USUARIO NO ELIMINADO')
    }
}

module.exports = { crearUsuario, iniciarSesion, cerrarSesion, obtenerUsuarios, actualizarUsuario, restablecerContrasena, cambiarContrasena, eliminarUsuario }