const Sequelize = require('sequelize');
const config = require('../config/database/sequelize');
const Book = require('./book');
const Person = require('./person');
const PersonByBook = require('./personbybook');

Book.belongsToMany(Person, { through: PersonByBook, foreignKey: 'bookId' });
Person.belongsToMany(Book, {
  through: PersonByBook,
  foreignKey: 'personId',
  as: 'books',
});

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

module.exports = {
  sequelize,
  Book,
  Person,
  PersonByBook,
};
