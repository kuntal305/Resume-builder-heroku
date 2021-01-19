const profileModel = require('../models/profile.model');
const helpers = require('../helpers');

const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { profile } = require('console');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/');
    },

    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const maxSize = 3 * 1024 * 1024;

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
        
        // let upload = multer({
        //     storage: storage,  
        //     limits: { fileSize: maxSize },
        //     helpers: helpers.imageFilter 
        // }).single("profilephoto");

        // upload(req, res, function(err) {
        //     // req.file contains information of uploaded file
        //     // req.body contains information of text fields, if there were any

        //     if (req.fileValidationError) {
        //         return res.send(req.fileValidationError);
        //     }
        //     else if (!req.file) {
        //         return res.send('Please select an image to upload');
        //     }
        //     else if (err instanceof multer.MulterError) {
        //         return res.send(err);
        //     }
        //     else if (err) {
        //         return res.send(err);
        //     }

        //     // Display uploaded image for user validation
        //     res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
        // });

        // var image = fs.readFileSync(req.file, 'base64');

        profileModel.uploadProfilePhoto(req.body.id, image, (err, result) => {
            if (err) throw err;

            if(result[0][0] == 1) {
                res.send("Success");
            } else {
                res.send("Failure");
            }
        })
    }
}

module.exports = profileController;