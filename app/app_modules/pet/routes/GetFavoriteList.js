const AppDb = require('../../system/libs/AppDb.js');

class GetFavoriteList {
    static route() {
        return async (req, res, next) => {
            try {
                // Check decoded token
                if (!('user' in req)) throw Error('token has not been decoded.');
                const userId = req.user.uuid;
                // Get petinfo data using uuid
                const trx = await AppDb.db.transaction();
                const petInfo = await trx('PetInfo').whereIn('petId',
                    function subquery() {
                        this.select('petId').from('FavoriteMap').where({ uuid: userId });
                    });
                await trx.commit();
                if (petInfo.length === 0) {
                    res.status(200).json({
                        result: false,
                    });
                } else {
                    res.status(200).json({
                        result: true,
                        petInfo,
                    });
                }
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = GetFavoriteList;
