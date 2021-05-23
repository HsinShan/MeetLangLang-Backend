const axios = require('axios');
const { assert } = require('chai');
const jwt = require('../../libs/mockToken.js');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
        animal_id: 123,
        animal_sex: 'F',
        animal_kind: '狗',
        animal_colour: '黑色',
        animal_sterilization: 'F',
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
        await db('User').insert([
            { uuid: 1, email: 'member1@example.com' },
            { uuid: 2, email: '2@mail.com' },
        ]);

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
            { uuid: 2, animal_id: 456 },
        ]);
    });
    // Put global vars or functions here
    const token = jwt.generateUserToken();
    // Positive context
    describe('Positive Testing', () => {
        // Test case 2
        it('Check returned animal info', async () => {
            // Call api
            const { data } = await axios({
                method,
                url,
                headers: { token },
            });
            // Test
            // See: https://www.chaijs.com/api/assert/
            assert.isArray(data.animalInfo);
            assert.include(data.animalInfo[0], {
                animal_id: shouldMatchedData.animal_id,
                animal_sex: shouldMatchedData.animal_sex,
                animal_kind: shouldMatchedData.animal_kind,
                animal_colour: shouldMatchedData.animal_colour,
                animal_sterilization: shouldMatchedData.animal_sterilization,
            });
        });
    });
    // Negative context
    describe('Negative Testing', () => {
        // Test case 1
        it('Reject if token is missing', async () => {
            // Define request data here
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: {},
                });
            } catch (err) {
                const { response } = err;
                const { status } = response;
                assert.equal(status, 400);
            }
        });
    });
};

module.exports = testCases;
