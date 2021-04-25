const express = require('express');
const GetFavoriteList = require('./routes/GetFavoriteList.js');
const AddFavorite = require('./routes/AddFavorite.js');
const DeleteFavorite = require('./routes/DeleteFavorite.js');
// Middlewares
const AuthMiddleware = require('../user/middlewares/AuthMiddleware.js');

class Animal {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.get('/favorites', AuthMiddleware.verify(), GetFavoriteList.route());
        router.post('/favorites', AuthMiddleware.verify(), AddFavorite.route());
        router.delete('/favorites', AuthMiddleware.verify(), DeleteFavorite.route());
        return router;
    }
}

module.exports = Animal;
