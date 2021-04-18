const configs = {
    base: {
        port: 8181,
    },
    db: {
        host: 'mll-mysql',
        user: 'app',
        password: 'mllapp',
        database: 'mllapp',
    },
    token: {
        secret: 'ntusdm2021stoneocean',
        expiresIn: '30days',
    },
};

module.exports = configs;
