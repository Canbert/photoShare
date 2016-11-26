

module.exports = function (app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        // user required for the navbar
        res.render('pages/index',{
            user:req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('*', function(req, res){
        res.status(404).render('pages/404');
    });
};
