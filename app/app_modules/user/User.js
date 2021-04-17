const express = require('express');
const SignInOrUp = require('./routes/SignInOrUp.js');
const SignInOrUpFb = require('./routes/SignInOrUpFb.js');

class User {
    constructor(app) {
        this.app = app;
    }
    static router() {
        const router = express.Router();
        router.post('/login', SignInOrUp.route());
        router.post('/fb-login', SignInOrUpFb.route());
        return router;
    }
}

module.exports = User;
