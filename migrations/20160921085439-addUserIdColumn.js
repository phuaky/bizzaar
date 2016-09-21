'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'listings',
      'UserAccountId',
      Sequelize.INTEGER
    )
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
      'listings',
      'UserAccountId',
      Sequelize.INTEGER
    )
  }
};
