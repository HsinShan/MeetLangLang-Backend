const express = require('express');
const AuthMiddleware = require('../user/middlewares/AuthMiddleware.js');
const GetFavoriteList = require('./routes/GetFavoriteList.js');
const AddFavorite = require('./routes/AddFavorite.js');

class Pet {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.get('/favorites', AuthMiddleware.verify(), GetFavoriteList.route());
        router.post('/favorites', AuthMiddleware.verify(), AddFavorite.route());
        return router;
    }
}

module.exports = Pet;
