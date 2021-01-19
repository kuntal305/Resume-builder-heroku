const userModel = require('.././models/user.model');
const cred = require('../config/cred.config');
const emailModel = require('.././models/email.model');

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: cred.email,
        pass: cred.password,
    },
    secure: true,
});

const saltRounds = 10;

const emailController = {
    sendEmail (req, res) {
        const receiver = req.body.email;

        emailModel.checkMail(receiver, (err, result) => {
            if(err) throw err;
            
            let newPassword = result[0][0].new_code;

            if(newPassword == 0) {
                res.send({success: 0, message: "A user with that email doesn't exist"});
            } else {
                bcrypt.hash(newPassword, saltRounds, (hash_err, hash) => {
                    if (hash_err) throw err;

                    emailModel.updatePassword(receiver, hash, (update_err, update_result) => {
                        if(update_err) throw update_err;

                        if (update_result[0][0].res == 1) {
                            
                            let subject = 'New Password';
                            let html = `
                                <h3>Your Password has been reset!</h3>
                                <p>Your new password is: <b>${newPassword}<b></p>
                                <p>If this was not done by you, mail your query to us at resumebuilder@techdeeksha.com</p>
                            `;
                            const data = {
                                from: cred.email,
                                to: receiver,
                                subject: subject,
                                html: html,
                                list: {
                                    help: 'resumebuilder@techdeeksha.com'
                                }
                            }
                            transporter.sendMail(data, (error, info) => {
                                if (error) throw error;
                                console.log(info);

                                res.send({success: 1, message: 'Email with New Password Sent Succesfully!!'});
                            })
                        } else {
                            res.sendStatus(404);
                        }
                    })
                })
            }
        })
        
    }
}

module.exports = emailController;