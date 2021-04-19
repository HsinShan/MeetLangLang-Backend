const express = require('express');
const GetFavoriteList = require('./routes/GetFavoriteList.js');
const AddFavorite = require('./routes/AddFavorite.js');

class Pet {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.get('/favorites', GetFavoriteList.route());
        router.post('/favorites', AddFavorite.route());
        return router;
    }
}

module.exports = Pet;
