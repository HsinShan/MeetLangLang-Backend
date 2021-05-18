const axios = require('axios');
const { assert } = require('chai');
const jwt = require('../../libs/mockToken.js');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
        key: 1,
        petName: 'exName',
        petSex: 'exSex',
        petAge: 'exAge',
        petKind: 'exKind',
        petIntro: 'exIntro',
        petPhoto: 'exPhoto',
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
        await db('User').insert({
            email: 'member1@example.com',
        });
        await db('User').insert({
            email: 'member2@example.com',
        });
    });
    // Generate token
    const jwtToken = jwt.generateUserToken();
    // Positive context
    describe('Positive Testing', () => {
        it('Check response when no petInfo data in DB', async () => {
            // Define request data here
            const reqData = {};
            // Call api
            const { data } = await axios({
                method,
                url,
                headers: {
                    token: jwtToken,
                },
                data: reqData,
            });
            // Test
            // See: https://www.chaijs.com/api/assert/
            assert.isObject(data);
            assert.isEmpty(data);
        });
        it('Check response when having petInfo which was added by others in DB', async () => {
            // before this case
            await db('PetInfo').insert({
                userId: 2,
                petName: 'exName',
                petSex: 'exSex',
                petAge: 'exAge',
                petKind: 'exKind',
                petIntro: 'exIntro',
                petPhoto: 'exPhoto',
            });
            // Define request data here
            const reqData = {};
            // Call api
            const { data } = await axios({
                method,
                url,
                headers: {
                    token: jwtToken,
                },
                data: reqData,
            });
            // Test
            // See: https://www.chaijs.com/api/assert/
            assert.isObject(data);
            assert.include(data, {
                key: shouldMatchedData.key,
                petName: shouldMatchedData.petName,
                petSex: shouldMatchedData.petSex,
                petAge: shouldMatchedData.petAge,
                petKind: shouldMatchedData.petKind,
                petIntro: shouldMatchedData.petIntro,
                petPhoto: shouldMatchedData.petPhoto,
            });
        });
        it('Check response when having petInfo which was added by user self in DB', async () => {
            // before this case
            await db('PetInfo').insert({
                userId: 1,
                petName: 'exName',
                petSex: 'exSex',
                petAge: 'exAge',
                petKind: 'exKind',
                petIntro: 'exIntro',
                petPhoto: 'exPhoto',
            });
            // Define request data here
            const reqData = {};
            // Call api
            const { data } = await axios({
                method,
                url,
                headers: {
                    token: jwtToken,
                },
                data: reqData,
            });
            // Test
            // See: https://www.chaijs.com/api/assert/
            assert.isObject(data);
            assert.isEmpty(data);
        });
    });
    // Negative context
    describe('Negative Testing', () => {
        it('token problem.', async () => {
            const reqData = {};
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: {
                        token: ' ',
                    },
                    data: reqData,
                });
            } catch (err) {
                const { response } = err;
                const { status } = response;
                assert.notEqual(status, 200);
            }
        });
        it('token is missing.', async () => {
            const reqData = {};
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: {},
                    data: reqData,
                });
            } catch (err) {
                const { response } = err;
                const { status } = response;
                assert.notEqual(status, 200);
            }
        });
    });
};

module.exports = testCases;
