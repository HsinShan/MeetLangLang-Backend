const AppDb = require('../../system/libs/AppDb.js');

class SavePet {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('type' in req.body)) throw Error('type is missing');
                if (!('uuid' in req.body)) throw Error('uuid is missing');
                if (!('petId' in req.body)) throw Error('petId is missing');
                const trx = await AppDb.db.transaction();
                const uuid = req.body.uuid;
                const petId = req.body.petId;
                console.log(req.body.type);

                if (req.body.type === 'check') {
                    try {
                        //check if user has already saved pet
                        let checklist = await trx('FavoriteMap').where({
                            uuid: uuid,
                            petId: petId
                        }).select();
                        console.log(checklist);
                        if (checklist.length === 0) {
                            res.status(200).json({
                                Saved: true,
                            })
                        } else {
                            res.status(200).json({
                                Saved: false,
                            })
                        }
                    } catch (err) {
                        throw err;
                    }
                }

                else {
                    //insert pet info into petInfo table
                    console.log(req.body.type);
                    let petlist = await trx('PetInfo').where('petId', petId).select();
                    if (petlist.length === 0) {
                        try {
                            await trx('PetInfo').insert({
                                petId: petId,
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
                        console.log("insert favorite map");
                        //insert uuid & petId into FavoriteMap table
                        try {
                            await trx('FavoriteMap').insert({
                                uuid: uuid,
                                petId: petId
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
                }
            }
            catch (apiError) {
                next(apiError);
            };
        };
    }
};

module.exports = SavePet;
