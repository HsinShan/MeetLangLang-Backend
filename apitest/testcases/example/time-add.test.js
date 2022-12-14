const axios = require('axios');
const { assert } = require('chai');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
        success: true,
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
    });
    // Test case
    it('Check normal response', async () => {
        // Define test data here
        const testData = {
            name: 'gengbao',
        };
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
};

module.exports = testCases;
