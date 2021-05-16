const validator = require('validator');
const AppDb = require('../../system/libs/AppDb.js');

class GetResponse {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('mesgId' in req.body)) throw Error('mesgId is missing');
                if (validator.isEmpty(req.body.mesgId)) throw Error('field `mesgId` should not be empty.');
                const { mesgId } = req.body;
                const responseList = await AppDb.db('MesgResponse')
                    .leftJoin('User', 'MesgResponse.userId', 'User.uuid')
                    .select({ respId: 'MesgResponse.uuid' },
                        { time: 'MesgResponse.time' },
                        { author: 'User.name' },
                        { content: 'MesgResponse.content' })
                    .where('MesgResponse.mesgId', mesgId);
                res.status(200).json(responseList);
            } catch (apiError) {
                if (apiError.message === 'mesgId is missing') {
                    apiError.errCode = 625;
                } else if (apiError.message === 'field `mesgId` should not be empty.') {
                    apiError.errCode = 626;
                } else {
                    apiError.errCode = 632;
                }
                next(apiError);
            }
        };
    }
}
module.exports = GetResponse;
