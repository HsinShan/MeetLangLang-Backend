const knex = require('knex');
const knexCleaner = require('knex-cleaner');
// Load testcases
const getExampleHello = require('./testcases/example/hello.test.js');
const postExampleTimeAdd = require('./testcases/example/time-add.test.js');

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

    // Test cases
    describe('GET /example/hello', getExampleHello(db, 'GET', `${host}/example/hello`));
    describe('POST /example/time/add', postExampleTimeAdd(db, 'POST', `${host}/example/time/add`));
});
