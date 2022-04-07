'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.addColumn(
    'user',
    'is_login',
    {
      allowNull: false,
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    ),

  down: async (queryInterface, Sequelize) => queryInterface.removeColumn('user','is_login')
};
