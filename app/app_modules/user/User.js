const express = require('express');
const SignInOrUp = require('./routes/SignInOrUp.js');

class User {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.post('/login', SignInOrUp.route());
        return router;
    }
}

module.exports = User;
