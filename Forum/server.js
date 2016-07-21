var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var dbConfig = require('./config/db.js');
var secretConfig = require('./config/secret.js');

var passport = require('passport');
var expressSession = require('express-session');
app.use(expressSession({secret: secretConfig.secretKey, resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

var mongoose = require('mongoose');
var UserModel = require('./app/models/UserModel.js');

mongoose.connect(dbConfig.url, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

var users = require('./app/routes/users');
var boards = require('./app/routes/boards');
var posts = require('./app/routes/posts');

app.use('/users', users);
app.use('/boards', boards);
app.use('/posts', posts);

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
    console.error(err);
    res.json({
      "error": "error occured"
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.json({
      "error": "error occured"
    });
});


app.listen(3000);
console.log("Server running on port 3000");