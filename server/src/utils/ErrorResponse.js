class ErrorResponse extends Error {
  constructor(message = "Server Error", statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
