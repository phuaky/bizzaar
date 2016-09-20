var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models');
var passport = require('../config/ppConfig');
var router = express.Router();

//BROWSE page
router.get('/browse', function (req, res) {
  db.listing.findAll().then(function(data){
    res.render('browse', {data: data});
  })
})

router.post('/final_new_listing/:email', function (req, res) {
  var listedBy = req.params.email;
  var name = req.body.name;
  console.log('creating listing');

  db.listing.findOrCreate({
    where: {
      businessName: name
    },
    defaults: {
      industry: req.body.industry,
      sector: req.body.sector,
      address: req.body.address,
      website: req.body.website,
      description: req.body.description,
      value: req.body.valuation,
      listedBy: listedBy
    }
  }).spread(function (user, created) {
    if (created) {
      // if created, success and redirect home
      req.flash('success', 'Congratulations, your business is listed!');
      console.log('Business listed!');
      res.redirect('/user_dashboard');
    } else {
      // if not created, the email already exists
      console.log('Business already exists');
      req.flash('error', 'Business already exists');
      res.redirect('/listings');
    }
  }).catch(function (error) {
    // if an error occurs, let's see what the error is
    console.log('An error occurred: ', error.message);
    req.flash('error', error.message);
    res.redirect('/listings');
  });
});

module.exports = router;
