'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
//var cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const mfavicon=require("express-favicon");
const mongoStore = require('connect-mongo')(session);

// var log4js = require('log4js'); // include log4js

// log4js.configure({ // configure to use all types in different files.
//     appenders: [
//         {   type: 'file',
//             filename: "/logs/error.log", // specify the path where u want logs folder error.log
//             category: 'error',
//             maxLogSize: 20480,
//             backups: 10
//         },
//         {   type: "file",
//             filename: "/logs/info.log", // specify the path where u want logs folder info.log
//             category: 'info',
//             maxLogSize: 20480,
//             backups: 10
//         },
//         {   type: 'file',
//             filename: "/logs/debug.log", // specify the path where u want logs folder debug.log
//             category: 'debug',
//             maxLogSize: 20480,
//             backups: 10
//         }
//     ]
// });

// var loggerinfo = log4js.getLogger('info'); // initialize the var to use.
// var loggererror = log4js.getLogger('error'); // initialize the var to use.
// var loggerdebug = log4js.getLogger('debug'); // initialize the var to use.

// loggerinfo.info('This is Information Logger');
// loggererror.info('This is Error Logger');
// loggerdebug.info('This is Debugger');

const app = express();

const config= require('./config/config');


app.use(function(request,response,next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//app.use(cookieParser());


app.use(session({
    secret:config.sessionKey,
    saveUninitialized:false,
    resave:true,
    //httpOnly: true, //default true
    //secure: true,
    //ssl
    //ephemeral: true
    store: new mongoStore({
        url: config.mongoUrl,
        //ttl: 14 * 24 * 60 * 60,//14 days 
        ttl: config.defaultSessionDuration,// 2 hours 
        //mongoOptions: advancedOptions // See below for details 
    })
}));
module.exports=app;

const index = require('./routes/index');
const commonroutes = require('./routes/commonroutes');
const signup = require('./routes/signup');
const login = require('./routes/login');
const profile = require('./routes/profile');
const forgotpassword = require('./routes/forgotpassword');
const social =require('./routes/social');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mfavicon(__dirname + '/public/favicon.icon'));


//app.use(session({ secret:"string"}));
app.use('/', index);
app.use('/commonroutes',commonroutes);
app.use('/signup',signup);
app.use('/login',login);
app.use('/profile',profile);
app.use('/forgotpassword',forgotpassword);
app.use('/social',social);
app.use('*',index);

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

app.listen(1234,function(){
    console.log("Server Started....");
})

