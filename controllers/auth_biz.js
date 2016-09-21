var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models');
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

// BROWSE page
router.get('/browse', function (req, res) {
  if (req.query.range) {
    var rangeData = req.query.range
    console.log(req.body.range);
    db.listing.findAll({
      where: {
        value: {
          gt: parseInt(rangeData)
        }
      },
      order: 'value DESC'
    }).then(function (obj) {
      res.render('browse', {data: obj});
    });
  } else {
    db.listing.findAll().then(function (data) {
      res.render('browse', {data: data});
    });
  }
});

// Listing page
router.get('/listings', isLoggedIn, function (req, res) {
  var id = req.user.id;
  db.listing.findAll({
    where: {
      UserAccountId: id
    },
    order: 'id DESC'
  }).then(function (data) {
    res.render('listings/listings', {data: data});
  });
});

//listed business page
router.get('/biz_profile/:id', function (req, res) {
  var id = req.params.id
  console.log('this is name: ' + id);
  db.listing.findAll({
    where: {
      id: id
    }
  }).then(function (data) {
  res.render('listings/biz_profile', {data: data})
})
})

//create new listing WITH associations
router.post('/final_new_listing', function (req, res) {
  req.user.createListing({
    industry: req.body.industry,
    sector: req.body.sector,
    address: req.body.address,
    website: req.body.website,
    description: req.body.description,
    value: req.body.valuation
  }).then(function(zebra) {
    req.flash('success', 'Congratulations, your business is listed!');
    console.log('Business listed!');
    res.redirect('/user_dashboard');
  });
})

//DELETE BUSINESS Listing
router.post('/:id', function(req, res) {
  var hello = req.params.id;
  console.log('i am going to delete ' + hello);
    db.listing.destroy({
    where: { id: hello }
  }).then(function() {
    req.flash('deleted', 'Business is deleted')
    res.redirect('listings');
  });

})

module.exports = router;


//create new listing
// router.post('/final_new_listing/:email', function (req, res) {
//   var listedBy = req.params.email;
//   var name = req.body.name;
//   console.log('creating listing');
//
//   db.listing.findOrCreate({
//     where: {
//       businessName: name
//     },
//     defaults: {
//       industry: req.body.industry,
//       sector: req.body.sector,
//       address: req.body.address,
//       website: req.body.website,
//       description: req.body.description,
//       value: req.body.valuation,
//       listedBy: listedBy
//     }
//   }).spread(function (user, created) {
//     if (created) {
//       // if created, success and redirect home
//       req.flash('success', 'Congratulations, your business is listed!');
//       console.log('Business listed!');
//       res.redirect('/user_dashboard');
//     } else {
//       // if not created, the email already exists
//       console.log('Business already exists');
//       req.flash('error', 'Business already exists');
//       res.redirect('/listings');
//     }
//   }).catch(function (error) {
//     // if an error occurs, let's see what the error is
//     console.log('An error occurred: ', error.message);
//     req.flash('error', error.message);
//     res.redirect('listings');
//   });
// });
