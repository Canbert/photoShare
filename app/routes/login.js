
module.exports = function (app, passport) {
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {
        if(req.isUnauthenticated()){
            // render the page and pass in any flash data if it exists
            // user required for the navbar
            res.render('pages/login', {
                message: req.flash('loginMessage')
            });
        }
        else{
            res.redirect("/");
        }
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
}