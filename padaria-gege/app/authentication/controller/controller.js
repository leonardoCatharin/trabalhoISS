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
                data.data = new Date();
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
    var token = req.body.token || req.query.token || req.headers['token'];
    if (token) {
        jwt.verify(token, app.get('tokenWord'), (err, decoded) => {
            if (err) {
                return res.status(403).send({success: false, message: 'Failed to authenticate token.'});
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        console.log(403)
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

}
