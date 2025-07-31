class ApiErrors extends Error {
  constructor(
    statusCode,
    messageError = "Something Went Wrong",
    error = [],
    stack = ""
  ) {
    super(messageError);
    ((this.statusCode = statusCode),
      (this.data = null),
      (this.messageError = messageError));
    ((this.success = false), (this.error = this.error));
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiErrors };
