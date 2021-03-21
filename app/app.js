const express = require('express');
const cors = require('cors');
const knex = require('knex');
const appConfigs = require('./configs.js');
// Rewrite console for showing timestamp
require('console-stamp')(console);
// Import `core-level` modules
const LogManager = require('./app_modules/system/libs/LogManager.js');
const AppDb = require('./app_modules/system/libs/AppDb.js');
// Import `logic-level` modules

// Setup db instance
const dbInstance = knex({
    client: 'mysql',
    connection: {
        ...appConfigs.db,
    },
});
AppDb.bindInstance(dbInstance);

// Setup base server
const app = express();
// Setup global middlewares
app.use(express.json());
app.use(cors());
// Setup routers
app.use('/example', async (req, res) => res.send('Hi!'));

// Setup global error handler, MUST use 4 inputs
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    const newErr = err;
    // log
    LogManager.error(err);
    // return response
    res.status(newErr.statusCode || 400).json({
        message: newErr.toString(),
        errorCode: newErr.errCode || null,
    }).end();
});

// Run api server
app.listen(appConfigs.base.port || 8181, () => {
    LogManager.log(`App is listening on port ${appConfigs.base.port || 8181}!`);
});
