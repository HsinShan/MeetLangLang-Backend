const knex = require('knex');
const knexCleaner = require('knex-cleaner');

const db = knex({
    client: 'mysql',
    connection: {
        host: 'mll-mysql',
        user: 'app',
        password: 'mllapp',
        database: 'mllapp',
    },
});
const host = 'http://mll-api:8181';

describe('API testing...', () => {
    beforeEach(async () => {
        console.log(host);
        await knexCleaner.clean(db);
    });
});
