const mysql2 = require('mysql2/promise')

const executePreparedStatement = async (preparedStatement, values) => {

    const connection = await mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME

    })

    const [result] = await connection.execute(preparedStatement, values)

    connection.end()

    return result
}

module.exports = { executePreparedStatement }