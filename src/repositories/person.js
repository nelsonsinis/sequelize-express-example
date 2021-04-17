const { Person } = require('../models');

module.exports = {
  create: (person) => Person.create(person),
  list: (query) => Person.findAndCountAll(query),
  findOne: (query) => Person.findOne(query),
  findById: (id, options) => Person.findByPk(id, options),
  delete: (query) => Person.destroy(query),
  update: (updated) => updated.save(),
};
