const jwt = require('jsonwebtoken');
const axios = require('axios');
const AppDb = require('../../system/libs/AppDb.js');

class SignInOrUp {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('email' in req.body)) throw Error('field `email` is missing.');
                const { email } = req.body;
                const trx = await AppDb.db.transaction();
                let list = await trx('user').where('email', email).select();
                if (list.length === 0) {
                    try {
                        await trx('user').insert({
                            email: req.body.email,
                        });
                        list = await trx('user').where('email', email).select();
                    } catch (err) {
                        await trx.rollback();
                        throw err;
                    }
                }
                const trx.commit();
                const payload = { id: list[0].email };
                const secret = 'ntusdm2021stoneocean';
                const token = jwt.sign(payload, secret, { expiresIn: '30 days' });
                res.status(200).json({
                    token,
                });
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = SignInOrUp;
