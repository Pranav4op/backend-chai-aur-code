class ApiErrors extends Error {
  constructor(
    statusCode,
    messageError = "Something Went Wrong",
    error = [],
    stack = ""
  ) {
    super(messageError);
    this.statusCode = statusCode;
    this.data = null;
    this.messageError = messageError;
    this.error = error;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiErrors };
