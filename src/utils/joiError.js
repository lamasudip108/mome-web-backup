import HttpStatus from 'http-status-codes';

export default function joiError(err) {
  // catch validation errors
  if (err.isJoi) {
    return {
      code: HttpStatus.BAD_REQUEST,
      success: false,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details:
        err.details &&
        err.details.map(err => {
          return {
            message: err.message,
            param: err.path.join('.'),
          };
        }),
    };
  }

  // HTTP errors
  if (err.isBoom) {
    return {
      code: err.output.statusCode,
      success: false,
      message: err.output.payload.message || err.output.payload.error,
    };
  }

  // INTERNAL_SERVER_ERROR for all other cases
  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    success: false,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR),
  };
}
