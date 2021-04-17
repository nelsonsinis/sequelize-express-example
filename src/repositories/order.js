const { PersonByBook } = require('../models');

module.exports = {
  create: (order) => PersonByBook.create(order),
  findOne: (query) => PersonByBook.findOne(query),
  bulkCreate: (items) => PersonByBook.bulkCreate(items),
};
