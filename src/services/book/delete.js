const { StatusCodes } = require('http-status-codes');
const { booksRepository } = require('../../repositories');
const { ERRORS } = require('../../utils');

module.exports = async (id) => {
  const book = await booksRepository.findById(id);

  if (!book) {
    throw {
      status: StatusCodes.NOT_FOUND,
      msg: ERRORS.notFound('book'),
    };
  }

  return booksRepository.delete(book.getDataValue('id'));
};
