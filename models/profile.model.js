const passport = require('passport');
var db = require('../db');

const model = {
    findUserById: (id, cb) => {
        return db.query('SELECT id, first_name, last_name, email, password FROM user WHERE id = ?', [id], cb);
    },

    changePassword: (id, password, cb) => {
        return db.query('CALL change_password(?, ?)', [id, password], cb);
    },

    uploadProfilePhoto: (id, image, cb) => {
        return db.query('CALL pr_upload_profile_pic(2147483647, ?)', [image], cb);
    }
}

module.exports = model;