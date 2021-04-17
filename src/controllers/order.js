const { StatusCodes } = require('http-status-codes');
const { logger } = require('lowe');
const { buildResponse } = require('../helpers');
const { orderService } = require('../services');

module.exports = {
  async create(req, res) {
    try {
      const orders = await orderService.create(req.user, req.body);
      return buildResponse(false, res, {
        status: StatusCodes.CREATED,
        body: orders,
      });
    } catch (error) {
      logger.error(error);
      return buildResponse(error, res);
    }
  },
};
