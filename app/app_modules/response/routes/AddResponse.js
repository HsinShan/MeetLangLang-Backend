const validator = require('validator');
const AppDb = require('../../system/libs/AppDb.js');

class AddResponse {
    static route() {
        return async (req, res, next) => {
            try {
                // Check decoded token
                if (!('user' in req)) throw Error('token has not been decoded.');
                // Check required fields
                if (!('mesgId' in req.body)) throw Error('field `mesgId` is missing.');
                if (!('content' in req.body)) throw Error('field `content` is missing.');
                // Check formats of required fields
                const { mesgId, content } = req.body;
                if (validator.isEmpty(mesgId)) throw Error('field `mesgId` should not be empty.');
                if (validator.isEmpty(content)) throw Error('field `content` should not be empty.');
                // Logics
                const { uuid: userId } = req.user;
                const trx = await AppDb.db.transaction();
                try {
                    await trx('MesgResponse').insert({
                        mesgId,
                        userId,
                        content,
                    });
                } catch (err) {
                    await trx.rollback();
                    err.errCode = 631;
                    throw err;
                }
                await trx.commit();
                res.status(200).json({
                    success: true,
                });
            } catch (apiError) {
                if (apiError.message === 'token has not been decoded.') {
                    apiError.errCode = 611;
                } else if (apiError.message === 'field `mesgId` is missing.') {
                    apiError.errCode = 621;
                } else if (apiError.message === 'field `content` is missing.') {
                    apiError.errCode = 622;
                } else if (apiError.message === 'field `mesgId` should not be empty.') {
                    apiError.errCode = 623;
                } else if (apiError.message === 'field `content` should not be empty.') {
                    apiError.errCode = 624;
                }
                next(apiError);
            }
        };
    }
}

module.exports = AddResponse;
