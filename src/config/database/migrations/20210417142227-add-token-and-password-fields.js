module.exports = {
  up: (queryInterface, Sequelize) =>
    Promise.all([
      queryInterface.addColumn('people', 'email', Sequelize.STRING, {
        allowNull: false,
      }),
      queryInterface.addColumn('people', 'password', Sequelize.STRING, {
        allowNull: false,
      }),
      queryInterface.addColumn('people', 'token', Sequelize.STRING, {
        allowNull: true,
      }),
    ]),
  down: (queryInterface) =>
    Promise.all([
      queryInterface.removeColumn('people', 'email'),
      queryInterface.removeColumn('people', 'password'),
      queryInterface.removeColumn('people', 'token'),
    ]),
};
