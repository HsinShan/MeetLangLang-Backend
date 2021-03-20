class AppDb {
    static bindInstance(instance) {
        AppDb.db = instance;
    }
}

module.exports = AppDb;
