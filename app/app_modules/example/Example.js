const express = require('express');
const Hello = require('./routes/Hello.js');
const AddTimeToDb = require('./routes/AddTimeToDb.js');

class Example {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.get('/hello', Hello.route());
        router.post('/time/add', AddTimeToDb.route());
        return router;
    }
}

module.exports = Example;
