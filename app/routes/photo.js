var Photo = require('../models/photo');

module.exports = function (app) {
    // =====================================
    // PHOTO ================================
    // =====================================
    app.get('/photo/:photo_id', function (req, res) {

        Photo.findById(req.params.photo_id, function (err, photo) {
            if(err)
                res.send(err);
            else
                console.log("hello");

                res.render('pages/photo', {
                    photo: photo
                });
        });

    });
}