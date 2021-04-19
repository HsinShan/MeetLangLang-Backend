const axios = require('axios');
const { assert } = require('chai');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData_1 = {
        result: 'true',
        petInfo: [
            {
                petId: '333',
                sex: 'Female',
                kind: 'Dog',
                color: null,
                sterilization: null,
                tel: null,
                address: null,
                place: null,
                picture: null,
                remark: null
            }
        ]
    };

    const shouldMatchedData_2 = {
        result: 'false',
    };

    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
        await db('User').insert(
            { uuid: '111'},
            { uuid: '222' });
        await db('PetInfo').insert({
            petId: '333',
            sex: 'Female',
            kind: 'Dog',
        },
        {
            petId: '444',
            kind: 'Cat',
        });
        await db('FavoriteMap').insert({
            uuid: '111',
            petId: '333',
        });
    });
    
    const logic_userhassavedpet = async () => {
        // Define request data here
        const reqData = {
            uuid: '111',
        };
        // Call api
        const { data } = await axios({
            method,
            url,
            data: reqData,
        });
        // See: https://www.chaijs.com/api/assert/
        assert.isTrue('result' in data);
        assert.isTrue('petInfo' in data);
        assert.include(data, shouldMatchedData_1);
    };

    const logic_usernothavesavedpet = async () => {
        // Define request data here
        const reqData = {
            uuid: '222',
        };
        // Call api
        const { data } = await axios({
            method,
            url,
            data: reqData,
        });
        // See: https://www.chaijs.com/api/assert/
        assert.isTrue('result' in data);
        assert.include(data, shouldMatchedData_2);
    };
    // Test case 1
    it('User has saved pet', logic_userhassavedpet);
    // Test case 2
    it('User has not saved pet', logic_usernothavesavedpet);
    // Test case 3
};

module.exports = testCases;