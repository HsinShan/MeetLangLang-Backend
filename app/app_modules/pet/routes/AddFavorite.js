const AppDb = require('../../system/libs/AppDb.js');
class AddFavorite {
    static route() {
        return async (req, res, next) => {
            try {
                // Check decoded token
                if (!('user' in req)) throw Error('token has not been decoded.');
                //Check required fields
                if (!('petId' in req.body)) throw Error('petId is missing');
                const trx = await AppDb.db.transaction();
                const userId = req.user.uuid
                const pet = req.body.petId;
                // Insert pet info into petInfo table
                const petlist = await trx('PetInfo').where('petId', pet).select();
                if (petlist.length === 0) {
                    try {
                        await trx('PetInfo').insert({
                            petId: pet,
                            sex: req.body.sex,
                            kind: req.body.kind,
                            color: req.body.color,
                            sterilization: req.body.sterilization,
                            remark: req.body.remark,
                            tel: req.body.tel,
                            address: req.body.address,
                            place: req.body.place,
                            picture: req.body.picture,
                        });
                    } catch (err) {
                        await trx.rollback();
                        throw err;
                    }
                    // Insert uuid & petId into FavoriteMap table
                    try {
                        await trx('FavoriteMap').insert({
                            uuid: userId,
                            petId: pet,
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
