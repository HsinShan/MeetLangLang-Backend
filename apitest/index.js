const knex = require('knex');
const knexCleaner = require('knex-cleaner');
// Load testcases
const getExampleHello = require('./testcases/example/hello.test.js');
const postExampleTimeAdd = require('./testcases/example/time-add.test.js');
const getExampleTimeList = require('./testcases/example/time-list.test.js');
const postUserLogin = require('./testcases/user/login.test.js');
const postDiscussTopic = require('./testcases/discuss/topic-add.test.js');

const db = knex({
    client: 'mysql',
    connection: {
        host: 'mll-mysql',
        user: 'app',
        password: 'mllapp',
        database: 'mllapp',
    },
});
const host = 'https://mll-api:8181';
console.log(host);

describe('API testing...', () => {
    beforeEach(async () => {
        await knexCleaner.clean(db);
    });

    // Test cases
    describe('GET /example/hello', getExampleHello(db, 'GET', `${host}/example/hello`));
    describe('POST /example/time/add', postExampleTimeAdd(db, 'POST', `${host}/example/time/add`));
    describe('GET /example/time/list', getExampleTimeList(db, 'GET', `${host}/example/time/list`));
    describe('POST /user/login', postUserLogin(db, 'POST', `${host}/user/login`));
    describe('POST /discuss/topic', postDiscussTopic(db, 'POST', `${host}/discuss/topic`));
});
