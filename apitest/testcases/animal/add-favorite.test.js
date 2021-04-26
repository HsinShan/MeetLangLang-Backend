const jwt = require('jsonwebtoken');
const axios = require('axios');
const { assert } = require('chai');
const appConfigs = require('../../configs.js');

const testCases = (db, method, url) => () => {
    // Generate test token
    const { secret } = appConfigs.token;
    const token = jwt.sign({ uuid: 1, email: '1@mail.com' }, secret, { expiresIn: '1m' });
    // You can define matched data here
    const shouldMatchedData = {
        success: true,
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
        await db('User').insert({
            uuid: 1,
            email: '1@mail.com',
        });
    });
    // Test case 1
    it('Reject if token is missing', async () => {
        // Define request data here
        const reqData = {
            animalId: 123,
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
            assert.notEqual(status, 200);
        }
    });
    // Test case 2
    it('Reject if animalId is missing', async () => {
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
            const { status } = response;
            assert.notEqual(status, 200);
        }
    });
    // Test case 3
    it('Reject if permission denied', async () => {
        // Define request data here
        const reqData = {
            animalId: 123,
            sex: 'F',
            kind: '狗',
            colour: '黑色',
            sterilization: 'F',
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
    // Test case 4
    it('Check add favorite animal process', async () => {
        // Define request data here
        const reqData = {
            animalId: 123,
            sex: 'F',
            kind: '狗',
            colour: '黑色',
            sterilization: 'F',
        };
        // Call api
        const { data } = await axios({
            method,
            url,
            headers: { token },
            data: reqData,
        });
        // Test
        // See: https://www.chaijs.com/api/assert/
        assert.include(data, shouldMatchedData);
    });
};

module.exports = testCases;
