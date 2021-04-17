const { Book } = require('../models');

module.exports = {
  create: (book) => Book.create(book),
  list: (query) => Book.findAndCountAll(query),
  findOne: (query) => Book.findOne(query),
  findById: (id) => Book.findByPk(id),
  delete: (id) =>
    Book.destroy({
      where: { id },
    }),
  update: (updated) => updated.save(),
};
