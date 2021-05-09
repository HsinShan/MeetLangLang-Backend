const express = require('express');
const AddResponse = require('./routes/AddResponse.js');
// Middlewares
const AuthMiddleware = require('../user/middlewares/AuthMiddleware.js');

class Response {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.post('', AuthMiddleware.verify(), AddResponse.route());
        return router;
    }
}

module.exports = Response;
