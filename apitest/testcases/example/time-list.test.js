const axios = require('axios');
const { assert } = require('chai');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
        uuid: 1,
        name: 'gengbao',
        current: new Date().toISOString(),
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
        await db('example').insert({
            name: 'gengbao',
            timestamp: shouldMatchedData.current,
        });
    });
    // Test case
    it('Check normal response', async () => {
        // Define request data here
        const reqData = {};
        // Call api
        const { data } = await axios({
            method,
            url,
            data: reqData,
        });
        // Test
        // See: https://www.chaijs.com/api/assert/
        assert.isArray(data);
        assert.include(data[0], {
            uuid: shouldMatchedData.uuid,
            name: shouldMatchedData.name,
            timestamp: shouldMatchedData.current,
        });
    });
};

module.exports = testCases;
