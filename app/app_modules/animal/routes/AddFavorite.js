const validator = require('validator');
const AppDb = require('../../system/libs/AppDb.js');

class AddFavorite {
    static route() {
        return async (req, res, next) => {
            try {
                // Check decoded token
                if (!('user' in req)) throw Error('token has not been decoded.');
                // Check required fields
                if (!('animalId' in req.body)) throw Error('animalId is missing');
                // Check formats of required fields
                if (!validator.isInt(req.body.animalId.toString())) throw Error('field `animalId` should be int.');
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
                        err.errCode = 231;
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
                        err.errCode = 232;
                        throw err;
                    }
                    await trx.commit();
                    res.status(200).json({
                        success: true,
                    });
                }
            } catch (apiError) {
                if (apiError.message === 'token has not been decoded.') {
                    apiError.errCode = 211;
                } else {
                    apiError.errCode = 221;
                }
                next(apiError);
            }
        };
    }
}

module.exports = AddFavorite;
