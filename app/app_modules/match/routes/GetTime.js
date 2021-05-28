const AppDb = require('../../system/libs/AppDb.js');

class GetTime {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('user' in req)) throw Error('token has not been decoded.');
                const { uuid: userId } = req.user;
                const Time = await AppDb.db('Match').select('time')
                    .orderBy('time', 'desc')
                    .where({ senderId: userId })
                    .first();
                res.status(200).json(Time);
            } catch (apiError) {
                if (apiError.message === 'token has not been decoded.') {
                    apiError.errCode = 711;
                } else {
                    apiError.errCode = 732;
                }
                next(apiError);
            }
        };
    }
}

module.exports = GetTime;
