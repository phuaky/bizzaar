'use strict';
module.exports = function(sequelize, DataTypes) {
  var listing = sequelize.define('listing', {
    bizid: DataTypes.STRING,
    industry: DataTypes.STRING,
    businessName: DataTypes.STRING,
    sector: DataTypes.STRING,
    address: DataTypes.STRING,
    website: DataTypes.STRING,
    description: DataTypes.TEXT,
    listedBy: DataTypes.STRING,
    value: DataTypes.INTEGER,
    bizcreated: DataTypes.STRING,
    UserAccountId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        models.listing.belongsTo(models.UserAccounts);
        models.listing.hasMany(models.bizdetail);

      }
    }
  });
  return listing;
};
