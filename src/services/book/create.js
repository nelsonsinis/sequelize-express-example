const yup = require('yup');
const { StatusCodes } = require('http-status-codes');
const { booksRepository } = require('../../repositories');
const { ERRORS } = require('../../utils');

module.exports = async (body) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    category: yup.string().required(),
    authorName: yup.string().required(),
  });

  const validated = await schema.validate(body, {
    stripUnknown: true,
  });

  const book = await booksRepository.findOne({
    where: {
      name: validated.name,
    },
  });

  if (book) {
    throw {
      status: StatusCodes.CONFLICT,
      msg: ERRORS.alreadtExists('book'),
    };
  }

  return booksRepository.create(validated);
};
