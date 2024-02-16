var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var category = new Schema({
  text: {type: String, required: true}
});

var author = new Schema({
  name: {type: String, required: true}
});

var country = new Schema({
  name: {type: String, required: true}
});

var schema = new Schema({
    text: {type: String, required: true},
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    author: {type: Schema.Types.ObjectId, ref: 'Author'},
    country: {type: Schema.Types.ObjectId, ref: 'Country'}
});

module.exports.Category = mongoose.model('Category', category);
module.exports.Author = mongoose.model('Author', author);
module.exports.Country = mongoose.model('Country', country);
module.exports.Proverb = mongoose.model('Proverb', schema);
