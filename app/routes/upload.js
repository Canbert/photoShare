var Photo = require('../models/photo.js');

module.exports = function (app, multer) {

    // =====================================
    // IMAGE UPLOAD ================================
    // =====================================

    function upload(req) {
        var upload = multer({dest : './public/photos/'});
        upload.single(req.file);
    }


    app.post('/api/photos', function (req, res) {

        var photo = new Photo();

        console.log(req.body.otherInfo);

        photo.name = "test";//req.body.name;
        photo.user = 1;//req.user._id;
        photo.tags = "tag";//req.body.tags;
        photo.data = [];//req.file;

        photo.save(function (err) {
           if(err)
               res.send(err);
            res.json(photo.toString());
           // else
           //     upload(req);
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


    app.get('/upload', /*isLoggedIn,*/ function (req, res) {
        // if(req.user.privilege >= 1){
            res.render('pages/upload', {
                user : req.user // get the user out of session and pass to template
            });
        // }
        // else{
        //     res.redirect('/');
        // }
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