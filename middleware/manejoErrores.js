//Función para el manejo de errores generador dentro de la aplicación
const manejoErrores = async (err, req, res, next) => {

    console.log(err)

    if (err.statusCode) {
        res.status(err.statusCode).json({
            mensaje: err.message
        })
    }
    else {
        res.status(500).json({ mensaje: 'ERROR INESPERADO' })
    }
}

module.exports = manejoErrores 