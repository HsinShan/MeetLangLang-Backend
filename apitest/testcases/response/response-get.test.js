const axios = require('axios');
const { assert } = require('chai');

const testCases = (db, method, url) => () => {
    // You can define matched data here
    const shouldMatchedData = {
        respId: 1,
        time: new Date().toISOString().substring(0, 10),
        author: 'testauthor',
        content: 'testContent1',
    };

    // Before test case
    beforeEach(async () => {
        await db('User').insert({
            email: 'member1@example.com',
            name: 'testauthor',
        });

        await db('Message').insert([
            { userId: '1', title: 'testTitle1', content: 'testPost1' },
            { userId: '1', title: 'testTitle2', content: 'testPost2' },
        ]);

        await db('MesgResponse').insert([
            { userId: 1, mesgId: 1, content: 'testContent1' },
            { userId: 1, mesgId: 2, content: 'testcontent2' },
        ]);
    });

    // Put global vars or functions here
    const pathVar = { mesgId: 1 };

    // Positive context
    describe('Positive Testing', () => {
        it('Normal Case', async () => {
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
    });

    // Negative context
    describe('Negative Testing', () => {
        it('Param mesgId is incorrect', async () => {
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
    });
};

module.exports = testCases;
