const AppDb = require('../../system/libs/AppDb.js');

class SavePet {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('uuid' in req.body)) throw Error('Uuid is missing');
                if (!('petId' in req.body)) throw Error('petId is missing');
                const trx = await AppDb.db.transaction();
                let list = await trx('FavoriteMap').select();
                    try {
                        await trx('FavoriteMap').insert({
                            uuid: req.body.uuid,
                            petId: req.body.petId
                        });
                    } catch (err) {
                        await trx.rollback();
                        throw err;
                    }
                await trx.commit();
                res.status(200).json({
                    "success": "success"
                });
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = SavePet;
