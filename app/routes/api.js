var Photo = require('../models/photo');
var Tag = require('../models/tag');

module.exports = function (app) {

    // =====================================
    // API PHOTOS ================================
    // =====================================

    // get all photos
    app.get('/api/photos', function (req, res) {
        Photo.find({})
            .populate('user','username')
            .populate('tags','name')
            .exec(function (err, photos) {

                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err) {
                    res.send(err);
                }

                res.json(photos); // return all photos in JSON format
            });
    });

    // get one photo based on the id
    app.get('/api/photos/:photo_id', function (req, res) {
        Photo.findById(req.params.photo_id)
            .populate('user','username')
            .populate('tags','name')
            .exec( function (err, photo) {
                if(err)
                    res.send(err);
                res.send(photo);
            });
    });

    // =====================================
    // API TAGS ================================
    // =====================================

    app.post('/api/tags', function (req, res) {

    });

    // get all photos
    app.get('/api/tags', function (req, res) {
        Tag.find({})
            .exec(function (err, tags) {

                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err) {
                    res.send(err);
                }

                res.json(tags); // return all photos in JSON format
            });
    });

    // get one photo based on the id
    app.get('/api/photos/:photo_id', function (req, res) {
        Tag.findById(req.params.tag_id)
            .exec( function (err, tag) {
                if(err)
                    res.send(err);
                res.send(tag);
            });
    });

}