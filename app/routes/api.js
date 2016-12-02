var Photo = require('../models/photo');
var Tag = require('../models/tag');
var User = require('../models/user');
var escape = require('../htmlescape');

module.exports = function (app, multer, ExifImage) {

    app.get('/api', function (req, res) {

        var routes = {
            photos: '/api/photos',
            tags: '/api/tags',
            user: '/api/users'
        }

        return res.json(routes);

    });


    // =====================================
    // API PHOTOS ================================
    // =====================================

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    });

    var upload = multer({storage: storage});

    app.post('/api/photos',upload.single('file'), function (req, res) {

        try {
            new ExifImage({ image : req.file.path }, function (error, exifData) {

                var photo = new Photo();

                for(var i = 0; i < req.body.tags.length; i++){

                    Tag.findOneAndUpdate({name: req.body.tags[i]}, {name: req.body.tags[i].toLowerCase()},
                        {upsert: true, new: true, setDefaultsOnInsert: true },
                        function(error, result) {
                            if (error) return;

                            photo.tags.push(result._id);

                            photo.name = escape.escapeHtml(req.body.name);
                            photo.user = req.user._id;
                            photo.price = req.body.price;
                            photo.data = exifData;

                            var url = req.file.path;
                            url = url.substring(6,url.length); // remove the "public" part of the url

                            photo.url = url;

                            photo.save(function (err) {
                                if(err)
                                    console.log(error);
                            });
                        });
                }
                return res.json(photo);
            });
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    });

    // get all photos
    app.get('/api/photos', function (req, res) {

        if(req.query){
            var query = req.query.q;

            Photo.find({name: new RegExp(query, "i") })
                .populate('user','username')
                .populate('tags','name')
                .exec(function (err, photos) {

                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err) {
                        res.send(err);
                    }

                    res.json(photos); // return all photos in JSON format
                });
        }
        else {

            Photo.find({})
                .populate('user', 'username')
                .populate('tags', 'name')
                .exec(function (err, photos) {

                    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                    if (err) {
                        res.send(err);
                    }

                    res.json(photos); // return all photos in JSON format
                });
        }
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

                                // res.json({message: 'photo updated'});
                            });
                        });
                }
            });
    });

    app.delete('/api/photos/:photo_id', function (req, res) {
        Photo.remove({
            _id: req.params.photo_id
        }, function(err, photo) {
            if (err)
                res.send(err);
            res.json({ message: 'You deleted the photo'});
        });
    });

    // =====================================
    // API USERS ================================
    // =====================================

    // get all users
    app.get('/api/users',function (req, res) {

        var query = User.find();
        query.select('-password');

        query.exec(function (err, users) {
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err) {
                res.send(err);
            }
            res.json(users); // return all photos in JSON format
        });
    });

    // get one user based on the id
    app.get('/api/users/:user_id', function (req, res) {

        var query = User.findById(req.params.user_id);
        query.select('-password');

        query.exec( function (err, user) {
            if(err)
                res.send(err);
            else
                res.json(user);
        });
    });

    app.put('/api/users/:user_id', function (req, res) {

        var query = User.findById(req.params.user_id);
        query.select('-password');

        query.exec( function (err, user) {
                if(err)
                    res.send(err);

                user.privilege = req.body.privilege;

                user.save(function (err) {
                    if (err)
                        console.log(error);

                    res.json({message: 'user updated'});
                });

            })
    });


    // =====================================
    // API TAGS ================================
    // =====================================

    app.post('/api/tags', function (req, res) {

    });

    // get all tags
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

    // get one tag based on the id
    app.get('/api/tags/:tag_id', function (req, res) {
        Tag.findById(req.params.tag_id)
            .exec( function (err, tag) {
                if(err)
                    res.send(err);
                res.send(tag);
            });
    });
}