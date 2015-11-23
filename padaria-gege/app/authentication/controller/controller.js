'use strict';
let Service = require('../service/service')
    , jwt = require('jsonwebtoken')
    , app = require('express')();
app.set('tokenWord', 'g2g23g2nba3mNLkj');

module.exports = {
    authenticate,
    validateToken
}

function authenticate(req, res) {
    Service.authenticate(req.body, (err, data) => {
        if (err) res.status(500).send(err);
        if (!data) {
            res.status(403).send('Authentication failed. User not found.')
        } else if (data) {
            if (data.senha != req.body.senha) {
                res.status(403).send('Authentication failed. Wrong password.')
            } else {
                let token = jwt.sign(data, app.get('tokenWord'), {
                    expiresIn: 1000
                });

                res.json({
                    success: true,
                    message: 'Token OK!',
                    token: token
                });
            }
        }
    });
}

function validateToken(req, res, next) {
    console.log('token \n\n\n\n\n\n')
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log('token', token)
    if (token) {
        jwt.verify(token, app.get('tokenWord'), (err, decoded) => {
            console.log('validate', err, decoded)
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

}