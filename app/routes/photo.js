var Photo = require('../models/photo');

module.exports = function (app) {
    // =====================================
    // PHOTO ================================
    // =====================================
    app.get('/photo/:photo_id', function (req, res) {

        console.log(req.params.photo_id);

        Photo.findById(req.params.photo_id)
            .populate('user','username')
            .exec(function (err, photo) {
                if(err)
                    console.log(err);
                if(photo)
                    res.render('pages/photo', {
                        photo: photo
                    });
                else
                    res.redirect("/");
        });

    });
}