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
                    const name = 'E-' + Math.random().toString(36).substring(2);
                    const fullName name = `EmailUser ${name}`;
                    try {
                        await trx('User').insert({
                            email: req.body.email,
                            name: fullName,
                        });
                        list = await trx('User').where('email', email).select();
                    } catch (err) {
                        await trx.rollback();
                        throw err;
                    }
                }
                await trx.commit();
                const payload = {
                    uuid: list[0].uuid,
                    email: list[0].email,
                };
                const { secret, expiresIn } = appConfigs.token;
                const token = jwt.sign(payload, secret, { expiresIn });
                res.status(200).json({
                    token,
                    fullName: list[0].name,
                    firstName: list[0].name.split(' ')[1],
                });
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = SignInOrUp;
