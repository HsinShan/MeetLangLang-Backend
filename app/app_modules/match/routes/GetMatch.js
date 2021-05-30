const AppDb = require('../../system/libs/AppDb.js');

class GetMatch {
    static route() {
        return async (req, res, next) => {
            try {
                if (!('user' in req)) throw Error('token has not been decoded.');
                const { uuid: userId } = req.user;
                const MatchData = await AppDb.db('Match').join('User', 'Match.senderId', 'User.uuid').join('PetInfo', 'PetInfo.userId', 'User.uuid')
                    .select({ userId: 'Match.senderId' }, 'name', 'email', { key: 'PetInfo.uuid' }, 'petName', 'petSex', 'petAge', 'petKind', 'petIntro', 'petPhoto')
                    .where({ 'Match.receiverId': userId });
                const unique = [...new Set(MatchData.map((x) => x.userId))];
                const DataList = unique.map((x) => {
                    const sublist = MatchData.filter((item) => item.userId === x);
                    const petlist = sublist.map((item) => {
                        const pet = {
                            key: item.key,
                            petName: item.petName,
                            petSex: item.petSex,
                            petAge: item.petAge,
                            petKind: item.petKind,
                            petIntro: item.petIntro,
                            petPhoto: item.petPhoto,
                        };
                        return pet;
                    });
                    const Data = {
                        userId: x,
                        name: sublist[0].name,
                        email: sublist[0].email,
                        petData: petlist,
                    };
                    return Data;
                });
                res.status(200).json(DataList);
            } catch (apiError) {
                if (apiError.message === 'token has not been decoded.') {
                    apiError.errCode = 711;
                } else {
                    apiError.errCode = 733;
                }
                next(apiError);
            }
        };
    }
}

module.exports = GetMatch;
