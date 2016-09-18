var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var app = express();

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
console.log('Hompage Loaded');


var server = app.listen(process.env.PORT || 3000);

module.exports = server;
