const AppDb = require('../../system/libs/AppDb.js');

class GetFavoriteList {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('uuid' in req.body)) throw Error('uuid is missing');
                const trx = await AppDb.db.transaction();
                try {
                    let petList = await trx('PetInfo').whereExists(
                        function () {
                            this.select('').from('FavoriteMap').where({ uuid: req.body.uuid }).
                            andWhere('FavoriteMap.petId', 'PetInfo.petId');
                        });
                    res.status(200).json({
                        petList,
                    })
                } catch (err) {
                    throw err;
                }
            } catch (apiError) {
                next(apiError);
            };
        };
    }
};

module.exports = GetFavoriteList;

