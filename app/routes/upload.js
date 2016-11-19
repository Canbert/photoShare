var Photo = require('../models/photo.js');

function getPhotos(res) {
    Photo.find(function (err, photos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(photos); // return all photos in JSON format
    });
};

module.exports = function (app, multer) {

    var location = './public/photos/';

    var upload = multer({dest : location});

    // =====================================
    // IMAGE UPLOAD ================================
    // =====================================
    app.post('/api/photos', upload.single('formPhoto'), function (req, res) {

        Photo.create({
            name : req.body.text,
            tags : [],
            data : req.file
        }, function (err, photo) {
            if(err)
                res.send(err);

            // get and return all the photos after you create another
            getPhotos(res);
        });


        // photo = new Photo();
        //
        // photo.name = "";
        // photo.tags = [];
        // photo.data = req.file;
        //
        // console.log(photo);
        //
        // // save the photo
        // photo.save(function(err) {
        //     if (err){
        //         console.log(err);
        //     }
        //     else{
        //         console.log('Photo uploaded');
        //     }
        // });
        // // res.redirect('/');
        // res.write('File Uploaded!');
    });


    // get all photos
    app.get('/api/photos', function (req, res) {
        // use mongoose to get all photos in the database
        getPhotos(res);
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