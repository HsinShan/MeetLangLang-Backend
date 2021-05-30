const axios = require('axios');
const { assert } = require('chai');
const jwt = require('../../libs/mockToken.js');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
    });
    // Generate token
    const jwtToken = jwt.generateUserToken();
    // Positive context
    describe('Positive Testing', () => {
        it('Check normal response', async () => {
            await db('User').insert({
                email: 'member1@example.com',
            });

            await db('Message').insert({
                userId: '1',
                title: 'testTitle',
                content: 'testContent',
            });
            // Define test data here
            const reqData = {
                mesgId: '1',
                content: 'testResponseContent',
            };
            // Call api
            const { data } = await axios({
                method,
                url,
                headers: {
                    token: jwtToken,
                },
                data: reqData,
            });
            assert.isObject(data);
            assert.include(data, shouldMatchedData);
        });
    });
    // Negative context
    describe('Negative Testing', () => {
        it('token problem.', async () => {
            const testData = {
                mesgId: '1',
                content: 'testResponseContent',
            };
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: {
                        token: ' ',
                    },
                    data: testData,
                });
            } catch (err) {
                const { response } = err;
                const { status } = response;
                assert.notEqual(status, 200);
            }
        });
        it('field `mesgId` should not be empty.', async () => {
            const testData = {
                mesgId: '',
                content: '-',
            };
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: {
                        token: jwtToken,
                    },
                    data: testData,
                });
            } catch (err) {
                const { response } = err;
                const { status } = response;
                assert.notEqual(status, 200);
            }
        });
        it('field `content` should not be empty.', async () => {
            const testData = {
                mesgId: '1',
                content: '',
            };
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: {
                        token: jwtToken,
                    },
                    data: testData,
                });
            } catch (err) {
                const { response } = err;
                const { status } = response;
                assert.notEqual(status, 200);
            }
        });
        it('field `mesgId` is missing.', async () => {
            const testData = {
                content: 'testResponseContent',
            };
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: {
                        token: jwtToken,
                    },
                    data: testData,
                });
            } catch (err) {
                const { response } = err;
                const { status } = response;
                assert.notEqual(status, 200);
            }
        });
        it('field `content` is missing.', async () => {
            const testData = {
                mesgId: '1',
            };
            // Call api
            try {
                await axios({
                    method,
                    url,
                    headers: {
                        token: jwtToken,
                    },
                    data: testData,
                });
            } catch (err) {
                const { response } = err;
                const { status } = response;
                assert.notEqual(status, 200);
            }
        });
    });
};

module.exports = testCases;
