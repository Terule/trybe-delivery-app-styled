class ConflictError extends Error {
    statusCode;

    constructor(message) {
        super(message)
        this.statusCode = 409
    }
}

module.exports = ConflictError;