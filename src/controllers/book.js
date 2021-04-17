const { StatusCodes } = require('http-status-codes');
const { logger } = require('lowe');
const { buildResponse } = require('../helpers');
const { bookService } = require('../services');

module.exports = {
  async create(req, res) {
    try {
      const book = await bookService.create(req.body);
      return buildResponse(false, res, {
        status: StatusCodes.CREATED,
        body: book.toJSON(),
      });
    } catch (error) {
      return buildResponse(error, res);
    }
  },
  async list(req, res) {
    try {
      const books = await bookService.list(req.query.perPage, req.query.page);

      if (books.items.length === 0) {
        return buildResponse(false, res, {
          status: StatusCodes.NO_CONTENT,
        });
      }

      return buildResponse(false, res, {
        status: StatusCodes.OK,
        body: books,
      });
    } catch (error) {
      return buildResponse(error, res);
    }
  },
  async get(req, res) {
    try {
      const book = await bookService.get(req.params.id);

      return buildResponse(false, res, {
        status: StatusCodes.OK,
        body: book.toJSON(),
      });
    } catch (error) {
      return buildResponse(error, res);
    }
  },
  async update(req, res) {
    try {
      const book = await bookService.update(req.params.id, req.body);

      return buildResponse(false, res, {
        status: StatusCodes.OK,
        body: book.toJSON(),
      });
    } catch (error) {
      return buildResponse(error, res);
    }
  },
  async delete(req, res) {
    try {
      await bookService.deleteOne(req.params.id);

      return buildResponse(false, res, {
        status: StatusCodes.NO_CONTENT,
      });
    } catch (error) {
      return buildResponse(error, res);
    }
  },
};
