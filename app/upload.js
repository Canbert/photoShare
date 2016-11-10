var Photo = require('../app/models/photo.js');

module.exports = function (app, multer) {

    var location = './public/photos/';

    var upload = multer({dest : location});


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

}