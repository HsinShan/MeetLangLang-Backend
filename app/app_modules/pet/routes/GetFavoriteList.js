const jwt = require('jsonwebtoken');
const AppDb = require('../../system/libs/AppDb.js');

class GetFavoriteList {
    static route() {
        return async (req, res, next) => {
            try {
                // Check token exists
                if (!('token' in req.headers)) throw Error('token is missing');

                // Decode token to get uuid
                const { token } = req.headers;
                const secret = 'ntusdm2021stoneocean';
                const userid = jwt.verify(token, secret).uuid;

                // Get petinfo data using uuid
                const trx = await AppDb.db.transaction();
                const petInfo = await trx('PetInfo').whereIn('petId',
                    function subquery() {
                        this.select('petId').from('FavoriteMap').where({ uuid: userid });
                    });
                if (petInfo.length === 0) {
                    res.status(200).json({
                        result: false,
                    });
                } else {
                    res.status(200).json({
                        result: true,
                        petInfo,
                    });
                }
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = GetFavoriteList;
