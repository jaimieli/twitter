// require will read the file, execute the file, and return the module.exports object
// these top requires are npm modules that are on the system-level
var express = require('express');
var swig = require('swig');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// require gives us the abililty to retrieve objects and classes from other files we have in our directory
var routes = require('./routes/index');
var users = require('./routes/users');
var store = require('./store');

var app = express();
app.engine('html', swig.renderFile);

// view engine setup
// app.set is a way to set properties on the app
// path.join takes two strings and combines them into a real path that exists
// __dirname - defined for you by express - it equals the current directory path
// this means that all your views files are in the views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// different middleware below
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// this how you create new URLs
// tell the app to use the specific routes when they someone visits a particular path
// this will direct / to index.js and /users to users.js
app.use('/', routes);
app.use('/users', users);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    swig.setDefaults({cache: false});
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


module.exports = app;
