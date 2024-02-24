class Utils {

    getTimestemp() {
        const timestamp = Date.now();
        const datetime = new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');

        return datetime;
    }
}

module.exports = new Utils();