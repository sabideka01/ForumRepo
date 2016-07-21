var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel.js');

router.post('/', function (req, res, next) {
  var username= req.body.username;
  var password= req.body.password;
  UserModel.findOne({'username':username}, function(err, user) {
    if (err) return next(err);
    if(!user || user.password!=password) {
       res.statusCode = 403;
       res.send();
    }
    res.statusCode = 200;
    res.send();
  });
});


module.exports = router;

/*
var passport = require('passport');
var expressSession = require('express-session');
app.post('/login', function handleLocalAuthentication(req, res, next) {

    passport.authenticate('local', function(err, user, info) {
        if (err) return next(err);
        if (!user) {
            return res.json(403, {
                message: "no user found"
            });
        }

        // Manually establish the session...
        req.login(user, function(err) {
            if (err) return next(err);
            return res.json({
                message: 'user authenticated',
            });
        });

    })(req, res, next);
};
*/

