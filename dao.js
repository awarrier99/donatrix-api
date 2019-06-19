const db = require('./db');
//const UserType = require('./UserType');

module.exports.viewBill = (req, res) => {
    const { idUser } = req.body;
    db.query(`SELECT billAmount FROM User WHERE idUser = '${idUser}';`, (err, result) => {
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

module.exports.payBill = (req, res) => {
  const { idUser } = req.body;
  db.query(`UPDATE User SET billAmount = 0 WHERE idUser = '${idUser}';`, (err) => {
    if (err) {
        return res.json({
            success: false,
            msg: err.message
        });
    } else {
      return res.json({
        success: true
      })
    }
  });
}

module.exports.viewUsage = (req, res) => {
    const { idUser } = req.body;
    db.query(`SELECT usageAmount FROM User WHERE idUser = '${idUser}';`, (err, result) => {
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
                info: jsonResult
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
};

module.exports.viewLocation = (req, res) => {
    const { idUser } = req.body;
    db.query(`SELECT location FROM User WHERE idUser = '${idUser}';`, (err, result) => {
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
                info: jsonResult
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
};

module.exports.viewUserInfo = (req, res) => {
    const { idUser } = req.body;
    db.query(`SELECT * FROM User WHERE idUser = '${idUser}';`, (err, result) => {
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
                info: jsonResult
            });
        } else {
            return res.json({
                success: false
            });
        }
    });
};

module.exports.registerUser = (req, res) => {
    const { idUser, billAmount, subStatus, usageAmount, parentalControls, viewingPrefs, interests, loggedIn, location } = req.body;
    const query = db.query(`INSERT INTO User (idUser, billAmount, subStatus, usageAmount, parentalControls, viewingPrefs,
      interests, loggedIn, location) VALUES ('${idUser}', '${billAmount}', '${subStatus}', '${usageAmount}',
      '${parentalControls}', '${viewingPrefs}', '${interests}', '${loggedIn}', '${location}');`, err => {
        if (err) {
            return res.json({
                success: false,
                msg: err.message
            });
        } else {
          return res.json({
            success: true
          })
        }
    });
};

module.exports.deleteUser = (req, res) => {
  const { idUser } = req.body;
  const query = db.query(`DELETE FROM User WHERE idUser = '${idUser}'`, err => {
    if (err) {
        return res.json({
            success: false,
            msg: err.message
        });
    } else {
      return res.json({
        success: true
      })
    }
  });
}

module.exports.viewAllUsers = (req, res) => {
  const query = db.query(`SELECT * FROM User`, (err, result) => {
    if (err) {
        return res.json({
            success: false,
            msg: err.message
        });
    } else {
      const jsonResult = Object.assign({}, result);
      console.log(jsonResult);
      if (result.length > 0) {
          return res.json({
              success: true,
              info: jsonResult
          });
        } else {
          return res.json({
            success: false
          });
        }
    }
  })
}

module.exports.upgrade = (req, res) => {
  const { idUser } = req.body;
  db.query(`UPDATE User SET subStatus = 'paid user' WHERE idUser = '${idUser}';`, (err) => {
    if (err) {
        return res.json({
            success: false,
            msg: err.message
        });
    } else {
      return res.json({
        success: true
      })
    }
  });
}

module.exports.downgrade = (req, res) => {
  const { idUser } = req.body;
  db.query(`UPDATE User SET subStatus = 'free user' WHERE idUser = '${idUser}';`, (err) => {
    if (err) {
        return res.json({
            success: false,
            msg: err.message
        });
    } else {
      return res.json({
        success: true
      })
    }
  });
}

module.exports.toggleParentalControls = (req, res) => {
  const { idUser } = req.body;
  db.query(`UPDATE User SET parentalControls = !parentalControls WHERE idUser = '${idUser}';`, (err) => {
    if (err) {
        return res.json({
            success: false,
            msg: err.message
        });
    } else {
      return res.json({
        success: true
      })
    }
  });
}

module.exports.setViewingPrefs = (req, res) => {
  const { idUser, viewingPrefs } = req.body;
  db.query(`UPDATE User SET viewingPrefs = '${viewingPrefs}' WHERE idUser = '${idUser}';`, (err) => {
    if (err) {
        return res.json({
            success: false,
            msg: err.message
        });
    } else {
      return res.json({
        success: true
      })
    }
  });
}

module.exports.setInterests = (req, res) => {
  const { idUser, interests } = req.body;
  db.query(`UPDATE User SET interests = '${interests}' WHERE idUser = '${idUser}';`, (err) => {
    if (err) {
        return res.json({
            success: false,
            msg: err.message
        });
    } else {
      return res.json({
        success: true
      })
    }
  });
}

module.exports.logIn = (req, res) => {
  const { idUser } = req.body;
  db.query(`UPDATE User SET loggedIn = 1 WHERE idUser = '${idUser}';`, (err) => {
    if (err) {
        return res.json({
            success: false,
            msg: err.message
        });
    } else {
      return res.json({
        success: true
      })
    }
  });
}

module.exports.logOut = (req, res) => {
  const { idUser } = req.body;
  db.query(`UPDATE User SET loggedIn = 0 WHERE idUser = '${idUser}';`, (err) => {
    if (err) {
        return res.json({
            success: false,
            msg: err.message
        });
    } else {
      return res.json({
        success: true
      })
    }
  });
}
