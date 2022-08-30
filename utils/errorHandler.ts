class ErrorHandler extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    //captureStackTrace gives us a stack that help us find a location of that error in the code
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
