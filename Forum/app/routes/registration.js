var passport = require('passport');
var expressSession = require('express-session');

passport.use('signup', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) {
    findOrCreateUser = function(){
      UserModel.findOne({'username':username},function(err, user) {
        if (err){
          console.log('Error in SignUp: '+err);
          return done(err);
        }
        if (user) {
          console.log('User already exists');
          return done(null, false, 
             req.flash('message','User Already Exists'));
        } else {
          var newUser = new UserModel();
          newUser.username = username;
          newUser.password = createHash(password);
          newUser.email = req.param('email');
          newUser.name = req.param('name');
          
          newUser.save(function(err) {
            if (err){
              console.log('Error in Saving user: '+err);  
              throw err;  
            }
            console.log('User Registration succesful');    
            return done(null, newUser);
          });
        }
      });
    };
     
    process.nextTick(findOrCreateUser);
  });
);


// Generates hash using bCrypt
var createHash = function(password){
 return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
