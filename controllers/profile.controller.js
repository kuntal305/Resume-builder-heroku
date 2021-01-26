const profileModel = require('../models/profile.model');

const bcrypt = require('bcrypt');




const profileController = {
    viewProfile (req, res) {
        res.render('viewprofile', {firstname: req.user.first_name, lastname: req.user.last_name, email: req.user.email});
    },

    getUserId (req, res) {
        res.send(req.user);
    },

    changePassword (req, res) {
        const saltRounds = 10;

        var oldPass = req.body.old_password;
        var newPass = req.body.new_password;
        var uid = req.body.uid;
        profileModel.findUserById(uid, (id_err, rows) => {
            if (id_err) throw id_err;
            
            if (rows.length == 0) {
                res.send({result: 1})
            } else {
                bcrypt.compare(oldPass, rows[0].password, (error, isMatch) => {
                    console.log("PASSWORD: " + rows[0].password);
                    console.log('Error');
                    if (error) throw err;
                    if (!isMatch) {
                        res.send({result: 2});
                    } else {
                        bcrypt.hash(newPass, saltRounds, (hash_err, hash) => {
                            if (hash_err) throw err;
                            profileModel.changePassword(uid, hash, (err, result) => {
                                if(err) throw err;
                                
                                var json = JSON.parse(JSON.stringify(result));
                                console.log(json);
                                if (json[0][0]['res'] > 0) {
                                    res.send({result: 3});
                                } else {
                                    res.sendStatus(404);
                                }
                            })
                        })
                    }
                })
            }
            
        })
    },

    uploadProfilePhoto (req, res) {

        profileModel.uploadProfilePhoto(req.body, (err, result) => {
            if (err) throw err;

            if(result[0][0].res == 1) {
                

                res.send();
            } else {
                res.sendStatus(404);
            }
        })
    }
}

module.exports = profileController;