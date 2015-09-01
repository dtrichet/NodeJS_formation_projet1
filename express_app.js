// ----------------------------------------------------------------------------
// CONFIGURATION EXPRESS
// ----------------------------------------------------------------------------
var express = require('express');
var app = express();
var bodyParser  = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'jade');

exports.app = app;
