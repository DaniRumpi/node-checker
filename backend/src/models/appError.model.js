// errors.model.js

/**
 * Custom error object of the application.
 *  - errorCode: app error code, which identifies the error internally (used in errorbook)
 *  - code: business error code, which identifies the error externally
 *  - message: brief message error (akin of title)
 *  - description: extended message error (description, reasoning, solutions...)
 *  - level: error level ( error/warning/info )
 */
class AppError extends Error {
  constructor(errorCode, code, message, description, level) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
    this.errorCode = errorCode;
    this.code = code;
    this.description = description;
    this.level = level;
  }

  getError() {
    const codeObj = {};
    if (this.code && this.code !== '') { codeObj.code = this.code; }
    return {
      message: this.description,
    };
  }

  toString() {
    return JSON.stringify(this);
  }
}

module.exports = AppError;
