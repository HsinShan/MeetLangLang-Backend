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
        await db('User').insert({ 
            uuid: '111',
        });
    });
    
    it('Check Save Pet Success', async () => {
        // Define test data here
        const testData = {
            uuid: '111',
            petId: '222',
            sex: 'male',
            kind: 'cat',
            color: 'gray',
            sterilization: 'false',
            remark: 'none',
            tel: '091234545',
            address: '123456',
            place: '123',
            picture: '',
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