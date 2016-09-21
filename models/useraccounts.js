'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var UserAccounts = sequelize.define('UserAccounts', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [8, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    },
    type: DataTypes.STRING,
    age: DataTypes.INTEGER,
    sex: DataTypes.STRING,
    address: DataTypes.STRING,
    passion: DataTypes.STRING,
    hobbies: DataTypes.STRING,
    education: DataTypes.STRING,
    interests: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: function(createdUser, options, cb) {
        var hash = bcrypt.hashSync(createdUser.password, 10);
        createdUser.password = hash;
        cb(null, createdUser);
      }
    },
    classMethods: {
      associate: function(models) {
        models.UserAccounts.hasMany(models.listing);
      }
    },
    instanceMethods: {
       validPassword: function(password) {
         // return if the password matches the hash
         return bcrypt.compareSync(password, this.password);
       },
       toJSON: function() {
         // get the user's JSON data
         var jsonUser = this.get();
         // delete the password from the JSON data, and return
         delete jsonUser.password;
         return jsonUser;
       }
     }
  });
  return UserAccounts;
};
