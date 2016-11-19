
var User = require('../models/user.js');

module.exports = function (app) {
    // =====================================
    // ADMIN ================================
    // =====================================
    app.get('/admin',isLoggedIn, function (req, res) {
        if(req.user.privilege == 2){
            getUsers();
            res.render('pages/admin', {
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

function getUsers() {
    // get all the users
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);
    });
}

