const validator = require('validator');
const AppDb = require('../../system/libs/AppDb.js');

class AddTopic {
    static route() {
        return async (req, res, next) => {
            try {
                // Check decoded token
                if (!('user' in req)) throw Error('token has not been decoded.');
                // Check required fields
                if (!('title' in req.body)) throw Error('field `title` is missing.');
                if (!('content' in req.body)) throw Error('field `content` is missing.');
                // Checl formats of required fields
                const { title, content } = req.body;
                if (validator.isEmpty(title)) throw Error('field `title` should not be empty.');
                if (validator.isEmpty(content)) throw Error('field `content` should not be empty.');
                // Logics
                const { uuid: userId } = req.user;
                const trx = await AppDb.db.transaction();
                try {
                    await trx('Message').insert({
                        title,
                        content,
                        userId,
                    });
                } catch (err) {
                    await trx.rollback();
                    throw err;
                }
                await trx.commit();
                res.status(200).json({
                    success: true,
                });
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = AddTopic;
