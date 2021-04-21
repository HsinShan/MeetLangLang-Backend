const AppDb = require('../../system/libs/AppDb.js');

class GetTopic {
    static route() {
        return async (req, res, next) => {
            try {
                // 目前先將email當作者
                const list = await AppDb.db('Message').join('User', 'Message.userId', 'User.uuid').select({ key: 'Message.uuid' }, { Title: 'Message.title' }, { date: 'Message.time' }, { author: 'User.email' });
                res.status(200).json(list);
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = GetTopic;
