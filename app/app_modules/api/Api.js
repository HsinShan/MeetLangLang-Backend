const express = require('express');
const SignInOrUp = require('./routes/SignInOrUp.js');

class Api {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.post('/user/login', SignInOrUp.route());
        /*
        router.get('/user/login', User.route());
        router.put('/user/login', User.route());
        router.delete('/user/login', User.route());
        */

        return router;
    }
}

module.exports = Api;
