var Photo = require('../models/photo');

module.exports = function (app) {
    // =====================================
    // PHOTO ================================
    // =====================================
    app.get('/photo/:photo_id', function (req, res) {

        Photo.findById(req.params.photo_id)
            .populate('user','username')
            .exec(function (err, photo) {
                if(err)
                    console.log(err);
                if(photo)
                    res.render('pages/photo', {
                        user: req.user,
                        photo: photo
                    });
                else
                    res.redirect("/");
        });

    });
}