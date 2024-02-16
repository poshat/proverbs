var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
    vkId: {type: Number, required: true},
    category: {type: Number, required: true, default: 0}
});

module.exports.User = mongoose.model('User', user);
