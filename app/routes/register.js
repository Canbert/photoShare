
module.exports = function (app, passport) {
    // =====================================
    // REGISTER ==============================
    // =====================================
    // show the register form
    app.get('/register', function (req, res) {
        if(req.isUnauthenticated()){
            // render the page and pass in any flash data if it exists
            res.render('pages/register', {
                message: req.flash('signupMessage')
            });
        }
        else{
            res.redirect("/");
        }

    });

    // process the register form
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/register', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
}