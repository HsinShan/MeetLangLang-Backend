const jwt = require('jsonwebtoken');
const appConfigs = require('../../../configs.js');

class AuthMiddleware {
    static verify() {
        return async (req, res, next) => {
            try {
                // Check required fields
                if (!('token' in req.headers)) throw Error('field `token` is missing.');
                // Check permission
                const { token } = req.headers;
                let decodedToken;
                try {
                    const { secret } = appConfigs.token;
                    decodedToken = jwt.verify(token, secret);
                    // Define user field and data
                    req.user = decodedToken;
                    next();
                } catch (err) {
                    res.status(401).json({ message: 'permission denied.' }).end();
                }
            } catch (err) {
                next(err);
            }
        };
    }
}

module.exports = AuthMiddleware;
