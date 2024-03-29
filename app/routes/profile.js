var User = require('../models/user');
var Photo = require('../models/photo');

module.exports = function (app) {
    // =====================================
    // PROFILE =============================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {

        Photo.find({user: req.user._id})
            .populate('user','username')
            .exec(function (err, photos) {
                if(err)
                    console.log(err);
                if(!photos)
                    photos = [];

                res.render('pages/profile', {
                    user: req.user,
                    profileUser: req.user,
                    photos: photos
                });
            });
    });

    app.get('/profile/:user_name', function (req, res) {

        User.findOne({username: req.params.user_name})
            .exec(function (err, user) {
                if(err)
                    console.log(err);

                if(req.user && user.username == req.user.username)
                    res.redirect('/profile');
                else
                    Photo.find({user: user._id})
                        .populate('user','username')
                        .exec(function (err, photos) {
                            if(err)
                                console.log(err);
                            if(!photos)
                                photos = [];
                            else
                                console.log(photos);

                            res.render('pages/profile', {
                                user: req.user,
                                profileUser: user,
                                photos: photos
                            });
                        });
            });

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