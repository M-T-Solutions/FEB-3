/* Installed 3rd party packages*/
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
 
//Creates an app via Express
let app = express();

// Create an instance of the User Model
let userModel = require('../models/user');
let User = userModel.User;

// config mongoDB
let mongoose = require('mongoose');
let DB = require('./db');

//Point mongoose to DB URI

mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log('connected to the MongoDB')
});

// Set-up Express Session
app.use(session({
  secret:"SomeSecret",
  saveUninitialized:false,
  resave:false
}));

// Implement a User Authentication
passport.use(User.createStrategy());

// Serialize and Deserialize the user information
passport.serializeUser(User. serializeUser());
passport.deserializeUser(User. deserializeUser());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Initialize Flash
app.use(flash());

// Routing file path variables
let indexRouter = require('../routes/index');
let booksRouter = require('../routes/books');

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//Routing
app.use('/', indexRouter); // localhost: 3000
app.use('/books', booksRouter); // localhost: 3000/books

// catch 404 and forward to error handler [All undefined paths]
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {title: "Error"});
});

module.exports = app;
