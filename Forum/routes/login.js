var passport = require('passport');
var expressSession = require('express-session');
var UserModel = require('../models/UserModel.js');

passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    UserModel.findOne({ 'username' :  username }, 
      function(err, user) {
        if (err)
          return done(err);
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false, 
                req.flash('message', 'User Not found.'));                 
        }
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false, 
              req.flash('message', 'Invalid Password'));
        }
        return done(null, user);
      }
    );
}));

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}

var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}
