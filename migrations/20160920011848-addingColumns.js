'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.addColumn(
        'listings',
        'listedBy',
        Sequelize.STRING
      );

  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.removeColumn('listings', 'listedBy')
  }
};
