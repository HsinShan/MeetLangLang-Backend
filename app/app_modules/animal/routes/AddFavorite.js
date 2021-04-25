const AppDb = require('../../system/libs/AppDb.js');

class AddFavorite {
    static route() {
        return async (req, res, next) => {
            try {
                // Check decoded token
                if (!('user' in req)) throw Error('token has not been decoded.');
                // Check required fields
                if (!('animalId' in req.body)) throw Error('animalId is missing');
                const trx = await AppDb.db.transaction();
                const userId = req.user.uuid;
                // Insert animal info into animalInfo table
                const animallist = await trx('AnimalInfo').where('animal_id', req.body.animalId).select();
                if (animallist.length === 0) {
                    try {
                        await trx('AnimalInfo').insert({
                            animal_id: req.body.animalId,
                            animal_sex: req.body.sex,
                            animal_kind: req.body.kind,
                            animal_colour: req.body.colour,
                            animal_sterilization: req.body.sterilization,
                            animal_remark: req.body.remark,
                            shelter_tel: req.body.tel,
                            shelter_address: req.body.address,
                            animal_place: req.body.place,
                            album_file: req.body.picture,
                        });
                    } catch (err) {
                        await trx.rollback();
                        throw err;
                    }
                    // Insert uuid & animalId into FavoriteMap table
                    try {
                        await trx('FavoriteMap').insert({
                            uuid: userId,
                            animal_id: req.body.animalId,
                        });
                    } catch (err) {
                        await trx.rollback();
                        throw err;
                    }
                    await trx.commit();
                    res.status(200).json({
                        success: true,
                    });
                }
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = AddFavorite;
