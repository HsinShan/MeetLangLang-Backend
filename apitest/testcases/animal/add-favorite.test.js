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
            uuid: 1,
            email: 'member1@example.com',
        });
    });
    // Put global vars or functions here
    const token = jwt.generateUserToken();
    // Positive context
    describe('Positive Testing', () => {
        // Test case 4
        it('Check add favorite animal process', async () => {
            // Define request data here
            const reqData = {
                animalId: 123,
                sex: 'F',
                kind: '狗',
                colour: '黑色',
                sterilization: 'F',
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
    });
    // Negative context
    describe('Negative Testing', () => {
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
                assert.equal(status, 400);
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
                const { data } = response;
                assert.equal(data.errorCode, 221);
            }
        });
        // Test case 3
        it('Reject if permission denied', async () => {
            // Define request data here
            const reqData = {
                animalId: 123,
                sex: 'F',
                kind: '狗',
                colour: '黑色',
                sterilization: 'F',
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
        // Test case 5 - Dynamic test case to test each fields
        describe('Missing Field Tests', () => {
            // Declare fields to be tested
            const fields = {
                sex: 'F',
                kind: '狗',
                colour: '黑色',
                sterilization: 'F',
                shelter_tel: '4567',
                shelter_address: 'testaddress',
                animal_place: '新竹市',
                album_file: 'testurl',
                animal_remark: 'testremark',
            };
            const fieldKey = Object.keys(fields);
            // Delete each field on loop
            for (let i = 0; i < fieldKey.length; i += 1) {
                const newfields = { ...fields };
                delete newfields[fieldKey[i]];
                it(`Missing ${fieldKey[i]} field`, async () => {
                    // Call api
                    const animalId = { animalId: i };
                    const sendData = { ...animalId, ...newfields };
                    const { data } = await axios({
                        method,
                        url,
                        headers: { token },
                        data: sendData,
                    });
                    assert.include(data, shouldMatchedData);
                });
            }
        });
    });
};

module.exports = testCases;
