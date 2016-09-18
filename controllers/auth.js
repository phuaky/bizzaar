var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models');
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
      // console.log('User created!');
      // console.log(user);
      // res.redirect('/');
    } else {
      // if not created, the email already exists
      // console.log('Email already exists');
      // res.redirect('/auth/signup');
    }
  }).catch(function(error) {
    // if an error occurs, let's see what the error is
    // console.log('An error occurred: ', error.message);
    // res.redirect('/auth/signup');
  });
})

module.exports = router;
