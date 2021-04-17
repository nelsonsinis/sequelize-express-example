const { StatusCodes } = require('http-status-codes');
const { buildResponse } = require('../helpers');
const { authService } = require('../services');

module.exports = {
  async login(req, res) {
    try {
      const auth = await authService.login(req.body);

      return buildResponse(false, res, {
        status: StatusCodes.OK,
        body: auth.person,
        headers: {
          Authorization: auth.token,
        },
      });
    } catch (error) {
      return buildResponse(error, res);
    }
  },
  async logout(req, res) {
    try {
      await authService.logout(req.user);

      return buildResponse(false, res, {
        status: StatusCodes.NO_CONTENT,
      });
    } catch (error) {
      return buildResponse(error, res);
    }
  },
};
