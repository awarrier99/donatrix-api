const mysql = require('mysql');
let connection;

if (!connection) {
    connection = mysql.createConnection({
        host: 'industrychallenge.cdzkywzuhila.us-east-1.rds.amazonaws.com',
        user: 'davpoole1',
        password: 'password',
        database: 'industryChallenge'
    });
    connection.connect();
}

module.exports = connection;
