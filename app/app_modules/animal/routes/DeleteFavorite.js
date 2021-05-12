const AppDb = require('../../system/libs/AppDb.js');

class DeleteFavorite {
    static route() {
        return async (req, res, next) => {
            try {
                // Check decoded token
                if (!('user' in req)) throw Error('token has not been decoded.');
                const userId = req.user.uuid;
                // Check required fields
                if (!('animalId' in req.body)) throw Error('animalId is missing.');
                // Delete link in FavoriteMap table
                const trx = await AppDb.db.transaction();
                try {
                    const record = await trx('FavoriteMap').where({ uuid: userId, animal_id: req.body.animalId });
                    if (record.length !== 0) {
                        await trx('FavoriteMap').where({ uuid: userId, animal_id: req.body.animalId }).del();
                    } else {
                        await trx.commit();
                        throw Error('Animal was not saved by user.');
                    }
                } catch (err) {
                    await trx.rollback();
                    throw err;
                }
                // Check if need to delete animal in AnimalInfo table
                const animalSavedBy = await trx('FavoriteMap').where({ animal_id: req.body.animalId }).select();
                if (animalSavedBy.length === 0) {
                    try {
                        await trx('AnimalInfo').where({ animal_id: req.body.animalId }).del();
                    } catch (err) {
                        await trx.rollback();
                        err.errCode = 234;
                        throw err;
                    }
                }
                await trx.commit();
                res.status(200).json({
                    success: true,
                });
            } catch (apiError) {
                if (apiError.message === 'token has not been decoded.') {
                    apiError.errCode = 211;
                } else if (apiError.message === 'Animal was not saved by user.') {
                    apiError.errCode = 233;
                } else {
                    apiError.errCode = 221;
                }
                next(apiError);
            }
        };
    }
}

module.exports = DeleteFavorite;
