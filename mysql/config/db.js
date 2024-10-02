const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"Chandu@12345",
    database:"students_db"
})

module.exports = mysqlPool;