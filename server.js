var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var passport = require('./config/ppConfig');
const dotenv = require('dotenv')
dotenv.load()
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');

var app = express();

app.set('view engine', 'ejs');
app.use(ejsLayouts);

// set up session


console.log('SERVER goes live in 3.. 2.. 1');

// tell server wheres my static file
app.use(express.static('public'));

// configure body-parser
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

// renders homepage
console.log('Homepage Loading...');
app.get('/', function (req, res) {
  res.render('index');
});

// renders login page
app.get('/login', function (req, res) {
  console.log('Log in page loading...');
  res.render('accounts/login/login')
})

// renders pre-signup page
app.get('/pre-signup', function (req, res) {
  console.log('Pre-signup Loading...');
  res.render('accounts/signup/pre-signup');
});

// renders sign up page for the young
app.get('/signup', function (req, res) {
  res.render('accounts/signup/signup');
});

//renders DASHBOARD after SUCCESSFUL LOGGING IN
app.get('/user_dashboard', isLoggedIn, function (req, res) {
  res.render('dashboard/user_dashboard');
});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
