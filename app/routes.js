

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

    // =====================================
    // PROFILE =============================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('pages/profile', {
            user : req.user // get the user out of session and pass to template
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
    app.get('/chat', function (req, res) {
       res.render('pages/chat'), {
           user : req.user // get the user out of session and pass to template
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
