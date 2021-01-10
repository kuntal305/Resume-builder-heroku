var express = require('express');
var router = express.Router();
var userController = require('.././controllers/user.controller');
var mainController = require('../controllers/main.controller');
var passport = require('passport');


/* GET home page. */
router.get('/', isNotLoggedIn, mainController.getHomePage);


router.get('/login', isNotLoggedIn, mainController.redirectToHome);

router.get('/signup', isNotLoggedIn, mainController.redirectToHome);

router.post('/login', passport.authenticate('login', {
    successRedirect: '/userprofile',
    failureRedirect: '/'
}));

router.post('/signup', userController.signup);

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
});


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
