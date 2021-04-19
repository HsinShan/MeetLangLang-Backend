const express = require('express');
const AddTopic = require('./routes/AddTopic.js');
// Middlewares
const AuthMiddleware = require('../user/middlewares/AuthMiddleware.js');

class Discuss {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.post('/topic', AuthMiddleware.verify(), AddTopic.route());
        return router;
    }
}

module.exports = Discuss;
