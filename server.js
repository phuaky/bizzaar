var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();
// var dotenv = require('dotenv')
// dotenv.load()
// console.log(process.env.MYNAME)

app.set('view engine', 'ejs');
app.use(ejsLayouts);

console.log('SERVER goes live in 3.. 2.. 1');

// tell server wheres my static file
app.use(express.static('public'));

// configure body-parser
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

// renders homepage
console.log('Homepage Loading...');
app.get('/', function (req, res) {
  res.render('index');
});

// renders pre-signup page
app.get('/pre-signup', function (req, res) {
  console.log('Pre-signup Loading...');
  res.render('accounts/signup/pre-signup');
});

// renders sign up page for the young
app.get('/signup', function (req, res) {
  res.render('accounts/signup/signup');
});

app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
