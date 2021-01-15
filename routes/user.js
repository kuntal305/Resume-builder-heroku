var express = require('express');
var router = express.Router();
var userController = require('.././controllers/user.controller');
var mainController = require('../controllers/main.controller');
var passport = require('passport');

router.get('/', isLoggedIn, (req, res) => {
    res.render('userProfile', {firstname: req.user.first_name, lastname: req.user.last_name})
});

router.get('/user_info', isLoggedIn, userController.userInfo);

router.get('/viewresume/user_info', isLoggedIn, userController.userInfo);

router.post('/savebasicinfo', isLoggedIn, userController.saveBasicInfo);

router.get('/checkbasicinfo/:id', isLoggedIn, userController.checkBasicInfo);

router.post('/saveeducation', isLoggedIn, userController.saveEducation)

router.post('/updateeducation', isLoggedIn, userController.updateEducation)

router.get('/geteducationinfo/:id', isLoggedIn, userController.getEducation);

router.post('/saveproject', isLoggedIn, userController.saveProject);

router.post('/savemisc', isLoggedIn, userController.saveMisc);

router.post('/savework', isLoggedIn, userController.saveWork);

router.post('/saveendnote', isLoggedIn, userController.saveEndNote);

router.get('/getcvdata/:id', isLoggedIn, userController.getCvdetails);

router.get('/viewresume/:id', isLoggedIn, userController.viewResume);

router.get('/viewresume', isLoggedIn, userController.redirectToResume);

router.get('/validatecvdata/:id', isLoggedIn, userController.validateCvData);


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