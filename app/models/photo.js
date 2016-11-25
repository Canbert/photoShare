// load the things we need
var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({

    name : String,
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    price : Number,
    tags : [{
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'Tag'
    }],
    data : [],

});

var tagSchema = mongoose.Schema({

    name : String

});

module.exports = mongoose.model('Tag', tagSchema);
module.exports = mongoose.model('Photo', photoSchema);