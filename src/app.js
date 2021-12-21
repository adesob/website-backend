var createError = require('http-errors');
var express = require('express');
const serverless = require('serverless-http')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require('./routes/testAPI')
var projectsRouter = require('./routes/projects')

var app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://adesobodu:3P4iONI1i7H0aMUa@cluster0.xkjvv.mongodb.net/personal-website?retryWrites=true&w=majority'

mongoose.connect(dbURI)
  .then((result => {console.log('connected to db'); app.listen()} ))
  .catch((err) => console.log(err));


// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use these routes for the corresponding paths
app.use('/.netlify/functions/app/', indexRouter);
app.use('/.netlify/functions/app/users', usersRouter);
app.use('/.netlify/functions/app/testAPI', testAPIRouter);
app.use('/.netlify/functions/app/projects', projectsRouter);

// catch 404 and forward to error handler
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
  res.render('error');
});

module.exports = app;
module.exports.handler = serverless(app);
