const express = require('express');
const SignInOrUp = require('./routes/SignInOrUp.js');

class Api {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.post('/user/login', SignInOrUp.route());
        return router;
    }
}

module.exports = Api;
