const jwt = require('jsonwebtoken');
const AppDb = require('../../system/libs/AppDb.js');

class SignInOrUp {
    static route() {
        return async (req, res, next) => {
            try {
                const trx = await AppDb.db.transaction();
                let list = await trx('user').where('email', req.body.email).select();
                if (list.length === 0) {
                    try {
                        await trx('user').insert({
                            email: req.body.email,
                        });
                        list = await trx('user').where('email', req.body.email).select();
                    } catch (err) {
                        await trx.rollback();
                        throw err;
                    }
                }
                await trx.commit();
                const payload = { id: list[0].UID };
                const secret = 'ntusdm2021stoneocean';
                const token = jwt.sign(payload, secret, { expiresIn: '30 days' });
                res.status(200).json(token);
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = SignInOrUp;
