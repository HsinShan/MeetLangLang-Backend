const jwt = require('jsonwebtoken');
const appConfigs = require('../configs.js');

/*
 *
 * Usage:
 *   - Generate a 1 min user token:
 *     - mockToken.generateUserToken(uuid, email);
 *
 */
const mockToken = {
    generateUserToken: (uuid = 1, email = 'member1@example.com') => {
        const { secret } = appConfigs.token;
        const token = jwt.sign({ uuid, email }, secret, { expiresIn: '1m' });
        return token;
    },
};

module.exports = mockToken;
