var express = require('express');
var bodyParser = require('body-parser');
var db = require('../models');
var passport = require('../config/ppConfig');
var isLoggedIn = require('../middleware/isLoggedIn');
var router = express.Router();

// BROWSE page
router.get('/browse', function (req, res) {
  if (req.query.range) {
    var rangeData = req.query.range;
    console.log(req.body.range);
    db.listing.findAll({
      where: {
        value: {
          lt: parseInt(rangeData)
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

// LISTINGS page
router.get('/listings', isLoggedIn, function (req, res) {
  var id = req.user.id;
  db.listing.findAll({
    include: [db.bizdetail],
    where: {
      UserAccountId: id
    },
    order: [['updatedAt', 'DESC']] // id of row(latest created above)
  }).then(function (data) {
    console.log({data:data});
    res.render('listings/listings', {data: data});
  });
});

// LISTINGS business page
router.get('/biz_profile/:id', function (req, res) {
  var id = req.params.id;
  db.listing.findAll({
    include: [db.bizdetail],
    where: {
      id: id
    }
  }).then(function (listings) {
      res.render('listings/biz_profile', {listings: listings} );
  })

});

//CREATE NEW BIZ PAGE WITH ASSOCIATIONS
router.post('/final_new_listing', isLoggedIn, function (req, res) {
  req.user.createListing({
    businessName: req.body.name,
    industry: req.body.industry,
    sector: req.body.sector,
    address: req.body.address,
    website: req.body.website,
    description: req.body.description,
    value: req.body.valuation,
    bizcreated: req.body.bizcreated,
    bizid: req.body.bizid
  }).then(function (zebra) {
    req.flash('success', 'Congratulations, your business is listed!');
    console.log('Business listed!');
    res.redirect('/auth_biz/listings');
  });
});

//GET BIZ EDIT PAGE
router.get('/biz_profile/biz_edit/:id', isLoggedIn, function (req, res) {
  var id = req.params.id;
  db.listing.findAll({
    where: {
      id: id
    }
  }).then(function (data) {
    console.log(data);
    res.render('listings/final_new_listing_edit', {data: data});
  });
});

// POST LISTING UPDATES
router.post('/update/:id', isLoggedIn, function (req, res) {
var id = req.params.id;
  db.listing.update({
    businessName: req.body.name,
    sector: req.body.sector,
    address: req.body.address,
    website: req.body.website,
    description: req.body.description,
    value: req.body.value,
    bizcreated: req.body.bizcreated,
    bizid: req.body.bizid
  }, {
    where: {
      id: id
    }
  }).then(function (user) {
    req.flash('edited', 'Business Profile updated successfully');
    res.redirect('/auth_biz/listings');
  });
});

//GET CREATE NEW BIZ DETAILS page
router.get('/create_biz_details/:id', isLoggedIn, function (req, res) {
  var id = req.params.id;
  db.listing.findAll({
    where: {
      id: id
    }
  }).then(function (data) {
    console.log(data);
    res.render('listings/create_biz_details', {data: data});
  });
});

//POST Create NEW BIZ DETAILS
router.post('/create_biz_details/:id', isLoggedIn, function (req, res) { //<<<<<<If not created before then can create
  db.listing.findById(req.params.id).then(function(listing){
    listing.createBizdetail({
      revenue: req.body.revenue,
      grosprofit: req.body.grosprofit,
      netprofit: req.body.netprofit,
      cashflow: req.body.cashflow,
      operatingexpenses: req.body.operatingexpenses,
      totalassets: req.body.totalassets,
      totalliabilities: req.body.totalliabilities,
      employee: req.body.employee
    }).then(function (zebra) {
      req.flash('success', 'Your business detail has been successfully added');
      console.log('Business detail added!');
      res.redirect('/auth_biz/listings');
    });
  })
});

//GET EDIT NEW BIZ DETAILS page
router.get('/edit_biz_details/:id', isLoggedIn, function (req, res) {
  var id = req.params.id;
  db.bizdetail.findAll({
    where: {
      listingId: id
    }
  }).then(function (data) {
    console.log(data);
    res.render('listings/edit_biz_details', {data: data});
  });
});

//POST EDIT NEW BIZ DETAILS
router.post('/edit_biz_details/:id', isLoggedIn, function (req, res) {
  db.bizdetail.update({
    revenue: req.body.revenue,
    grosprofit: req.body.grosprofit,
    netprofit: req.body.netprofit,
    cashflow: req.body.cashflow,
    operatingexpenses: req.body.operatingexpenses,
    totalassets: req.body.totalassets,
    totalliabilities: req.body.totalliabilities,
    employee: req.body.employee
  }, {
      where: {
      id: req.params.id
    }
  }).then(function(user) {
    req.flash('success', 'Your business detail has been updated');
    console.log('Business detail updated!');
    res.redirect('/auth_biz/listings');
  });
});

// DELETE BUSINESS Listing
router.post('/:id', function (req, res) {
  var hello = req.params.id;
  console.log('i am going to delete ' + hello);
  db.listing.destroy({
    where: { id: hello }
  }).then(function () {
    req.flash('deleted', 'Business is deleted');
    res.redirect('listings');
  });
});

module.exports = router;

// create new listing
// router.post('/final_new_listing/:email', function (req, res) {
//   var listedBy = req.params.email
//   var name = req.body.name
//   console.log('creating listing')
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
//       req.flash('success', 'Congratulations, your business is listed!')
//       console.log('Business listed!')
//       res.redirect('/user_dashboard')
//     } else {
//       // if not created, the email already exists
//       console.log('Business already exists')
//       req.flash('error', 'Business already exists')
//       res.redirect('/listings')
//     }
//   }).catch(function (error) {
//     // if an error occurs, let's see what the error is
//     console.log('An error occurred: ', error.message)
//     req.flash('error', error.message)
//     res.redirect('listings')
//   })
// })

// db.bizdetial.findById(req.params.id).then(function(listing){
//   listing.createBizdetail({
//     revenue: req.body.revenue,
//     grosprofit: req.body.grosprofit,
//     netprofit: req.body.netprofit,
//     cashflow: req.body.cashflow,
//     operatingexpenses: req.body.operatingexpenses,
//     totalassets: req.body.totalassets,
//     totalliabilities: req.body.totalliabilities,
//     employee: req.body.employee
//   })
// }).then(function (zebra) {

// <<<<<<<<<<<<<<<<<<<<checking 2 database
// // LISTINGS business page
// router.get('/biz_profile/:id', function (req, res) {
//   var id = req.params.id;
//   console.log('this id is: ' + id);
//   db.listing.findAll({
//     where: {
//       id: id
//     }
//   }).then(function (listing) {
//     db.bizdetail.findAll({
//       where:{
//         listingId: id
//       }
//     }).then(function (bizdetail) {
//       // console.log('data passed back is ' + typeof({data:data}) + {data:data});
//       res.render('listings/biz_profile', {listing: listing, bizdetail: bizdetail } );
//     });
//   })
//
// });
