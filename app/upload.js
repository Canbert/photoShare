
module.exports = function (app, multer) {

    var location = './public/photos/';

    var upload = multer({dest : location});

    app.post('/upload', upload.single('formPhoto'), function (req, res) {
        console.log(req.file);
        // res.redirect('/');
        res.write('File Uploaded!');
    });

}