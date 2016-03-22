'use strict';
const expressJwt = require('express-jwt');

const auth = {
    secret: 'secret',

    check: function(req, res, next) {
        //TODO Cookies
        if(req.body && req.body.hasOwnProperty('token')) {
            req.headers.authorization = 'Bearer ' + req.body.token;
        }

        let jwtCheck = expressJwt({
            secret: 'secret'
        });

        jwtCheck(req, res, next);
    },

    validate: function(req, res) {
        res.json({validate: 'ok'});
    }

}

module.exports=auth;