const AppDb = require('../../system/libs/AppDb.js');

class GetFavoriteList {
    static route() {
        return async (req, res, next) => {
            try {
                // Check decoded token
                if (!('user' in req)) throw Error('token has not been decoded.');
                const userId = req.user.uuid;
                // Get animal info data using uuid
                const trx = await AppDb.db.transaction();
                const animalInfo = await trx('AnimalInfo').whereIn('animal_id',
                    function subquery() {
                        this.select('animal_id').from('FavoriteMap').where({ uuid: userId });
                    });
                await trx.commit();
                res.status(200).json({
                    animalInfo,
                });
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = GetFavoriteList;
