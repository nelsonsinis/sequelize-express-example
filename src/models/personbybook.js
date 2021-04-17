const { Model, DataTypes, Sequelize } = require('sequelize');
const config = require('../config/database/sequelize');

const Book = require('./book');
const Person = require('./person');

class PersonByBook extends Model {}
PersonByBook.init(
  {
    personId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Person,
        key: 'id',
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Book,
        key: 'id',
      },
    },
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'PersonByBook',
    underscored: true,
    paranoid: true,
    tableName: 'person_by_books',
  },
);

module.exports = PersonByBook;
