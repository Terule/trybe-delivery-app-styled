class InvalidToken extends Error {
    statusCode;

    constructor(message) {
        super(message)
        this.statusCode = 401
    }
}

module.exports = InvalidToken;