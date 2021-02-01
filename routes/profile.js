var express = require('express');
var router = express.Router();

var profileController = require('../controllers/profile.controller');

router.get('/', isLoggedIn, profileController.viewProfile);

router.get('/user_info', isLoggedIn, profileController.getUserId);

router.post('/changepassword', isLoggedIn, profileController.changePassword);

router.put('/uploadprofilephoto/:id', isLoggedIn, profileController.uploadProfilePhoto);

router.get('/uploadprofilephoto', (req, res) => {
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