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
    });
    // Test case
    it('Check normal response', async () => {
        const jwtToken = jwt.generateUserToken();
        //console.log(jwtToken);
        // Define test data here
        const testData = {
            userId: 1,
            title: 'testTitle',
            content: 'testContent',
        };
       // console.log(testData);
        // Call api
        const { data } = await axios({
            method,
            url,
            headers: { 
                token: jwtToken
            },
            data: testData,
        });
        console.log(data);
        // Test
        // See: https://www.chaijs.com/api/assert/
        assert.isObject(data);
        assert.include(data, shouldMatchedData);
    });
};

module.exports = testCases;

