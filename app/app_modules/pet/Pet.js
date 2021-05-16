const express = require('express');
const AddPet = require('./routes/AddPet.js');
const GetPet = require('./routes/GetPet.js');
const DrawPet = require('./routes/DrawPet.js');
// Middlewares
const AuthMiddleware = require('../user/middlewares/AuthMiddleware.js');

class Pet {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.post('', AuthMiddleware.verify(), AddPet.route());
        router.get('/info', AuthMiddleware.verify(), GetPet.route());
        router.post('/draw', AuthMiddleware.verify(), DrawPet.route());
        return router;
    }
}

module.exports = Pet;
