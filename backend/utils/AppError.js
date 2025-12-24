class AppError extends Error{
    constructor(message,statuscode){
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
    }
}
module.exports = AppError;