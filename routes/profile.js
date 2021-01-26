var express = require('express');
var router = express.Router();
var userController = require('.././controllers/user.controller');
var mainController = require('../controllers/main.controller');
var profileController = require('../controllers/profile.controller');


const multer = require('multer');
var upload = multer({});



router.get('/', isLoggedIn, profileController.viewProfile);

router.get('/user_info', isLoggedIn, profileController.getUserId);

router.post('/changepassword', profileController.changePassword);

router.post('/uploadprofilephoto', isLoggedIn, profileController.uploadProfilePhoto);

router.get('/uploadprofilephoto', isLoggedIn, (req, res) => {
    res.redirect('/');
})

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