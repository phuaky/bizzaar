var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

router.post('/signup', function(req, res) {
var email = req.body.email

console.log("im loading");

  db.UserAccounts.findOrCreate({
    where: {
      email: email
    },
    defaults: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      type: req.body.type
    }
  }).spread(function(user, created) {
    if (created) {
      // if created, success and redirect home
      passport.authenticate('local', {
        successRedirect: '/user_dashboard',
        successFlash: 'Account created and logged in'
      })(req, res);
      console.log('User created!');
    } else {
      // if not created, the email already exists
      console.log('Email already exists');
      req.flash('error', 'Email already exists');
      res.redirect('/signup');
    }
  }).catch(function(error) {
    // if an error occurs, let's see what the error is
    console.log('An error occurred: ', error.message);
    req.flash('error', error.message);
    res.redirect('/signup');
  });
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/user_dashboard',
  failureRedirect: '/login',
  failureFlash: 'Invalid username and/or password',
  successFlash: 'You have logged in'
}));

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have logged out');
  console.log('logged out');
  res.redirect('/');
});
module.exports = router;
