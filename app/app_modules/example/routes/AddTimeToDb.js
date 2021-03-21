const AppDb = require('../../system/libs/AppDb.js');

class AddTimeToDb {
    static route() {
        return async (req, res, next) => {
            try {
                if ('name' in req.body) {
                    const { name } = req.body;
                    const trx = await AppDb.db.transaction();
                    try {
                        await trx('example').insert({
                            name,
                            timestamp: new Date().toISOString(),
                        });
                    } catch (err) {
                        await trx.rollback();
                        throw err;
                    }
                    await trx.commit();
                    res.status(200).json({
                        success: true,
                    });
                } else {
                    throw Error('field `name` is missing.');
                }
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = AddTimeToDb;
