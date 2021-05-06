const AppDb = require('../../system/libs/AppDb.js');

class GetTopicDetail {
    static route() {
        return async (req, res, next) => {
            try {
                const { messageId } = req.params;
                const messageDetail = await AppDb.db('Message').join('User', 'Message.userId', 'User.uuid')
                    .select({ key: 'Message.uuid' }, { title: 'Message.title' }, { date: 'Message.time' }, { author: 'User.name' }, { content: 'Message.content' })
                    .where({ 'Message.uuid': messageId });
                res.status(200).json(messageDetail);
            } catch (apiError) {
                apiError.errCode = 333;
                next(apiError);
            }
        };
    }
}

module.exports = GetTopicDetail;
