
module.exports = function (app) {
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
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
