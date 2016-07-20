var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dbConfig = require('./util/db.js');
var secretConfig = require('./util/secret.js');

var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: secretConfig.secretKey}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var mongoose = require('mongoose');
var UserModel = require('./models/UserModel.js');

mongoose.connect(dbConfig.url, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var users = require('./routes/users');
var boards = require('./routes/boards');
var posts = require('./routes/posts');

app.use('/users', users);
app.use('/boards', boards);
app.use('/posts', posts);

app.listen(3000);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
 
passport.deserializeUser(function(id, done) {
  UserModel.findById(id, function(err, user) {
    done(err, user);
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
console.log("Server running on port 3000");