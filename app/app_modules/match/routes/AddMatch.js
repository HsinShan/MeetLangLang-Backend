const validator = require('validator');
const AppDb = require('../../system/libs/AppDb.js');

class AddMatch {
    static route() {
        return async (req, res, next) => {
            try {
                // Check decoded token
                if (!('user' in req)) throw Error('token has not been decoded.');
                // Check required fields
                if (!('receiverId' in req.body)) throw Error('field `receiverId` is missing.');
                // Check formats of required fields
                const { receiverId } = req.body;
                if (validator.isEmpty(receiverId)) throw Error('field `mesgId` should not be empty.');
                // Logics
                const { uuid: senderId } = req.user;
                const trx = await AppDb.db.transaction();
                try {
                    await trx('Match').insert({
                        senderId,
                        receiverId,
                    });
                } catch (err) {
                    await trx.rollback();
                    err.errCode = 731;
                    throw err;
                }
                await trx.commit();
                res.status(200).json({
                    success: true,
                });
            } catch (apiError) {
                if (apiError.message === 'token has not been decoded.') {
                    apiError.errCode = 711;
                } else if (apiError.message === 'field `receiverId` is missing.') {
                    apiError.errCode = 721;
                } else if (apiError.message === 'field `receiverId` should not be empty.') {
                    apiError.errCode = 722;
                }
                next(apiError);
            }
        };
    }
}

module.exports = AddMatch;
