const jwt = require('jsonwebtoken');
const validator = require('validator');
const appConfigs = require('../../../configs.js');
const AppDb = require('../../system/libs/AppDb.js');

class AddTopic {
    static route() {
        return async (req, res, next) => {
            try {
                // Check required fields
                if (!('topic' in req.body)) throw Error('field `topic` is missing.');
                if (!('content' in req.body)) throw Error('field `content` is missing.');
                if (!('token' in req.headers)) throw Error('field `token` is missing.');
                // Check permission
                const { token } = req.headers;
                let decodedToken;
                try {
                    const { secret } = appConfigs.token;
                    decodedToken = jwt.verify(token, secret);
                } catch (err) {
                    res.status(401).json({ message: 'permission denied.' }).end();
                }
                // Checl formats of required fields
                const { topic, content } = req.body;
                if (validator.isEmpty(topic)) throw Error('field `topic` should not be empty.');
                if (validator.isEmpty(content)) throw Error('field `content` should not be empty.');
                // Logics
                const { uuid: userId } = decodedToken;
                const trx = await AppDb.db.transaction();
                try {
                    await trx('Message').insert({
                        title: topic,
                        content,
                        userId,
                    });
                } catch (err) {
                    await trx.rollback();
                    throw err;
                }
                await trx.commit();
                res.status(200).json({
                    success: true,
                });
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = AddTopic;
