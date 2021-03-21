const AppDb = require('../../system/libs/AppDb.js');

class GetTimeFromDb {
    static route() {
        return async (req, res, next) => {
            try {
                const list = await AppDb.db('example').select();
                res.status(200).json(list);
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = GetTimeFromDb;
