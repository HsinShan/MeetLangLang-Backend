const axios = require('axios');
const { assert } = require('chai');
const jwt = require('../../libs/mockToken.js');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
        success: true,
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
        await db('User').insert({
            uuid: 1,
            email: 'member1@example.com',
        });
    });
    // Put global vars or functions here
    const token = jwt.generateUserToken();
    // Positive context
    describe('Positive Testing', () => {
        // Test case 4
        it('Check add pet process', async () => {
            // Define request data here
            const reqData = {
                petName: 'testPet',
                petSex: 'Female',
                petAge: 5,
                petKind: 'Cat',
                petIntro: 'Likes Fish',
                petPhoto: 'fakeurl',
            };
            // Call api
            const { data } = await axios({
                method,
                url,
                headers: { token },
                data: reqData,
            });
            assert.include(data, shouldMatchedData);
        });
    });
    // Negative context
    describe('Negative Testing', () => {
        // Test case 1
        it('Reject if token is missing', async () => {
            // Define request data here
            const reqData = {
                petName: 'testpet',
            };
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
                assert.equal(status, 400);
            }
        });
        // Test case 2
        it('Reject if petName is missing', async () => {
            // Define request data here
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: { token },
                    data: {},
                });
            } catch (err) {
                const { response } = err;
                const { data } = response;
                assert.equal(data.errorCode, 521);
            }
        });
        // Test case 3
        it('Reject if permission denied', async () => {
            // Define request data here
            const reqData = {
                petName: 'testPet',
            };
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: { token: 'testbadtoken' },
                    data: reqData,
                });
            } catch (err) {
                const { response } = err;
                const { status } = response;
                assert.equal(status, 401);
            }
        });
        // Test case 5
        it('Check petName should not be empty', async () => {
            // Define request data here
            const reqData = {
                petName: '',
            };
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: { token },
                    data: reqData,
                });
            } catch (err) {
                const { response } = err;
                const { data } = response;
                assert.equal(data.errorCode, 522);
            }
        });
    });
};

module.exports = testCases;
