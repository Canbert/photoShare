// load the things we need
var mongoose = require('mongoose');

var tagSchema = mongoose.Schema({

    name : String

});

module.exports = mongoose.model('Tag', tagSchema);