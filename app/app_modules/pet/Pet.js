const express = require('express');
const AddFavorite = require('./routes/AddFavorite.js');
const GetFavoriteList = require('./routes/GetFavoriteList.js');

class Pet {
    constructor(app) {
        this.app = app;
    }

    static router() {
        const router = express.Router();
        router.post('/favorites', AddFavorite.route());
        router.get('/favorites', GetFavoriteList.route());
        return router;
    }
}

module.exports = Pet;
