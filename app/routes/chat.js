
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

