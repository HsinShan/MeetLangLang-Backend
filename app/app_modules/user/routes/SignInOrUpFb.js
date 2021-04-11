const jwt = require('jsonwebtoken');
const axios = require('axios');
const AppDb = require('../../system/libs/AppDb.js');

class SignInOrUpFb {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('accessToken' in req.body)) throw Error('field `accessToken` is missing.');
                const { accessToken } = req.body;
                const { data } = await axios.get(
                    'https://graph.facebook.com/me',
                    {
                        params: {
                            fields: 'id,email',
                            access_token: accessToken,
                        },
                    }
                );
                if (!('email' in data)) throw Error('field `email` is missing.');
                const { email } = data;
                const trx = await AppDb.db.transaction();
                let list = await trx('user').where('email', email).select();
                if (list.length === 0) {
                    try {
                        await trx('user').insert({
                            email,
                        });
                        list = await trx('user').where('email', email).select();
                    } catch (err) {
                        await trx.rollback();
                        throw err;
                    }
                }
                await trx.commit();
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

module.exports = SignInOrUpFb;
