const axios = require('axios');
const { assert } = require('chai');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
        key: 1,
        title: 'Example Title',
        date: new Date().toISOString().substring(0, 10),
        author: 'member1',
        content: 'Example Content...',
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
    });

    // Positive context
    describe('Positive Testing', () => {
        it('Check normal response', async () => {
            await db('User').insert({
                uuid: 1,
                email: 'member1@example.com',
                name: 'member1',
            });

            await db('Message').insert({
                uuid: 1,
                userId: 1,
                content: 'Example Content...',
                title: 'Example Title',
            });

            // Call api
            const { data } = await axios({ method, url: `${url}/${shouldMatchedData.key}` });
            assert.isArray(data);
            assert.include(data[0], {
                key: shouldMatchedData.key,
                title: shouldMatchedData.title,
                content: shouldMatchedData.content,
                author: shouldMatchedData.author,
            });
            assert.equal(data[0].date.substring(0, 10), shouldMatchedData.date);
        });
    });
    // Negative context
    describe('Negative Testing', () => {});
};

module.exports = testCases;
