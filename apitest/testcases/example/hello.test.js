const axios = require('axios');
const { assert } = require('chai');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
        message: 'Hello World!',
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
    });
    // Positive context
    describe('Positive Testing', () => {
        // Test case
        it('Check normal response', async () => {
            // Define test data here
            const testData = {};
            // Call api
            const { data } = await axios({
                method,
                url,
                data: testData,
            });
            // Test
            // See: https://www.chaijs.com/api/assert/
            assert.isObject(data);
            assert.include(data, shouldMatchedData);
        });
    });
    // Negative context
    describe('Negative Testing', () => {});
};

module.exports = testCases;
