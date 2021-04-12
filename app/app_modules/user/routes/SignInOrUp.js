const jwt = require('jsonwebtoken');
const validator = require('validator');
const appConfigs = require('../../../configs.js');
const AppDb = require('../../system/libs/AppDb.js');

class SignInOrUp {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('email' in req.body)) throw Error('field `email` is missing.');
                const { email } = req.body;
                if (!validator.isEmail(email)) throw Error('field `email` is not vaild format.');
                const trx = await AppDb.db.transaction();
                let list = await trx('User').where('email', email).select();
                if (list.length === 0) {
                    try {
                        await trx('User').insert({
                            email: req.body.email,
                        });
                        list = await trx('User').where('email', email).select();
                    } catch (err) {
                        await trx.rollback();
                        throw err;
                    }
                }
                await trx.commit();
                const payload = {
<<<<<<< HEAD
                    uuid: list[0].uuid,
                    email: list[0].email,
                };
                const { secret, expiresIn } = appConfigs.token;
                const token = jwt.sign(payload, secret, { expiresIn });
=======
                    id: list[0].email,
                    uuid: list[0].uuid
                };
                const secret = 'ntusdm2021stoneocean';
                const token = jwt.sign(payload, secret, { expiresIn: '30 days' });
>>>>>>> 0dbb44f... feat: modify savepet api, added uuid into token
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
