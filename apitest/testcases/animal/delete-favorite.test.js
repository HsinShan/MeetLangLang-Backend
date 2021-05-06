const axios = require('axios');
const { assert } = require('chai');
const jwt = require('../../libs/mockToken.js');

const testCases = (db, method, url) => () => {
    // Generate test token
    const token = jwt.generateUserToken();
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

        await db('AnimalInfo').insert(
            [{
                animal_id: 123, animal_sex: 'F', animal_kind: '狗', animal_colour: '黑色', animal_sterilization: 'F',
            },
            {
                animal_id: 456, animal_sex: 'M', animal_kind: '貓',
            }]
        );

        await db('FavoriteMap').insert([
            { uuid: 1, animal_id: 123 },
            { uuid: 1, animal_id: 456 },
        ]);
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
    it('Check deletion process', async () => {
        // Define request data here
        const reqData = {
            animalId: 123,
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
    // Test case 4
    it('Reject if permission denied', async () => {
        // Define request data here
        const reqData = {
            animalId: 123,
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
};

module.exports = testCases;
