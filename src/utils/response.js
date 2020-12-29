import HttpStatus from 'http-status-codes';

/**
 * This return successful response
 *
 * @param res
 * @param data
 * @param status
 * @returns {*}
 */
export function successResponse(res, data, status = HttpStatus.OK) {
  return res.status(status).json({ 'success': true, 'data': data });
}

/**
 * This return unsuccessful response
 *
 * @param res
 * @param message
 * @param status
 * @returns {*}
 */
export function errorResponse(res, message, status = HttpStatus.UNPROCESSABLE_ENTITY) {
  return res.status(status).json({ 'success': false, 'message': message });
}
