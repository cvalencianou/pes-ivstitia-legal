const crearJWT = async (payload) => { }

const verificarJWT = async (req, res, next) => {
    req.user = {
        id: 1
    }
    next()
}

const verificarAdmin = async (req, res, next) => {
    next()
}

module.exports = { crearJWT, verificarJWT, verificarAdmin }