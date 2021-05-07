const validator = require('validator');
const AppDb = require('../../system/libs/AppDb.js');

class AddPet {
    static route() {
        return async (req, res, next) => {
            try {
                // Check decoded token
                if (!('user' in req)) throw Error('token has not been decoded.');
                // Check required fields
                if (!('petName' in req.body)) throw Error('petName is missing.');
                const { uuid: userId } = req.user;
                const {
                    petName, petSex, petAge, petKind, petIntro, petPhoto,
                } = req.body;
                // Check format of required field
                if (validator.isEmpty(req.body.petName)) throw Error('field `petName` should not be empty.');
                const trx = await AppDb.db.transaction();
                // Add pet info into PetInfo table
                try {
                    await trx('PetInfo').insert({
                        userId,
                        petName,
                        petSex,
                        petAge,
                        petKind,
                        petIntro,
                        petPhoto,
                    });
                } catch (err) {
                    await trx.rollback();
                    err.errCode = 531;
                    throw err;
                }
                await trx.commit();
                res.status(200).json({
                    success: true,
                });
            } catch (apiError) {
                if (apiError.message === 'token has not been decoded.') {
                    apiError.errCode = 511;
                } else if (apiError.message === 'petName is missing.') {
                    apiError.errCode = 521;
                } else if (apiError.message === 'field `petName` should not be empty.') {
                    apiError.errCode = 522;
                }
                next(apiError);
            }
        };
    }
}

module.exports = AddPet;
