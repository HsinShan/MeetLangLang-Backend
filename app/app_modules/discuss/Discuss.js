const express = require('express');
const AddTopic = require('./routes/AddTopic.js');

class Discuss {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.post('/topic', AddTopic.route());
        return router;
    }
}

module.exports = Discuss;
