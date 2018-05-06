'use strict';

///Routing for Oauth calls

const express = require('express');

const app = require("../index");
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleTokenStrategy = require("passport-google-token").Strategy;
app.use(passport.initialize());

const router = express.Router();

const dbOperations = require("../config/crudoperations/commonoperations");
const secrets = require("../config/config");
const logger = require("../config/logger");

/////////////////////Facebook

var signinFacebook = function (request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {

        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });

        const validate = require('../config/validate');
        
        var validEmail = validate.email(request.query.state);
        
        var email;
        if (profile._json.email) {
            email = profile._json.email;
            request.body.verified = true;
        }
        else if (validEmail) {
            email = request.query.state;
            request.body.verified = false;
        }
        
        if (!email || !accessToken) {
            return done(null, { "email": "false" });
        }
        else {
            logger.debug('routes social fb');
            request.body.Email = email.toLowerCase();
            request.body.FullName = profile._json.first_name + " " + profile._json.last_name;
            request.body.socialId = profile._json.id;
            request.body.accessToken = accessToken;
            request.body.Social = "Facebook";
            request.body.appCall = (request.query.state === 'true');
            var response = {
                send: function () {
                    return;
                }
            };
            dbOperations.socialSignin(request, response, done);
        }
    })
}

passport.use(new FacebookStrategy({
    passReqToCallback: true,
    clientID: secrets.FACEBOOK_CLIENT_ID,  // AppId
    clientSecret: secrets.FACEBOOK_CLIENT_SECRET,  // AppSecret
    callbackURL: secrets.reqUrl + "/social/auth/facebook/callback",
    profileFields: ['id', 'email', 'name']
}, signinFacebook));


router.get('/socialFacebook', function (req, res, next) {

    passport.authenticate(
        'facebook', {
            scope: 'email',
            state: req.query.state
        }
    )(req, res, next);
});

router.get('/socialFacebookApp', function (req, res, next) {

    req.query.appCall = true;
    passport.authenticate(
        'facebook', {
            scope: 'email',
            state: req.query.role
        }
    )(req, res, next);
});

//////Token Based

passport.use('facebookToken', new FacebookTokenStrategy({
    passReqToCallback: true,
    clientID: secrets.FACEBOOK_CLIENT_ID,
    clientSecret: secrets.FACEBOOK_CLIENT_SECRET,
    callbackURL: secrets.reqUrl + "/social/auth/facebook/callback",
    profileFields: ['id', 'email', 'name']
}, signinFacebook));


router.post('/auth/facebook', passport.authenticate('facebookToken', { scope: ['email'] }));

///////Callback

router.get('/auth/facebook/callback', function (request, response) {
    passport.authenticate('facebook', function (req, res) {
        if (res && res.sessionid) {
            response.redirect('/?sid=' + res.sessionid);
        }
        else if (res && res.email) {
            response.redirect('/?email=false');
        }
        else {
            response.redirect('/');
        }
    })(request, response);
});


////////////Google 

var signinGoogle = function (request, accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });

        const validate = require('../config/validate');

        var validEmail = validate.email(request.query.state);

        var email;
        if (profile.emails[0].value) {
            email = profile.emails[0].value;
            request.body.verified = true;
        }
        else if (validEmail) {
            email = request.query.state;
            request.body.verified = false;
        }

        if (!email || !accessToken) {
            return done(null, { "email": "false" });
        }
        else {
            logger.debug('routes social google');
            request.body.Email = email.toLowerCase();
            request.body.FullName = profile._json.displayName;
            request.body.socialId = profile.id;
            request.body.accessToken = accessToken;
            request.body.Social = "Google";
            request.body.appCall = (request.query.state === 'true');
            var response = {
                send: function () {
                    return;
                }
            };
            dbOperations.socialSignin(request, response, done);
        }
    })
}


passport.use(new GoogleStrategy({
    clientID: secrets.GOOGLE_CLIENT_ID,
    clientSecret: secrets.GOOGLE_CLIENT_SECRET,
    callbackURL: secrets.reqUrl + "/social/auth/google/callback",
    passReqToCallback: true,
}, signinGoogle));


router.get('/socialGoogle', function (req, res, next) {

    passport.authenticate(
        'google', {
            state: req.query.state,
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }
    )(req, res, next);
});

router.get('/socialGoogleApp', function (req, res, next) {

    req.query.appCall = true;
    passport.authenticate(
        'google', {
            state: req.query.appCall,
            scope: [
                'https://www.googleapis.com/auth/userinfo.profile',
                'https://www.googleapis.com/auth/userinfo.email'
            ]
        }
    )(req, res, next);
});

/////Token based

passport.use('googleToken', new GoogleTokenStrategy({
    clientID: secrets.GOOGLE_CLIENT_ID,
    clientSecret: secrets.GOOGLE_CLIENT_SECRET,
    callbackURL: secrets.reqUrl + "/social/auth/google/callback",
    passReqToCallback: true,
}, signinGoogle));

router.post('/auth/google', passport.authenticate('googleToken'));

/////Callback

router.get('/auth/google/callback', function (request, response) {
    passport.authenticate('google', function (req, res) {
        if (res && res.sessionid) {
            response.redirect('/?sid=' + res.sessionid);
        }
        else if (res && res.email) {
            response.redirect('/?email=false');
        }
        else {
            response.redirect('/');
        }
    })(request, response);
});


module.exports = router;