'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('bizdetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      listingId: {
        type: Sequelize.INTEGER
      },
      revenue: {
        type: Sequelize.INTEGER
      },
      grosprofit: {
        type: Sequelize.INTEGER
      },
      netprofit: {
        type: Sequelize.INTEGER
      },
      cashflow: {
        type: Sequelize.INTEGER
      },
      employee: {
        type: Sequelize.INTEGER
      },
      operatingexpenses: {
        type: Sequelize.INTEGER
      },
      totalassests: {
        type: Sequelize.INTEGER
      },
      totalliabilities: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('bizdetails');
  }
};