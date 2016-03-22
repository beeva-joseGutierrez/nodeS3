'use strict';

//const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const fs = require('fs');
const loginCredentials = JSON.parse(fs.readFileSync('config/loginConfig.json', 'utf8'));

module.exports = function(app) {

    /**
     * login: check user and pass and return token
     */
    app.post('/login', function (req, res, next) {
        if (!(req.body.username === loginCredentials.username && req.body.password === loginCredentials.password)) {
            res.send(401, 'Wrong user or password');
            return;
        }

        // Build and send the token
        const profile = {
            first_name: 'user',
            id: 1
        };
        let token = jwt.sign(profile, 'secret', {expiresIn: 60 * 60 * 5});

        res.send({token: token});

    });


    app.get('/loginWithGoogle', function (req, res, next) {

        /**
         * Call authenticate function with the strategy selected
         */
        passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/drive'}, function(req, res) {
            console.log(req);
            console.log(res);
        })(req, res, next);

    });


    app.get('/auth/google/callback', function(req, res, next) {
        console.log(req.query);
        res.send({code: req.query.code});
    });

}