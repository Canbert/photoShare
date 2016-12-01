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


    app.put('/api/photos/:photo_id', function (req, res) {
        Photo.findById(req.params.photo_id)
            .populate('user','username')
            .populate('tags','name')
            .exec( function (err, photo) {
                if(err)
                    res.send(err);

                for(var i = 0; i < req.body.tags.length; i++) {
                    Tag.findOneAndUpdate({name: req.body.tags[i]}, {name: req.body.tags[i].toLowerCase()},
                        {upsert: true, new: true, setDefaultsOnInsert: true},
                        function (error, result) {
                            if (error) return;

                            photo.tags.push(result._id);

                            photo.name = req.body.name;
                            photo.price = req.body.price;

                            photo.save(function (err) {
                                if (err)
                                    console.log(error);

                                res.json({message: 'photo updated'});
                            });
                        });
                }
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
    app.get('/api/tags/:tag_id', function (req, res) {
        Tag.findById(req.params.tag_id)
            .exec( function (err, tag) {
                if(err)
                    res.send(err);
                res.send(tag);
            });
    });

}