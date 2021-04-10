const jwt = require('jsonwebtoken');
const axios = require('axios');
const AppDb = require('../../system/libs/AppDb.js');

class SignInOrUp {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('code' in req.query)) throw Error('field `code` is missing.');
                const { code } = req.query;
                const { data1 } = await axios.get(
                    'https://graph.facebook.com/oauth/access_token',
                    {
                        params: {
                            client_id: '3968724543170407',
                            redirect_uri: 'http://localhos:8181/user/login',
                            client_secret: '43a9ceed55038a2b1de2907e6351f536',
                            code,
                        },
                    }
                );

                if (!('access_token' in data1)) throw Error('field `access_token` is missing.');
                const { accessToken } = data1;
                const { data2 } = await axios.get(
                    'https://graph.facebook.com/me',
                    {
                        params: {
                            fields: 'id,email',
                            accessToken,
                        },
                    }
                );

                if (!('email' in data2)) throw Error('field `email` is missing.');
                const { email } = data2;
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

module.exports = SignInOrUp;
