var Photo = require('../models/photo');

module.exports = function (app) {
    // =====================================
    // CART ================================
    // =====================================
    app.get('/cart', function (req, res) {

        console.log(req.cookies);

        res.render('pages/cart', {
            user: req.user
        });

        // Photo.find(req.params)
        //     .populate('user','username')
        //     .exec(function (err, photo) {
        //         if(err)
        //             console.log(err);
        //         if(photo)
        //             res.render('pages/photo', {
        //                 user: req.user,
        //                 photo: photo
        //             });
        //         else
        //             res.redirect("/");
        // });

    });
}