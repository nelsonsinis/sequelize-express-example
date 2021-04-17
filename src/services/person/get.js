const { personRepository } = require('../../repositories');
const { Book, PersonByBook } = require('../../models');

module.exports = async (id) => {
  const person = await personRepository.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Book,
        as: 'books',
        through: {
          model: PersonByBook,
          as: 'order',
          attributes: ['createdAt'],
        },
      },
    ],
  });

  return person;
};
