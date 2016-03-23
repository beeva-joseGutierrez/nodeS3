'use strict';
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const jwtConfig = JSON.parse(fs.readFileSync('config/jwtConfig.json', 'utf8'));

const auth = {
    secret: jwtConfig.secret,

    check: function(req, res, next) {
        if(!req.cookies.token) {
            return res.status(401).send('Cannot find token in cookies');
        }
        req.headers.authorization = 'Bearer ' + req.cookies.token;

        let jwtCheck = expressJwt({
            secret: auth.secret
        });

        jwtCheck(req, res, next);
    },

    signToken: function(profile) {
        return jwt.sign(profile, auth.secret, {expiresIn: 60 * 60 * 5});
    },

    validate: function(req, res) {
        res.json({validate: 'ok'});
    }

}

module.exports=auth;