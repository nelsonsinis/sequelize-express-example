const { StatusCodes } = require('http-status-codes');
const { logger } = require('lowe');
const { buildResponse } = require('../helpers');
const { personService } = require('../services');

module.exports = {
  async create(req, res) {
    try {
      const person = await personService.create(req.body);
      return buildResponse(false, res, {
        status: StatusCodes.CREATED,
        body: person.toJSON(),
      });
    } catch (error) {
      logger.error(error);
      return buildResponse(error, res);
    }
  },
  async get(req, res) {
    try {
      const person = await personService.get(req.user);
      return buildResponse(false, res, {
        status: StatusCodes.OK,
        body: person.toJSON(),
      });
    } catch (error) {
      logger.error(error);
      return buildResponse(error, res);
    }
  },
};
