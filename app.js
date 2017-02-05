var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var mfavicon=require("express-favicon");
//var srs = require('secure-random-string');
//var randomstring = require("randomstring");
var MongoStore = require('connect-mongo')(session);
//var nodemailer = require('nodemailer');
var app = express();


var config= require('./config/config');


app.use(function(request,response,next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//app.use(cookieParser());


app.use(session({
    secret:config.sessionKey,
    saveUninitialized:true,
    resave:true,
    //httpOnly: true, //default true
    //secure: true,
    //ssl
    //ephemeral: true
    store: new MongoStore({
        url: config.mongoUrl,
        //ttl: 14 * 24 * 60 * 60,//14 days 
        ttl: config.defaultSessionDuraion,// 2 hours 
        //mongoOptions: advancedOptions // See below for details 
    })
}));


var index = require('./routes/index');
var allroutes = require('./routes/allroutes');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mfavicon(__dirname + '/public/favicon.icon'));




//app.use(session({ secret:"string"}));
app.use('/', index);
app.use('/allroutes',allroutes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
