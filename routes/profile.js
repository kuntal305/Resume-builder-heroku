var express = require('express');
var router = express.Router();
var userController = require('.././controllers/user.controller');
var mainController = require('../controllers/main.controller');
var profileController = require('../controllers/profile.controller');
var passport = require('passport');


router.get('/', isLoggedIn, profileController.viewProfile);

router.get('/user_info', isLoggedIn, profileController.getUserId);

router.post('/changepassword', profileController.changePassword);


function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function isNotLoggedIn(req, res, next) {
    if(!req.isAuthenticated()) {
        return next()
    }
    res.redirect('/userprofile');
}

module.exports = router;