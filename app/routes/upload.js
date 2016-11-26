var Photo = require('../models/photo');
var Tag = require('../models/tag');

module.exports = function (app, multer, ExifImage) {

    // =====================================
    // IMAGE UPLOAD ================================
    // =====================================

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/photos/')
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

                        photo.name = req.body.name;
                        photo.user = req.user._id;
                        photo.price = req.body.price;
                        photo.data = exifData;

                        var url = req.file.path;
                        url = url.substring(6,url.length); // remove the "public" part of the url

                        photo.url = url;

                        photo.save(function (err) {
                            // if(err)
                            //     res.send(err);
                            // console.log(photo);
                            res.json(photo);
                            // else
                            //     upload(req);
                        });
                    });
                }
            });
        } catch (error) {
            console.log('Error: ' + error.message);
        }
    });

    // get all photos
    app.get('/api/photos', function (req, res) {
        Photo.find({})
            .populate('user','username')
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
            .exec( function (err, photo) {
            if(err)
                res.send(err);
            res.send(photo);
        });
    });

    app.get('/upload', isLoggedIn, function (req, res) {
        if(req.user.privilege >= 1){
            res.render('pages/upload', {
                user : req.user // get the user out of session and pass to template
            });
        }
        else{
            res.redirect('/');
        }
    });
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}