const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: "dbaws.cjmsgd7vdhsn.us-east-2.rds.amazonaws.com",
    user: "admin",
    password:"admin2021",
    database: "bdexam",
    port: "3306",
    multipleStatements: true
});

mysqlConnection.connect(function (err){
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('DB conectada');
    }
});

module.exports = mysqlConnection;