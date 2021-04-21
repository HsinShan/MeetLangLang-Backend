const axios = require('axios');
const { assert } = require('chai');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
        key: 1,
        Title: 'title_example',
        date: new Date().toISOString(),
        author: 'example@gmail.com',
        // author: 先用email代替,
    };
    // Before test case
    beforeEach(async () => {
        // If you want to add sample data into database
    });
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
        assert.include(data, []);
    });

    it('Check response when having data in DB', async () => {
        // before this case
        before(async () => {
            await db('User').insert({
                email: 'example@gmail.com',
                ssoId: 'ssoId_example',
            });

            await db('Message').insert({
                userId: 1,
                time: shouldMatchedData.date,
                content: 'content_example',
                title: 'title_example',
            });
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
            Title: shouldMatchedData.Title,
            date: shouldMatchedData.date,
            author: shouldMatchedData.author,
        });
    });
};

module.exports = testCases;
