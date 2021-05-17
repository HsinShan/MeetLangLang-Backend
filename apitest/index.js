const knex = require('knex');
const knexCleaner = require('knex-cleaner');
// Load testcases
const getExampleHello = require('./testcases/example/hello.test.js');
const postExampleTimeAdd = require('./testcases/example/time-add.test.js');
const getExampleTimeList = require('./testcases/example/time-list.test.js');
const postUserLogin = require('./testcases/user/login.test.js');
const getAnimalFavorites = require('./testcases/animal/get-favorite.test.js');
const deleteAnimalFavorites = require('./testcases/animal/delete-favorite.test.js');
const addAnimalFavorites = require('./testcases/animal/add-favorite.test.js');
const getDiscussTopic = require('./testcases/discuss/topic-list.test.js');
const postDiscussTopic = require('./testcases/discuss/topic-add.test.js');
const getDiscussTopicDetail = require('./testcases/discuss/topic-detail-get.test.js');
const addPet = require('./testcases/pet/add-pet.test.js');
const getPetInfo = require('./testcases/pet/pet-info.test.js');
const postResponse = require('./testcases/response/response-add.test.js');

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
    describe('GET /animal/favorites', getAnimalFavorites(db, 'GET', `${host}/animal/favorites`));
    describe('DELETE /animal/favorites', deleteAnimalFavorites(db, 'DELETE', `${host}/animal/favorites`));
    describe('POST /animal/favorites', addAnimalFavorites(db, 'POST', `${host}/animal/favorites`));
    describe('GET /discuss/topic/list', getDiscussTopic(db, 'GET', `${host}/discuss/topic/list`));
    describe('POST /discuss/topic', postDiscussTopic(db, 'POST', `${host}/discuss/topic`));
    describe('GET /discuss/topic/detail', getDiscussTopicDetail(db, 'GET', `${host}/discuss/topic/detail`));
    describe('POST /pet', addPet(db, 'POST', `${host}/pet`));
    describe('GET /pet/info', getPetInfo(db, 'Get', `${host}/pet/info`));
    describe('POST /response', postResponse(db, 'POST', `${host}/response`));
});
