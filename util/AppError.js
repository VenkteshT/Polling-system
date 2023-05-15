class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.status = `${statusCode}`.startsWith("4") ? "error" : "failed";
    this.statusCode = statusCode;
    Error.captureStackTrace(this.constructor);
  }
}

module.exports = AppError;
