const fs = require('fs');
const https = require('https');
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const { createProxyMiddleware } = require('http-proxy-middleware');
const appConfigs = require('./configs.js');
// Rewrite console for showing timestamp
require('console-stamp')(console);
// Import `core-level` modules
const LogManager = require('./app_modules/system/libs/LogManager.js');
const AppDb = require('./app_modules/system/libs/AppDb.js');
// Import `logic-level` modules
const Example = require('./app_modules/example/Example.js');
const User = require('./app_modules/user/User.js');

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
app.use(express.urlencoded({ extended: true }));
// Setup routers
app.use('/example', Example.router());
app.use('/user', User.router());

// Proxy endpoints
const ANIMAL_API_SERVICE_URL = 'https://data.coa.gov.tw/Service/OpenData/TransService.aspx?UnitId=QcbUEzN6E6DL';
app.use('/animal/get', createProxyMiddleware({
    target: ANIMAL_API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/animal/get': '',
    },
}));

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
const port = appConfigs.base.port || 8181;
const server = https.createServer({
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
    cert: fs.readFileSync(process.env.SSL_CERT_FILE),
}, app);
server.listen(port, () => {
    LogManager.log(`App is listening on port ${port} by https!`);
});
