var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('../models');

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.UserAccounts.findById(id).then(function(user) {
    cb(null, user);
  }).catch(cb);
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, function(email, password, cb) {
  db.UserAccounts.find({
    where: { email: email }
  }).then(function(user) {
    if (!user || !user.validPassword(password)) {
      console.log('no user found');
      cb(null, false);
    } else {
      console.log('found user');
      cb(null, user);
    }
  }).catch(cb);
}));

module.exports = passport;
