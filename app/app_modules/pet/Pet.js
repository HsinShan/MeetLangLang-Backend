const express = require('express');
const AddPet = require('./routes/AddPet.js');
// Middlewares
const AuthMiddleware = require('../user/middlewares/AuthMiddleware.js');

class Pet {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.post('', AuthMiddleware.verify(), AddPet.route());
        return router;
    }
}

module.exports = Pet;
