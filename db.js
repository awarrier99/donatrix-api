const mysql = require('mysql');
let connection;

if (!connection) {
    connection = mysql.createConnection({
        host: 'fugfonv8odxxolj8.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'zt9hkjepquxofwhk',
        password: 's8egkd5fxfaun44g',
        database: 'zrhtlmqmzwf9iv7r'
    });
    connection.connect();
}

module.exports = connection;
