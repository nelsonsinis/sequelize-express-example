const { StatusCodes } = require('http-status-codes');
const { ERRORS } = require('../utils');

module.exports = (error, res, options) => {
  if (error) {
    if (error.name === 'ValidationError') {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: error.errors,
      });
    }

    return res.status(error.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.msg || ERRORS.internalServerError,
    });
  }

  if (options.status === StatusCodes.NO_CONTENT) {
    return res.status(StatusCodes.NO_CONTENT).end();
  }

  if (options.headers) {
    Object.keys(options.headers).forEach((key) => {
      res.setHeader(key, options.headers[key]);
    });
  }

  return res.status(options.status).json(options.body);
};
