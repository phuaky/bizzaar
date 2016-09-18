'use strict';
module.exports = function(sequelize, DataTypes) {
  var userAccount = sequelize.define('userAccount', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userAccount;
};