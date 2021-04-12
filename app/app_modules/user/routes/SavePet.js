const AppDb = require('../../system/libs/AppDb.js');

class SavePet {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('uuid' in req.body)) throw Error('uuid is missing');
                if (!('petId' in req.body)) throw Error('petId is missing');
                const trx = await AppDb.db.transaction();
                const petId = req.body.petId;
                const uuid = req.body.uuid;
                let list = await trx('PetInfo').where('petId', petId).select();
                if (list.length === 0) {
                    try {
                        await trx('PetInfo').insert({
                            petId: req.body.petId,
                            sex: req.body.sex,
                            age: req.body.age,
                            kind: req.body.kind,
                            address: req.body.address,
                            picture: req.body.picture
                        });
                    } catch (err) {
                        await trx.rollback();
                        throw err;
                    }
                }
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
