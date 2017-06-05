'use strict';

///Routing for Oauth calls

const express = require('express');
const router = express.Router();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: "1853899954884964",
    clientSecret: "0f5d1a490c0febe2af3a4d531c236acd",
    callbackURL: "http://localhost:1234/social/auth/facebook/callback",
    passReqToCallback : true,
    profileFields: ['id', 'emails', 'name']
  },
  function (accessToken, refreshToken, profile, done) {      
      console.log("CCCCCCCC");      
            process.nextTick(function () {                
               console.log("aCCCESSS TOKKKEN",accessToken);
            });                 
    }
       
));

router.get('/socialFacebook', passport.authenticate('facebook',{ scope: ['email']}));

 router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));


module.exports = router;