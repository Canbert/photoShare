
module.exports = function (app) {
    // =====================================
    // ADMIN ================================
    // =====================================
    app.get('/search', function (req, res) {
        res.render('pages/search', {
            user : req.user // get the user out of session and pass to template
        });
    });
}