// load the things we need
var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({

    name : {
        type: String
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    tags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'Tag'
    }],
    data : []

});

var tagSchema = mongoose.Schema({

    name : String

});

module.exports = mongoose.model('Tag', tagSchema);
module.exports = mongoose.model('Photo', photoSchema);