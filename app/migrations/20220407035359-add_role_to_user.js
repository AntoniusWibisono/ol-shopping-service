'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn(
    'user',
    'role',
    {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: 'user',
    },
    ),

  down: async (queryInterface, Sequelize) => queryInterface.removeColumn('user','role')
};
