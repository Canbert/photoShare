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
    url: String,
    data : []

});

// Getter
photoSchema.path('price').get(function(num) {
    return (num / 100).toFixed(2);
});

// Setter
photoSchema.path('price').set(function(num) {
    return num * 100;
});

module.exports = mongoose.model('Photo', photoSchema);