const { StatusCodes } = require('http-status-codes');
const { logger } = require('lowe');
const jsonwebtoken = require('jsonwebtoken');
const { buildResponse } = require('../../../helpers');
const { ERRORS } = require('../../../utils');

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!new RegExp('Bearer\\s+.+').test(authorization)) {
      throw {
        status: StatusCodes.UNAUTHORIZED,
        msg: ERRORS.accessUnauthorized,
      };
    }

    const [, token] = authorization.split(new RegExp('\\s+', 'g'));

    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    req.user = payload.id;

    return next();
  } catch (error) {
    logger.error(error);
    return buildResponse(error, res, {
      status: error.status || StatusCodes.UNAUTHORIZED,
      body: {
        error: error.msg || ERRORS.accessUnauthorized,
      },
    });
  }
};
