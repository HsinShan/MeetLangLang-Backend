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
            email: 'member1@example.com',
        });
    });
    // Test case
    it('Check normal response', async () => {
        const jwtToken = jwt.generateUserToken();
        // Define test data here
        const testData = {
            userId: 1,
            title: 'testTitle',
            content: 'testContent',
        };
        // Call api
        const { data } = await axios({
            method,
            url,
            headers: { 
                token: jwtToken
            },
            data: testData,
        });
        // Test
        // See: https://www.chaijs.com/api/assert/
        assert.isObject(data);
        assert.include(data, shouldMatchedData);
    });
};

module.exports = testCases;

