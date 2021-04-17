const { Model, DataTypes, Sequelize } = require('sequelize');
const config = require('../config/database/sequelize');

class Person extends Model {}
Person.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: new Sequelize(config),
    modelName: 'Person',
    underscored: true,
    tableName: 'people',
    paranoid: true,
  },
);

Person.prototype.toJSON = function toJSON() {
  const values = this.get();

  delete values.password;
  delete values.token;

  return values;
};

module.exports = Person;
