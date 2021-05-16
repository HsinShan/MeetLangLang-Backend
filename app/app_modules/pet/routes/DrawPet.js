const AppDb = require('../../system/libs/AppDb.js');

class DrawPet {
    static route() {
        return async (req, res, next) => {
            try {
                // Check decoded token
                if (!('user' in req)) throw Error('token has not been decoded.');
                const { uuid: userId } = req.user;
                const PetInfo = await AppDb.db('PetInfo').join('User', 'PetInfo.userId', 'User.uuid')
                    .select({ key: 'PetInfo.uuid' }, 'petName', 'petSex', 'petAge', 'petKind', 'petIntro', 'petPhoto')
                    .orderByRaw('RAND()')
                    .whereNot({ 'PetInfo.userId': userId })
                    .first();
                res.status(200).json(PetInfo || {});
            } catch (apiError) {
                if (apiError.message === 'token has not been decoded.') {
                    apiError.errCode = 511;
                } else {
                    apiError.errCode = 532;
                }
                next(apiError);
            }
        };
    }
}

module.exports = DrawPet;
