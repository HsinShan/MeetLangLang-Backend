const AppDb = require('../../system/libs/AppDb.js');

class GetResponse {
    static route() {
        return async (req, res, next) => {
            try {
                console.log('req.params=', req.params);
                const { mesgId } = req.params;
                const responseList = await AppDb.db('MesgResponse')
                    .leftJoin('User', 'MesgResponse.userId', 'User.uuid')
                    .select({ respId: 'MesgResponse.uuid' },
                        { time: 'MesgResponse.time' },
                        { author: 'User.name' },
                        { content: 'MesgResponse.content' })
                    .where('MesgResponse.mesgId', mesgId);
                res.status(200).json(responseList);
            } catch (apiError) {
                apiError.errCode = 632;
                next(apiError);
            }
        };
    }
}
module.exports = GetResponse;
