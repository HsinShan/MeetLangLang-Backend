class Hello {
    static route() {
        return async (req, res, next) => {
            try {
                res.status(200).json({
                    message: 'Hello World!',
                });
            } catch (apiError) {
                next(apiError);
            }
        };
    }
}

module.exports = Hello;
