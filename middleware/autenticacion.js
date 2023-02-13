const httpError = require('http-errors')
const { StatusCodes } = require('http-status-codes')
const jsonwebtoken = require('jsonwebtoken')
const Usuario = require('../modelos/Usuario')

const crearJWT = async (payload) => {

    return jsonwebtoken.sign(payload, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME,
            issuer: process.env.JWT_ISSUER
        })
}

const verificarJWT = async (req, res, next) => {

    if (!req.signedCookies.jwt) {
        throw new httpError(StatusCodes.UNAUTHORIZED, 'JWT NO VÁLIDO')
    }

    jsonwebtoken.verify(req.signedCookies.jwt, process.env.JWT_SECRET, (err, decoded) => {
        if (decoded) {
            req.user = {
                id: decoded.id,
                administrador: decoded.administrador
            }
            next()
        } else {
            throw new httpError(StatusCodes.UNAUTHORIZED, 'JWT NO VÁLIDO')
        }
    })
}

const verificarAdministrador = async (req, res, next) => {

    const usuario = new Usuario()

    if ((await usuario.verificarAdministrador(req.user.id))[0][0]['administrador'] === 1 && req.user['administrador'] === 1) {
        next()
    } else {
        throw new httpError(StatusCodes.UNAUTHORIZED, 'SOLO ADMINISTRADORES')
    }
}

module.exports = { crearJWT, verificarJWT, verificarAdministrador }