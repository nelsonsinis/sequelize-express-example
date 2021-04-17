const { Model, Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database/sequelize');

class Book extends Model {}
Book.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Book',
    underscored: true,
    tableName: 'books',
    paranoid: true,
  },
);

module.exports = Book;
