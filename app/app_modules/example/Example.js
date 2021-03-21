const express = require('express');
const Hello = require('./routes/Hello.js');

class Example {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.get('/hello', Hello.route());
        return router;
    }
}

module.exports = Example;
