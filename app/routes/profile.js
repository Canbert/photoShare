
module.exports = function (app) {
    // =====================================
    // PROFILE =============================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('pages/profile', {
            user: req.user // get the user out of session and pass to template
        });
    });
}