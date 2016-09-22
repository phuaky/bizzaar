'use strict';
module.exports = function(sequelize, DataTypes) {
  var bizdetail = sequelize.define('bizdetail', {
    listingId: DataTypes.INTEGER,
    revenue: DataTypes.INTEGER,
    grosprofit: DataTypes.INTEGER,
    netprofit: DataTypes.INTEGER,
    cashflow: DataTypes.INTEGER,
    employee: DataTypes.INTEGER,
    operatingexpenses: DataTypes.INTEGER,
    totalassests: DataTypes.INTEGER,
    totalliabilities: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.bizdetail.belongsTo(models.listing);
      }
    }
  });
  return bizdetail;
};
