class LogManager {
    static log(msg) {
        console.log(msg);
    }

    static error(msg) {
        console.error(msg);
    }

    static info(msg) {
        console.info(msg);
    }
}

module.exports = LogManager;
