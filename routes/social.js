'use strict';

///Routing for Oauth calls

const express = require('express');

const app = require("../index");
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
app.use(passport.initialize());

const router = express.Router();

const dbOperations = require("../config/crudoperations/commonoperations");
const secrets= require("../config/config");
const logger = require("../config/logger");

passport.use(new FacebookStrategy({
    passReqToCallback: true,
    clientID: secrets.FACEBOOK_CLIENT_ID,  // AppId
    clientSecret: secrets.FACEBOOK_CLIENT_SECRET,  // AppSecret
    callbackURL: secrets.reqUrl+"/social/auth/facebook/callback",
	profileFields:['id','email','name']
  },
  function(request,accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
	    
        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });	

        if(profile._json.email===undefined){
            return done(null);
        }
        else{
            logger.debug('routes social fb');
            request.body.Email=profile._json.email.toLowerCase();
            request.body.FullName=profile._json.first_name+" "+profile._json.last_name;
            request.body.socialId=profile._json.id;
            request.body.accessToken=accessToken;
            request.body.Social="Facebook";
            var response={
                send:function(){
                    return;
                }
            };
            dbOperations.socialSignin(request,response,done);
        }
	}
)
}));


router.get('/socialFacebook', passport.authenticate('facebook',{ scope: ['email']}));

router.get('/auth/facebook/callback', passport.authenticate('facebook',{
    successRedirect: '/',
    failureRedirect: '/' 
}));

passport.use(new GoogleStrategy({
    clientID: secrets.GOOGLE_CLIENT_ID,
    clientSecret: secrets.GOOGLE_CLIENT_SECRET,
    callbackURL: secrets.reqUrl+"/social/auth/google/callback",
    passReqToCallback: true,
  },
  function(request, accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
	    
        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });	

        if(!profile.emails[0].value){
            return done(null);
        }
        else{
            logger.debug('routes social google');
            request.body.Email=profile.emails[0].value.toLowerCase();
            request.body.FullName=profile._json.displayName;
            request.body.socialId=profile.id;
            request.body.accessToken=accessToken;
            request.body.Social="Google";
            var response={
                send:function(){
                    return;
                }
            };
            dbOperations.socialSignin(request,response,done);
        }
	}
)
}));


router.get('/socialGoogle', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ]
}));

router.get('/auth/google/callback', passport.authenticate('google',{
    successRedirect: '/',
    failureRedirect: '/' 
}));


module.exports = router;