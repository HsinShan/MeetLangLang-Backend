const axios = require('axios');
const { assert } = require('chai');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
        email: 'member1@example.com',
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
    });
    // Reused functions
    const logicOfNormalCheck = async () => {
        // Define request data here
        const reqData = {
            email: 'member1@example.com',
        };
        // Call api
        const { data } = await axios({
            method,
            url,
            data: reqData,
        });
        // See: https://www.chaijs.com/api/assert/
        // Test 1
        assert.isTrue('token' in data);
        // Test 2
        const { token } = data;
        const decodedToken = Buffer.from(token.split('.')[1], 'base64').toString();
        const objToken = JSON.parse(decodedToken);
        assert.isTrue('id' in objToken);
        // Test 3
        assert.include(objToken, {
            id: shouldMatchedData.email,
        });
    };
    // Test case 1
    it('Unregistered user login', logicOfNormalCheck);
    // Test case 2
    it('Registered user login', logicOfNormalCheck);
    // Test case 3
    it('Reject if required field are missing', async () => {
        // Define request data here
        const reqData = {};
        // Call api
        try {
            await axios({
                method,
                url,
                data: reqData,
            });
        } catch (err) {
            const { response } = err;
            const { status } = response;
            // Test 1
            assert.notEqual(status, 200);
        }
    });
};

module.exports = testCases;
