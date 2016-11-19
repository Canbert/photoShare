

module.exports = function (app, passport) {

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

    // =====================================
    // CHAT ================================
    // =====================================
    app.get('/chat', isLoggedIn, function (req, res) {
        if(req.user.privilege >= 1){
            res.render('pages/chat', {
                user : req.user // get the user out of session and pass to template
            });
        }
        else{
            res.redirect('/');
        }
    });

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
