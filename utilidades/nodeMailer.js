const nodeMailer = require('nodemailer')

const enviarCorreo = async (data) => {

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

    transporter.sendMail(data, (err) => {
        if (err) {
            console.log(err)
        }
    })
}

module.exports = { enviarCorreo }