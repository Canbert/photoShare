// load the things we need
var mongoose = require('mongoose');

var photoSchema = mongoose.schema({

    name : String,
    tags : [{type : mongoose.Schema.Types.ObjectId, ref  : 'Tag'}],
    url  : String

});

var tagSchema = mongoose.schema({

    name : String

});

module.exports = mongoose.model('Tag', tagSchema);
module.exports = mongoose.model('Photo', photoSchema);