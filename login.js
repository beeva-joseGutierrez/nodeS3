'use strict';

const passport = require('passport');
const fs = require('fs');
const loginCredentials = JSON.parse(fs.readFileSync('config/loginConfig.json', 'utf8'));
const auth = require('./auth');

module.exports = function(app) {

    /**
     * login: check user and pass and return token
     */
    app.post('/login', function (req, res, next) {
        if (!(req.body.username === loginCredentials.username && req.body.password === loginCredentials.password)) {
            res.send(401, 'Wrong user or password');
            return;
        }

        // If login is successful sign and send the token
        const profile = {
            user: req.body.username,
            password: req.body.password,
            id: 1
        };

        res.cookie('token', auth.signToken(profile));
        res.sendStatus(200);

    });

    app.get('/loginWithGoogle', passport.authenticate('google', { scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read']
    }));

    app.get('/auth/google/callback', passport.authenticate( 'google', {
        failureRedirect: '/loginError'
    }), function(req, res) {
        //The profile is created with the data of the Google account
        const profile = {
            user: req.user.displayName,
            id: req.user.id
        };

        res.cookie('token', auth.signToken(profile));
        res.redirect('http://localhost:8080');
    });

    app.get('/loginError', function(req, res) {
        res.send('Login error');
    });

}