const mysql2 = require('mysql2/promise')

//Función para ejecutar Prepared Statements
const executePreparedStatement = async (preparedStatement, values) => {

    //Se obtiene objeto de conexión a base de datos
    const connection = await mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME

    })

    //Se ejecuta llamado a la base de datos
    const [result] = await connection.execute(preparedStatement, values)

    //Se cierra conexión
    connection.end()

    return result
}

module.exports = { executePreparedStatement }