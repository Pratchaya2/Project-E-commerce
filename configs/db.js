const mysql = require("mysql2/promise");
const {DB_HOST,DB_USER,DB_PASSWORD,DB_NAME,DB_PORT} = require("./env");

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT || 3306
});

module.exports = pool;