const AppDb = require('../../system/libs/AppDb.js');

class GetFavoriteList {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('uuid' in req.body)) throw Error('uuid is missing');
                const trx = await AppDb.db.transaction();
                const petInfo = await trx('PetInfo').whereIn('petId',
                    function subquery() {
                        this.select('petId').from('FavoriteMap').where({ uuid: req.body.uuid });
                    });
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
