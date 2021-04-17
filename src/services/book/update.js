const yup = require('yup');
const { StatusCodes } = require('http-status-codes');
const { booksRepository } = require('../../repositories');
const { ERRORS } = require('../../utils');

module.exports = async (id, body) => {
  const book = await booksRepository.findById(id);

  if (!book) {
    throw {
      status: StatusCodes.NOT_FOUND,
      msg: ERRORS.notFound('book'),
    };
  }

  const schema = yup.object().shape({
    name: yup.string(),
    authorName: yup.string(),
    category: yup.string(),
  });

  const validated = await schema.validate(body, {
    stripUnknown: true,
  });

  Object.keys(validated).forEach((key) => {
    book.setDataValue(key, validated[key]);
  });

  return booksRepository.update(book);
};
