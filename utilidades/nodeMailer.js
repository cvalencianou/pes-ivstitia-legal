const nodeMailer = require('nodemailer')

//Función para enviar correo
const enviarCorreo = async (data) => {

    //Se crea instancia para enviar correo
    const transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        tls: {
            ciphers: "SSLv3",
            rejectUnauthorized: false
        },
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })

    //Se envía correo a partir de la instancia
    transporter.sendMail(data, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = { enviarCorreo }