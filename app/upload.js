var Photo = require('../app/models/photo.js');

module.exports = function (app, multer) {

    var location = './public/photos/';

    var upload = multer({dest : location});

    // =====================================
    // IMAGE UPLOAD ================================
    // =====================================
    app.post('/upload', upload.single('formPhoto'), function (req, res) {

        photo = new Photo();

        photo.name = "";
        photo.tags = [];
        photo.data = req.file;

        console.log(photo);

        // save the photo
        photo.save(function(err) {
            if (err){
                console.log(err);
            }
            else{
                console.log('Photo uploaded');
            }
        });
        // res.redirect('/');
        res.write('File Uploaded!');
    });


    app.get('/upload', isLoggedIn, function (req, res) {
        if(req.user.privilege >= 1){
            res.render('pages/upload', {
                user : req.user // get the user out of session and pass to template
            });
        }
        else{
            res.redirect('/');
        }
    });

}