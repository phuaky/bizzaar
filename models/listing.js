'use strict';
module.exports = function(sequelize, DataTypes) {
  var listing = sequelize.define('listing', {
    industry: DataTypes.STRING,
    businessName: DataTypes.STRING,
    sector: DataTypes.STRING,
    address: DataTypes.STRING,
    website: DataTypes.STRING,
    description: DataTypes.TEXT,
    listedBy: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return listing;
};
