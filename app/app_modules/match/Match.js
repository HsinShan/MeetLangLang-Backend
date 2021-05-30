const express = require('express');
const GetTime = require('./routes/GetTime.js');
const GetMatch = require('./routes/GetMatch.js');
const AddMatch = require('./routes/AddMatch.js');
// Middlewares
const AuthMiddleware = require('../user/middlewares/AuthMiddleware.js');

class Match {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.get('/time', AuthMiddleware.verify(), GetTime.route());
        router.get('/list', AuthMiddleware.verify(), GetMatch.route());
        router.post('/add', AuthMiddleware.verify(), AddMatch.route());
        return router;
    }
}

module.exports = Match;
