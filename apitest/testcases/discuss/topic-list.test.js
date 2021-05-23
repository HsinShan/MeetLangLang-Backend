const axios = require('axios');
const { assert } = require('chai');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
        key: 1,
        title: 'exampleTitle',
        date: new Date().toISOString().substring(0, 10),
        author: 'exampleName',
        // author: 先用email代替,
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
    });
    // Positive context
    describe('Positive Testing', () => {
        // Test case
        it('Check response when no discuss data in DB', async () => {
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
            assert.isEmpty(data);
        });
        it('Check response when having data in DB', async () => {
            // before this case
            await db('User').insert({
                email: 'example@gmail.com',
                name: 'exampleName',
                ssoId: 'exampleSsoId',
            });

            await db('Message').insert({
                userId: 1,
                content: 'exampleContent',
                title: 'exampleTitle',
            });
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
                key: shouldMatchedData.key,
                title: shouldMatchedData.title,
                author: shouldMatchedData.author,
            });
            assert.equal(data[0].date.substring(0, 10), shouldMatchedData.date);
        });
    });
    // Negative context
    describe('Negative Testing', () => {});
};

module.exports = testCases;
