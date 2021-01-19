var mysql = require('mysql');
const dbConfig = require('./config/db.config');

const connection = mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("mysql connected");
})

module.exports = connection;