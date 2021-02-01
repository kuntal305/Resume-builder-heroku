var path = require('path');
const multer = require('multer');
const spawn = require('child_process').spawn;
var { PythonShell } = require('python-shell')

const profileModel = require('../models/profile.model');
const helpers = require('.././helpers');

const bcrypt = require('bcrypt');
const { extname } = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})


const profileController = {
    viewProfile (req, res) {
        res.render('viewprofile', {firstname: req.user.first_name, lastname: req.user.last_name, email: req.user.email});
    },

    getUserId (req, res) {
        var data = {
            email: req.user.email,
            id: req.user.id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            profile_image: req.user.profile_image
        }
        res.send(data);
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

        var upload = multer({
            storage: storage,
            helpers: helpers.imageFilter,
        }).single('file');

        upload(req, res, function(err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any

            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }

            var options = {
                mode: 'text',
                pythonOptions: ['-u'],
                scriptPath: 'python-scripts/',
                args: [req.file.filename]
            }
            var base64String = '';
            PythonShell.run('imagedetection.py', options, function(err, result) {
                // if(err) throw err
                // console.log('result: ', result.toString());
                if (result != null) {
                    base64String = result.toString();
                    var imageData = {
                        id: req.params.id,
                        data: base64String
                    }
                    profileModel.uploadProfilePhoto(imageData, (err, result) => {
                        if(err) throw err;

                        if(result[0][0].res == 1) {
                            res.send({ success: 1, string: base64String, ext: extname(req.file.originalname).split('.')[1]});
                        } else {
                            res.sendStatus(404);
                        }
                    })
                } else {
                    res.send({ success: 0 });
                }
            })
        })
    }
}

module.exports = profileController;