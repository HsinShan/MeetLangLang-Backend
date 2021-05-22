const axios = require('axios');
const { assert } = require('chai');

const testCases = (db, method, url) => () => {
    const pathVar = { mesgId: 1 };
    const shouldMatchedData = {
        respId: 1,
        time: new Date().toISOString().substring(0, 10),
        author: 'testauthor',
        content: 'testcontent1',
    };
    beforeEach(async () => {
        await db('User').insert({
            email: 'member1@example.com',
            name: 'testauthor',
        });

        await db('Message').insert({
            userId: '1',
            title: 'testTitle',
            content: 'testContent',
        });

        await db('MesgResponse').insert([
            { userId: 1, mesgId: 1, content: 'testcontent1' },
            { userId: 1, mesgId: 2, content: 'testcontent2' },
        ]);
    });

    it('Check normal response fields', async () => {
        const { data } = await axios({
            method,
            url: `${url}/${pathVar.mesgId}`,
        });
        assert.isArray(data);
        assert.include(data[0], {
            respId: shouldMatchedData.respId,
            author: shouldMatchedData.author,
            content: shouldMatchedData.content,
        });
        assert.equal(data[0].time.substring(0, 10), shouldMatchedData.time);
    });

    it('Check fetch response data error', async () => {
        try {
            await axios({
                method,
                url: `${url}/123`,
            });
        } catch (err) {
            const { response } = err;
            const { data } = response;
            assert.equal(data.errorCode, 632);
        }
    });
};

module.exports = testCases;
