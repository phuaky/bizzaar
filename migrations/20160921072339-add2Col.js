'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn(
      'listings',
      'bizid',
      Sequelize.STRING
    ),
    queryInterface.addColumn(
    'listings',
    'bizcreated',
    Sequelize.STRING
  )
  ]
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn(
      'listings',
      'bizid',
      Sequelize.STRING
    ),
    queryInterface.removeColumn(
    'listings',
    'bizcreated',
    Sequelize.STRING
  )
  ]
  }
};
