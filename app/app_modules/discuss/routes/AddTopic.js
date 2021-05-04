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
                // Check formats of required fields
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
                    err.errCode = 331;
                    throw err;
                }
                await trx.commit();
                res.status(200).json({
                    success: true,
                });
            } catch (apiError) {
                if (apiError.message === 'token has not been decoded.') {
                    apiError.errCode = 311;
                } else if (apiError.message === 'field `title` is missing.') {
                    apiError.errCode = 321;
                } else if (apiError.message === 'field `content` is missing.') {
                    apiError.errCode = 322;
                } else if (apiError.message === 'field `title` should not be empty.') {
                    apiError.errCode = 323;
                } else if (apiError.message === 'field `content` should not be empty.') {
                    apiError.errCode = 324;
                }
                next(apiError);
            }
        };
    }
}

module.exports = AddTopic;
