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
    });
    // Positive context
    describe('Positive Testing', () => {
        it('Check response when no petInfo data in DB', async () => {
            // Define request data here
            const reqData = {};
            // Generate token
            const jwtToken = jwt.generateUserToken();
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
            assert.isArray(data);
            assert.isEmpty(data);
        });

        it('Check response when having petInfo data in DB', async () => {
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
            // Generate token
            const jwtToken = jwt.generateUserToken();
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
            assert.isArray(data);
            assert.include(data[0], {
                key: shouldMatchedData.key,
                petName: shouldMatchedData.petName,
                petSex: shouldMatchedData.petSex,
                petAge: shouldMatchedData.petAge,
                petKind: shouldMatchedData.petKind,
                petIntro: shouldMatchedData.petIntro,
                petPhoto: shouldMatchedData.petPhoto,
            });
        });
    });
    // Negative context
    describe('Negative Testing', () => {
        it('token problem.', async () => {
            const jwtToken = ' ';
            const reqData = {};
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: {
                        token: jwtToken,
                    },
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
