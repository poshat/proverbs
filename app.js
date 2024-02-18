var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var api = require('./routes/api');

var app = express();

mongoose.connect('mongodb://user:pass@127.0.0.1:27017/proverbs');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

app.listen(process.env.PORT || '3000', function () {
  console.log('App listening on port 3000!');
});
