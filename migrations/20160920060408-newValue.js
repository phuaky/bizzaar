'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
  'listings',
  'value',
  Sequelize.INTEGER
)
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn(
  'listings',
  'value',
  Sequelize.INTEGER
)
  }
};
