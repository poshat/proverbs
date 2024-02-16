var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var api = require('./routes/api');

var app = express();

//mongoose.connect('mongodb://poshat:qwerty00@ds127802.mlab.com:27802/poshat', {useMongoClient: true});
//mongoose.connect('mongodb://localhost:27017/proverbs', {useMongoClient: true});
///mongoose.connect('mongodb://dbuser:oFpxqW71@127.0.0.1:27017/proverbs', {useMongoClient: true});
mongoose.connect('mongodb://poshat:oFpxqW71@127.0.0.1:27017/proverbs');
///mongoose.connect('mongodb://poshat2:oFpxqW71@127.0.0.1:27017/test?authSource=admin, {useMongoClient: true}');
////mongoose.connect('mongodb://poshat:oFpxqW71@127.0.0.1:27017/razdumki, {useMongoClient: true}');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', api);

app.listen(process.env.PORT || '3000', function () {
  console.log('App listening on port 3000!');
});
