'use strict';

const passport = require('passport')
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const fs = require('fs');
const googleCredentials = JSON.parse(fs.readFileSync('config/googleConfig.json', 'utf8'));

module.exports = function(app) {
    app.use(passport.initialize());

    // serialize and deserialize
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    /**
     * Use Google OAuth2 strategy
     */
    passport.use(new GoogleStrategy({
            clientID: googleCredentials.clientID,
            clientSecret: googleCredentials.clientSecret,

            callbackURL: "http://localhost:5000/auth/google/callback"
        },
        function (accessToken, refreshToken, profile, done) {
            done(null, accessToken);
        }
    ));


}