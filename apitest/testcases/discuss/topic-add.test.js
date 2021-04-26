const axios = require('axios');
const { assert } = require('chai');
const jwt = require('../../libs/mockToken.js');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
    };

    // Positive context
    describe('Positive Testing', () => {
        // Before test case
        before(async () => {
            // If you want to add sample data into database
            await db('User').insert({
                email: 'member1@example.com',
            });
        });
        it('Check normal response', async () => {
            const jwtToken = jwt.generateUserToken();
            // Define test data here
            const testData = {
                // userId: 1,
                title: 'testTitle',
                content: 'testContent',
            };
            // Call api
            const { data } = await axios({
                method,
                url,
                headers: {
                    token: jwtToken,
                },
                data: testData,
            }).catch((err) => {
                console.log('err', err);
            });
            assert.isObject(data);
            assert.include(data, shouldMatchedData);
        });
    });
    // Negative context
    describe('Negative Testing', () => {
        it('token problem.', async () => {
            const jwtToken = ' ';
            const testData = {
                title: 'testTitle',
                content: 'testContent',
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
    it('field `title` should not be empty.', async () => {
        const jwtToken = jwt.generateUserToken();
        const testData = {
            title: '',
            content: 'testContent',
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
        const jwtToken = jwt.generateUserToken();
        const testData = {
            userId: 1,
            title: 'testTitle',
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
    it('field `title` is missing.', async () => {
        const jwtToken = jwt.generateUserToken();
        const testData = {
            content: 'testContent',
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
        const jwtToken = jwt.generateUserToken();
        const testData = {
            title: 'testTitle',
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
