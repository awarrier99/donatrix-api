const db = require('./db');
const UserType = require('./UserType');

module.exports.registerUser = (req, res) => {
    const { email, password, locked, name, type } = req.body;
    db.query(`INSERT INTO users (email, password, locked, name) VALUES ('${email}', '${password}', '${locked}', '${name}');`, err => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
    });
    if (type !== UserType.USER) {
        const table = `${type.toLowerCase()}s`;
        db.query(`INSERT INTO ${table} (email, password) VALUES ('${email}', '${password}');`, err => {
            if (err) {
                return res.json({
                    success: false,
                    msg: err.message
                });
            }
            console.log('1 user inserted');
            return res.json({
               success: true,
            });
        });
    }
};

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`, (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        if (result) {
            console.log('Logged in');
            return res.json({
                success: true
            });
        }
    });
};
