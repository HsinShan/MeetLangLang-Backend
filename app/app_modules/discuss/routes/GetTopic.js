const AppDb = require('../../system/libs/AppDb.js');

class GetTopic {
    static route() {
        return async (req, res, next) => {
            try {
                const list = await AppDb.db('Message').join('User', 'Message.userId', 'User.uuid').select({ key: 'Message.uuid' }, { Title: 'Message.title' }, { date: 'Message.time' }, { author: 'User.name' });
                res.status(200).json(list);
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = GetTopic;
