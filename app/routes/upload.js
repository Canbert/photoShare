var Photo = require('../models/photo.js');

module.exports = function (app, multer) {

    var location = './public/photos/';

    var upload = multer({dest : location});

    // =====================================
    // IMAGE UPLOAD ================================
    // =====================================
    app.post('/api/photos', upload.single('formPhoto'), function (req, res) {

        Photo.create({
            name : req.body.text,
            user : req.user._id,
            tags : [],
            data : req.file
        }, function (err, photo) {
            if(err)
                res.send(err);
        });
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