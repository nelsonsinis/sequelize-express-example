const yup = require('yup');
const { Op } = require('sequelize');
const { StatusCodes } = require('http-status-codes');
const { orderRepository, booksRepository } = require('../../repositories');

module.exports = async (person, body) => {
  const schema = yup.object().shape({
    books: yup.array(yup.number().integer()).required().min(1),
  });

  const validated = await schema.validate(body, { stripUnknown: true });

  const books = await booksRepository.list({
    where: {
      id: {
        [Op.in]: validated.books,
      },
    },
  });

  if (books.rows.length !== validated.books.length) {
    const missing = validated.books.filter(
      (book) => !books.rows.some((row) => row.getDataValue('id') === book),
    );

    throw {
      status: StatusCodes.NOT_FOUND,
      msg: missing.map((item) => `${item}-is-missing-or-not-exists`),
    };
  }

  return orderRepository.bulkCreate(
    books.rows.map((book) => ({
      personId: person,
      bookId: book.getDataValue('id'),
    })),
  );
};
