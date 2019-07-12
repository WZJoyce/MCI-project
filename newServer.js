var express = require('express');
var bodyParser = require('body-parser');
var fs = require("fs");
var multer  = require('multer');
var stream = require('stream');
var createError = require('http-errors');
var path = require('path');
//var cookieParser = require('cookie-parser');
//var logger = require('morgan');

var managecourseRouter = require('./manageCourse');
var manageassignmentRouter = require('./manageAssignment');
var navigationRouter = require('./navigation');
var classListRouter = require('./classList');
var submissionRouter = require('./submission');
var signInRouter = require('./signIn');

var app = express();


app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'jade');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());


app.use('/managecourse', managecourseRouter);
app.use('/manageassignment', manageassignmentRouter);
app.use('/navigation', navigationRouter);
app.use('/classList', classListRouter);
app.use('/submission', submissionRouter);
app.use('/', signInRouter);

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
var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log(" ", host, port)
 
})
