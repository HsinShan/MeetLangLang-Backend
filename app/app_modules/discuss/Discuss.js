const express = require('express');
const AddTopic = require('./routes/AddTopic.js');
const GetTopic = require('./routes/GetTopic.js');
const GetTopicDetail = require('./routes/GetTopicDetail.js');
// Middlewares
const AuthMiddleware = require('../user/middlewares/AuthMiddleware.js');

class Discuss {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.post('/topic', AuthMiddleware.verify(), AddTopic.route());
        router.get('/topic/get', GetTopic.route());
        router.get('/topic/detail/:messageId', GetTopicDetail.route());
        return router;
    }
}

module.exports = Discuss;
