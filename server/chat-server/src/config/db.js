const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "sreeraj",
    password: "12345",
    database: "chat_app",
})

module.exports = db;