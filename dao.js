const db = require('./db');
const UserType = require('./UserType');

module.exports.registerUser = (req, res) => {
    const { email, password, locked, name, type } = req.body;
    let loc_id = null;
    const loc = type === UserType.LOC_EMPLOYEE;
    if (loc) {
        loc_id = req.body.loc_id;
    }
    const query = db.query(`INSERT INTO users (email, password, locked, name, type) VALUES ('${email}', '${password}', '${locked}', '${name}', '${type}');`, err => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
    });
    if (type !== UserType.USER) {
        const table = `${type.toLowerCase()}s`;
        const loc_col = loc ? ', location' : '';
        const loc_value = loc ? `, '${loc_id}'` : '';
        try {
            db.query(`INSERT INTO ${table} (email, password${loc_col}) VALUES ('${email}', '${password}'${loc_value});`, err => {
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
        } catch (err) {
            console.log(err);
        }
    }
};

module.exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`, (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        if (result[0] && result[0].type === UserType.LOC_EMPLOYEE) {
            db.query(`SELECT * FROM location_employees WHERE email = '${email}';`, (err, resu) => {
                if (err) {
                    return res.json({
                        success: false,
                        msg: err.message
                    });
                }
                result[0].loc_id = resu[0].location;
                const jsonResult = Object.assign({}, result[0]);
                console.log(jsonResult);
                if (result.length > 0) {
                    console.log('Logged in');
                    return res.json({
                        success: true,
                        user: jsonResult
                    });
                } else {
                    return res.json({
                        success: false,
                        msg: 'Invalid login'
                    });
                }
            });
        } else {
            const jsonResult = Object.assign({}, result[0]);
            console.log(jsonResult);
            if (result.length > 0) {
                console.log('Logged in');
                return res.json({
                    success: true,
                    user: jsonResult
                });
            } else {
                return res.json({
                    success: false,
                    msg: 'Invalid login'
                });
            }
        }
    });
};

module.exports.checkUser = (req, res) => {
    const { email } = req.body;
    db.query(`SELECT * FROM users WHERE email = '${email}';`, (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        const jsonResult = Object.assign({}, result[0]);
        console.log(jsonResult);
        if (result.length > 0) {
            return res.json({
                success: true
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
};

module.exports.getLocations = (req, res) => {
    db.query('SELECT * FROM location;', (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        const mapToNormalObject = loc => {
            return Object.assign({}, loc);
        };
        const jsonResult = result.map(mapToNormalObject);
        console.log(jsonResult);
        if (result.length > 0) {
            return res.json({
                success: true,
                locations: jsonResult
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
};

module.exports.getLocationById = (req, res) => {
    const { loc_id } = req.body;
    db.query(`SELECT * FROM location WHERE idLocation = '${loc_id}';`, (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        const jsonResult = Object.assign({}, result[0]);
        console.log(jsonResult);
        if (result.length > 0) {
            return res.json({
                success: true,
                location: jsonResult
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
};

module.exports.addItem = (req, res) => {
    const { sDesc, fDesc, value, cat, comments, loc_id } = req.body;
    db.query(`INSERT INTO item (s_description, l_description, Value, Comments, location) VALUES ('${sDesc}', '${fDesc}', '${value}', '${comments}', '${loc_id}');`, err => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        console.log('1 item inserted');
        return res.json({
            success: true
        });
    });
};

module.exports.getAllItems = (req, res) => {
    db.query('SELECT * FROM item;', (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        const jsonResult = result.map(obj => Object.assign({}, obj));
        console.log(jsonResult);
        if (result.length > 0) {
            return res.json({
                success: true,
                items: jsonResult
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
};

module.exports.getItemsByLocation = (req, res) => {
    const { loc_id } = req.body;
    db.query(`SELECT * FROM item WHERE location = '${loc_id}';`, (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        const jsonResult = result.map(obj => Object.assign({}, obj));
        console.log(jsonResult);
        if (result.length > 0) {
            return res.json({
                success: true,
                items: jsonResult
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
};

module.exports.getItemsByCategory = (req, res) => {
    const { cat } = req.body;
    db.query(`SELECT * FROM item WHERE category = '${cat}';`, (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        const jsonResult = result.map(obj => Object.assign({}, obj));
        console.log(jsonResult);
        if (result.length > 0) {
            return res.json({
                success: true,
                items: jsonResult
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
};

module.exports.getItemsByName = (req, res) => {
    const { sDesc } = req.body;
    db.query(`SELECT * FROM item WHERE s_description = '${sDesc}';`, (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        const jsonResult = result.map(obj => Object.assign({}, obj));
        console.log(jsonResult);
        if (result.length > 0) {
            return res.json({
                success: true,
                items: jsonResult
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
};

module.exports.getItemsByMultiple = (req, res) => {
    const { loc_id, cat, sDesc } = req.body;
    const byLoc = loc_id !== undefined;
    const byCat = cat !== undefined;
    const byName = sDesc !== undefined;

    const locClause = byLoc ? `location = '${loc_id}'` : '';
    let catClause = byCat ? `category = '${cat}'` : '';
    if (byLoc && byCat) {
        catClause = ' AND '.concat(catClause);
    }
    let nameClause = byName ? `s_description = '${sDesc}'` : '';
    if ((byLoc && byName) || (byCat && byName)) {
        nameClause = ' AND '.concat(nameClause);
    }

    let query = '';
    if (!byLoc && !byCat && !byName) {
        query = 'SELECT * FROM item;';
    } else {
        query = `SELECT * FROM item WHERE ${locClause}${catClause}${nameClause};`;
    }
    console.log(query);

    db.query(query, (err, result) => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        }
        const jsonResult = result.map(obj => Object.assign({}, obj));
        console.log(jsonResult);
        if (result.length > 0) {
            return res.json({
                success: true,
                items: jsonResult
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
};

// module.exports.getUser = (req, res) => {
//     const { email } = req.body;
//     db.query(`SELECT * FROM users WHERE email = '${email}'`, (err, result) => {
//         if (err) {
//             return res.json({
//                 success: false,
//                 msg: err.message
//             });
//         }
//         console.log(result);
//         if (result.length > 0) {
//             console.log('Logged in');
//             return res.json({
//                 success: true,
//             });
//         } else {
//             return res.json({
//                 success: false,
//                 msg: 'Invalid login'
//             });
//         }
//     });
// };
// };
