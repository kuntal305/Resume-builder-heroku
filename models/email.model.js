var db = require('../db');


const model = {
    checkMail: (email, cb) => {
        return db.query('CALL check_email(?, "")', [email], cb);
    },

    updatePassword: (email, password, cb) => {
        return db.query('CALL check_email(?, ?)', [email, password], cb);
    }
}

module.exports = model;