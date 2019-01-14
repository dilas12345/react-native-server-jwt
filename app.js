var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var routes = require('./routes/index');
var users = require('./routes/users');
var User = require('./models/user');
var mysql = require('mysql');
var database = require('./database/database');

var port = process.env.PORT || 5959;

var app = express();

// JWT configration
var options = {}
options.jwtFromRequest = ExtractJwt.fromAuthHeader();
options.secretOrKey = '7x0jhxt"9(thpX6'

app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configure Passport to use local strategy for initial authentication.
passport.use('local', new LocalStrategy(User.authenticate()));

//Configure Passport to use JWT strategy to look up Users.
passport.use('jwt', new JwtStrategy(options, function(jwt_payload, done) {
  console.log("Passport is working");
  User.findOne({
    _id: jwt_payload.id
  }, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
    console.log("Passport is done working");
  })
}))


app.use('/', routes);
// app.use('/index', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.listen(port,function(){
  console.log("Server is running on port: "+port);
});

module.exports = app;
